"""Tests for the data maintenance reviewer (decay checker)."""

import json
from datetime import datetime, timedelta, timezone

from src.decay.checker import is_due, run_data_review, _parse_review_response


NOW = datetime(2026, 7, 3, 12, 0, tzinfo=timezone.utc)


def test_due_when_never_reviewed():
    assert is_due(None, {"interval_days": 90}, NOW) is True


def test_due_when_interval_elapsed():
    last = NOW - timedelta(days=91)
    assert is_due(last, {"interval_days": 90}, NOW) is True


def test_not_due_within_interval():
    last = NOW - timedelta(days=10)
    assert is_due(last, {"interval_days": 90}, NOW) is False


def test_due_on_checkpoint_month():
    # July is a checkpoint; last review was in June
    last = datetime(2026, 6, 20, tzinfo=timezone.utc)
    assert is_due(last, {"interval_days": 365, "months": [1, 7]}, NOW) is True


def test_not_due_when_checkpoint_month_already_reviewed():
    last = datetime(2026, 7, 2, tzinfo=timezone.utc)
    assert is_due(last, {"interval_days": 365, "months": [1, 7]}, NOW) is False


def test_parse_review_response_fenced():
    payload = {"status": "ok", "summary": "All fine", "findings": []}
    fenced = f"```json\n{json.dumps(payload)}\n```"
    assert _parse_review_response(fenced)["status"] == "ok"


def _register(tmp_path, interval_days=90):
    data_file = tmp_path / "site" / "src" / "data" / "tools" / "thing.ts"
    data_file.parent.mkdir(parents=True)
    data_file.write_text('export const rate = "£2,643.68";')
    return [
        {
            "id": "thing-tool",
            "name": "Thing tool",
            "files": ["site/src/data/tools/thing.ts"],
            "review": {"interval_days": interval_days},
            "watch_for": "The rate figure.",
            "sources": ["https://example.gov.uk/thing"],
        }
    ]


def _wire(monkeypatch, tmp_path, test_db, source_text="The rate is £2,700 from April."):
    monkeypatch.setattr("src.decay.checker.get_db", lambda: test_db)
    monkeypatch.setattr("src.decay.checker.REPO_ROOT", tmp_path)
    monkeypatch.setattr("src.decay.checker.extract_article", lambda url: source_text)


def test_review_records_ok_without_issue(test_db, mock_llm_client, monkeypatch, tmp_path):
    _wire(monkeypatch, tmp_path, test_db)
    issues = []
    monkeypatch.setattr("src.utils.git.create_issue", lambda title, body: issues.append(title))

    mock_llm_client.call.return_value = (
        json.dumps({"status": "ok", "summary": "Matches current guidance", "findings": []}),
        {"model": "test"},
    )

    needed = run_data_review(mock_llm_client, register=_register(tmp_path))
    assert needed == 0
    assert issues == []

    row = test_db.get_last_data_review("thing-tool")
    assert row["status"] == "ok"


def test_review_update_needed_creates_issue(test_db, mock_llm_client, monkeypatch, tmp_path):
    _wire(monkeypatch, tmp_path, test_db)
    issues = []
    monkeypatch.setattr(
        "src.utils.git.create_issue",
        lambda title, body: (issues.append((title, body)), "https://github.com/x/1")[1],
    )

    mock_llm_client.call.return_value = (
        json.dumps({
            "status": "update_needed",
            "summary": "The rate rose to £2,700.",
            "findings": [{
                "what_changed": "Minimum earnings figure",
                "where_in_our_data": "thing.ts rate const",
                "evidence": "gov.uk now says £2,700",
                "suggested_action": "Update the figure and its mentions",
            }],
        }),
        {"model": "test"},
    )

    needed = run_data_review(mock_llm_client, register=_register(tmp_path))
    assert needed == 1
    assert len(issues) == 1
    title, body = issues[0]
    assert "Thing tool" in title
    assert "Ready-to-run update prompt" in body
    assert "£2,700" in body

    row = test_db.get_last_data_review("thing-tool")
    assert row["status"] == "update_needed"
    assert row["issue_url"] == "https://github.com/x/1"


def test_review_does_not_duplicate_recent_issue(test_db, mock_llm_client, monkeypatch, tmp_path):
    _wire(monkeypatch, tmp_path, test_db)
    issues = []
    monkeypatch.setattr(
        "src.utils.git.create_issue",
        lambda title, body: (issues.append(title), "https://github.com/x/2")[1],
    )

    # A recent update_needed review with an open issue (2 days ago)
    test_db.insert_data_review(
        "thing-tool", "update_needed", "Old finding", "[]", "[]", "https://github.com/x/1"
    )
    test_db._execute(
        "UPDATE data_reviews SET checked_at = datetime('now', '-2 days') WHERE artefact_id = 'thing-tool'"
    )

    mock_llm_client.call.return_value = (
        json.dumps({"status": "update_needed", "summary": "Still wrong.", "findings": []}),
        {"model": "test"},
    )

    # interval_days=1 so the artefact is due again despite the recent review
    needed = run_data_review(mock_llm_client, register=_register(tmp_path, interval_days=1))
    assert needed == 1
    assert issues == []  # no duplicate issue

    row = test_db.get_last_data_review("thing-tool")
    assert row["issue_url"] == "https://github.com/x/1"  # carried over


def test_review_all_sources_failed_records_error(test_db, mock_llm_client, monkeypatch, tmp_path):
    _wire(monkeypatch, tmp_path, test_db)
    monkeypatch.setattr("src.decay.checker.extract_article", lambda url: None)

    needed = run_data_review(mock_llm_client, register=_register(tmp_path))
    assert needed == 0
    mock_llm_client.call.assert_not_called()

    row = test_db.get_last_data_review("thing-tool")
    assert row["status"] == "error"


def test_review_skips_when_not_due(test_db, mock_llm_client, monkeypatch, tmp_path):
    _wire(monkeypatch, tmp_path, test_db)
    test_db.insert_data_review("thing-tool", "ok", "Fine", "[]", "[]")

    run_data_review(mock_llm_client, register=_register(tmp_path, interval_days=90))
    mock_llm_client.call.assert_not_called()
