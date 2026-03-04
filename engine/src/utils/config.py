"""YAML configuration loaders."""

import yaml
from pathlib import Path

_CONFIG_DIR = Path(__file__).parent.parent.parent / "config"


def load_settings() -> dict:
    with open(_CONFIG_DIR / "settings.yaml") as f:
        return yaml.safe_load(f)


def load_sources() -> list[dict]:
    with open(_CONFIG_DIR / "sources.yaml") as f:
        data = yaml.safe_load(f)
        return data.get("sources", [])


def load_competitors() -> list[dict]:
    with open(_CONFIG_DIR / "competitors.yaml") as f:
        data = yaml.safe_load(f)
        return data.get("competitors", [])
