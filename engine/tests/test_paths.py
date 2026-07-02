"""Tests for LLM-supplied path sanitisation."""

from src.utils.paths import safe_content_filename


def test_plain_target_path():
    assert safe_content_filename("content/child-sleep.md") == "child-sleep.md"


def test_bare_filename():
    assert safe_content_filename("child-sleep.md") == "child-sleep.md"


def test_traversal_is_discarded():
    assert safe_content_filename("../../../engine/.env") == "env.md"


def test_absolute_path_is_discarded():
    assert safe_content_filename("/etc/passwd") == "passwd.md"


def test_weird_characters_are_slugified():
    assert safe_content_filename("content/Some Article! (v2).md") == "some-article-v2.md"


def test_unusable_paths_return_none():
    assert safe_content_filename(None) is None
    assert safe_content_filename("") is None
    assert safe_content_filename("///") is None
    assert safe_content_filename("...") is None
    assert safe_content_filename(".md") is None
