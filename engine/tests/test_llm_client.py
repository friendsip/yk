"""Tests for the LLM client — retry classification and the daily cost cap."""

from unittest.mock import MagicMock

import anthropic
import httpx
import pytest

from src.llm.client import LLMClient, _is_retryable, daily_cost_exceeded


def _req():
    return httpx.Request("POST", "https://api.anthropic.com/v1/messages")


def _status_error(cls, code):
    return cls("boom", response=httpx.Response(code, request=_req()), body=None)


class _FakeUsage:
    input_tokens = 100
    output_tokens = 50


class _FakeContent:
    text = "ok"


class _FakeResponse:
    content = [_FakeContent()]
    usage = _FakeUsage()


# ── Retry classification ─────────────────────────────────────────

def test_is_retryable_transient_errors():
    assert _is_retryable(anthropic.APIConnectionError(request=_req()))
    assert _is_retryable(_status_error(anthropic.RateLimitError, 429))
    assert _is_retryable(_status_error(anthropic.InternalServerError, 500))
    # 529 overloaded arrives as a bare APIStatusError
    assert _is_retryable(_status_error(anthropic.APIStatusError, 529))
    assert _is_retryable(_status_error(anthropic.APIStatusError, 503))


def test_is_retryable_excludes_client_errors():
    assert not _is_retryable(_status_error(anthropic.BadRequestError, 400))
    assert not _is_retryable(_status_error(anthropic.APIStatusError, 401))
    assert not _is_retryable(_status_error(anthropic.APIStatusError, 404))
    assert not _is_retryable(ValueError("not an API error"))


def _make_client(monkeypatch):
    monkeypatch.setenv("ANTHROPIC_API_KEY", "test-key")
    monkeypatch.setattr("src.llm.client.get_db", lambda: MagicMock())
    monkeypatch.setattr("src.llm.client.time.sleep", lambda s: None)
    client = LLMClient(bible_manager=MagicMock(), settings={})
    client._bible_text = "BIBLE"
    client.client = MagicMock()
    return client


def test_call_retries_on_overloaded_then_succeeds(monkeypatch):
    """A 529 overloaded is retried and the call ultimately succeeds."""
    client = _make_client(monkeypatch)
    client.client.messages.create.side_effect = [
        _status_error(anthropic.APIStatusError, 529),
        _FakeResponse(),
    ]

    text, meta = client.call("planner", "hello")

    assert text == "ok"
    assert client.client.messages.create.call_count == 2


def test_call_retries_on_internal_server_error(monkeypatch):
    client = _make_client(monkeypatch)
    client.client.messages.create.side_effect = [
        _status_error(anthropic.InternalServerError, 500),
        _FakeResponse(),
    ]
    text, _ = client.call("planner", "hello")
    assert text == "ok"
    assert client.client.messages.create.call_count == 2


def test_call_does_not_retry_client_error(monkeypatch):
    """A 400 bad request is raised immediately without wasting retries."""
    client = _make_client(monkeypatch)
    client.client.messages.create.side_effect = _status_error(anthropic.BadRequestError, 400)

    with pytest.raises(anthropic.BadRequestError):
        client.call("planner", "hello")

    assert client.client.messages.create.call_count == 1


# ── Daily cost cap ───────────────────────────────────────────────

def test_daily_cost_exceeded_true_when_over_cap():
    db = MagicMock()
    db.get_daily_token_usage.return_value = [{"total_cost": 15.0}, {"total_cost": 6.0}]
    settings = {"limits": {"daily_cost_usd_cap": 20.0}, "alerting": {"enabled": False}}
    assert daily_cost_exceeded(db, settings) is True


def test_daily_cost_exceeded_false_under_cap():
    db = MagicMock()
    db.get_daily_token_usage.return_value = [{"total_cost": 3.0}]
    assert daily_cost_exceeded(db, {"limits": {"daily_cost_usd_cap": 20.0}}) is False


def test_daily_cost_cap_disabled_when_zero():
    db = MagicMock()
    assert daily_cost_exceeded(db, {"limits": {"daily_cost_usd_cap": 0}}) is False
    db.get_daily_token_usage.assert_not_called()


def test_daily_cost_read_failure_is_safe():
    db = MagicMock()
    db.get_daily_token_usage.side_effect = RuntimeError("db down")
    assert daily_cost_exceeded(db, {"limits": {"daily_cost_usd_cap": 20.0}}) is False
