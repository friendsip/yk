"""Tests for the scanner module."""

from unittest.mock import patch, MagicMock

from src.utils.hashing import content_hash


def test_content_hash_consistent():
    """Same content produces same hash."""
    h1 = content_hash("Hello World")
    h2 = content_hash("Hello World")
    assert h1 == h2
    assert len(h1) == 64


def test_content_hash_normalises():
    """Hash normalises whitespace and case."""
    h1 = content_hash("Hello World")
    h2 = content_hash("  hello world  ")
    assert h1 == h2


def test_content_hash_different_for_different_content():
    h1 = content_hash("Hello World")
    h2 = content_hash("Goodbye World")
    assert h1 != h2


def test_insert_discovered_item(test_db):
    """Can insert and retrieve a discovered item."""
    # Seed a source first
    source_id = test_db.upsert_source(
        name="Test Source", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )

    item_id = test_db.insert_discovered_item(
        source_id=source_id,
        url="https://example.com/article",
        title="Test Article",
        content="Some content here",
        content_hash=content_hash("https://example.com/articleSome content here"),
    )
    assert item_id is not None

    items = test_db.get_unprocessed_items()
    assert len(items) == 1
    assert items[0]["title"] == "Test Article"


def test_deduplication(test_db):
    """Inserting the same hash twice returns None (duplicate)."""
    source_id = test_db.upsert_source(
        name="Test Source", url="https://example.com/feed",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )

    h = content_hash("duplicate content")
    id1 = test_db.insert_discovered_item(source_id, "https://a.com", "A", "text", h)
    id2 = test_db.insert_discovered_item(source_id, "https://b.com", "B", "text", h)

    assert id1 is not None
    assert id2 is None  # Duplicate


def test_scan_rss_with_mock(test_db, sample_rss_xml):
    """Scanner processes RSS entries correctly."""
    import feedparser

    # Seed a source in the DB
    source_id = test_db.upsert_source(
        name="Test Feed", url="https://example.com/feed.xml",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )

    # Parse the sample RSS
    feed = feedparser.parse(sample_rss_xml)
    assert len(feed.entries) == 2
    assert feed.entries[0]["title"] == "New Research on Child Sleep Patterns"


def test_scan_skips_known_urls_before_fetching(test_db, sample_rss_xml, monkeypatch):
    """A second scan neither re-fetches nor re-inserts already-known URLs."""
    import feedparser

    from src.scanner import rss

    source_id = test_db.upsert_source(
        name="Test Feed", url="https://example.com/feed.xml",
        source_type="rss", category="parenting",
        reliability_score=0.8, check_interval=60,
    )
    source = {"id": source_id, "name": "Test Feed", "url": "https://example.com/feed.xml", "notes": None}

    monkeypatch.setattr(rss, "_fetch_feed", lambda url: feedparser.parse(sample_rss_xml))

    fetches = []

    def fake_extract(url):
        fetches.append(url)
        return f"Extracted content from {url}"

    monkeypatch.setattr(rss, "extract_article", fake_extract)

    first = rss._scan_single_feed(test_db, source)
    assert first == 2
    assert len(fetches) == 2

    second = rss._scan_single_feed(test_db, source)
    assert second == 0
    assert len(fetches) == 2  # no re-fetch of known URLs
