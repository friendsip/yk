"""Daily editorial planner — decides what content actions to take."""

import json
import logging
from collections import Counter
from datetime import datetime

from src.db import get_db
from src.llm.client import LLMClient

logger = logging.getLogger(__name__)

PLANNER_INSTRUCTIONS = """You are the editorial planner for yourkids.com. It is {today_date} and you need to
decide what content actions to take today based on what has been triaged.

<triaged_items_awaiting_action>
{triaged_items_json}
</triaged_items_awaiting_action>

<current_published_content>
{content_inventory}
</current_published_content>

<trend_data>
{trend_data}
</trend_data>

<recent_publish_history>
{recent_publishes}
</recent_publish_history>

Produce an editorial plan for today. Consider:
- What is most important for our readers right now?
- Are there items that form natural clusters or tell a bigger story together?
- Are there opposing viewpoints that warrant an editorial synthesis piece?
- Is any existing content now outdated given what we've triaged?
- What are the trending topics — should we prioritise content in growing areas?
- We publish a maximum of {max_daily} items per day — choose wisely
- Quality over quantity: it's fine to propose fewer items if the material is thin

Output ONLY a JSON object with this structure:
{{
  "summary": "Brief description of today's editorial focus",
  "actions": [
    {{
      "action_type": "create|update|curated_link",
      "item_ids": [list of discovered_item IDs to use as source material],
      "target_section": "parenting",
      "target_path": "content/suggested-slug.md",
      "topic_tags": ["health", "education"],
      "priority": 1-10,
      "instructions": "Specific editorial instructions for the writer"
    }}
  ],
  "deferred": "Brief note on items held for later and why",
  "bible_observations": null
}}

For topic_tags, choose from: health, education, fun-toys, cool-science, fun-things-to-do, safety, family-life, special-needs. You may create new tags if no existing tag fits, using kebab-case."""


def run_planner(llm_client: LLMClient = None, max_daily: int = 5) -> int | None:
    """Run the daily editorial planner. Returns plan_id or None."""
    db = get_db()
    if llm_client is None:
        llm_client = LLMClient()

    # Get triaged items not yet planned
    triaged = db.get_triaged_items_for_planning(min_score=5.5)
    if not triaged:
        logger.info("No triaged items awaiting planning")
        return None

    # Get current inventory
    inventory = db.get_content_inventory()
    inventory_text = (
        "\n".join(
            f"- {c['file_path']}: {c['title']} (updated {c['last_updated_at']})"
            for c in inventory
        )
        or "No content published yet."
    )

    # Get trend data
    trends = db.get_recent_trend_signals(days=30)
    trend_text = _format_trends(trends) if trends else "No trend data yet."

    # Get recent publishes
    recent = db.get_recent_publishes(days=7)
    recent_text = (
        "\n".join(f"- {p['title']} ({p['first_published_at']})" for p in recent)
        or "No recent publishes."
    )

    # Build items JSON
    items_json = json.dumps(
        [
            {
                "item_id": t["id"],
                "title": t["title"],
                "source_url": t["external_url"],
                "overall_score": t["overall_score"],
                "suggested_action": t["suggested_action"],
                "triage_reasoning": t["triage_reasoning"],
                "content_preview": (t.get("raw_content") or "")[:500],
            }
            for t in triaged
        ],
        indent=2,
    )

    prompt = PLANNER_INSTRUCTIONS.format(
        today_date=datetime.now().strftime("%Y-%m-%d"),
        triaged_items_json=items_json,
        content_inventory=inventory_text,
        trend_data=trend_text,
        recent_publishes=recent_text,
        max_daily=max_daily,
    )

    response_text, meta = llm_client.call(
        stage="planner",
        user_prompt=prompt,
        max_tokens=3000,
    )

    plan = _parse_plan_response(response_text)
    if not plan:
        return None

    # Store the plan
    plan_id = db.insert_editorial_plan(plan.get("summary", ""))

    for action in plan.get("actions", []):
        item_ids = action.get("item_ids", [])
        db.insert_plan_action(
            plan_id=plan_id,
            item_ids=item_ids,
            action_type=action["action_type"],
            target_path=action.get("target_path"),
            instructions=action.get("instructions", ""),
            priority=action.get("priority", 5),
            topic_tags=action.get("topic_tags"),
        )
        for item_id in item_ids:
            db.update_item_status(item_id, "planned")

    # Handle bible observations
    obs = plan.get("bible_observations")
    if obs:
        from src.bible.manager import BibleManager

        bm = BibleManager()
        bm.propose_amendment(
            db, section="lessons_learned", change=obs, reasoning="Planner observation"
        )

    logger.info(f"Created plan {plan_id}: {plan.get('summary', '')} ({len(plan.get('actions', []))} actions)")
    return plan_id


def _format_trends(signals: list[dict]) -> str:
    topic_counts = Counter(s["topic"] for s in signals)
    return "\n".join(
        f"- {topic}: {count} signals"
        for topic, count in topic_counts.most_common(10)
    )


def _parse_plan_response(text: str) -> dict | None:
    text = text.strip()
    if text.startswith("```"):
        lines = text.split("\n")
        text = "\n".join(lines[1:])
        if text.rstrip().endswith("```"):
            text = text.rstrip()[:-3]

    text = text.strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        # Try to find JSON object
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1:
            try:
                return json.loads(text[start : end + 1])
            except json.JSONDecodeError:
                pass

    logger.error(f"Failed to parse plan response: {text[:200]}")
    return None
