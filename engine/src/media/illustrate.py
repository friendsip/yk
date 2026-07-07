"""Resolve an article's image from the writer's `image_search` hint.

The writer LLM emits an `image_search` frontmatter field: two-to-four words for
a warm, non-identifying photo, or the literal `none` when a photo would be
inappropriate (sensitive topics — bereavement, safeguarding, medical distress).
This step turns that hint into a real, attributed Unsplash image, or removes it
so the article falls back to its topic illustration.

It is deliberately fail-safe: any problem (feature off, no key, sensitive tag,
no result, API error) yields an article with no photo, never a broken one.
"""

import logging
import re

from src.media.unsplash import Photo, search_photo

logger = logging.getLogger(__name__)

_SEARCH_RE = re.compile(r"^image_search:[ \t]*(.*)$", re.MULTILINE)
_STRIP_RE = re.compile(r"^image_search:.*\n?", re.MULTILINE)


def _yaml_quote(value: str) -> str:
    """Double-quote a scalar for YAML frontmatter, escaping as needed."""
    return '"' + (value or "").replace("\\", "\\\\").replace('"', '\\"') + '"'


def _split_frontmatter(markdown: str) -> tuple[str, str, str] | None:
    """Return (before, frontmatter, after) or None if there's no frontmatter."""
    if not markdown.startswith("---"):
        return None
    parts = markdown.split("---", 2)
    if len(parts) < 3:
        return None
    return parts[0], parts[1], parts[2]


def _hint(frontmatter: str) -> str | None:
    m = _SEARCH_RE.search(frontmatter)
    if not m:
        return None
    return m.group(1).strip().strip("\"'").strip()


def add_article_image(markdown: str, tags: list[str], settings: dict) -> str:
    """Resolve/remove the `image_search` hint. Returns the updated markdown."""
    media = (settings or {}).get("media", {}) or {}
    split = _split_frontmatter(markdown)
    if not split:
        return markdown
    before, frontmatter, after = split

    hint = _hint(frontmatter)
    if hint is None:
        return markdown  # writer didn't ask for an image

    # Any of these means "no photo" — just strip the hint line.
    def _no_image() -> str:
        return before + "---" + _STRIP_RE.sub("", frontmatter) + "---" + after

    if not media.get("enabled", False):
        return _no_image()
    if hint.lower() in ("none", "no", "n/a", ""):
        return _no_image()

    skip_tags = {t.lower() for t in media.get("skip_tags", [])}
    if skip_tags and any((t or "").lower() in skip_tags for t in tags):
        logger.info(f"Skipping image for sensitive tags {tags}")
        return _no_image()

    photo: Photo | None = search_photo(
        hint,
        app_name=media.get("app_name", "yourkids"),
        orientation=media.get("orientation", "landscape"),
        content_filter=media.get("content_filter", "high"),
        timeout=media.get("timeout_seconds", 15.0),
    )
    if not photo:
        return _no_image()

    fields = "\n".join(
        [
            f"image: {_yaml_quote(photo.image_url)}",
            f"image_alt: {_yaml_quote(photo.alt)}",
            f"image_credit_name: {_yaml_quote(photo.credit_name)}",
            f"image_credit_url: {_yaml_quote(photo.credit_url)}",
            f"image_source_url: {_yaml_quote(photo.source_url)}",
        ]
    )

    # Remove the hint line, then append the resolved fields at the end of the
    # frontmatter block (keeping the trailing newline before the closing ---).
    fm = _STRIP_RE.sub("", frontmatter).rstrip("\n")
    new_frontmatter = f"{fm}\n{fields}\n"
    logger.info(f"Added Unsplash image for query {hint!r} by {photo.credit_name}")
    return before + "---" + new_frontmatter + "---" + after
