"""Publisher — stages content and handles daily batch publishing."""

import json
import logging
import shutil
from datetime import datetime
from pathlib import Path

from src.db import get_db
from src.utils.config import load_settings

logger = logging.getLogger(__name__)

SITE_CONTENT_DIR = (
    Path(__file__).parent.parent.parent.parent / "site" / "src" / "content" / "content"
)
STAGING_DIR = Path(__file__).parent.parent.parent / "staging"


def stage_content(markdown: str, target_path: str, action_id: int):
    """Stage a piece of content for the daily batch publish."""
    STAGING_DIR.mkdir(parents=True, exist_ok=True)

    staged_file = STAGING_DIR / target_path
    staged_file.parent.mkdir(parents=True, exist_ok=True)
    staged_file.write_text(markdown)

    # Write metadata sidecar
    meta_file = staged_file.parent / f"{staged_file.name}.meta.json"
    meta_file.write_text(
        json.dumps(
            {"action_id": action_id, "staged_at": datetime.now().isoformat()}
        )
    )

    logger.info(f"Staged content: {target_path}")


def publish_daily_batch():
    """Publish all staged content as a single batch."""
    settings = load_settings()
    pub_settings = settings.get("publishing", {})
    mode = pub_settings.get("mode", "pr")
    max_publishes = pub_settings.get("max_publishes_per_day", 5)

    if not STAGING_DIR.exists() or not any(STAGING_DIR.rglob("*.md")):
        logger.info("Nothing staged for publishing")
        return

    db = get_db()

    # Collect staged markdown files
    staged_files = sorted(STAGING_DIR.rglob("*.md"))[:max_publishes]
    published_paths = []

    # Ensure site content directory exists
    SITE_CONTENT_DIR.mkdir(parents=True, exist_ok=True)

    for staged_file in staged_files:
        relative_path = staged_file.relative_to(STAGING_DIR)
        # All content goes flat into the content collection directory
        target = SITE_CONTENT_DIR / relative_path.name

        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(staged_file, target)
        published_paths.append(str(target))

        # Read metadata sidecar
        meta_file = staged_file.parent / f"{staged_file.name}.meta.json"
        if meta_file.exists():
            meta = json.loads(meta_file.read_text())
            action_id = meta.get("action_id")
            if action_id:
                db.update_action_status(action_id, "completed")

        # Track in published_content table
        markdown = staged_file.read_text()
        title = _extract_title(markdown)
        word_count = len(markdown.split("---", 2)[-1].split()) if "---" in markdown else 0
        source_count = _count_sources(markdown)

        content_type = _extract_frontmatter_field(markdown, "type") or "evergreen"

        db.insert_published_content(
            file_path=str(relative_path),
            title=title,
            section="parenting",
            content_type=content_type,
            source_item_ids="[]",
            word_count=word_count,
            source_count=source_count,
        )

        logger.info(f"Published: {relative_path.name}")

    if not published_paths:
        return

    # Git operations
    today = datetime.now().strftime("%Y-%m-%d")

    if mode == "pr":
        _publish_pr_mode(published_paths, today)
    else:
        _publish_auto_mode(published_paths, today)

    # Clean up staging
    for staged_file in staged_files:
        staged_file.unlink(missing_ok=True)
        meta_file = staged_file.parent / f"{staged_file.name}.meta.json"
        meta_file.unlink(missing_ok=True)

    logger.info(f"Publish batch complete: {len(published_paths)} items published")
    for p in published_paths:
        logger.info(f"  Published: {Path(p).name}")


def _publish_pr_mode(published_paths: list[str], today: str):
    """Create a branch, commit, push, and create a PR."""
    try:
        from src.utils.git import (
            get_repo, create_branch, commit_files, push, create_pr, switch_to_main,
        )

        repo = get_repo()
        branch_name = f"content/daily-{today}"
        create_branch(repo, branch_name)
        commit_files(
            repo,
            published_paths,
            f"Daily content update {today}\n\nPublished {len(published_paths)} items.",
        )
        push(repo, branch_name)

        body = f"## Daily Content Update - {today}\n\n"
        body += f"**{len(published_paths)} items published:**\n"
        for p in published_paths:
            body += f"- {Path(p).name}\n"

        create_pr(
            title=f"Content: Daily update {today}",
            body=body,
            branch=branch_name,
        )
        switch_to_main(repo)
    except Exception as e:
        logger.error(f"Git operations failed (PR mode): {e}")
        logger.info("Content files have been copied to site/src/content/ but not committed")


def _publish_auto_mode(published_paths: list[str], today: str):
    """Commit directly to current branch and push."""
    try:
        from src.utils.git import get_repo, commit_files, push

        repo = get_repo()
        commit_msg = f"Weekly content update {today}\n\nPublished {len(published_paths)} items:\n"
        for p in published_paths:
            commit_msg += f"- {Path(p).name}\n"

        commit_files(repo, published_paths, commit_msg)

        try:
            push(repo)
            logger.info(f"Auto-publish: pushed {len(published_paths)} items to remote")
        except Exception as push_err:
            logger.error(f"Git push failed: {push_err}")
            logger.info(
                "Content has been committed locally but not pushed. "
                "Staged files are preserved — push manually or wait for next run."
            )
    except Exception as e:
        logger.error(f"Git operations failed (auto mode): {e}")
        logger.info("Content files have been copied to site/src/content/ but not committed")


def _extract_title(markdown: str) -> str:
    """Extract title from YAML frontmatter."""
    if "---" in markdown:
        frontmatter = markdown.split("---", 2)[1]
        for line in frontmatter.split("\n"):
            stripped = line.strip()
            if stripped.startswith("title:"):
                return stripped.split(":", 1)[1].strip().strip("\"'")
    return "Untitled"


def _extract_frontmatter_field(markdown: str, field: str) -> str | None:
    """Extract a single field value from YAML frontmatter."""
    if "---" not in markdown:
        return None
    frontmatter = markdown.split("---", 2)[1]
    for line in frontmatter.split("\n"):
        stripped = line.strip()
        if stripped.startswith(f"{field}:"):
            return stripped.split(":", 1)[1].strip().strip("\"'")
    return None


def _count_sources(markdown: str) -> int:
    """Count source URLs in the frontmatter sources list."""
    if "---" not in markdown:
        return 0
    frontmatter = markdown.split("---", 2)[1]
    return frontmatter.count("- http")
