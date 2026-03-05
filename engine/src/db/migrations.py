"""Database schema creation and migrations."""

import sqlite3
from pathlib import Path

DEFAULT_DB_PATH = str(Path(__file__).parent.parent.parent / "data" / "yourkids.db")

SCHEMA_SQL = """
-- Schema version tracking
CREATE TABLE IF NOT EXISTS schema_version (
    version INTEGER PRIMARY KEY,
    applied_at TEXT DEFAULT (datetime('now'))
);

-- Sources we monitor
CREATE TABLE IF NOT EXISTS sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    source_type TEXT NOT NULL,
    category TEXT,
    reliability_score REAL DEFAULT 0.8,
    check_interval_minutes INTEGER DEFAULT 60,
    last_checked_at TEXT,
    is_active BOOLEAN DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    notes TEXT
);

-- Raw items discovered by the scanner
CREATE TABLE IF NOT EXISTS discovered_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id INTEGER REFERENCES sources(id),
    external_url TEXT NOT NULL,
    title TEXT,
    raw_content TEXT,
    content_hash TEXT NOT NULL,
    discovered_at TEXT DEFAULT (datetime('now')),
    status TEXT DEFAULT 'unprocessed',
    UNIQUE(content_hash)
);

-- Triage results from LLM evaluation
CREATE TABLE IF NOT EXISTS triage_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER REFERENCES discovered_items(id) UNIQUE,
    relevance_score REAL,
    novelty_score REAL,
    importance_score REAL,
    overall_score REAL,
    suggested_action TEXT,
    suggested_section TEXT,
    related_existing_content TEXT,
    triage_reasoning TEXT,
    model_used TEXT,
    triaged_at TEXT DEFAULT (datetime('now'))
);

-- Editorial plans (daily batches)
CREATE TABLE IF NOT EXISTS editorial_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT (datetime('now')),
    plan_summary TEXT,
    status TEXT DEFAULT 'proposed',
    approved_at TEXT,
    executed_at TEXT
);

-- Individual actions within a plan
CREATE TABLE IF NOT EXISTS plan_actions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER REFERENCES editorial_plans(id),
    item_id INTEGER REFERENCES discovered_items(id),
    action_type TEXT NOT NULL,
    target_path TEXT,
    instructions TEXT,
    priority INTEGER DEFAULT 5,
    status TEXT DEFAULT 'pending',
    completed_at TEXT
);

-- Published content tracking
CREATE TABLE IF NOT EXISTS published_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_path TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    section TEXT,
    content_type TEXT,
    source_item_ids TEXT,
    first_published_at TEXT DEFAULT (datetime('now')),
    last_updated_at TEXT DEFAULT (datetime('now')),
    last_decay_check_at TEXT,
    decay_status TEXT DEFAULT 'fresh',
    word_count INTEGER,
    source_count INTEGER
);

-- Decay check results
CREATE TABLE IF NOT EXISTS decay_checks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_id INTEGER REFERENCES published_content(id),
    checked_at TEXT DEFAULT (datetime('now')),
    broken_links TEXT,
    staleness_score REAL,
    recommendation TEXT,
    reasoning TEXT
);

-- Trend tracking: accumulates topic signals over time
CREATE TABLE IF NOT EXISTS trend_signals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic TEXT NOT NULL,
    item_id INTEGER REFERENCES discovered_items(id),
    signal_type TEXT,
    signal_date TEXT DEFAULT (datetime('now')),
    weight REAL DEFAULT 1.0
);

-- Trend snapshots: periodic summaries
CREATE TABLE IF NOT EXISTS trend_snapshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    snapshot_date TEXT DEFAULT (datetime('now')),
    period TEXT,
    topics_json TEXT,
    narrative TEXT
);

-- Editorial synthesis
CREATE TABLE IF NOT EXISTS editorial_syntheses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    synthesis_type TEXT,
    item_ids TEXT,
    content_path TEXT,
    status TEXT DEFAULT 'draft',
    created_at TEXT DEFAULT (datetime('now'))
);

-- Site Bible amendment log
CREATE TABLE IF NOT EXISTS bible_amendments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    proposed_at TEXT DEFAULT (datetime('now')),
    proposed_change TEXT NOT NULL,
    reasoning TEXT,
    section TEXT,
    status TEXT DEFAULT 'proposed',
    approved_at TEXT,
    applied_at TEXT
);

-- Competitive intelligence tracking
CREATE TABLE IF NOT EXISTS competitive_intel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    site_name TEXT NOT NULL,
    site_url TEXT NOT NULL,
    checked_at TEXT DEFAULT (datetime('now')),
    observation_type TEXT,
    observation TEXT NOT NULL,
    relevance TEXT,
    actioned BOOLEAN DEFAULT 0,
    actioned_notes TEXT
);

-- Token usage for cost tracking
CREATE TABLE IF NOT EXISTS token_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT DEFAULT (datetime('now')),
    stage TEXT NOT NULL,
    model TEXT NOT NULL,
    input_tokens INTEGER,
    output_tokens INTEGER,
    estimated_cost_usd REAL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_items_status ON discovered_items(status);
CREATE INDEX IF NOT EXISTS idx_items_hash ON discovered_items(content_hash);
CREATE INDEX IF NOT EXISTS idx_triage_score ON triage_results(overall_score);
CREATE INDEX IF NOT EXISTS idx_content_decay ON published_content(decay_status);
CREATE INDEX IF NOT EXISTS idx_content_section ON published_content(section);
CREATE INDEX IF NOT EXISTS idx_trend_topic ON trend_signals(topic);
CREATE INDEX IF NOT EXISTS idx_trend_date ON trend_signals(signal_date);
CREATE INDEX IF NOT EXISTS idx_synthesis_status ON editorial_syntheses(status);
"""


