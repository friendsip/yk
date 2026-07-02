"""Helpers for the weekly pipeline schedule."""

from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

WEEKDAYS = {"mon": 0, "tue": 1, "wed": 2, "thu": 3, "fri": 4, "sat": 5, "sun": 6}


def last_scheduled_run(
    now_utc: datetime,
    run_day: str = "sun",
    run_time: str = "05:00",
    tz_name: str = "Europe/London",
) -> datetime:
    """UTC datetime of the most recent scheduled weekly run at or before now.

    Used at startup to detect a missed run: if the engine was down when the
    weekly cron should have fired, the in-memory scheduler forgets it entirely.
    """
    tz = ZoneInfo(tz_name)
    now_local = now_utc.astimezone(tz)
    hour, minute = map(int, run_time.split(":"))
    target_weekday = WEEKDAYS.get(run_day[:3].lower(), 6)

    candidate = now_local.replace(hour=hour, minute=minute, second=0, microsecond=0)
    while candidate.weekday() != target_weekday or candidate > now_local:
        candidate -= timedelta(days=1)

    return candidate.astimezone(timezone.utc)
