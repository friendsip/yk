"""Tests for the single-instance process lock."""

from src.utils.lock import ProcessLock


def test_lock_prevents_second_instance(tmp_path):
    """A second lock on the same file cannot be acquired while the first holds it."""
    path = tmp_path / "engine.lock"

    first = ProcessLock(path)
    assert first.acquire() is True

    second = ProcessLock(path)
    assert second.acquire() is False

    first.release()


def test_lock_reacquire_after_release(tmp_path):
    """Releasing the lock lets another instance take it."""
    path = tmp_path / "engine.lock"

    first = ProcessLock(path)
    assert first.acquire() is True
    first.release()

    second = ProcessLock(path)
    assert second.acquire() is True
    second.release()


def test_lock_release_is_idempotent(tmp_path):
    """Releasing twice (or without acquiring) must not raise."""
    lock = ProcessLock(tmp_path / "engine.lock")
    lock.release()  # never acquired
    assert lock.acquire() is True
    lock.release()
    lock.release()  # already released


def test_lock_writes_pid(tmp_path):
    """The lock file records the holder's PID."""
    import os

    path = tmp_path / "engine.lock"
    lock = ProcessLock(path)
    assert lock.acquire() is True
    assert path.read_text().strip() == str(os.getpid())
    lock.release()