MIGRATION_V2 = """
-- Add consecutive_failures to sources
ALTER TABLE sources ADD COLUMN consecutive_failures INTEGER DEFAULT 0;

-- Add item_ids column to plan_actions (JSON array, replaces item_id)
ALTER TABLE plan_actions ADD COLUMN item_ids TEXT;

-- Backfill item_ids from existing item_id values
UPDATE plan_actions SET item_ids = json_array(item_id) WHERE item_ids IS NULL AND item_id IS NOT NULL;

-- Add updated_at to plan_actions for stale detection
ALTER TABLE plan_actions ADD COLUMN updated_at TEXT DEFAULT (datetime('now'));
"""


def migrate(db_path: str = None):
    """Create all tables and indexes, then run incremental migrations."""
    if db_path is None:
        db_path = DEFAULT_DB_PATH

    Path(db_path).parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(db_path)
    conn.executescript(SCHEMA_SQL)

    # Record schema version
    cur = conn.execute("SELECT MAX(version) FROM schema_version")
    row = cur.fetchone()
    current = row[0] if row[0] is not None else 0
    if current < 1:
        conn.execute("INSERT INTO schema_version (version) VALUES (1)")

    # Migration v2: multi-source actions + feed failure tracking
    if current < 2:
        _run_migration_v2(conn)
        conn.execute("INSERT INTO schema_version (version) VALUES (2)")

    # Migration v3: topic_tags on plan_actions
    if current < 3:
        _run_migration_v3(conn)
        conn.execute("INSERT INTO schema_version (version) VALUES (3)")

    conn.commit()
    conn.close()


def _run_migration_v2(conn):
    """Add item_ids, consecutive_failures, updated_at columns."""
    # Check which columns already exist (handles fresh DBs where ALTER would fail)
    existing_sources_cols = {
        row[1] for row in conn.execute("PRAGMA table_info(sources)").fetchall()
    }
    existing_actions_cols = {
        row[1] for row in conn.execute("PRAGMA table_info(plan_actions)").fetchall()
    }

    if "consecutive_failures" not in existing_sources_cols:
        conn.execute("ALTER TABLE sources ADD COLUMN consecutive_failures INTEGER DEFAULT 0")

    if "item_ids" not in existing_actions_cols:
        conn.execute("ALTER TABLE plan_actions ADD COLUMN item_ids TEXT")
        conn.execute(
            "UPDATE plan_actions SET item_ids = json_array(item_id) "
            "WHERE item_ids IS NULL AND item_id IS NOT NULL"
        )

    if "updated_at" not in existing_actions_cols:
        conn.execute(
            "ALTER TABLE plan_actions ADD COLUMN updated_at TEXT"
        )
        conn.execute(
            "UPDATE plan_actions SET updated_at = datetime('now') WHERE updated_at IS NULL"
        )


def _run_migration_v3(conn):
    """Add topic_tags column to plan_actions."""
    existing_cols = {
        row[1] for row in conn.execute("PRAGMA table_info(plan_actions)").fetchall()
    }
    if "topic_tags" not in existing_cols:
        conn.execute("ALTER TABLE plan_actions ADD COLUMN topic_tags TEXT")


if __name__ == "__main__":
    migrate()
    print(f"Database migrated at {DEFAULT_DB_PATH}")
