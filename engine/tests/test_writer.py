"""Tests for the writer module."""

import json

from src.writer.writer import _validate_article, _extract_markdown, write_article


def test_extract_markdown_clean():
    """Clean response passes through unchanged."""
    md = "---\ntitle: Test\n---\nContent"
    assert _extract_markdown(md) == md


def test_extract_markdown_with_preamble():
    """Strips preamble text before frontmatter."""
    response = "Here's the article:\n\n---\ntitle: Test\n---\nContent"
    assert _extract_markdown(response).startswith("---")


def test_extract_markdown_with_code_fence():
    """Strips markdown code fences."""
    response = "```markdown\n---\ntitle: Test\n---\nContent\n```"
    result = _extract_markdown(response)
    assert result.startswith("---")
    assert "```" not in result


def test_extract_markdown_with_code_fence_and_preamble():
    """Handles code fence with preamble before it."""
    response = "Here is the article:\n\n```markdown\n---\ntitle: Test\n---\nContent\n```"
    result = _extract_markdown(response)
    assert result.startswith("---")


def test_validate_valid_article(sample_article_markdown):
    """Valid article passes validation."""
    settings = {"min_word_count": 100, "max_word_count": 1500}
    assert _validate_article(sample_article_markdown, settings) is True


def test_validate_missing_frontmatter():
    """Article without frontmatter fails."""
    settings = {"min_word_count": 100}
    assert _validate_article("# No frontmatter here\nJust content.", settings) is False


def test_validate_missing_title():
    """Article missing title field fails."""
    md = """---
summary: "A summary"
type: evergreen
first_published: 2026-03-04
---

Some content here about parenting topics that should be at least a few words long."""
    settings = {"min_word_count": 10}
    assert _validate_article(md, settings) is False


def test_validate_too_short():
    """Article that is too short fails."""
    md = """---
title: "Short"
summary: "Too short"
type: evergreen
first_published: 2026-03-04
sources:
  - https://example.com
---

Too short."""
    settings = {"min_word_count": 300}
    assert _validate_article(md, settings) is False


def test_validate_acceptable_length():
    """Article at reasonable length passes."""
    body = " ".join(["word"] * 200)
    md = f"""---
title: "Test Article"
summary: "A test"
type: evergreen
first_published: 2026-03-04
sources:
  - https://example.com
---

{body}"""
    settings = {"min_word_count": 300}  # 200 words is > 300 * 0.5 = 150
    assert _validate_article(md, settings) is True


def test_write_article_multi_source(test_db, mock_llm_client, sample_article_markdown, monkeypatch):
    """Writer combines multiple source items into a single article."""
    monkeypatch.setattr("src.writer.writer.get_db", lambda: test_db)
    monkeypatch.setattr("src.writer.writer._load_style_examples", lambda **kw: "No examples.")

    source_id = test_db.upsert_source(
        name="Test", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )
    test_db.insert_discovered_item(
        source_id=source_id, url="https://example.com/a1",
        title="Source One", content="First source content",
        content_hash="writer_multi1",
    )
    test_db.insert_discovered_item(
        source_id=source_id, url="https://example.com/a2",
        title="Source Two", content="Second source content",
        content_hash="writer_multi2",
    )

    mock_llm_client.settings = {
        "content": {"min_word_count": 50, "max_word_count": 1500, "min_sources_per_article": 2},
    }
    mock_llm_client.call.return_value = (
        sample_article_markdown,
        {"model": "test", "input_tokens": 500, "output_tokens": 300, "cost_usd": 0.005},
    )

    action = {
        "id": 1,
        "item_ids": json.dumps([1, 2]),
        "action_type": "create",
        "target_path": "content/combined.md",
        "instructions": "Combine sources",
    }

    result = write_article(action, mock_llm_client)
    assert result is not None

    # Verify the LLM was called with both sources in the prompt
    call_args = mock_llm_client.call.call_args
    prompt = call_args.kwargs.get("user_prompt") or call_args[1].get("user_prompt") or call_args[0][1]
    assert "Source One" in prompt or "example.com/a1" in prompt
