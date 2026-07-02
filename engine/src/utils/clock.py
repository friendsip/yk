"""One clock for the whole engine: timezone-aware UTC.

SQLite's datetime('now') writes UTC in "YYYY-MM-DD HH:MM:SS" format. Timestamps
written or compared from Python must use the same zone and format, otherwise
string comparisons in queries silently misbehave (isoformat's 'T' separator
sorts after SQLite's space, and local time skews cutoffs by the UTC offset).
"""

from datetime import datetime, timezone

SQLITE_FORMAT = "%Y-%m-%d %H:%M:%S"


def utcnow() -> datetime:
    """Current time as a timezone-aware UTC datetime."""
    return datetime.now(timezone.utc)


def utcnow_sqlite() -> str:
    """Current UTC time in SQLite's datetime('now') format."""
    return utcnow().strftime(SQLITE_FORMAT)


def to_sqlite(dt: datetime) -> str:
    """Format a datetime in SQLite's datetime('now') format."""
    return dt.strftime(SQLITE_FORMAT)


def utc_today() -> str:
    """Current UTC date as YYYY-MM-DD."""
    return utcnow().strftime("%Y-%m-%d")
