"""Site Bible manager — loading, caching, and amendment proposals."""

import logging
import re
from pathlib import Path

logger = logging.getLogger(__name__)

_DEFAULT_BIBLE_PATH = Path(__file__).parent.parent.parent / "config" / "site_bible.md"

# Sections that must never be amended automatically
PROTECTED_SECTIONS = {"3", "12", "14"}


class BibleManager:
    def __init__(self, bible_path: str = None):
        self._path = Path(bible_path) if bible_path else _DEFAULT_BIBLE_PATH
        self._content: str | None = None

    def load(self) -> str:
        """Read the Site Bible from disk and cache it."""
        self._content = self._path.read_text(encoding="utf-8")
        logger.info(f"Loaded Site Bible ({len(self._content)} chars) from {self._path}")
        return self._content

    def get_bible(self) -> str:
        """Return cached Bible text, loading if needed."""
        if self._content is None:
            self.load()
        return self._content

    def reload(self):
        """Force reload from disk."""
        self._content = None
        self.load()

    def get_version(self) -> str:
        """Parse the Version line from the Bible header."""
        text = self.get_bible()
        match = re.search(r"# Version:\s*(.+)", text)
        return match.group(1).strip() if match else "unknown"

    def propose_amendment(self, db, section: str, change: str, reasoning: str) -> int | None:
        """Propose a Bible amendment. Refuses protected sections."""
        # Check if section number is protected
        section_num = re.match(r"(\d+)", section)
        if section_num and section_num.group(1) in PROTECTED_SECTIONS:
            logger.warning(
                f"Refused amendment to protected section {section}: {change[:80]}"
            )
            return None

        amendment_id = db.insert_bible_amendment(section, change, reasoning)
        logger.info(f"Proposed Bible amendment #{amendment_id}: {change[:80]}")
        return amendment_id
