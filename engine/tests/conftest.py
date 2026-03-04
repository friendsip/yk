"""Shared test fixtures."""

import json
import pytest
from unittest.mock import MagicMock

from src.db.models import Database
from src.db.migrations import migrate
from src.llm.client import LLMClient


@pytest.fixture
def test_db(tmp_path):
    """Provide a fresh test database with all tables."""
    db_path = str(tmp_path / "test.db")
    migrate(db_path)
    return Database(db_path)


@pytest.fixture
def mock_llm_client():
    """Provide a mock LLM client."""
    client = MagicMock(spec=LLMClient)
    client.settings = {
        "triage": {"min_overall_score": 5.5},
        "content": {"min_word_count": 300, "max_word_count": 1500, "min_sources_per_article": 2},
    }
    client.call.return_value = (
        "[]",
        {"model": "test-model", "input_tokens": 100, "output_tokens": 50, "cost_usd": 0.001},
    )
    return client


@pytest.fixture
def sample_rss_xml():
    """Sample RSS feed XML."""
    return """<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Test Feed</title>
        <item>
          <title>New Research on Child Sleep Patterns</title>
          <link>https://example.com/sleep-patterns</link>
          <description>A study found that consistent bedtime routines improve outcomes.</description>
        </item>
        <item>
          <title>Updated Guidance on Screen Time</title>
          <link>https://example.com/screen-time</link>
          <description>The AAP has updated its screen time recommendations.</description>
        </item>
      </channel>
    </rss>"""


@pytest.fixture
def sample_triage_response():
    """Sample triage LLM response as JSON string."""
    return json.dumps([
        {
            "item_id": 1,
            "relevance_score": 8,
            "novelty_score": 7,
            "importance_score": 8,
            "reliability_score": 9,
            "suggested_action": "new_article",
            "suggested_section": "parenting",
            "topic_tags": ["sleep", "child-development"],
            "opposing_view_flag": False,
            "brief_reasoning": "High-quality research on child sleep from a reliable source.",
        }
    ])


@pytest.fixture
def sample_plan_response():
    """Sample planner LLM response as JSON string."""
    return json.dumps({
        "summary": "Focus on child sleep research today",
        "actions": [
            {
                "action_type": "create",
                "item_ids": [1],
                "target_section": "parenting",
                "target_path": "articles/child-sleep-patterns.md",
                "priority": 8,
                "instructions": "Write an article summarising the new sleep research.",
            }
        ],
        "deferred": "No items deferred.",
        "bible_observations": None,
    })


@pytest.fixture
def sample_article_markdown():
    """Sample article markdown output."""
    return """---
title: "Understanding Child Sleep Patterns"
summary: "New research highlights the importance of consistent bedtime routines."
publishedDate: 2026-03-04
sources:
  - https://example.com/sleep-patterns
  - https://example.com/sleep-study
---

## Why Sleep Matters

Sleep is crucial for child development. Recent research from the AAP has shown
that consistent bedtime routines significantly improve sleep quality and duration
in children aged 2-10.

## What the Research Says

The study, published in Pediatrics, followed 500 families over two years and found
that children with regular bedtime routines fell asleep 20 minutes faster on average
and experienced fewer night wakings.

## Practical Takeaways

For parents looking to establish better sleep routines, the researchers recommend:

- Setting a consistent bedtime within a 30-minute window
- Creating a calming pre-bed routine (bath, story, quiet time)
- Limiting screen exposure in the hour before bed
- Keeping the bedroom cool and dark

These findings align with existing NHS guidance on [children's sleep](https://example.com/sleep-patterns).
"""
