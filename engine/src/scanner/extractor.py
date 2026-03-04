"""Article text extraction from URLs."""

import logging
import time

import httpx
import trafilatura

logger = logging.getLogger(__name__)

MAX_RETRIES = 2
RETRY_DELAY = 2


def extract_article(url: str, timeout: float = 30.0) -> str | None:
    """Fetch a URL and extract the main article text. Retries once on transient errors."""
    last_error = None
    for attempt in range(MAX_RETRIES):
        try:
            response = httpx.get(
                url,
                timeout=timeout,
                follow_redirects=True,
                headers={"User-Agent": "yourkids-bot/0.1 (+https://yourkids.com)"},
            )
            response.raise_for_status()
            break
        except (httpx.TimeoutException, httpx.ConnectError) as e:
            last_error = e
            if attempt < MAX_RETRIES - 1:
                logger.debug(f"Retrying {url} after {type(e).__name__}")
                time.sleep(RETRY_DELAY)
            else:
                logger.warning(f"Failed to fetch {url} after {MAX_RETRIES} attempts: {e}")
                return None
        except httpx.HTTPError as e:
            logger.warning(f"Failed to fetch {url}: {e}")
            return None

    text = trafilatura.extract(
        response.text,
        include_comments=False,
        include_tables=True,
        no_fallback=False,
    )

    if not text or len(text) < 100:
        logger.warning(f"Insufficient text extracted from {url}")
        return None

    return text
