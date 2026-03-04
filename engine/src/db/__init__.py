from pathlib import Path
import os

_db_instance = None


def get_db():
    """Return a singleton Database instance."""
    global _db_instance
    if _db_instance is None:
        from src.db.models import Database

        db_path = os.environ.get(
            "YOURKIDS_DB_PATH",
            str(Path(__file__).parent.parent.parent / "data" / "yourkids.db"),
        )
        _db_instance = Database(db_path)
    return _db_instance


def reset_db():
    """Reset the singleton (for testing)."""
    global _db_instance
    _db_instance = None
