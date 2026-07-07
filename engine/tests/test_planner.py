"""Tests for the planner module."""

import json

from src.planner.planner import _parse_plan_response, run_planner


def test_parse_clean_plan():
    """Parses a clean JSON plan."""
    plan = {"summary": "Test plan", "actions": [], "deferred": "", "bible_observations": None}
    result = _parse_plan_response(json.dumps(plan))
    assert result["summary"] == "Test plan"


def test_parse_fenced_plan():
    """Parses a code-fenced JSON plan."""
    plan = {"summary": "Fenced", "actions": []}
    fenced = f"```json\n{json.dumps(plan)}\n```"
    result = _parse_plan_response(fenced)
    assert result["summary"] == "Fenced"


def test_parse_invalid_plan():
    """Returns None for unparseable text."""
    result = _parse_plan_response("not json at all")
    assert result is None


def test_run_planner_with_triaged_items(test_db, mock_llm_client, sample_plan_response, monkeypatch):
    """Planner creates plan actions from triaged items."""
    monkeypatch.setattr("src.planner.planner.get_db", lambda: test_db)

    # Seed source + item + triage result
    source_id = test_db.upsert_source(
        name="Test", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )
    test_db.insert_discovered_item(
        source_id=source_id, url="https://example.com/article",
        title="Sleep Research", content="Content about sleep",
        content_hash="plan123",
    )
    test_db.update_item_status(1, "triaged")
    test_db.insert_triage_result(
        item_id=1,
        scores={
            "relevance_score": 8, "novelty_score": 7,
            "importance_score": 8, "overall_score": 7.8,
            "suggested_action": "new_article",
            "suggested_section": "parenting",
            "triage_reasoning": "Good content",
            "model_used": "test",
        },
    )

    mock_llm_client.call.return_value = (
        sample_plan_response,
        {"model": "test", "input_tokens": 200, "output_tokens": 100, "cost_usd": 0.002},
    )

    plan_id = run_planner(llm_client=mock_llm_client)
    assert plan_id is not None

    actions = test_db.get_pending_actions(plan_id)
    assert len(actions) == 1
    assert actions[0]["action_type"] == "create"

    # item_ids should be stored as JSON array
    item_ids = json.loads(actions[0]["item_ids"])
    assert item_ids == [1]

    # Item should be marked as planned
    item = test_db.get_item_by_id(1)
    assert item["status"] == "planned"


def test_planner_multi_source_action(test_db, mock_llm_client, monkeypatch):
    """Planner creates a single action when multiple item_ids are specified."""
    monkeypatch.setattr("src.planner.planner.get_db", lambda: test_db)

    source_id = test_db.upsert_source(
        name="Test", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )
    test_db.insert_discovered_item(
        source_id=source_id, url="https://example.com/a1",
        title="Article 1", content="Content 1", content_hash="multi1",
    )
    test_db.insert_discovered_item(
        source_id=source_id, url="https://example.com/a2",
        title="Article 2", content="Content 2", content_hash="multi2",
    )
    test_db.update_item_status(1, "triaged")
    test_db.update_item_status(2, "triaged")
    for i in [1, 2]:
        test_db.insert_triage_result(
            item_id=i,
            scores={
                "relevance_score": 8, "novelty_score": 7,
                "importance_score": 8, "overall_score": 7.8,
                "suggested_action": "new_article",
                "suggested_section": "parenting",
                "triage_reasoning": "Good",
                "model_used": "test",
            },
        )

    plan_response = json.dumps({
        "summary": "Multi-source article",
        "actions": [
            {
                "action_type": "create",
                "item_ids": [1, 2],
                "target_path": "content/combined.md",
                "priority": 8,
                "instructions": "Combine both sources.",
            }
        ],
        "deferred": "",
        "bible_observations": None,
    })
    mock_llm_client.call.return_value = (
        plan_response,
        {"model": "test", "input_tokens": 200, "output_tokens": 100, "cost_usd": 0.002},
    )

    plan_id = run_planner(llm_client=mock_llm_client)
    actions = test_db.get_pending_actions(plan_id)

    # Should create ONE action with both item_ids, not two separate actions
    assert len(actions) == 1
    item_ids = json.loads(actions[0]["item_ids"])
    assert item_ids == [1, 2]


def test_planner_stores_topic_tags(test_db, mock_llm_client, sample_plan_response, monkeypatch):
    """Planner stores topic_tags from the LLM plan response."""
    monkeypatch.setattr("src.planner.planner.get_db", lambda: test_db)

    source_id = test_db.upsert_source(
        name="Test", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )
    test_db.insert_discovered_item(
        source_id=source_id, url="https://example.com/article",
        title="Test Article", content="Content",
        content_hash="tags_test",
    )
    test_db.update_item_status(1, "triaged")
    test_db.insert_triage_result(
        item_id=1,
        scores={
            "relevance_score": 8, "novelty_score": 7,
            "importance_score": 8, "overall_score": 7.8,
            "suggested_action": "new_article",
            "suggested_section": "parenting",
            "triage_reasoning": "Good",
            "model_used": "test",
        },
    )

    mock_llm_client.call.return_value = (
        sample_plan_response,
        {"model": "test", "input_tokens": 200, "output_tokens": 100, "cost_usd": 0.002},
    )

    plan_id = run_planner(llm_client=mock_llm_client)
    actions = test_db.get_pending_actions(plan_id)
    assert len(actions) == 1

    import json
    topic_tags = json.loads(actions[0]["topic_tags"])
    assert "health" in topic_tags


