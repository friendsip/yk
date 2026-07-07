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
from src.decay.checker import run_data_review
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
    from src.llm.client import daily_cost_exceeded

    db = get_db()
    actions = db.get_pending_actions(plan_id)

    if not actions:
        logger.info(f"No pending actions for plan {plan_id}")
        return

    settings = getattr(llm_client, "settings", None) or {}

    for action in actions:
        # Stop mid-batch if the writer has pushed the day's spend over the cap.
        if daily_cost_exceeded(db, settings):
            logger.warning(f"Daily cost cap reached — stopping writer before action {action['id']}")
            break

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
    """Run the full weekly pipeline: plan → write → publish.

    Each stage is error-isolated. A planner or writer failure is logged and
    alerted but must NOT skip the publish step: any content staged from an
    earlier interrupted run needs a chance to ship, and a single LLM hiccup at
    Sunday 05:00 should never silently cost the whole week.
    """
    from src.utils.notify import notify

    llm_client.reload_bible()
    settings = getattr(llm_client, "settings", None) or {}

    plan_id = None
    try:
        plan_id = run_planner(llm_client)
    except Exception as e:
        logger.error(f"Planner stage failed: {e}", exc_info=True)
        notify(
            "Weekly pipeline: planner failed",
            f"The planner raised an exception and produced no plan this week:\n\n{e}",
            level="error",
            settings=settings,
        )

    if plan_id:
        try:
            run_writer_for_plan(plan_id, llm_client)
        except Exception as e:
            logger.error(f"Writer stage failed for plan {plan_id}: {e}", exc_info=True)
            notify(
                "Weekly pipeline: writer failed",
                f"The writer raised an exception for plan {plan_id}:\n\n{e}",
                level="error",
                settings=settings,
            )

    # Publish always runs — even if planner/writer failed — so stranded staging
    # from a previous week can recover.
    try:
        publish_daily_batch()
    except Exception as e:
        logger.error(f"Publish stage failed: {e}", exc_info=True)
        notify(
            "Weekly pipeline: publish failed",
            f"publish_daily_batch() raised an exception; staged content was NOT published:\n\n{e}",
            level="error",
            settings=settings,
        )


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
    elif stage == "review":
        run_data_review(llm_client)
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
    from src.utils.lock import ProcessLock

    # Single-instance guard: two continuous engines would double-publish.
    lock = ProcessLock()
    if not lock.acquire():
        logger.error(
            f"Another engine instance already holds {lock.lock_path} — exiting. "
            "The advisory lock releases automatically when that process stops."
        )
        sys.exit(1)

    try:
        _run_scheduler(settings, llm_client)
    finally:
        lock.release()


def _run_scheduler(settings: dict, llm_client: LLMClient):
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

    # Weekly pipeline: plan + write + publish on Sunday morning.
    # misfire_grace_time lets the job still fire (once) up to 6 hours late if
    # the process was busy or suspended at the scheduled moment.
    plan_time = sched.get("planner", {}).get("run_time", "05:00")
    plan_hour, plan_minute = map(int, plan_time.split(":"))
    plan_day = sched.get("planner", {}).get("run_day", "sun")
    scheduler.add_job(
        lambda: run_daily_pipeline(llm_client),
        CronTrigger(day_of_week=plan_day, hour=plan_hour, minute=plan_minute, timezone=tz),
        id="weekly_pipeline",
        name="Weekly Pipeline",
        misfire_grace_time=6 * 3600,
        coalesce=True,
    )

    # Weekly data-maintenance review: re-checks the apps/tools data against
    # their authoritative sources and raises issues when updates are needed
    decay_sched = sched.get("decay_checker", {})
    if decay_sched.get("enabled", True):
        decay_time = decay_sched.get("run_time", "03:00")
        decay_hour, decay_minute = map(int, decay_time.split(":"))
        decay_day = decay_sched.get("run_day", "monday")[:3].lower()
        scheduler.add_job(
            lambda: run_data_review(llm_client),
            CronTrigger(day_of_week=decay_day, hour=decay_hour, minute=decay_minute, timezone=tz),
            id="data_review",
            name="Data Maintenance Review",
            misfire_grace_time=6 * 3600,
            coalesce=True,
        )

    logger.info("yourkids.com Editorial Engine starting")
    logger.info(f"  Scanner: every {scanner_interval} minutes")
    logger.info(f"  Triage: every {triage_interval} minutes")
    logger.info(f"  Weekly pipeline: {plan_day} {plan_time} {tz}")
    if decay_sched.get("enabled", True):
        logger.info(f"  Data review: {decay_sched.get('run_day', 'monday')} {decay_sched.get('run_time', '03:00')} {tz}")

    # Run scanner immediately on startup
    scan_rss_sources()

    # If the process was down when the weekly pipeline should have fired, the
    # in-memory scheduler has forgotten it — catch up before settling in
    catch_up_missed_pipeline(settings, llm_client)

    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        logger.info("Engine shutting down")


def catch_up_missed_pipeline(settings: dict, llm_client: LLMClient):
    """Recover missed weekly work on startup.

    Two independent signals, because they fail differently:
    - Unpublished staging on disk means a plan was written but publish never
      finished (crash/error between staging and git). This is invisible to the
      plan-time check below, so recover it first — publish is idempotent.
    - The plan-time check handles a whole weekly run the scheduler slept
      through. A fresh install (no plans yet) waits for its first scheduled run
      rather than publishing whatever happens to be triaged at deploy time.
    """
    from src.utils.clock import utcnow
    from src.utils.schedule import last_scheduled_run
    from src.publisher.publisher import STAGING_DIR

    # Stranded staging: attempt publish regardless of plan time.
    if STAGING_DIR.exists() and any(STAGING_DIR.rglob("*.md")):
        logger.warning("Found unpublished staged content on startup — attempting publish")
        try:
            publish_daily_batch()
        except Exception as e:
            logger.error(f"Startup publish of stranded staging failed: {e}", exc_info=True)
            from src.utils.notify import notify

            notify(
                "Startup: stranded staging failed to publish",
                f"Unpublished content was found on disk at startup but publishing it "
                f"raised an exception:\n\n{e}",
                level="error",
                settings=getattr(llm_client, "settings", None) or {},
            )

    db = get_db()
    plans = db.get_recent_plans(limit=1)
    if not plans:
        return

    planner_sched = settings.get("scheduling", {}).get("planner", {})
    due = last_scheduled_run(
        utcnow(),
        run_day=planner_sched.get("run_day", "sun"),
        run_time=planner_sched.get("run_time", "05:00"),
        tz_name=planner_sched.get("timezone", "Europe/London"),
    )
    due_str = due.strftime("%Y-%m-%d %H:%M:%S")
    last_plan_at = plans[0]["created_at"]  # SQLite datetime('now') format, UTC

    if last_plan_at < due_str:
        logger.warning(
            f"Weekly pipeline appears to have been missed "
            f"(last plan {last_plan_at}, was due {due_str} UTC) — running catch-up now"
        )
        run_daily_pipeline(llm_client)


def main():
    parser = argparse.ArgumentParser(description="yourkids.com Editorial Engine")
    parser.add_argument("--run-once", action="store_true", help="Run once and exit")
    parser.add_argument(
        "--stage",
        type=str,
        choices=["scanner", "triage", "planner", "writer", "publisher", "review"],
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
