"""Operational alerting.

`notify()` sends an alert via whichever channel is configured under the
`alerting:` block in settings.yaml — SMTP email or a generic webhook POST
(Slack/Discord/anything that accepts JSON). Everything is off by default and
credentials come from environment variables, never the config file.

The one hard rule: alerting must never crash the pipeline it is meant to watch
over. Any misconfiguration, missing secret, or send failure is logged and
swallowed — `notify()` never raises.
"""

import logging
import os
import smtplib
from email.message import EmailMessage

import httpx

from src.utils.config import load_settings

logger = logging.getLogger(__name__)

# Ordered severities; alerts below the configured min_level only log.
_LEVELS = {"info": 10, "warning": 20, "error": 30, "critical": 40}

# HTTP status codes and requests use a short timeout so a hung endpoint can
# never wedge the caller.
_WEBHOOK_TIMEOUT = 10.0
_SMTP_TIMEOUT = 20.0


def notify(subject: str, body: str, level: str = "error", settings: dict | None = None) -> bool:
    """Send an operational alert. Returns True if a channel delivered it.

    Never raises: on any problem it logs and returns False. `settings` may be
    passed to avoid re-reading settings.yaml (and for tests); otherwise it is
    loaded lazily.
    """
    try:
        if settings is None:
            settings = load_settings()
        alerting = (settings or {}).get("alerting", {}) or {}
    except Exception as e:  # settings unreadable — degrade to a log line
        logger.warning(f"notify(): could not load alerting settings: {e}")
        logger.log(_log_level(level), f"[alert:{level}] {subject} — {body}")
        return False

    if not alerting.get("enabled", False):
        logger.info(f"[alert:{level}] {subject} (alerting disabled) — {body[:300]}")
        return False

    if _LEVELS.get(level, 30) < _LEVELS.get(alerting.get("min_level", "warning"), 20):
        logger.info(f"[alert:{level}] {subject} (below min_level) — {body[:300]}")
        return False

    channel = (alerting.get("channel") or "email").lower()
    try:
        if channel in ("email", "smtp"):
            delivered = _send_email(alerting, subject, body, level)
        elif channel in ("webhook", "slack", "discord"):
            delivered = _send_webhook(alerting, subject, body, level)
        else:
            logger.warning(f"notify(): unknown alerting channel {channel!r} — logging only")
            delivered = False
    except Exception as e:  # never let a send failure escape
        logger.warning(f"notify(): alert send failed via {channel}: {e}")
        delivered = False

    if not delivered:
        logger.log(_log_level(level), f"[alert:{level}] {subject} (not delivered) — {body[:300]}")
    return delivered


def _log_level(level: str) -> int:
    return {"info": logging.INFO, "warning": logging.WARNING}.get(level, logging.ERROR)


def _send_email(alerting: dict, subject: str, body: str, level: str) -> bool:
    host = alerting.get("smtp_host")
    to_raw = alerting.get("to")
    if not host or not to_raw:
        logger.warning("notify(): email channel needs both smtp_host and to — skipping")
        return False

    port = int(alerting.get("smtp_port", 587))
    user = os.environ.get(alerting.get("smtp_user_env", "ALERT_SMTP_USER"), "")
    password = os.environ.get(alerting.get("smtp_password_env", "ALERT_SMTP_PASSWORD"), "")
    from_addr = alerting.get("from") or user
    to_addrs = [a.strip() for a in str(to_raw).split(",") if a.strip()]
    if not from_addr or not to_addrs:
        logger.warning("notify(): email channel needs a from address and at least one recipient")
        return False

    msg = EmailMessage()
    msg["Subject"] = f"[yourkids-engine:{level}] {subject}"
    msg["From"] = from_addr
    msg["To"] = ", ".join(to_addrs)
    msg.set_content(body)

    with smtplib.SMTP(host, port, timeout=_SMTP_TIMEOUT) as server:
        if alerting.get("smtp_starttls", True):
            server.starttls()
        if user and password:
            server.login(user, password)
        server.send_message(msg)

    logger.info(f"Alert delivered via email: {subject}")
    return True


def _send_webhook(alerting: dict, subject: str, body: str, level: str) -> bool:
    url = os.environ.get(alerting.get("webhook_url_env", "ALERT_WEBHOOK_URL"), "")
    if not url:
        logger.warning("notify(): webhook channel selected but its URL env var is unset — skipping")
        return False

    message = f"[yourkids-engine:{level}] {subject}\n\n{body}"
    # Set both keys so the same payload works for Slack ("text") and Discord
    # ("content"); a generic endpoint gets both and can use either.
    payload = {"text": message, "content": message}
    resp = httpx.post(url, json=payload, timeout=_WEBHOOK_TIMEOUT)
    resp.raise_for_status()

    logger.info(f"Alert delivered via webhook: {subject}")
    return True
