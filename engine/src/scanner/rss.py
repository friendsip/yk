"""RSS feed scanner — discovers new content from configured sources."""

import json
import logging

import feedparser

from src.db import get_db
from src.scanner.extractor import extract_article
from src.utils.config import load_sources
from src.utils.hashing import content_hash

logger = logging.getLogger(__name__)


def scan_rss_sources():
    """Scan all active RSS sources and store new items."""
    db = get_db()
    sources = db.get_active_sources()

    if not sources:
        logger.warning("No active sources in database. Run --init to seed sources.")
        return

    total_new = 0
    for source in sources:
        if source["source_type"] != "rss":
            continue
        try:
            new = _scan_single_feed(db, source)
            total_new += new
            db.reset_source_failures(source["id"])
        except Exception as e:
            logger.error(f"Error scanning {source['name']}: {e}")
            db.increment_source_failures(source["id"])
            failures = source.get("consecutive_failures", 0) + 1
            if failures >= 3:
                logger.warning(
                    f"Source '{source['name']}' has failed {failures} consecutive times"
                )

    logger.info(f"Scanner complete: {total_new} new items from {len(sources)} sources")


def _scan_single_feed(db, source: dict) -> int:
    """Scan a single RSS feed and return count of new items."""
    feed = feedparser.parse(source["url"])

    if feed.bozo and not feed.entries:
        logger.warning(f"Feed error for {source['name']}: {getattr(feed, 'bozo_exception', 'unknown')}")
        db.increment_source_failures(source["id"])
        return 0

    # Parse filter keywords from notes if present
    filter_keywords = _get_filter_keywords(source)

    new_count = 0
    for entry in feed.entries:
        url = entry.get("link", "")
        title = entry.get("title", "")

        if not url:
            continue

        # Apply keyword filter if configured
        if filter_keywords and not _matches_keywords(title, entry.get("summary", ""), filter_keywords):
            continue

        # Try to extract full article text
        raw_content = extract_article(url)
        if not raw_content:
            # Fall back to RSS summary
            raw_content = entry.get("summary", "")

        hash_val = content_hash(f"{url}{raw_content}")

        result = db.insert_discovered_item(
            source_id=source["id"],
            url=url,
            title=title,
            content=raw_content,
            content_hash=hash_val,
        )
        if result is not None:
            new_count += 1

    db.update_source_last_checked(source["id"])
    logger.info(f"Scanned {source['name']}: {new_count} new items from {len(feed.entries)} entries")
    return new_count


def _get_filter_keywords(source: dict) -> list[str] | None:
    """Extract filter keywords from source notes (stored as JSON)."""
    notes = source.get("notes")
    if not notes:
        return None
    try:
        data = json.loads(notes)
        return data.get("filter_keywords")
    except (json.JSONDecodeError, TypeError):
        return None


def _matches_keywords(title: str, summary: str, keywords: list[str]) -> bool:
    """Check if title or summary contains any of the filter keywords."""
    combined = f"{title} {summary}".lower()
    return any(kw.lower() in combined for kw in keywords)


def seed_sources_from_config():
    """Load sources.yaml into the sources table."""
    db = get_db()
    sources_config = load_sources()
    tier_scores = {"1": 0.95, "2": 0.80, "3": 0.65}

    seeded = 0
    for s in sources_config:
        if not s.get("active", True):
            continue

        # Store filter_keywords in notes as JSON if present
        notes = None
        if "filter_keywords" in s:
            notes = json.dumps({"filter_keywords": s["filter_keywords"]})

        source_id = db.upsert_source(
            name=s["name"],
            url=s["url"],
            source_type=s.get("type", "rss"),
            category=s.get("category"),
            reliability_score=tier_scores.get(str(s.get("tier", 3)), 0.70),
            check_interval=s.get("check_interval", 60),
        )

        # Update notes if we have filter keywords
        if notes and source_id:
            db._execute(
                "UPDATE sources SET notes = ? WHERE id = ?", (notes, source_id)
            )

        seeded += 1

    logger.info(f"Seeded {seeded} sources from config")
