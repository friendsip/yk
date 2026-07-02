"""Path safety for LLM-supplied file targets.

Plan actions carry a target_path chosen by the planner LLM. That value must
never be trusted as a real path: absolute paths, ../ traversal, or subdirectory
tricks could read or write files outside the content workflow. Published
content lives flat in one directory, so the only thing we ever need from a
target_path is a safe flat filename.
"""

import re
from pathlib import PurePosixPath


def safe_content_filename(target_path: str | None) -> str | None:
    """Reduce an untrusted target path to a safe, flat markdown filename.

    Takes only the final path component (discarding any directories, absolute
    prefixes, or traversal), slugifies it to [a-z0-9-], and enforces a .md
    suffix. Returns None if nothing usable remains.
    """
    if not target_path:
        return None

    name = PurePosixPath(str(target_path).strip()).name
    if name.endswith(".md"):
        name = name[:-3]

    slug = re.sub(r"[^a-z0-9-]+", "-", name.lower()).strip("-")
    if not slug or set(slug) == {"-"}:
        return None

    return f"{slug}.md"
