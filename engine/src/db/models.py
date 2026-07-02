"""Database helper class with typed query methods."""

import json
import sqlite3
import threading
from datetime import timedelta
from pathlib import Path

from src.utils.clock import to_sqlite, utcnow, utcnow_sqlite


class Database:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self._lock = threading.Lock()

    def _connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA foreign_keys=ON")
        return conn

    def _execute(self, sql: str, params: tuple = ()) -> sqlite3.Cursor:
        with self._lock:
            conn = self._connect()
            try:
                cur = conn.execute(sql, params)
                conn.commit()
                return cur
            finally:
                conn.close()

    def _fetchall(self, sql: str, params: tuple = ()) -> list[dict]:
        with self._lock:
            conn = self._connect()
            try:
                cur = conn.execute(sql, params)
                return [dict(row) for row in cur.fetchall()]
            finally:
                conn.close()

    def _fetchone(self, sql: str, params: tuple = ()) -> dict | None:
        with self._lock:
            conn = self._connect()
            try:
                cur = conn.execute(sql, params)
                row = cur.fetchone()
                return dict(row) if row else None
            finally:
                conn.close()

    # ── Sources ──────────────────────────────────────────────

    def get_active_sources(self) -> list[dict]:
        return self._fetchall(
            "SELECT * FROM sources WHERE is_active = 1 ORDER BY check_interval_minutes"
        )

    def update_source_last_checked(self, source_id: int):
        self._execute(
            "UPDATE sources SET last_checked_at = datetime('now') WHERE id = ?",
            (source_id,),
        )

    def upsert_source(
        self,
        name: str,
        url: str,
        source_type: str,
        category: str | None,
        reliability_score: float,
        check_interval: int,
    ) -> int | None:
        existing = self._fetchone("SELECT id FROM sources WHERE url = ?", (url,))
        if existing:
            return existing["id"]
        cur = self._execute(
            """INSERT INTO sources (name, url, source_type, category, reliability_score, check_interval_minutes)
               VALUES (?, ?, ?, ?, ?, ?)""",
            (name, url, source_type, category, reliability_score, check_interval),
        )
        return cur.lastrowid

    def increment_source_failures(self, source_id: int):
        self._execute(
            "UPDATE sources SET consecutive_failures = consecutive_failures + 1 WHERE id = ?",
            (source_id,),
        )

    def reset_source_failures(self, source_id: int):
        self._execute(
            "UPDATE sources SET consecutive_failures = 0 WHERE id = ?",
            (source_id,),
        )

    # ── Discovered items ─────────────────────────────────────

    def insert_discovered_item(
        self,
        source_id: int,
        url: str,
        title: str,
        content: str | None,
        content_hash: str,
    ) -> int | None:
        """Insert a new item. Returns id or None if duplicate."""
        try:
            cur = self._execute(
                """INSERT INTO discovered_items (source_id, external_url, title, raw_content, content_hash)
                   VALUES (?, ?, ?, ?, ?)""",
                (source_id, url, title, content, content_hash),
            )
            return cur.lastrowid
        except sqlite3.IntegrityError:
            return None

    def get_unprocessed_items(self, limit: int = 15) -> list[dict]:
        return self._fetchall(
            "SELECT * FROM discovered_items WHERE status = 'unprocessed' ORDER BY discovered_at LIMIT ?",
            (limit,),
        )

    def update_item_status(self, item_id: int, status: str):
        self._execute(
            "UPDATE discovered_items SET status = ? WHERE id = ?", (status, item_id)
        )

    def increment_triage_attempts(self, item_id: int):
        self._execute(
            "UPDATE discovered_items SET triage_attempts = COALESCE(triage_attempts, 0) + 1 WHERE id = ?",
            (item_id,),
        )

    def get_item_by_id(self, item_id: int) -> dict | None:
        return self._fetchone("SELECT * FROM discovered_items WHERE id = ?", (item_id,))

    def item_url_known(self, url: str) -> bool:
        """True if an item with this URL has already been discovered."""
        return (
            self._fetchone(
                "SELECT 1 FROM discovered_items WHERE external_url = ?", (url,)
            )
            is not None
        )

    # ── Triage ───────────────────────────────────────────────

    def insert_triage_result(self, item_id: int, scores: dict) -> int:
        cur = self._execute(
            """INSERT OR REPLACE INTO triage_results
               (item_id, relevance_score, novelty_score, importance_score,
                overall_score, suggested_action, suggested_section,
                related_existing_content, triage_reasoning, model_used)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                item_id,
                scores.get("relevance_score", 0),
                scores.get("novelty_score", 0),
                scores.get("importance_score", 0),
                scores.get("overall_score", 0),
                scores.get("suggested_action", "ignore"),
                scores.get("suggested_section", "parenting"),
                scores.get("related_existing_content"),
                scores.get("triage_reasoning", ""),
                scores.get("model_used", ""),
            ),
        )
        return cur.lastrowid

    def get_triaged_items_for_planning(self, min_score: float = 5.5) -> list[dict]:
        return self._fetchall(
            """SELECT di.*, tr.overall_score, tr.suggested_action, tr.triage_reasoning,
                      tr.suggested_section
               FROM discovered_items di
               JOIN triage_results tr ON tr.item_id = di.id
               WHERE di.status = 'triaged' AND tr.overall_score >= ?
               ORDER BY tr.overall_score DESC""",
            (min_score,),
        )

    # ── Plans ────────────────────────────────────────────────

    def insert_editorial_plan(self, summary: str) -> int:
        cur = self._execute(
            "INSERT INTO editorial_plans (plan_summary) VALUES (?)", (summary,)
        )
        return cur.lastrowid

    def insert_plan_action(
        self,
        plan_id: int,
        item_ids: list[int],
        action_type: str,
        target_path: str | None,
        instructions: str,
        priority: int,
        topic_tags: list[str] | None = None,
    ) -> int:
        cur = self._execute(
            """INSERT INTO plan_actions (plan_id, item_ids, action_type, target_path, instructions, priority, topic_tags, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))""",
            (plan_id, json.dumps(item_ids), action_type, target_path, instructions, priority,
             json.dumps(topic_tags) if topic_tags else None),
        )
        return cur.lastrowid

    def get_pending_actions(self, plan_id: int) -> list[dict]:
        """Return pending actions, plus any stuck in_progress for >1 hour."""
        one_hour_ago = to_sqlite(utcnow() - timedelta(hours=1))
        return self._fetchall(
            """SELECT * FROM plan_actions
               WHERE plan_id = ?
                 AND (status = 'pending'
                      OR (status = 'in_progress' AND updated_at < ?))
               ORDER BY priority DESC""",
            (plan_id, one_hour_ago),
        )

    def update_action_status(self, action_id: int, status: str):
        completed_at = utcnow_sqlite() if status == "completed" else None
        self._execute(
            "UPDATE plan_actions SET status = ?, completed_at = ?, updated_at = datetime('now') WHERE id = ?",
            (status, completed_at, action_id),
        )

    def get_items_by_ids(self, item_ids: list[int]) -> list[dict]:
        """Fetch multiple discovered items by their IDs."""
        if not item_ids:
            return []
        placeholders = ",".join("?" for _ in item_ids)
        return self._fetchall(
            f"SELECT * FROM discovered_items WHERE id IN ({placeholders})",
            tuple(item_ids),
        )

    def get_recent_plans(self, limit: int = 5) -> list[dict]:
        return self._fetchall(
            "SELECT * FROM editorial_plans ORDER BY created_at DESC LIMIT ?", (limit,)
        )

    # ── Published content ────────────────────────────────────

    def insert_published_content(
        self,
        file_path: str,
        title: str,
        section: str | None,
        content_type: str | None,
        source_item_ids: str,
        word_count: int,
        source_count: int,
    ) -> int:
        cur = self._execute(
            """INSERT OR REPLACE INTO published_content
               (file_path, title, section, content_type, source_item_ids,
                word_count, source_count, last_updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))""",
            (file_path, title, section, content_type, source_item_ids, word_count, source_count),
        )
        return cur.lastrowid

    def get_content_inventory(self) -> list[dict]:
        return self._fetchall(
            "SELECT * FROM published_content ORDER BY last_updated_at DESC"
        )

    def get_recent_publishes(self, days: int = 7) -> list[dict]:
        cutoff = to_sqlite(utcnow() - timedelta(days=days))
        return self._fetchall(
            "SELECT * FROM published_content WHERE first_published_at >= ? ORDER BY first_published_at DESC",
            (cutoff,),
        )

    # ── Trend signals ────────────────────────────────────────

    def insert_trend_signal(
        self, topic: str, item_id: int, signal_type: str, weight: float = 1.0
    ):
        self._execute(
            "INSERT INTO trend_signals (topic, item_id, signal_type, weight) VALUES (?, ?, ?, ?)",
            (topic, item_id, signal_type, weight),
        )

    def get_recent_trend_signals(self, days: int = 30) -> list[dict]:
        cutoff = to_sqlite(utcnow() - timedelta(days=days))
        return self._fetchall(
            "SELECT * FROM trend_signals WHERE signal_date >= ? ORDER BY signal_date DESC",
            (cutoff,),
        )

    # ── Token usage ──────────────────────────────────────────

    def log_token_usage(
        self,
        stage: str,
        model: str,
        input_tokens: int,
        output_tokens: int,
        cost_usd: float,
    ):
        self._execute(
            """INSERT INTO token_usage (stage, model, input_tokens, output_tokens, estimated_cost_usd)
               VALUES (?, ?, ?, ?, ?)""",
            (stage, model, input_tokens, output_tokens, cost_usd),
        )

    def get_daily_token_usage(self) -> list[dict]:
        today = utcnow().strftime("%Y-%m-%d")
        return self._fetchall(
            "SELECT stage, SUM(input_tokens) as total_input, SUM(output_tokens) as total_output, "
            "SUM(estimated_cost_usd) as total_cost FROM token_usage "
            "WHERE timestamp >= ? GROUP BY stage",
            (today,),
        )

    # ── Bible amendments ─────────────────────────────────────

    def insert_bible_amendment(
        self, section: str, change: str, reasoning: str
    ) -> int:
        cur = self._execute(
            "INSERT INTO bible_amendments (section, proposed_change, reasoning) VALUES (?, ?, ?)",
            (section, change, reasoning),
        )
        return cur.lastrowid
