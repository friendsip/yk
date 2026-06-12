# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

yourkids.com is a self-refreshing, AI-curated parenting content site. Two components:

1. **Editorial Engine** (`engine/`) — Python application that scans RSS sources, triages content via LLM, plans editorial actions, writes/edits content, and publishes in a weekly batch
2. **Static Website** (`site/`) — Astro site deployed to Vercel, rebuilt from the content store on git push

The engine aggregates content continuously throughout the week but publishes in a single weekly batch (Sunday morning, Europe/London). This is deliberate — it builds a curated knowledge base rather than chasing news.

**Roadmap and status live in `docs/`, not here:** `docs/revitalization-plan.md` is the active phased development plan (visual redesign ✅ shipped, backend/subscriptions, admin, games area) with per-phase status notes; `docs/next-tasks.md` is the prioritised task list with checkboxes kept current; `docs/illustration-brief.md` is the artwork commissioning list. Update those documents when completing work, and read them before starting new work.

## Architecture

```
Scanner (hourly) → Triage (every 30 min, LLM, batches of 15) → Planner (Sun 05:00, LLM)
  → Writer/Editor (per action, LLM) → Staging (engine/staging/) → Batch Publish (Sun 06:00)
  → Git commit/push → Vercel rebuild
```

Key architectural elements:
- **Site Bible** (`engine/config/site_bible.md`): Living document sent as system context to every LLM call. Defines vision, editorial values, content guardrails, and learned context. The engine can propose amendments (stored in DB) but never modifies Sections 3 (guardrails), 12 (monetisation), or 14 (GDPR) without explicit human instruction.
- **SQLite database** (`engine/data/yourkids.db`): All pipeline state — sources, discovered items, triage results, plans, plan actions, published content, trend signals, Bible amendments, token usage. Accessed only via the `Database` class in `engine/src/db/models.py` (`get_db()`); no raw SQL elsewhere. Content itself lives as markdown in Git.
- **Plan actions** drive the writer: `action_type` is `create`, `curated_link`, or `update`; status flows pending → in_progress → staged → completed/failed.
- **Publishing**: Writer output is staged to `engine/staging/` with `.meta.json` sidecars, then `publish_daily_batch()` copies files flat into `site/src/content/content/`, records them in the DB, and does git operations. Two modes (`publishing.mode` in settings.yaml): `auto` commits directly to main and pushes; `pr` creates a `content/daily-YYYY-MM-DD` branch and a PR. Currently `auto`, capped at 5 items per batch.
- **Phase 3/4 modules are stubs** raising `NotImplementedError`: editorial synthesis, trend snapshots, decay checker, competitive intel (`engine/src/scanner/competitive.py`), web search discovery (`engine/src/scanner/web.py`).

## Build and Run Commands

### Engine (Python)

```bash
cd engine

pip install -e ".[dev]"          # install with test deps (pytest, respx)

python -m src.main --init        # initialize DB and seed sources from sources.yaml
python -m src.main               # run continuously (APScheduler)
python -m src.main --run-once    # full pipeline once: scan → triage → plan → write → publish
python -m src.main --run-once --stage scanner    # single stage: scanner|triage|planner|writer|publisher
python -m src.main -v            # verbose logging

python -m src.db.migrations      # run DB migrations (also runs automatically on every invocation)

pytest tests/                                      # all tests
pytest tests/test_scanner.py                       # single file
pytest tests/test_triage.py -k "test_guardrails"   # single test
```

### Site (Astro)

```bash
cd site

npm install
npm run dev      # development server
npm run build    # production build
npm run preview  # preview production build
```

## Key Configuration Files

- `engine/config/site_bible.md` — editorial context prepended to all LLM calls
- `engine/config/settings.yaml` — scheduling, model per stage, triage thresholds, publishing mode, content rules (word counts, min sources)
- `engine/config/sources.yaml` — RSS feeds and discovery searches (seeded into DB via `--init`)
- `engine/config/competitors.yaml` — sites for competitive intelligence (Phase 3)
- `engine/.env` — API keys (ANTHROPIC_API_KEY, GITHUB_TOKEN); loaded by `src/main.py`

## Tech Stack

