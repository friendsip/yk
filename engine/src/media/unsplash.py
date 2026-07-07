"""Unsplash API client — search for a relevant, appropriately-licensed photo.

Compliance with the Unsplash API Guidelines is built in and non-optional:
  - We hotlink the CDN image URL (images.unsplash.com), which is what Unsplash
    requires so views are tracked and photographers get credit. We never
    download and re-host.
  - Every use triggers the photo's download endpoint (their analytics rule).
  - We return the attribution the site MUST render: photographer name + a link
    to their profile and to Unsplash, each carrying the required UTM params.
  - content_filter=high asks Unsplash to exclude potentially unsafe imagery —
    important for a parenting site.

The access key comes from the UNSPLASH_ACCESS_KEY environment variable; with no
key the client is simply inert (returns None), so the feature is off until Mark
registers an application and sets the key.
"""

import logging
import os
from dataclasses import dataclass

import httpx

logger = logging.getLogger(__name__)

API_BASE = "https://api.unsplash.com"
SEARCH_ENDPOINT = f"{API_BASE}/search/photos"
DEFAULT_TIMEOUT = 15.0

# Rendering size for the hotlinked hero image (Unsplash resizes on their CDN;
# image requests don't count against the API rate limit).
IMAGE_PARAMS = "&w=1200&q=80&fm=jpg&fit=crop"


@dataclass
class Photo:
    """A chosen photo plus the attribution the site is required to display."""

    image_url: str  # hotlinked, sized CDN URL (with ixid preserved)
    alt: str
    credit_name: str  # photographer's name
    credit_url: str  # photographer's profile (with UTM)
    source_url: str  # the photo's Unsplash page (with UTM)


def _utm(url: str, app_name: str) -> str:
    """Append the Unsplash-required referral UTM params to an attribution link."""
    sep = "&" if "?" in url else "?"
    return f"{url}{sep}utm_source={app_name}&utm_medium=referral"


def _access_key() -> str | None:
    return os.environ.get("UNSPLASH_ACCESS_KEY") or None


def search_photo(
    query: str,
    app_name: str = "yourkids",
    orientation: str = "landscape",
    content_filter: str = "high",
    timeout: float = DEFAULT_TIMEOUT,
    client: httpx.Client | None = None,
) -> Photo | None:
    """Return the most relevant photo for a query, or None.

    None means "no image" for any reason — no key, no results, or an API error
    — and callers fall back to the topic illustration.
    """
    key = _access_key()
    if not key:
        logger.debug("Unsplash: no UNSPLASH_ACCESS_KEY set — skipping image lookup")
        return None
    if not query or not query.strip():
        return None

    headers = {"Authorization": f"Client-ID {key}", "Accept-Version": "v1"}
    params = {
        "query": query.strip(),
        "per_page": 1,
        "orientation": orientation,
        "content_filter": content_filter,
        "order_by": "relevant",
    }

    owns_client = client is None
    client = client or httpx.Client(timeout=timeout)
    try:
        resp = client.get(SEARCH_ENDPOINT, headers=headers, params=params)
        resp.raise_for_status()
        results = resp.json().get("results") or []
        if not results:
            logger.info(f"Unsplash: no results for query {query!r}")
            return None

        first = results[0]
        raw = (first.get("urls") or {}).get("raw")
        if not raw:
            return None

        user = first.get("user") or {}
        credit_name = user.get("name") or "Unsplash contributor"
        profile = (user.get("links") or {}).get("html") or "https://unsplash.com"
        photo_page = (first.get("links") or {}).get("html") or "https://unsplash.com"
        download_location = (first.get("links") or {}).get("download_location")

        # Required: register the download so the photographer gets credit.
        if download_location:
            _trigger_download(download_location, key, client)

        return Photo(
            image_url=f"{raw}{IMAGE_PARAMS}",
            alt=first.get("alt_description") or first.get("description") or query.strip(),
            credit_name=credit_name,
            credit_url=_utm(profile, app_name),
            source_url=_utm(photo_page, app_name),
        )
    except Exception as e:
        logger.warning(f"Unsplash lookup failed for {query!r}: {e}")
        return None
    finally:
        if owns_client:
            client.close()


def _trigger_download(download_location: str, key: str, client: httpx.Client) -> None:
    """Ping the photo's download endpoint (an Unsplash guideline requirement)."""
    try:
        client.get(download_location, headers={"Authorization": f"Client-ID {key}"})
    except Exception as e:
        # Non-fatal: the image is still usable; we just failed to log the view.
        logger.debug(f"Unsplash download trigger failed: {e}")
