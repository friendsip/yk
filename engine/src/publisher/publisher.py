"""Publisher — stages content and handles daily batch publishing."""

import json
import logging
import shutil
from pathlib import Path

from src.db import get_db
from src.utils.clock import utc_today, utcnow_sqlite
from src.utils.config import load_settings
from src.utils.paths import safe_content_filename

logger = logging.getLogger(__name__)

SITE_CONTENT_DIR = (
    Path(__file__).parent.parent.parent.parent / "site" / "src" / "content" / "content"
)
STAGING_DIR = Path(__file__).parent.parent.parent / "staging"


def stage_content(markdown: str, target_path: str, action_id: int):
    """Stage a piece of content for the daily batch publish.

    target_path comes from LLM output, so it is reduced to a safe flat
    filename — published content lives flat in the site content collection,
    and nothing may escape the staging directory.
    """
    filename = safe_content_filename(target_path)
    if filename is None:
        raise ValueError(f"Unusable target_path for action {action_id}: {target_path!r}")

    STAGING_DIR.mkdir(parents=True, exist_ok=True)

    staged_file = STAGING_DIR / filename
    staged_file.write_text(markdown)

    # Write metadata sidecar
    meta_file = staged_file.parent / f"{staged_file.name}.meta.json"
    meta_file.write_text(
        json.dumps({"action_id": action_id, "staged_at": utcnow_sqlite()})
    )

    logger.info(f"Staged content: {filename}")


def publish_daily_batch():
    """Publish all staged content as a single batch.

    Order matters for crash safety: copy to the site, then git, and only after
    git succeeds record the batch in the DB and clear staging. A git failure
    leaves actions at 'staged' and staging intact, so the next run retries the
    same batch instead of the DB claiming content is live that never shipped.
    """
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

    # Ensure site content directory exists
    SITE_CONTENT_DIR.mkdir(parents=True, exist_ok=True)

    # Copy everything into the site first (flat, by filename)
    batch = []  # (staged_file, target)
    for staged_file in staged_files:
        target = SITE_CONTENT_DIR / staged_file.name
        shutil.copy2(staged_file, target)
        batch.append((staged_file, target))

    published_paths = [str(target) for _, target in batch]

    # Git operations — nothing is recorded as published until these succeed
    today = utc_today()
    if mode == "pr":
        ok = _publish_pr_mode(published_paths, today)
    else:
        ok = _publish_auto_mode(published_paths, today)

    if not ok:
        logger.error(
            "Git operations failed — batch NOT recorded as published. "
            "Staged files are preserved and the batch will retry on the next publish run."
        )
        return

    # Record the batch in the DB and clean up staging
    for staged_file, target in batch:
        meta_file = staged_file.parent / f"{staged_file.name}.meta.json"
        if meta_file.exists():
            meta = json.loads(meta_file.read_text())
            action_id = meta.get("action_id")
            if action_id:
                db.update_action_status(action_id, "completed")

        # Track in published_content table (read from staging: in PR mode the
        # site copy only exists on the content branch, not the current checkout)
        markdown = staged_file.read_text()
        title = _extract_title(markdown)
        word_count = len(markdown.split("---", 2)[-1].split()) if "---" in markdown else 0
        source_count = _count_sources(markdown)
        content_type = _extract_frontmatter_field(markdown, "type") or "evergreen"

        db.insert_published_content(
            file_path=target.name,
            title=title,
            section="parenting",
            content_type=content_type,
            source_item_ids="[]",
            word_count=word_count,
            source_count=source_count,
        )

        staged_file.unlink(missing_ok=True)
        meta_file.unlink(missing_ok=True)

    logger.info(f"Publish batch complete: {len(batch)} items published")
    for _, target in batch:
        logger.info(f"  Published: {target.name}")


def _publish_pr_mode(published_paths: list[str], today: str) -> bool:
    """Create a branch, commit, push, and create a PR. Returns True on success."""
    from src.utils.git import (
        get_repo, create_branch, commit_files, push, create_pr, switch_to_main,
    )

    repo = None
    try:
        repo = get_repo()
        switch_to_main(repo)
        branch_name = f"content/daily-{today}"
        create_branch(repo, branch_name)
        _commit_tolerating_no_changes(
            commit_files,
            repo,
            published_paths,
            f"Daily content update {today}\n\nPublished {len(published_paths)} items.",
        )
        push(repo, branch_name)

        body = f"## Daily Content Update - {today}\n\n"
        body += f"**{len(published_paths)} items published:**\n"
        for p in published_paths:
            body += f"- {Path(p).name}\n"

        pr_url = create_pr(
            title=f"Content: Daily update {today}",
            body=body,
            branch=branch_name,
        )
        return pr_url is not None
    except Exception as e:
        logger.error(f"Git operations failed (PR mode): {e}")
        return False
    finally:
        if repo is not None:
            try:
                switch_to_main(repo)
            except Exception as e:
                logger.error(f"Could not switch back to main: {e}")


def _publish_auto_mode(published_paths: list[str], today: str) -> bool:
    """Commit directly to current branch and push. Returns True on success."""
    from src.utils.git import get_repo, commit_files, push

    try:
        repo = get_repo()
        commit_msg = f"Weekly content update {today}\n\nPublished {len(published_paths)} items:\n"
        for p in published_paths:
            commit_msg += f"- {Path(p).name}\n"

        _commit_tolerating_no_changes(commit_files, repo, published_paths, commit_msg)
        push(repo)
        logger.info(f"Auto-publish: pushed {len(published_paths)} items to remote")
        return True
    except Exception as e:
        logger.error(f"Git operations failed (auto mode): {e}")
        return False


def _commit_tolerating_no_changes(commit_fn, repo, paths: list[str], message: str):
    """Commit, treating 'nothing to commit' as success.

    A previous run may have committed this batch and then failed at push or PR
    creation; on retry the copy is a no-op and the commit is empty — that must
    not abort the retry.
    """
    import git as gitlib

    try:
        commit_fn(repo, paths, message)
    except gitlib.GitCommandError as e:
        if "nothing to commit" in str(e) or "nothing added to commit" in str(e):
            logger.info("No new changes to commit — batch already committed, continuing")
        else:
            raise


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