| Component | Technology |
|-----------|------------|
| Engine | Python 3.11+, anthropic, httpx, feedparser, trafilatura, apscheduler, gitpython |
| LLM | Claude API — model per stage set in `settings.yaml` `models:` (currently claude-sonnet-4-6 for all stages) |
| Site | Astro 4 with a markdown content collection |
| Hosting | Vercel (site), Hetzner VPS (engine — not yet deployed) |

## Content Model

All published content lives **flat** in `site/src/content/content/` as markdown with YAML frontmatter, in a single Astro collection named `content`. Schema is defined in `site/src/content/config.ts`:

- `type: evergreen | curated | editorial` distinguishes content kinds (there are no per-type directories)
- Required: `title`, `summary`, `type`, `first_published`; optional: `tags`, `sources`, `last_updated`, `external_url` (used by curated link posts)
- `section` is currently always `parenting`

Site pages (`site/src/pages/`) filter the collection by `type` for the `/articles`, `/editorial`, and `/curated` sections, and by tag for `/topics`.

Articles may include a `## Key takeaways` section after the opening paragraph (3–5 bullets); the site styles it as a highlighted box via the heading's slugified id, and the engine writer prompt instructs the LLM to produce it for evergreen articles.

## Site Design System

- **Voice everywhere** (Site Bible §2): warm, friendly, humble — applies to interface copy (headings, buttons, empty states, error pages) as much as articles. "The most helpful things we can find", never "the best"; admit uncertainty; never sneer.
- **Illustration layer**: `site/src/lib/topicArt.ts` maps topic tags and sections to flat SVG illustrations + accent colours (sage/amber/plum + coral/sky/sunshine). Cards, topic pages, section heroes, and article headers pull from it automatically, so engine-published content gets artwork with no engine changes. Current SVGs are in-house placeholders, swappable 1:1 for commissioned art (see `docs/illustration-brief.md`). Style rules live in Site Bible §13: no stock photos, no photorealistic AI images of children, illustrations are decorative only.
- **Brand motif**: paper boat on a wave (`Logo.astro`, `public/favicon.svg`, OG image). The OG image source is `site/src/assets/og-default.svg`; regenerate `public/og-default.png` (1200×630) via qlmanage + sips center-crop on macOS.
- **Key components**: `Logo`, `Footer` (3-column), `SectionHero` (tinted accent band), `ContentCard` (art band + accent top border, `featured` variant for the homepage).
- **SEO**: BaseLayout emits canonical, OG/Twitter meta, and favicon/RSS links on every page; ContentLayout adds JSON-LD Article schema and reading time (pass `body={item.body}`). Sitemap via `@astrojs/sitemap` — **pinned to exact 3.2.1**; newer versions require Astro 5 and break the build. RSS at `/rss.xml`, robots.txt in `public/`.

## Content Guardrails (Hard Boundaries)

Content must never contain: discriminatory content, overtly sexual content, partisan political campaigning, advertising disguised as editorial, "AI slop" (content without real sources), anti-vaccination misinformation, or content that shames parenting choices.

Quality test: "Would a knowledgeable, caring paediatrician be comfortable sharing this with a parent in their waiting room?"

## LLM Integration Pattern

All LLM calls go through `LLMClient` in `engine/src/llm/client.py`, which:
1. Loads the Site Bible via `BibleManager` (cached; `reload_bible()` is called at the start of each pipeline run)
2. Selects the model for the stage from `settings.yaml`
3. Prepends the Bible as the system prompt (plus optional `extra_system_context`)
4. Retries on rate-limit/connection errors, then logs token usage and estimated cost to the DB

Individual modules never load the Bible or construct an Anthropic client directly — they call `llm_client.call(stage, user_prompt)`, which returns `(response_text, metadata)`.

## Development Phases

The project follows phased development starting with the Parenting section only:
- Phase 1: Scanner + Triage pipeline ✅
- Phase 2: Planner + Writer + Publisher (weekly batch) ✅
- Phase 3: Editorial synthesis, trends, decay checking, competitive intel (stubs)
- Phase 4: Admin dashboard, monitoring, web search discovery
- Phase 5: Expand to additional sections
- Phase 6: Toys & Reviews (monetisation)
