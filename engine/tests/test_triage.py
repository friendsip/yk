"""Tests for the triage module."""

import json

from src.triage.triage import _parse_triage_response, run_triage


def test_parse_clean_json():
    """Parses a clean JSON array."""
    data = [{"item_id": 1, "relevance_score": 8}]
    result = _parse_triage_response(json.dumps(data))
    assert len(result) == 1
    assert result[0]["item_id"] == 1


def test_parse_markdown_fenced_json():
    """Parses JSON wrapped in markdown code fences."""
    data = [{"item_id": 2, "relevance_score": 7}]
    fenced = f"```json\n{json.dumps(data)}\n```"
    result = _parse_triage_response(fenced)
    assert len(result) == 1
    assert result[0]["item_id"] == 2


def test_parse_json_with_surrounding_text():
    """Parses JSON array embedded in explanatory text."""
    data = [{"item_id": 3}]
    text = f"Here are the results:\n{json.dumps(data)}\nDone."
    result = _parse_triage_response(text)
    assert len(result) == 1
    assert result[0]["item_id"] == 3


def test_parse_invalid_json():
    """Returns empty list for unparseable text."""
    result = _parse_triage_response("this is not json")
    assert result == []


def test_run_triage_with_mock(test_db, mock_llm_client, sample_triage_response, monkeypatch):
    """Triage processes items and stores results."""
    # Redirect DB
    monkeypatch.setattr("src.triage.triage.get_db", lambda: test_db)

    # Seed a source and item
    source_id = test_db.upsert_source(
        name="Test", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )
    test_db.insert_discovered_item(
        source_id=source_id,
        url="https://example.com/article",
        title="Test Article",
        content="Some content about child sleep patterns.",
        content_hash="abc123",
    )

    # Mock LLM to return sample triage response
    mock_llm_client.call.return_value = (
        sample_triage_response,
        {"model": "test", "input_tokens": 100, "output_tokens": 50, "cost_usd": 0.001},
    )

    triaged = run_triage(llm_client=mock_llm_client, batch_size=10)
    assert triaged == 1

    # Check item status updated
    item = test_db.get_item_by_id(1)
    assert item["status"] == "triaged"

    # Check trend signals created
    signals = test_db.get_recent_trend_signals(days=1)
    assert len(signals) == 2  # "sleep" and "child-development"


def test_triage_discards_low_scores(test_db, mock_llm_client, monkeypatch):
    """Items below threshold are discarded."""
    monkeypatch.setattr("src.triage.triage.get_db", lambda: test_db)

    source_id = test_db.upsert_source(
        name="Test", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )
    test_db.insert_discovered_item(
        source_id=source_id, url="https://example.com/low",
        title="Low Quality", content="Not very relevant",
        content_hash="low123",
    )

    low_score_response = json.dumps([{
        "item_id": 1,
        "relevance_score": 2,
        "novelty_score": 1,
        "importance_score": 2,
        "reliability_score": 3,
        "suggested_action": "ignore",
        "suggested_section": "parenting",
        "topic_tags": ["misc"],
        "opposing_view_flag": False,
        "brief_reasoning": "Not relevant to parenting.",
    }])

    mock_llm_client.call.return_value = (
        low_score_response,
        {"model": "test", "input_tokens": 100, "output_tokens": 50, "cost_usd": 0.001},
    )

    run_triage(llm_client=mock_llm_client)

    item = test_db.get_item_by_id(1)
    assert item["status"] == "discarded"
