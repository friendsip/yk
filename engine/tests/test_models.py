"""Tests for database model changes — item_ids, action status, failure tracking."""

import json
from datetime import datetime, timedelta


def test_insert_plan_action_with_item_ids(test_db):
    """Plan actions store item_ids as JSON array."""
    plan_id = test_db.insert_editorial_plan("Test plan")
    action_id = test_db.insert_plan_action(
        plan_id=plan_id,
        item_ids=[10, 20, 30],
        action_type="create",
        target_path="articles/test.md",
        instructions="Write article",
        priority=8,
    )
    actions = test_db.get_pending_actions(plan_id)
    assert len(actions) == 1
    assert json.loads(actions[0]["item_ids"]) == [10, 20, 30]


def test_get_items_by_ids(test_db):
    """Fetches multiple items by ID."""
    source_id = test_db.upsert_source(
        name="Test", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )
    test_db.insert_discovered_item(source_id, "https://a.com", "A", "text a", "hash_a")
    test_db.insert_discovered_item(source_id, "https://b.com", "B", "text b", "hash_b")
    test_db.insert_discovered_item(source_id, "https://c.com", "C", "text c", "hash_c")

    items = test_db.get_items_by_ids([1, 3])
    assert len(items) == 2
    titles = {i["title"] for i in items}
    assert titles == {"A", "C"}


def test_get_items_by_ids_empty(test_db):
    """Empty ID list returns empty result."""
    assert test_db.get_items_by_ids([]) == []


def test_action_status_staged(test_db):
    """Actions can transition to 'staged' status."""
    plan_id = test_db.insert_editorial_plan("Test plan")
    action_id = test_db.insert_plan_action(
        plan_id=plan_id,
        item_ids=[1],
        action_type="create",
        target_path="articles/test.md",
        instructions="Write",
        priority=5,
    )

    test_db.update_action_status(action_id, "in_progress")
    test_db.update_action_status(action_id, "staged")

    # Staged actions should not appear in pending list
    actions = test_db.get_pending_actions(plan_id)
    assert len(actions) == 0


def test_stale_in_progress_actions_retried(test_db):
    """Actions stuck in_progress for >1 hour are returned by get_pending_actions."""
    plan_id = test_db.insert_editorial_plan("Test plan")
    action_id = test_db.insert_plan_action(
        plan_id=plan_id,
        item_ids=[1],
        action_type="create",
        target_path="articles/test.md",
        instructions="Write",
        priority=5,
    )

    # Set to in_progress with a timestamp >1 hour ago
    two_hours_ago = (datetime.now() - timedelta(hours=2)).isoformat()
    test_db._execute(
        "UPDATE plan_actions SET status = 'in_progress', updated_at = ? WHERE id = ?",
        (two_hours_ago, action_id),
    )

    actions = test_db.get_pending_actions(plan_id)
    assert len(actions) == 1
    assert actions[0]["status"] == "in_progress"


def test_source_failure_tracking(test_db):
    """Consecutive failures increment and reset correctly."""
    source_id = test_db.upsert_source(
        name="Test", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )

    test_db.increment_source_failures(source_id)
    test_db.increment_source_failures(source_id)
    test_db.increment_source_failures(source_id)

    sources = test_db.get_active_sources()
    assert sources[0]["consecutive_failures"] == 3

    test_db.reset_source_failures(source_id)
    sources = test_db.get_active_sources()
    assert sources[0]["consecutive_failures"] == 0
