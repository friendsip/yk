"""Tests for the editor (update) flow — path containment and output validation."""

import pytest

from src.writer.editor import edit_article

EXISTING_MD = """---
title: "Existing Article"
summary: "The original"
type: evergreen
section: parenting
tags:
  - health
sources:
  - https://example.com/original
first_published: 2026-01-10
---

The original body of the article, which says useful things about sleep.
"""

UPDATED_MD = """---
title: "Existing Article"
summary: "The original, refreshed"
type: evergreen
section: parenting
tags:
  - health
sources:
  - https://example.com/original
  - https://example.com/new
first_published: 2026-01-10
last_updated: 2026-07-02
---

The refreshed body of the article, now with the new research folded in and
still saying useful things about sleep for parents everywhere.
"""


@pytest.fixture
def content_dir(tmp_path, monkeypatch):
    """A fake site content collection with one existing article."""
    content = tmp_path / "content"
    content.mkdir()
    (content / "existing-article.md").write_text(EXISTING_MD)
    monkeypatch.setattr("src.writer.editor.SITE_CONTENT_DIR", content)
    return content


@pytest.fixture
def seeded_db(test_db, monkeypatch):
    """test_db wired into the editor, seeded with one source item."""
    monkeypatch.setattr("src.writer.editor.get_db", lambda: test_db)
    source_id = test_db.upsert_source(
        name="Test", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )
    test_db.insert_discovered_item(
        source_id, "https://example.com/new", "New Research",
        "New findings about sleep.", "edit_hash",
    )
    return test_db


def _small_word_counts(mock_llm_client):
    mock_llm_client.settings = {
        "content": {"min_word_count": 10, "max_word_count": 1500, "min_sources_per_article": 2},
    }
    return mock_llm_client


def test_edit_article_valid_update(content_dir, seeded_db, mock_llm_client):
    """A well-formed LLM response is returned as the updated article."""
    client = _small_word_counts(mock_llm_client)
    client.call.return_value = (UPDATED_MD, {"model": "test"})

    action = {
        "id": 1, "item_ids": [1], "action_type": "update",
        "target_path": "content/existing-article.md", "instructions": "Fold in the new research.",
    }
    result = edit_article(action, client)
    assert result is not None
    assert "refreshed" in result


def test_edit_article_rejects_invalid_output(content_dir, seeded_db, mock_llm_client):
    """A refusal or truncated response must not replace a good article."""
    client = _small_word_counts(mock_llm_client)
    client.call.return_value = (
        "I'm sorry, I can't update this article based on that material.",
        {"model": "test"},
    )

    action = {
        "id": 1, "item_ids": [1], "action_type": "update",
        "target_path": "content/existing-article.md", "instructions": "Update it.",
    }
    assert edit_article(action, client) is None


def test_edit_article_rejects_traversal_target(content_dir, seeded_db, mock_llm_client, tmp_path):
    """A traversal target_path cannot read files outside the content collection."""
    secret = tmp_path / "secrets.md"
    secret.write_text("SECRET_KEY=abc")

    client = _small_word_counts(mock_llm_client)
    action = {
        "id": 1, "item_ids": [1], "action_type": "update",
        "target_path": "../secrets.md", "instructions": "Update it.",
    }
    assert edit_article(action, client) is None
    client.call.assert_not_called()
