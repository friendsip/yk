"""Tests for database model changes — item_ids, action status, failure tracking."""

import json


def test_insert_plan_action_with_item_ids(test_db):
    """Plan actions store item_ids as JSON array."""
    plan_id = test_db.insert_editorial_plan("Test plan")
    action_id = test_db.insert_plan_action(
        plan_id=plan_id,
        item_ids=[10, 20, 30],
        action_type="create",
        target_path="content/test.md",
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
        target_path="content/test.md",
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
        target_path="content/test.md",
        instructions="Write",
        priority=5,
    )

    # Set to in_progress with a timestamp >1 hour ago, in the same format
    # production writes (SQLite's datetime('now'), UTC)
    test_db._execute(
        "UPDATE plan_actions SET status = 'in_progress', updated_at = datetime('now', '-2 hours') WHERE id = ?",
        (action_id,),
    )

    actions = test_db.get_pending_actions(plan_id)
    assert len(actions) == 1
    assert actions[0]["status"] == "in_progress"


def test_fresh_in_progress_actions_not_retried(test_db):
    """Actions freshly marked in_progress are NOT returned as pending.

    Regression test: Python isoformat cutoffs compared against SQLite
    datetime('now') strings made every same-day in_progress action look stale.
    """
    plan_id = test_db.insert_editorial_plan("Test plan")
    action_id = test_db.insert_plan_action(
        plan_id=plan_id,
        item_ids=[1],
        action_type="create",
        target_path="content/test.md",
        instructions="Write",
        priority=5,
    )

    test_db.update_action_status(action_id, "in_progress")

    assert test_db.get_pending_actions(plan_id) == []


def test_triage_attempts_increment(test_db):
    """Triage attempts increment and persist on discovered items."""
    source_id = test_db.upsert_source(
        name="Test", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )
    item_id = test_db.insert_discovered_item(
        source_id, "https://a.com", "A", "text a", "hash_attempts"
    )

    test_db.increment_triage_attempts(item_id)
    test_db.increment_triage_attempts(item_id)

    item = test_db.get_item_by_id(item_id)
    assert item["triage_attempts"] == 2


def _seed_triaged(test_db, url, content_hash, score):
    """Insert a triaged item with a given overall_score. Returns item_id."""
    source_id = test_db.upsert_source(
        name="Test", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )
    item_id = test_db.insert_discovered_item(source_id, url, "Article", "text", content_hash)
    test_db.update_item_status(item_id, "triaged")
    test_db.insert_triage_result(
        item_id=item_id,
        scores={
            "relevance_score": 8, "novelty_score": 7, "importance_score": 8,
            "overall_score": score, "suggested_action": "new_article",
            "suggested_section": "parenting", "triage_reasoning": "ok", "model_used": "t",
        },
    )
    return item_id


def test_get_triaged_items_for_planning_respects_limit(test_db):
    """The candidate query is bounded and returns best-scored first."""
    for i in range(5):
        _seed_triaged(test_db, f"https://example.com/a{i}", f"lim{i}", score=1.0 + i)

    items = test_db.get_triaged_items_for_planning(min_score=0, limit=3)
    assert len(items) == 3
    scores = [i["overall_score"] for i in items]
    assert scores == sorted(scores, reverse=True)
    assert scores[0] == 5.0  # highest score kept


def test_expire_stale_triaged_items(test_db):
    """Triaged items past the TTL move to 'expired'; fresh ones are untouched."""
    stale = _seed_triaged(test_db, "https://example.com/old", "stale1", score=7.0)
    fresh = _seed_triaged(test_db, "https://example.com/new", "fresh1", score=7.0)

    # Age the stale item's triage timestamp beyond the TTL
    test_db._execute(
        "UPDATE triage_results SET triaged_at = datetime('now', '-30 days') WHERE item_id = ?",
        (stale,),
    )

    expired = test_db.expire_stale_triaged_items(ttl_days=21)
    assert expired == 1
    assert test_db.get_item_by_id(stale)["status"] == "expired"
    assert test_db.get_item_by_id(fresh)["status"] == "triaged"

    # Expired items no longer appear as planning candidates
    candidates = test_db.get_triaged_items_for_planning(min_score=0)
    assert stale not in [c["id"] for c in candidates]


def test_expire_stale_triaged_items_none_stale(test_db):
    """Nothing to expire returns 0 and leaves items in place."""
    fresh = _seed_triaged(test_db, "https://example.com/x", "nostale1", score=7.0)
    assert test_db.expire_stale_triaged_items(ttl_days=21) == 0
    assert test_db.get_item_by_id(fresh)["status"] == "triaged"


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
