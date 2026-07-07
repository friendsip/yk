"""Tests for operational alerting — the golden rule is that notify() never raises."""

from src.utils.notify import notify


def test_notify_disabled_returns_false():
    """With alerting off, notify logs and returns False without sending."""
    assert notify("Subj", "Body", settings={"alerting": {"enabled": False}}) is False


def test_notify_no_alerting_block_is_safe():
    """A settings dict with no alerting block is treated as disabled."""
    assert notify("Subj", "Body", settings={}) is False


def test_notify_below_min_level_suppressed(monkeypatch):
    """An alert quieter than min_level is not sent."""
    sent = {"n": 0}
    monkeypatch.setattr(
        "src.utils.notify._send_webhook",
        lambda *a: sent.__setitem__("n", sent["n"] + 1) or True,
    )
    settings = {"alerting": {"enabled": True, "channel": "webhook", "min_level": "warning"}}
    assert notify("Subj", "Body", level="info", settings=settings) is False
    assert sent["n"] == 0


def test_notify_webhook_delivers(monkeypatch):
    """A webhook alert POSTs a payload carrying both text and content keys."""
    captured = {}

    class FakeResp:
        def raise_for_status(self):
            return None

    def fake_post(url, json, timeout):
        captured["url"] = url
        captured["json"] = json
        return FakeResp()

    monkeypatch.setattr("src.utils.notify.httpx.post", fake_post)
    monkeypatch.setenv("ALERT_WEBHOOK_URL", "https://hooks.example/x")
    settings = {
        "alerting": {
            "enabled": True, "channel": "webhook", "min_level": "info",
            "webhook_url_env": "ALERT_WEBHOOK_URL",
        }
    }

    assert notify("Boom", "Details", level="error", settings=settings) is True
    assert captured["url"] == "https://hooks.example/x"
    assert "Boom" in captured["json"]["text"]
    assert "Boom" in captured["json"]["content"]


def test_notify_webhook_missing_url_returns_false(monkeypatch):
    """Selecting the webhook channel with no URL env var only logs."""
    monkeypatch.delenv("ALERT_WEBHOOK_URL", raising=False)
    settings = {"alerting": {"enabled": True, "channel": "webhook", "min_level": "info"}}
    assert notify("Subj", "Body", settings=settings) is False


def test_notify_never_raises_on_send_failure(monkeypatch):
    """A raising transport must not propagate out of notify()."""
    def boom(*a, **k):
        raise RuntimeError("network down")

    monkeypatch.setattr("src.utils.notify.httpx.post", boom)
    monkeypatch.setenv("ALERT_WEBHOOK_URL", "https://hooks.example/x")
    settings = {
        "alerting": {
            "enabled": True, "channel": "webhook", "min_level": "info",
            "webhook_url_env": "ALERT_WEBHOOK_URL",
        }
    }
    assert notify("Subj", "Body", level="error", settings=settings) is False


def test_notify_never_raises_when_settings_unreadable(monkeypatch):
    """If loading settings blows up, notify degrades to a log line."""
    def boom():
        raise RuntimeError("no config")

    monkeypatch.setattr("src.utils.notify.load_settings", boom)
    assert notify("Subj", "Body", level="error", settings=None) is False


def test_notify_email_missing_host_returns_false():
    """Email channel needs a host and recipient before it tries to send."""
    settings = {"alerting": {"enabled": True, "channel": "email", "min_level": "info", "to": "x@y.com"}}
    assert notify("Subj", "Body", settings=settings) is False


def test_notify_email_delivers(monkeypatch):
    """A fully configured email channel sends via SMTP with STARTTLS + login."""
    sent = {}

    class FakeSMTP:
        def __init__(self, host, port, timeout=None):
            sent["host"] = host
            sent["port"] = port

        def __enter__(self):
            return self

        def __exit__(self, *exc):
            return False

        def starttls(self):
            sent["tls"] = True

        def login(self, user, password):
            sent["login"] = (user, password)

        def send_message(self, msg):
            sent["msg"] = msg

    monkeypatch.setattr("src.utils.notify.smtplib.SMTP", FakeSMTP)
    monkeypatch.setenv("ALERT_SMTP_USER", "u")
    monkeypatch.setenv("ALERT_SMTP_PASSWORD", "p")
    settings = {
        "alerting": {
            "enabled": True, "channel": "email", "min_level": "info",
            "smtp_host": "smtp.example", "smtp_port": 587, "smtp_starttls": True,
            "from": "a@b.com", "to": "c@d.com",
        }
    }

    assert notify("Alert subject", "Alert body", level="error", settings=settings) is True
    assert sent["host"] == "smtp.example"
    assert sent["tls"] is True
    assert sent["login"] == ("u", "p")
    assert sent["msg"]["Subject"].endswith("Alert subject")
    assert sent["msg"]["To"] == "c@d.com"


def test_notify_unknown_channel_returns_false():
    settings = {"alerting": {"enabled": True, "channel": "carrier-pigeon", "min_level": "info"}}
    assert notify("Subj", "Body", settings=settings) is False