def test_planner_no_items(test_db, mock_llm_client, monkeypatch):
    """Planner returns None when there's nothing to plan."""
    monkeypatch.setattr("src.planner.planner.get_db", lambda: test_db)
    result = run_planner(llm_client=mock_llm_client)
    assert result is None


def _seed_triaged_item(test_db, url, content_hash):
    source_id = test_db.upsert_source(
        name="Test", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )
    item_id = test_db.insert_discovered_item(
        source_id=source_id, url=url, title="Article",
        content="Content", content_hash=content_hash,
    )
    test_db.update_item_status(item_id, "triaged")
    test_db.insert_triage_result(
        item_id=item_id,
        scores={
            "relevance_score": 8, "novelty_score": 7,
            "importance_score": 8, "overall_score": 7.8,
            "suggested_action": "new_article",
            "suggested_section": "parenting",
            "triage_reasoning": "Good",
            "model_used": "test",
        },
    )
    return item_id


def test_planner_skips_malformed_actions(test_db, mock_llm_client, monkeypatch):
    """One malformed action must not crash the run or orphan items."""
    monkeypatch.setattr("src.planner.planner.get_db", lambda: test_db)
    item_id = _seed_triaged_item(test_db, "https://example.com/x", "malformed1")

    plan_response = json.dumps({
        "summary": "Mixed plan",
        "actions": [
            {"item_ids": [item_id], "target_path": "content/x.md"},  # no action_type
            {"action_type": "publish_everything", "item_ids": [item_id]},  # invalid type
            {
                "action_type": "create", "item_ids": [item_id],
                "target_path": "content/x.md", "priority": 8,
                "instructions": "Write it.",
            },
        ],
        "deferred": "",
        "bible_observations": None,
    })
    mock_llm_client.call.return_value = (
        plan_response,
        {"model": "test", "input_tokens": 200, "output_tokens": 100, "cost_usd": 0.002},
    )

    plan_id = run_planner(llm_client=mock_llm_client)
    assert plan_id is not None

    actions = test_db.get_pending_actions(plan_id)
    assert len(actions) == 1
    assert actions[0]["action_type"] == "create"
    assert test_db.get_item_by_id(item_id)["status"] == "planned"


def test_planner_skips_when_cost_cap_reached(test_db, mock_llm_client, monkeypatch):
    """When the daily cost cap is hit, the planner short-circuits before any LLM call."""
    monkeypatch.setattr("src.planner.planner.get_db", lambda: test_db)
    monkeypatch.setattr("src.planner.planner.daily_cost_exceeded", lambda db, settings: True)
    _seed_triaged_item(test_db, "https://example.com/cap", "cap1")

    result = run_planner(llm_client=mock_llm_client)

    assert result is None
    mock_llm_client.call.assert_not_called()


def test_planner_expires_stale_items_before_planning(test_db, mock_llm_client, sample_plan_response, monkeypatch):
    """Stale triaged items are expired at planner start and excluded from the plan."""
    monkeypatch.setattr("src.planner.planner.get_db", lambda: test_db)

    stale = _seed_triaged_item(test_db, "https://example.com/stale", "stale_plan1")
    test_db._execute(
        "UPDATE triage_results SET triaged_at = datetime('now', '-40 days') WHERE item_id = ?",
        (stale,),
    )

    mock_llm_client.call.return_value = (
        sample_plan_response,
        {"model": "test", "input_tokens": 200, "output_tokens": 100, "cost_usd": 0.002},
    )

    run_planner(llm_client=mock_llm_client)

    assert test_db.get_item_by_id(stale)["status"] == "expired"


def test_planner_filters_item_ids_outside_triaged_set(test_db, mock_llm_client, monkeypatch):
    """LLM-returned item_ids not in the triaged set are dropped."""
    monkeypatch.setattr("src.planner.planner.get_db", lambda: test_db)
    item_id = _seed_triaged_item(test_db, "https://example.com/y", "foreign_plan1")

    plan_response = json.dumps({
        "summary": "Plan with foreign ids",
        "actions": [
            {
                "action_type": "create", "item_ids": [item_id, 999],
                "target_path": "content/y.md", "priority": 8,
                "instructions": "Write it.",
            },
            {
                "action_type": "create", "item_ids": [998],
                "target_path": "content/z.md", "priority": 8,
                "instructions": "Only foreign ids — should be skipped.",
            },
        ],
        "deferred": "",
        "bible_observations": None,
    })
    mock_llm_client.call.return_value = (
        plan_response,
        {"model": "test", "input_tokens": 200, "output_tokens": 100, "cost_usd": 0.002},
    )

    plan_id = run_planner(llm_client=mock_llm_client)
    actions = test_db.get_pending_actions(plan_id)
    assert len(actions) == 1
    assert json.loads(actions[0]["item_ids"]) == [item_id]
