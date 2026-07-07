"""Tests for Unsplash photo retrieval and the illustrate step."""

import httpx
import respx

from src.media.unsplash import search_photo
from src.media.illustrate import add_article_image

SEARCH = "https://api.unsplash.com/search/photos"
DOWNLOAD = "https://api.unsplash.com/photos/xyz/download"

RESULT = {
    "results": [
        {
            "urls": {"raw": "https://images.unsplash.com/photo-123?ixid=abc&ixlib=rb-4.0"},
            "alt_description": "a family cooking together",
            "user": {"name": "Jane Doe", "links": {"html": "https://unsplash.com/@jane"}},
            "links": {
                "html": "https://unsplash.com/photos/xyz",
                "download_location": DOWNLOAD + "?ixid=abc",
            },
        }
    ]
}


def test_search_photo_no_key_returns_none(monkeypatch):
    monkeypatch.delenv("UNSPLASH_ACCESS_KEY", raising=False)
    assert search_photo("family cooking") is None


@respx.mock
def test_search_photo_parses_result_and_triggers_download(monkeypatch):
    monkeypatch.setenv("UNSPLASH_ACCESS_KEY", "testkey")
    respx.get(SEARCH).mock(return_value=httpx.Response(200, json=RESULT))
    dl = respx.get(DOWNLOAD).mock(return_value=httpx.Response(200, json={"url": "x"}))

    photo = search_photo("family cooking", app_name="yourkids")
    assert photo is not None
    # Hotlinked CDN URL with ixid preserved and sizing params appended
    assert photo.image_url.startswith("https://images.unsplash.com/photo-123?ixid=abc")
    assert "w=1200" in photo.image_url and "fm=jpg" in photo.image_url
    assert photo.credit_name == "Jane Doe"
    assert photo.credit_url == "https://unsplash.com/@jane?utm_source=yourkids&utm_medium=referral"
    assert photo.source_url == "https://unsplash.com/photos/xyz?utm_source=yourkids&utm_medium=referral"
    # The download endpoint MUST be pinged (Unsplash guideline)
    assert dl.called


@respx.mock
def test_search_photo_no_results(monkeypatch):
    monkeypatch.setenv("UNSPLASH_ACCESS_KEY", "testkey")
    respx.get(SEARCH).mock(return_value=httpx.Response(200, json={"results": []}))
    assert search_photo("nothing here") is None


@respx.mock
def test_search_photo_api_error_is_graceful(monkeypatch):
    monkeypatch.setenv("UNSPLASH_ACCESS_KEY", "testkey")
    respx.get(SEARCH).mock(return_value=httpx.Response(503))
    assert search_photo("family cooking") is None


# ── illustrate step ──

ARTICLE = """---
title: "Cooking with kids"
summary: "A summary"
type: evergreen
section: parenting
tags:
  - family-life
first_published: 2026-07-06
image_search: "family cooking kitchen"
---

Body text here.
"""

ENABLED = {"media": {"enabled": True, "app_name": "yourkids", "skip_tags": ["bereavement"]}}


def _fake_photo():
    from src.media.unsplash import Photo

    return Photo(
        image_url="https://images.unsplash.com/photo-1?ixid=a&w=1200&q=80&fm=jpg&fit=crop",
        alt="a warm kitchen",
        credit_name="Jane Doe",
        credit_url="https://unsplash.com/@jane?utm_source=yourkids&utm_medium=referral",
        source_url="https://unsplash.com/photos/xyz?utm_source=yourkids&utm_medium=referral",
    )


def test_illustrate_resolves_image(monkeypatch):
    monkeypatch.setattr("src.media.illustrate.search_photo", lambda *a, **k: _fake_photo())
    out = add_article_image(ARTICLE, ["family-life"], ENABLED)
    assert "image_search:" not in out
    assert 'image: "https://images.unsplash.com/photo-1' in out
    assert 'image_alt: "a warm kitchen"' in out
    assert 'image_credit_name: "Jane Doe"' in out
    assert "utm_source=yourkids" in out
    # body untouched
    assert "Body text here." in out


def test_illustrate_disabled_strips_hint(monkeypatch):
    called = []
    monkeypatch.setattr("src.media.illustrate.search_photo", lambda *a, **k: called.append(1))
    out = add_article_image(ARTICLE, ["family-life"], {"media": {"enabled": False}})
    assert "image_search:" not in out
    assert "image:" not in out
    assert not called  # never hit the API when disabled


def test_illustrate_none_hint_strips(monkeypatch):
    called = []
    monkeypatch.setattr("src.media.illustrate.search_photo", lambda *a, **k: called.append(1))
    article = ARTICLE.replace('"family cooking kitchen"', "none")
    out = add_article_image(article, ["family-life"], ENABLED)
    assert "image_search:" not in out
    assert "image:" not in out
    assert not called


def test_illustrate_skips_sensitive_tags(monkeypatch):
    called = []
    monkeypatch.setattr("src.media.illustrate.search_photo", lambda *a, **k: called.append(1))
    out = add_article_image(ARTICLE, ["bereavement"], ENABLED)
    assert "image_search:" not in out
    assert "image:" not in out
    assert not called  # sensitive → no photo, no API call


def test_illustrate_no_hint_returns_unchanged():
    article = ARTICLE.replace('image_search: "family cooking kitchen"\n', "")
    assert add_article_image(article, ["family-life"], ENABLED) == article


def test_illustrate_no_result_strips(monkeypatch):
    monkeypatch.setattr("src.media.illustrate.search_photo", lambda *a, **k: None)
    out = add_article_image(ARTICLE, ["family-life"], ENABLED)
    assert "image_search:" not in out
    assert "image:" not in out
