"""Content hashing for deduplication."""

import hashlib


def content_hash(text: str) -> str:
    """Return SHA-256 hex digest of normalised text."""
    normalised = text.strip().lower()
    return hashlib.sha256(normalised.encode("utf-8")).hexdigest()
