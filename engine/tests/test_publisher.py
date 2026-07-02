"""Tests for the publisher module."""

import json

from src.publisher.publisher import (
    stage_content,
    _extract_title,
    _extract_frontmatter_field,
    _count_sources,
    STAGING_DIR,
)


def test_stage_content(tmp_path, monkeypatch):
    """stage_content creates files in the staging directory."""
    staging = tmp_path / "staging"
    monkeypatch.setattr("src.publisher.publisher.STAGING_DIR", staging)

    markdown = """---
title: "Test Article"
summary: "A test"
type: evergreen
section: parenting
tags:
  - health
sources:
  - https://example.com
first_published: 2026-03-04
---

Content here."""

    stage_content(markdown, "content/test-article.md", action_id=42)

    # Staging is flat — directory components of target_path are discarded
    staged_file = staging / "test-article.md"
    assert staged_file.exists()
    assert staged_file.read_text() == markdown

    # Check metadata sidecar
    meta_file = staging / "test-article.md.meta.json"
    assert meta_file.exists()
    meta = json.loads(meta_file.read_text())
    assert meta["action_id"] == 42


def test_extract_title():
    """Extracts title from frontmatter."""
    md = '---\ntitle: "My Great Article"\nsummary: "test"\n---\nContent'
    assert _extract_title(md) == "My Great Article"


def test_extract_title_single_quotes():
    md = "---\ntitle: 'Single Quoted'\n---\nContent"
    assert _extract_title(md) == "Single Quoted"


def test_extract_title_missing():
    assert _extract_title("No frontmatter here") == "Untitled"


def test_count_sources():
    md = """---
title: "Test"
sources:
  - https://example.com/one
  - https://example.com/two
---
Content"""
    assert _count_sources(md) == 2


def test_count_sources_none():
    md = "---\ntitle: Test\n---\nNo sources"
    assert _count_sources(md) == 0


def test_extract_frontmatter_field_type():
    md = '---\ntitle: "Test"\ntype: curated\nfirst_published: 2026-03-04\n---\nContent'
    assert _extract_frontmatter_field(md, "type") == "curated"


def test_extract_frontmatter_field_missing():
    md = '---\ntitle: "Test"\n---\nContent'
    assert _extract_frontmatter_field(md, "type") is None


def test_stage_content_contains_traversal(tmp_path, monkeypatch):
    """Directory components and traversal in target_path are discarded."""
    staging = tmp_path / "staging"
    monkeypatch.setattr("src.publisher.publisher.STAGING_DIR", staging)

    stage_content("---\ntitle: x\n---\nbody", "../../../engine/evil.md", action_id=1)

    assert (staging / "evil.md").exists()
    assert not (tmp_path / "engine").exists()


def test_stage_content_rejects_unusable_path(tmp_path, monkeypatch):
    """A target_path with no usable filename raises rather than writing."""
    import pytest

    staging = tmp_path / "staging"
    monkeypatch.setattr("src.publisher.publisher.STAGING_DIR", staging)

    with pytest.raises(ValueError):
        stage_content("---\ntitle: x\n---\nbody", "///", action_id=1)


def _setup_publish(tmp_path, monkeypatch, test_db, markdown):
    """Stage one article with a sidecar and point the publisher at tmp dirs."""
    staging = tmp_path / "staging"
    site_content = tmp_path / "site-content"
    staging.mkdir()

    monkeypatch.setattr("src.publisher.publisher.STAGING_DIR", staging)
    monkeypatch.setattr("src.publisher.publisher.SITE_CONTENT_DIR", site_content)
    monkeypatch.setattr("src.publisher.publisher.get_db", lambda: test_db)
    monkeypatch.setattr(
        "src.publisher.publisher.load_settings",
        lambda: {"publishing": {"mode": "auto", "max_publishes_per_day": 5}},
    )

    plan_id = test_db.insert_editorial_plan("Test plan")
    action_id = test_db.insert_plan_action(
        plan_id=plan_id, item_ids=[1], action_type="create",
        target_path="content/test-article.md", instructions="Write", priority=5,
    )
    test_db.update_action_status(action_id, "staged")

    staged = staging / "test-article.md"
    staged.write_text(markdown)
    (staging / "test-article.md.meta.json").write_text(
        json.dumps({"action_id": action_id})
    )
    return staging, site_content, action_id


PUBLISH_MD = """---
title: "Test Article"
summary: "A test"
type: evergreen
first_published: 2026-07-02
sources:
  - https://example.com/one
---

Body text here.
"""


def test_publish_git_failure_preserves_staging_and_db(tmp_path, monkeypatch, test_db):
    """A git failure must leave staging intact and the DB unchanged."""
    from src.publisher.publisher import publish_daily_batch

    staging, site_content, action_id = _setup_publish(
        tmp_path, monkeypatch, test_db, PUBLISH_MD
    )
    monkeypatch.setattr(
        "src.publisher.publisher._publish_auto_mode", lambda paths, today: False
    )

    publish_daily_batch()

    # Staging preserved for retry; nothing recorded as published
    assert (staging / "test-article.md").exists()
    assert (staging / "test-article.md.meta.json").exists()
    assert test_db.get_content_inventory() == []
    action = test_db._fetchone("SELECT * FROM plan_actions WHERE id = ?", (action_id,))
    assert action["status"] == "staged"


def test_publish_success_records_and_cleans(tmp_path, monkeypatch, test_db):
    """A successful publish records the batch and clears staging."""
    from src.publisher.publisher import publish_daily_batch

    staging, site_content, action_id = _setup_publish(
        tmp_path, monkeypatch, test_db, PUBLISH_MD
    )
    monkeypatch.setattr(
        "src.publisher.publisher._publish_auto_mode", lambda paths, today: True
    )

    publish_daily_batch()

    assert (site_content / "test-article.md").exists()
    assert not (staging / "test-article.md").exists()
    assert not (staging / "test-article.md.meta.json").exists()

    inventory = test_db.get_content_inventory()
    assert len(inventory) == 1
    assert inventory[0]["title"] == "Test Article"
    assert inventory[0]["file_path"] == "test-article.md"

    action = test_db._fetchone("SELECT * FROM plan_actions WHERE id = ?", (action_id,))
    assert action["status"] == "completed"
