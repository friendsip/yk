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

    staged_file = staging / "content" / "test-article.md"
    assert staged_file.exists()
    assert staged_file.read_text() == markdown

    # Check metadata sidecar
    meta_file = staging / "content" / "test-article.md.meta.json"
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
