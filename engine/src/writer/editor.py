"""Content editor — updates existing articles with new source material."""

import json
import logging
from datetime import datetime
from pathlib import Path

from src.db import get_db
from src.llm.client import LLMClient

logger = logging.getLogger(__name__)

SITE_CONTENT_DIR = (
    Path(__file__).parent.parent.parent.parent / "site" / "src" / "content"
)

EDITOR_INSTRUCTIONS = """You are an editor for yourkids.com. Update the existing article below
based on new source material. Make minimal, targeted edits to:
- Add new information from the source material
- Update any outdated information
- Preserve the existing voice, structure, and tone
- Add new sources to the frontmatter sources list
- Update the publishedDate to {today_date}

<existing_article>
{existing_content}
</existing_article>

<new_source_material>
{new_source}
</new_source_material>

<editorial_instructions>
{instructions}
</editorial_instructions>

Output the complete updated markdown file including frontmatter."""


def edit_article(plan_action: dict, llm_client: LLMClient = None) -> str | None:
    """Edit an existing article with new source material."""
    db = get_db()
    if llm_client is None:
        llm_client = LLMClient()

    target_path = plan_action.get("target_path")
    if not target_path:
        logger.error("No target_path for update action")
        return None

    full_path = SITE_CONTENT_DIR / target_path
    if not full_path.exists():
        logger.error(f"Target file not found: {full_path}")
        return None

    existing_content = full_path.read_text()

    # Get new source material — supports item_ids (JSON array) and legacy item_id
    item_ids_raw = plan_action.get("item_ids")
    if item_ids_raw:
        if isinstance(item_ids_raw, str):
            item_ids = json.loads(item_ids_raw)
        else:
            item_ids = item_ids_raw
    elif plan_action.get("item_id"):
        item_ids = [plan_action["item_id"]]
    else:
        logger.error("No item_ids for update action")
        return None

    items = db.get_items_by_ids(item_ids)
    if not items:
        logger.error(f"No items found for IDs {item_ids}")
        return None

    source_parts = []
    for item in items:
        source_parts.append(
            f"Source URL: {item['external_url']}\n"
            f"Title: {item['title']}\n\n"
            f"{item['raw_content'] or '(No content extracted)'}"
        )
    new_source = "\n\n---\n\n".join(source_parts)

    prompt = EDITOR_INSTRUCTIONS.format(
        existing_content=existing_content,
        new_source=new_source,
        instructions=plan_action.get("instructions", ""),
        today_date=datetime.now().strftime("%Y-%m-%d"),
    )

    response_text, meta = llm_client.call(
        stage="writer",
        user_prompt=prompt,
        max_tokens=4096,
    )

    # Reuse the markdown extraction from writer module
    from src.writer.writer import _extract_markdown

    return _extract_markdown(response_text)
