"""Git operations for content publishing."""

import logging
import subprocess
from pathlib import Path

import git

logger = logging.getLogger(__name__)

# Repository root is two levels up from engine/src/utils/
_REPO_ROOT = Path(__file__).parent.parent.parent.parent


def get_repo(path: str = None) -> git.Repo:
    """Get the Git repo object."""
    repo_path = path or str(_REPO_ROOT)
    return git.Repo(repo_path)


def create_branch(repo: git.Repo, branch_name: str):
    """Create and checkout a new branch from current HEAD."""
    if branch_name in [b.name for b in repo.branches]:
        repo.git.checkout(branch_name)
    else:
        repo.git.checkout("-b", branch_name)
    logger.info(f"On branch: {branch_name}")


def commit_files(repo: git.Repo, file_paths: list[str], message: str):
    """Stage and commit specific files."""
    for path in file_paths:
        repo.index.add([path])
    repo.index.commit(message)
    logger.info(f"Committed {len(file_paths)} files")


def push(repo: git.Repo, branch: str = None):
    """Push to remote."""
    remote = repo.remote("origin")
    if branch:
        remote.push(branch)
    else:
        remote.push()
    logger.info(f"Pushed to origin{f'/{branch}' if branch else ''}")


def create_pr(title: str, body: str, branch: str, base: str = "main") -> str | None:
    """Create a GitHub PR using the gh CLI. Returns PR URL or None."""
    try:
        result = subprocess.run(
            ["gh", "pr", "create", "--title", title, "--body", body,
             "--head", branch, "--base", base],
            capture_output=True, text=True, cwd=str(_REPO_ROOT),
        )
        if result.returncode == 0:
            pr_url = result.stdout.strip()
            logger.info(f"Created PR: {pr_url}")
            return pr_url
        else:
            logger.error(f"gh pr create failed: {result.stderr}")
            return None
    except FileNotFoundError:
        logger.warning("gh CLI not installed — PR not created")
        return None


def switch_to_main(repo: git.Repo):
    """Switch back to main branch."""
    repo.git.checkout("main")
    logger.info("Switched to main")
