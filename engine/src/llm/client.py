"""LLM client — central wrapper for all Anthropic API calls."""

import logging
import time

import anthropic

from src.bible.manager import BibleManager
from src.db import get_db

logger = logging.getLogger(__name__)

# Approximate pricing per 1M tokens (USD)
_PRICING = {
    "claude-sonnet-4-6": {"input": 3.0, "output": 15.0},
    "claude-sonnet-4-5-20250929": {"input": 3.0, "output": 15.0},
    "claude-haiku-4-5-20251001": {"input": 0.80, "output": 4.0},
}
_DEFAULT_PRICING = {"input": 3.0, "output": 15.0}

MAX_RETRIES = 3
RETRY_DELAYS = [1, 2, 4]


class LLMClient:
    def __init__(self, bible_manager: BibleManager = None, settings: dict = None):
        self.client = anthropic.Anthropic()
        self.bible_manager = bible_manager or BibleManager()
        self.settings = settings or {}
        self._bible_text: str | None = None

    def _get_model(self, stage: str) -> str:
        return self.settings.get("models", {}).get(stage) or "claude-sonnet-4-6"

    def _get_bible(self) -> str:
        if self._bible_text is None:
            self._bible_text = self.bible_manager.get_bible()
        return self._bible_text

    def reload_bible(self):
        """Reload the Bible from disk (call at start of each pipeline run)."""
        self.bible_manager.reload()
        self._bible_text = None

    def call(
        self,
        stage: str,
        user_prompt: str,
        extra_system_context: str = None,
        max_tokens: int = 4096,
        temperature: float = 0.3,
    ) -> tuple[str, dict]:
        """Make an LLM call with Bible context.

        Returns (response_text, metadata_dict).
        """
        # Build system prompt
        system = self._get_bible()
        if extra_system_context:
            system = system + "\n\n" + extra_system_context

        model = self._get_model(stage)
        prompt_chars = len(user_prompt)
        logger.info(f"LLM call [{stage}] sending to {model} ({prompt_chars} chars)...")

        # Retry loop
        last_error = None
        for attempt in range(MAX_RETRIES):
            try:
                response = self.client.messages.create(
                    model=model,
                    max_tokens=max_tokens,
                    system=system,
                    messages=[{"role": "user", "content": user_prompt}],
                    temperature=temperature,
                )
                break
            except (anthropic.RateLimitError, anthropic.APIConnectionError) as e:
                last_error = e
                if attempt < MAX_RETRIES - 1:
                    delay = RETRY_DELAYS[attempt]
                    logger.warning(f"API error (attempt {attempt + 1}): {e}. Retrying in {delay}s...")
                    time.sleep(delay)
                else:
                    raise

        # Extract response
        text = response.content[0].text
        usage = response.usage

        # Log token usage
        cost = self._estimate_cost(model, usage.input_tokens, usage.output_tokens)
        try:
            db = get_db()
            db.log_token_usage(stage, model, usage.input_tokens, usage.output_tokens, cost)
        except Exception as e:
            logger.warning(f"Failed to log token usage: {e}")

        meta = {
            "model": model,
            "input_tokens": usage.input_tokens,
            "output_tokens": usage.output_tokens,
            "cost_usd": cost,
        }

        logger.info(
            f"LLM call [{stage}] model={model} "
            f"tokens={usage.input_tokens}+{usage.output_tokens} "
            f"cost=${cost:.4f}"
        )

        return text, meta

    def _estimate_cost(self, model: str, input_tokens: int, output_tokens: int) -> float:
        pricing = _PRICING.get(model, _DEFAULT_PRICING)
        input_cost = (input_tokens / 1_000_000) * pricing["input"]
        output_cost = (output_tokens / 1_000_000) * pricing["output"]
        return input_cost + output_cost
