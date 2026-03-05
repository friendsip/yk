"""yourkids.com Editorial Engine — main entry point."""

import argparse
import logging
import sys
from pathlib import Path

from dotenv import load_dotenv

# Load .env from engine directory
load_dotenv(Path(__file__).parent.parent / ".env")

from src.db import get_db
from src.db.migrations import migrate
from src.llm.client import LLMClient
from src.bible.manager import BibleManager
from src.scanner.rss import scan_rss_sources, seed_sources_from_config
from src.triage.triage import run_triage
from src.planner.planner import run_planner
from src.writer.writer import write_article
from src.writer.editor import edit_article
from src.publisher.publisher import stage_content, publish_daily_batch
from src.utils.config import load_settings

logger = logging.getLogger("yourkids")


def setup_logging(verbose: bool = False):
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(asctime)s [%(name)s] %(levelname)s: %(message)s",
        handlers=[logging.StreamHandler(sys.stdout)],
    )


def run_writer_for_plan(plan_id: int, llm_client: LLMClient):
    """Execute all pending actions for a plan."""
    db = get_db()
    actions = db.get_pending_actions(plan_id)

    if not actions:
        logger.info(f"No pending actions for plan {plan_id}")
        return

    for action in actions:
        db.update_action_status(action["id"], "in_progress")

        try:
            if action["action_type"] in ("create", "curated_link"):
                markdown = write_article(action, llm_client)
            elif action["action_type"] == "update":
                markdown = edit_article(action, llm_client)
            else:
                logger.warning(f"Unknown action type: {action['action_type']}")
                continue

            if markdown:
                target_path = action.get("target_path") or f"content/item-{action['id']}.md"
                stage_content(markdown, target_path, action["id"])
                db.update_action_status(action["id"], "staged")
            else:
                db.update_action_status(action["id"], "failed")
        except Exception as e:
            logger.error(f"Writer failed for action {action['id']}: {e}", exc_info=True)
            db.update_action_status(action["id"], "failed")


def run_daily_pipeline(llm_client: LLMClient):
    """Run the full daily pipeline: plan → write → publish."""
    llm_client.reload_bible()

    plan_id = run_planner(llm_client)
    if plan_id:
        run_writer_for_plan(plan_id, llm_client)

    publish_daily_batch()


def run_stage(stage: str, llm_client: LLMClient):
    """Run a single pipeline stage."""
    if stage == "scanner":
        scan_rss_sources()
    elif stage == "triage":
        run_triage(llm_client)
    elif stage == "planner":
        run_planner(llm_client)
    elif stage == "writer":
        db = get_db()
        plans = db.get_recent_plans(limit=1)
        if plans:
            run_writer_for_plan(plans[0]["id"], llm_client)
        else:
            logger.info("No plans to execute")
    elif stage == "publisher":
        publish_daily_batch()
    else:
        logger.error(f"Unknown stage: {stage}")
        sys.exit(1)


def run_continuous(settings: dict, llm_client: LLMClient):
    """Run the engine continuously with APScheduler.

    Schedule:
    - Scanner: runs throughout the week to accumulate content
    - Triage: runs periodically to evaluate content as it arrives
    - Pipeline (planner + writer + publisher): runs weekly on Sunday morning
    """
    from apscheduler.schedulers.blocking import BlockingScheduler
    from apscheduler.triggers.cron import CronTrigger
    from apscheduler.triggers.interval import IntervalTrigger

    scheduler = BlockingScheduler()
    sched = settings.get("scheduling", {})
    tz = sched.get("planner", {}).get("timezone", "Europe/London")

    # Scanner: runs on interval (accumulates content throughout the week)
    scanner_interval = sched.get("scanner", {}).get("default_interval_minutes", 60)
    scheduler.add_job(
        scan_rss_sources,
        IntervalTrigger(minutes=scanner_interval),
        id="scanner",
        name="RSS Scanner",
    )

    # Triage: runs on interval (evaluates content as it comes in)
    triage_interval = sched.get("triage", {}).get("interval_minutes", 30)
    scheduler.add_job(
        lambda: run_triage(llm_client),
        IntervalTrigger(minutes=triage_interval),
        id="triage",
        name="Content Triage",
    )

    # Weekly pipeline: plan + write + publish on Sunday morning
    plan_time = sched.get("planner", {}).get("run_time", "05:00")
    plan_hour, plan_minute = map(int, plan_time.split(":"))
    plan_day = sched.get("planner", {}).get("run_day", "sun")
    scheduler.add_job(
        lambda: run_daily_pipeline(llm_client),
        CronTrigger(day_of_week=plan_day, hour=plan_hour, minute=plan_minute, timezone=tz),
        id="weekly_pipeline",
        name="Weekly Pipeline",
    )

    logger.info("yourkids.com Editorial Engine starting")
    logger.info(f"  Scanner: every {scanner_interval} minutes")
    logger.info(f"  Triage: every {triage_interval} minutes")
    logger.info(f"  Weekly pipeline: {plan_day} {plan_time} {tz}")

    # Run scanner immediately on startup
    scan_rss_sources()

    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        logger.info("Engine shutting down")


def main():
    parser = argparse.ArgumentParser(description="yourkids.com Editorial Engine")
    parser.add_argument("--run-once", action="store_true", help="Run once and exit")
    parser.add_argument(
        "--stage",
        type=str,
        choices=["scanner", "triage", "planner", "writer", "publisher"],
        help="Run a specific stage",
    )
    parser.add_argument("--init", action="store_true", help="Initialize database and seed sources")
    parser.add_argument("--verbose", "-v", action="store_true", help="Verbose logging")
    args = parser.parse_args()

    setup_logging(args.verbose)

    # Ensure database exists
    migrate()

    settings = load_settings()
    bible_manager = BibleManager()
    llm_client = LLMClient(bible_manager=bible_manager, settings=settings)

    if args.init:
        seed_sources_from_config()
        logger.info("Database initialized and sources seeded")
        return

    if args.run_once:
        if args.stage:
            run_stage(args.stage, llm_client)
        else:
            # Full pipeline once
            logger.info("Running full pipeline once")
            scan_rss_sources()
            run_triage(llm_client)
            run_daily_pipeline(llm_client)
        return

    # Continuous mode
    run_continuous(settings, llm_client)


if __name__ == "__main__":
    main()
