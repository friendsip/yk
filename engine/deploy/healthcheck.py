#!/usr/bin/env python3
"""Engine health check — intended to run from cron every ~15 minutes.

Exits 0 when healthy and 1 when something looks wrong, and on failure also
fires an alert via notify() so a dead scanner or a skipped weekly run is more
than just a log line nobody reads.

Checks:
  * Scanner freshness — at least one source has been checked within the last
    SCANNER_MAX_AGE_HOURS (the scanner runs hourly, so 2h means it is stuck).
  * Weekly pipeline — an editorial plan has been created within the last
    PIPELINE_MAX_AGE_DAYS (a week plus grace; longer means the Sunday run
    produced nothing).

Run it from the engine directory or via an absolute path; it locates the
engine package itself. Honours YOURKIDS_DB_PATH like the rest of the engine.

    */15 * * * * /opt/yourkids/engine/.venv/bin/python /opt/yourkids/engine/deploy/healthcheck.py
"""

import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

# Make the engine package importable when run as a bare script.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.db import get_db  # noqa: E402
from src.utils.clock import utcnow  # noqa: E402
from src.utils.notify import notify  # noqa: E402

SCANNER_MAX_AGE_HOURS = 2
PIPELINE_MAX_AGE_DAYS = 8


def _parse_ts(value: str) -> datetime | None:
    """Parse a SQLite datetime('now') string (or ISO variant) as UTC."""
    if not value:
        return None
    for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S"):
        try:
            return datetime.strptime(value[:19], fmt).replace(tzinfo=timezone.utc)
        except (ValueError, TypeError):
            continue
    return None


def find_problems(db=None) -> list[str]:
    """Return a list of human-readable problems; empty means healthy."""
    db = db or get_db()
    now = utcnow()
    problems: list[str] = []

    # Scanner freshness
    sources = db.get_active_sources()
    checked = [s["last_checked_at"] for s in sources if s.get("last_checked_at")]
    if not sources:
        problems.append("No active sources configured (run --init to seed sources).")
    elif not checked:
        problems.append("No source has ever been checked — is the scanner running?")
    else:
        latest = _parse_ts(max(checked))
        if latest is None:
            problems.append("Could not parse the latest source check timestamp.")
        elif now - latest > timedelta(hours=SCANNER_MAX_AGE_HOURS):
            problems.append(
                f"Scanner stale: last source check was {max(checked)} UTC "
                f"(> {SCANNER_MAX_AGE_HOURS}h ago)."
            )

    # Weekly pipeline
    plans = db.get_recent_plans(limit=1)
    if not plans:
        problems.append("No editorial plan has ever been created.")
    else:
        last_plan = plans[0]["created_at"]
        dt = _parse_ts(last_plan)
        if dt is None:
            problems.append("Could not parse the latest plan timestamp.")
        elif now - dt > timedelta(days=PIPELINE_MAX_AGE_DAYS):
            problems.append(
                f"Weekly pipeline stale: last plan was {last_plan} UTC "
                f"(> {PIPELINE_MAX_AGE_DAYS}d ago) — the Sunday run may be failing."
            )

    return problems


def main() -> int:
    problems = find_problems()
    if problems:
        body = "Engine health check FAILED:\n\n" + "\n".join(f"- {p}" for p in problems)
        print(body, file=sys.stderr)
        notify("Engine health check failed", body, level="error")
        return 1
    print("Engine healthy.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
