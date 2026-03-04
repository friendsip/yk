"""LLM-based content triage and scoring."""

import json
import logging

from src.db import get_db
from src.llm.client import LLMClient

logger = logging.getLogger(__name__)

TRIAGE_INSTRUCTIONS = """You are the triage editor for yourkids.com. Your role is to evaluate incoming content
against our editorial criteria (see the Site Bible, Section 7) and content guardrails
(Section 3).

FIRST: Check each item against the content guardrails in Section 3. If an item
violates ANY guardrail (racist, political campaigning, sexually explicit, AI slop,
anti-vaccination misinformation, etc.), immediately score it 0 on all dimensions
and set suggested_action to "reject_guardrail" with a brief note on which guardrail
it violates. Do not evaluate it further.

For items that pass the guardrails, evaluate and provide:

1. relevance_score (0-10): How relevant is this to our current active sections?
2. novelty_score (0-10): Is this new information we're not already covering?
3. importance_score (0-10): How much does this matter for parents to know?
4. reliability_score (0-10): How trustworthy is this source?
5. suggested_action: One of "new_article", "update_existing", "curated_link", "ignore", "reject_guardrail"
6. suggested_section: Which site section this belongs in (currently: "parenting" only)
7. topic_tags: 1-3 normalised topic tags for trend tracking (e.g. "therapeutic-parenting", "fostering", "sleep")
8. opposing_view_flag: true/false — does this contradict something we've published or another item?
9. brief_reasoning: 1-2 sentences explaining your assessment

Respond ONLY with a JSON array of objects. Each object must include "item_id" matching the input.

<items>
{items_json}
</items>

<existing_content_inventory>
{inventory}
</existing_content_inventory>"""


def run_triage(llm_client: LLMClient = None, batch_size: int = 15):
    """Triage unprocessed items in batches."""
    db = get_db()
    if llm_client is None:
        llm_client = LLMClient()

    items = db.get_unprocessed_items(limit=batch_size)
    if not items:
        logger.info("No unprocessed items to triage")
        return 0

    # Get current content inventory for context
    inventory = db.get_content_inventory()
    inventory_text = "\n".join(
        f"- {c['title']} ({c['section']}, updated {c['last_updated_at']})"
        for c in inventory
    ) or "No content published yet."

    # Format items for the prompt
    items_for_prompt = [
        {
            "item_id": item["id"],
            "title": item["title"],
            "source_url": item["external_url"],
            "content_preview": (item["raw_content"] or "")[:2000],
        }
        for item in items
    ]

    prompt = TRIAGE_INSTRUCTIONS.format(
        items_json=json.dumps(items_for_prompt, indent=2),
        inventory=inventory_text,
    )

    response_text, meta = llm_client.call(
        stage="triage",
        user_prompt=prompt,
        max_tokens=4000,
        temperature=0.2,
    )

    results = _parse_triage_response(response_text)

    # Get thresholds from settings
    settings = llm_client.settings or {}
    triage_settings = settings.get("triage", {})
    min_overall = triage_settings.get("min_overall_score", 5.5)

    triaged_count = 0
    for result in results:
        item_id = result.get("item_id")
        if item_id is None:
            continue

        # Calculate weighted overall score
        overall = (
            result.get("relevance_score", 0) * 0.3
            + result.get("novelty_score", 0) * 0.2
            + result.get("importance_score", 0) * 0.3
            + result.get("reliability_score", 0) * 0.2
        )

        db.insert_triage_result(
            item_id=item_id,
            scores={
                "relevance_score": result.get("relevance_score", 0),
                "novelty_score": result.get("novelty_score", 0),
                "importance_score": result.get("importance_score", 0),
                "overall_score": overall,
                "suggested_action": result.get("suggested_action", "ignore"),
                "suggested_section": result.get("suggested_section", "parenting"),
                "related_existing_content": result.get("related_existing_content"),
                "triage_reasoning": result.get("brief_reasoning", ""),
                "model_used": meta["model"],
            },
        )

        # Update item status based on score and action
        action = result.get("suggested_action", "ignore")
        if action in ("ignore", "reject_guardrail") or overall < min_overall:
            db.update_item_status(item_id, "discarded")
        else:
            db.update_item_status(item_id, "triaged")
            triaged_count += 1

        # Store trend signals from topic tags
        for tag in result.get("topic_tags", []):
            signal_type = (
                "counter_view" if result.get("opposing_view_flag") else "new_research"
            )
            db.insert_trend_signal(
                topic=tag,
                item_id=item_id,
                signal_type=signal_type,
                weight=overall / 10.0,
            )

    logger.info(f"Triaged {len(results)} items, {triaged_count} passed threshold")
    return triaged_count


def _parse_triage_response(text: str) -> list[dict]:
    """Parse JSON from LLM response, handling markdown code fences."""
    text = text.strip()

    # Strip markdown code fences if present
    if text.startswith("```"):
        lines = text.split("\n")
        # Remove first and last lines (```json and ```)
        text = "\n".join(lines[1:])
        if text.rstrip().endswith("```"):
            text = text.rstrip()[:-3]

    # Try to find JSON array in the text
    text = text.strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        # Try to find array within the text
        start = text.find("[")
        end = text.rfind("]")
        if start != -1 and end != -1:
            try:
                return json.loads(text[start : end + 1])
            except json.JSONDecodeError:
                pass

    logger.error(f"Failed to parse triage response: {text[:200]}")
    return []
