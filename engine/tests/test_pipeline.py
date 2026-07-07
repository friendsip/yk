"""Tests for the weekly pipeline orchestration in main.py.

The load-bearing behaviour: a planner or writer failure must NOT skip publish,
and stranded staging must be recovered on startup.
"""

from unittest.mock import MagicMock

import src.main as main


def _llm():
    llm = MagicMock()
    llm.settings = {"alerting": {"enabled": False}}
    return llm


def test_pipeline_publishes_even_when_planner_fails(monkeypatch):
    """A planner exception is caught and publish still runs."""
    calls = {"publish": 0}

    def boom_planner(llm):
        raise RuntimeError("LLM overloaded")

    monkeypatch.setattr(main, "run_planner", boom_planner)
    monkeypatch.setattr(main, "publish_daily_batch", lambda: calls.__setitem__("publish", calls["publish"] + 1))

    main.run_daily_pipeline(_llm())

    assert calls["publish"] == 1


def test_pipeline_publishes_even_when_writer_fails(monkeypatch):
    """A writer exception is caught and publish still runs."""
    calls = {"publish": 0, "writer": 0}

    def boom_writer(plan_id, llm):
        calls["writer"] += 1
        raise RuntimeError("writer boom")

    monkeypatch.setattr(main, "run_planner", lambda llm: 42)
    monkeypatch.setattr(main, "run_writer_for_plan", boom_writer)
    monkeypatch.setattr(main, "publish_daily_batch", lambda: calls.__setitem__("publish", 1))

    main.run_daily_pipeline(_llm())

    assert calls["writer"] == 1
    assert calls["publish"] == 1


def test_pipeline_skips_writer_when_no_plan(monkeypatch):
    """No plan means no writer, but publish still runs (stranded staging)."""
    calls = {"publish": 0, "writer": 0}
    monkeypatch.setattr(main, "run_planner", lambda llm: None)
    monkeypatch.setattr(main, "run_writer_for_plan", lambda pid, llm: calls.__setitem__("writer", 1))
    monkeypatch.setattr(main, "publish_daily_batch", lambda: calls.__setitem__("publish", 1))

    main.run_daily_pipeline(_llm())

    assert calls["writer"] == 0
    assert calls["publish"] == 1


def test_catchup_publishes_stranded_staging(tmp_path, monkeypatch):
    """Startup catch-up publishes leftover staging even with no recent plan."""
    staging = tmp_path / "staging"
    staging.mkdir()
    (staging / "leftover.md").write_text("---\ntitle: x\n---\nbody")

    monkeypatch.setattr("src.publisher.publisher.STAGING_DIR", staging)

    calls = {"publish": 0}
    monkeypatch.setattr(main, "publish_daily_batch", lambda: calls.__setitem__("publish", 1))

    db = MagicMock()
    db.get_recent_plans.return_value = []  # fresh install: no plans
    monkeypatch.setattr(main, "get_db", lambda: db)

    main.catch_up_missed_pipeline({}, _llm())

    assert calls["publish"] == 1


def test_catchup_no_staging_no_plans_does_nothing(tmp_path, monkeypatch):
    """Fresh install with empty staging must not publish anything."""
    staging = tmp_path / "staging"
    staging.mkdir()

    monkeypatch.setattr("src.publisher.publisher.STAGING_DIR", staging)

    calls = {"publish": 0}
    monkeypatch.setattr(main, "publish_daily_batch", lambda: calls.__setitem__("publish", 1))

    db = MagicMock()
    db.get_recent_plans.return_value = []
    monkeypatch.setattr(main, "get_db", lambda: db)

    main.catch_up_missed_pipeline({}, _llm())

    assert calls["publish"] == 0
