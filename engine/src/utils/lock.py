"""Single-instance process lock.

Two continuous engines running at once would double-publish. A file lock
(fcntl advisory lock on engine/data/engine.lock) is acquired at startup in
continuous mode; if another instance already holds it, the new process logs
and exits. The lock is released on shutdown and, because it is tied to the open
file description, is dropped automatically by the OS if the process dies.
"""

import logging
import os
from pathlib import Path

logger = logging.getLogger(__name__)

DEFAULT_LOCK_PATH = Path(__file__).parent.parent.parent / "data" / "engine.lock"


class ProcessLock:
    def __init__(self, lock_path=None):
        self.lock_path = Path(lock_path) if lock_path else DEFAULT_LOCK_PATH
        self._fh = None

    def acquire(self) -> bool:
        """Try to take the lock without blocking.

        Returns True if acquired, False if another process already holds it.
        """
        import fcntl

        self.lock_path.parent.mkdir(parents=True, exist_ok=True)
        fh = open(self.lock_path, "w")
        try:
            fcntl.flock(fh.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
        except OSError:
            fh.close()
            return False

        self._fh = fh
        fh.seek(0)
        fh.truncate()
        fh.write(str(os.getpid()))
        fh.flush()
        return True

    def release(self):
        """Release the lock if held. Safe to call more than once."""
        if self._fh is None:
            return
        import fcntl

        try:
            fcntl.flock(self._fh.fileno(), fcntl.LOCK_UN)
        except OSError:
            pass
        finally:
            self._fh.close()
            self._fh = None
