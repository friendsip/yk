"""Content writer — generates markdown articles from source material."""

import json
import logging
from datetime import datetime
from pathlib import Path

from src.db import get_db
from src.llm.client import LLMClient

logger = logging.getLogger(__name__)

SITE_CONTENT_DIR = (
    Path(__file__).parent.parent.parent.parent / "site" / "src" / "content" / "content"
)

WRITER_INSTRUCTIONS = """You are a content writer for yourkids.com. Write a new article based on the
source material provided. Follow the voice and rules in the Site Bible precisely.

<editorial_instructions>
{instructions}
</editorial_instructions>

<source_material>
{source_texts}
</source_material>

<style_examples>
{style_examples}
</style_examples>

Requirements:
- Write in the voice described in the Site Bible (Section 2)
- Cite every factual claim with a link to its source
- Include YAML frontmatter in this EXACT format:
  ---
  title: "Article Title"
  summary: "One or two sentence summary for cards and meta descriptions"
  type: {content_type}
  section: parenting
  tags:
{tags_yaml}
  sources:
    - https://source-url-1.com/article
    - https://source-url-2.com/article
  first_published: {today_date}
  featured: true
  ---
  For curated links, also include: external_url: "https://primary-source-url.com/article"
- For full articles (type: evergreen), include a "## Key takeaways" section
  immediately after the opening paragraph: 3-5 short bullet points summarising
  the practical advice. The site renders this section as a highlighted box.
  Skip it for curated links.
- Keep between {min_words} and {max_words} words
- Use at least {min_sources} independent sources
- End with inline links to sources throughout the text
- Do NOT invent facts or statistics — only use what's in the source material
- If the source material is insufficient for a good article, say so rather than padding

Output the complete markdown file including frontmatter."""


def write_article(plan_action: dict, llm_client: LLMClient = None) -> str | None:
    """Write a new article and return the markdown content."""
    db = get_db()
    if llm_client is None:
        llm_client = LLMClient()

    # Get source material — supports both item_ids (JSON array) and legacy item_id
    item_ids_raw = plan_action.get("item_ids")
    if item_ids_raw:
        if isinstance(item_ids_raw, str):
            item_ids = json.loads(item_ids_raw)
        else:
            item_ids = item_ids_raw
    elif plan_action.get("item_id"):
        item_ids = [plan_action["item_id"]]
    else:
        logger.error(f"No item_ids for action {plan_action.get('id')}")
        return None

    items = db.get_items_by_ids(item_ids)
    if not items:
        logger.error(f"No items found for IDs {item_ids}")
        return None

    # Build combined source text from all items
    source_parts = []
    for item in items:
        source_parts.append(
            f"Source URL: {item['external_url']}\n"
            f"Title: {item['title']}\n\n"
            f"{item['raw_content'] or '(No content extracted)'}"
        )
    source_text = "\n\n---\n\n".join(source_parts)

    # Load style examples
    style_examples = _load_style_examples()

    settings = llm_client.settings or {}
    content_settings = settings.get("content", {})

    # Map action_type to frontmatter type
    action_type = plan_action.get("action_type", "create")
    type_map = {"create": "evergreen", "curated_link": "curated", "editorial": "editorial"}
    content_type = type_map.get(action_type, "evergreen")

    # Build topic_tags YAML
    topic_tags_raw = plan_action.get("topic_tags")
    if topic_tags_raw:
        if isinstance(topic_tags_raw, str):
            topic_tags = json.loads(topic_tags_raw)
        else:
            topic_tags = topic_tags_raw
    else:
        topic_tags = []
    tags_yaml = "\n".join(f"    - {tag}" for tag in topic_tags) if topic_tags else "    - parenting"

    prompt = WRITER_INSTRUCTIONS.format(
        instructions=plan_action.get(
            "instructions", "Write a comprehensive, well-sourced article."
        ),
        source_texts=source_text,
        style_examples=style_examples,
        today_date=datetime.now().strftime("%Y-%m-%d"),
        content_type=content_type,
        tags_yaml=tags_yaml,
        min_words=content_settings.get("min_word_count", 300),
        max_words=content_settings.get("max_word_count", 1500),
        min_sources=content_settings.get("min_sources_per_article", 2),
    )

    response_text, meta = llm_client.call(
        stage="writer",
        user_prompt=prompt,
        max_tokens=4096,
        temperature=0.4,
    )

    # Extract markdown from LLM response (strip preamble/code fences)
    markdown = _extract_markdown(response_text)

    if not _validate_article(markdown, content_settings):
        logger.warning(f"Article validation failed for action {plan_action.get('id')}")
        return None

    return markdown


def _extract_markdown(text: str) -> str:
    """Extract markdown content from LLM response.

    Handles: code fences (```markdown ... ```), preamble text before ---,
    and clean responses that start with ---.
    """
    text = text.strip()

    # Strip code fences if the response is wrapped in them
    if text.startswith("```"):
        lines = text.split("\n", 1)
        text = lines[1] if len(lines) > 1 else text
        if text.rstrip().endswith("```"):
            text = text.rstrip()[:-3].rstrip()

    # Find the first --- which starts the frontmatter
    idx = text.find("---")
    if idx > 0:
        # There's preamble text before the frontmatter — strip it
        text = text[idx:]

    return text.strip()


def _load_style_examples(max_examples: int = 2) -> str:
    """Load existing articles as style references."""
    examples = []
    if SITE_CONTENT_DIR.exists():
        for md_file in sorted(SITE_CONTENT_DIR.glob("*.md"))[:max_examples]:
            examples.append(md_file.read_text())
    return "\n---\n".join(examples) if examples else "No style examples available."


def _validate_article(markdown: str, settings: dict) -> bool:
    """Validate article has proper frontmatter and meets basic requirements."""
    if not markdown.strip().startswith("---"):
        logger.error("Article missing frontmatter")
        return False

    parts = markdown.split("---", 2)
    if len(parts) < 3:
        logger.error("Invalid frontmatter structure")
        return False

    frontmatter = parts[1]
    required_fields = ["title:", "summary:", "first_published:", "type:"]
    for field in required_fields:
        if field not in frontmatter:
            logger.error(f"Missing frontmatter field: {field}")
            return False

    # Check word count (with tolerance)
    body = parts[2]
    word_count = len(body.split())
    min_words = settings.get("min_word_count", 300)

    if word_count < min_words * 0.5:
        logger.warning(f"Article too short: {word_count} words (min {min_words})")
        return False

    # Check source URLs in frontmatter
    if "sources:" not in frontmatter:
        logger.warning("No sources section in frontmatter")
        # Allow it — some content types may have fewer sources

    return True
