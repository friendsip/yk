"""Tests for weekly schedule helpers."""

from datetime import datetime, timezone

from src.utils.schedule import last_scheduled_run

# 2026-06-28 and 2026-06-21 are Sundays; London is on BST (UTC+1) in June.


def test_midweek_returns_previous_sunday():
    now = datetime(2026, 7, 1, 12, 0, tzinfo=timezone.utc)  # Wednesday
    due = last_scheduled_run(now, "sun", "05:00", "Europe/London")
    assert due == datetime(2026, 6, 28, 4, 0, tzinfo=timezone.utc)  # 05:00 BST


def test_sunday_before_run_time_returns_week_before():
    now = datetime(2026, 6, 28, 2, 0, tzinfo=timezone.utc)  # Sunday 03:00 BST
    due = last_scheduled_run(now, "sun", "05:00", "Europe/London")
    assert due == datetime(2026, 6, 21, 4, 0, tzinfo=timezone.utc)


def test_exactly_at_run_time_returns_now():
    now = datetime(2026, 6, 28, 4, 0, tzinfo=timezone.utc)  # Sunday 05:00 BST
    due = last_scheduled_run(now, "sun", "05:00", "Europe/London")
    assert due == now


def test_accepts_long_day_names():
    now = datetime(2026, 7, 1, 12, 0, tzinfo=timezone.utc)
    due = last_scheduled_run(now, "sunday", "05:00", "Europe/London")
    assert due == datetime(2026, 6, 28, 4, 0, tzinfo=timezone.utc)


def test_catch_up_runs_when_plan_is_stale(test_db, monkeypatch):
    from src.main import catch_up_missed_pipeline

    monkeypatch.setattr("src.main.get_db", lambda: test_db)
    ran = []
    monkeypatch.setattr("src.main.run_daily_pipeline", lambda client: ran.append(True))

    plan_id = test_db.insert_editorial_plan("Old plan")
    test_db._execute(
        "UPDATE editorial_plans SET created_at = '2026-01-01 05:00:00' WHERE id = ?",
        (plan_id,),
    )

    catch_up_missed_pipeline({"scheduling": {"planner": {}}}, llm_client=None)
    assert ran == [True]


def test_catch_up_skips_when_plan_is_current(test_db, monkeypatch):
    from src.main import catch_up_missed_pipeline

    monkeypatch.setattr("src.main.get_db", lambda: test_db)
    ran = []
    monkeypatch.setattr("src.main.run_daily_pipeline", lambda client: ran.append(True))

    # created_at defaults to datetime('now') — after any past scheduled run
    test_db.insert_editorial_plan("Fresh plan")

    catch_up_missed_pipeline({"scheduling": {"planner": {}}}, llm_client=None)
    assert ran == []


def test_catch_up_skips_on_fresh_install(test_db, monkeypatch):
    from src.main import catch_up_missed_pipeline

    monkeypatch.setattr("src.main.get_db", lambda: test_db)
    ran = []
    monkeypatch.setattr("src.main.run_daily_pipeline", lambda client: ran.append(True))

    catch_up_missed_pipeline({"scheduling": {"planner": {}}}, llm_client=None)
    assert ran == []
