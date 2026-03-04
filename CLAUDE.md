# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

yourkids.com is a self-refreshing, AI-curated parenting content site. It has two components:

1. **Editorial Engine** (`engine/`) — Python application that scans sources, triages content via LLM, plans editorial actions, writes/edits content, and publishes in a daily batch
2. **Static Website** (`site/`) — Astro-based site deployed to Vercel, rebuilt once daily from the content store

The engine aggregates content continuously throughout the day but publishes in a single daily batch at 06:00 UK time. This is deliberate — it builds a curated knowledge base rather than chasing news.

## Architecture

```
Scanner (continuous) → Triage (batched, LLM) → Planner (daily, LLM) → Writer/Editor (per item, LLM) → Staging Queue → Daily Batch Publish → Git push → Vercel rebuild
```

Key architectural elements:
- **Site Bible** (`engine/config/site_bible.md`): Living document sent as context to every LLM call. Defines vision, editorial values, content guardrails, and learned context. The engine can propose amendments (stored in DB) but never modifies Sections 3 (guardrails), 12 (monetisation), or 14 (GDPR) without explicit human instruction.
- **SQLite database** (`engine/data/yourkids.db`): Tracks pipeline state, triage results, plans, published content, trends, and token usage. Content itself lives as markdown in Git.
- **Trend tracking**: Signals accumulated during triage, weekly snapshots, monthly trend reports.
- **Editorial synthesis**: Auto-generated when opposing viewpoints detected. Must present all sides fairly.

## Build and Run Commands

### Engine (Python)

```bash
cd engine

# Install dependencies
pip install -e .

# Run full pipeline continuously
python -m src.main

# Run specific stage once (for testing)
python -m src.main --run-once --stage scanner
python -m src.main --run-once --stage triage
python -m src.main --run-once --stage planner

# Initialize/migrate database
python -m src.db.migrations

# Run tests
pytest tests/
pytest tests/test_scanner.py           # Single test file
pytest tests/test_triage.py -k "test_guardrails"  # Specific test
```

### Site (Astro)

```bash
cd site

npm install
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## Key Configuration Files

- `engine/config/site_bible.md` — Editorial context for all LLM calls
- `engine/config/sources.yaml` — RSS feeds and web sources to monitor
- `engine/config/competitors.yaml` — Sites for competitive intelligence
- `engine/config/settings.yaml` — Scheduling, model choices, thresholds
- `engine/.env` — API keys (ANTHROPIC_API_KEY, GITHUB_TOKEN)

## Tech Stack

| Component | Technology |
|-----------|------------|
| Engine | Python 3.12+, anthropic, httpx, feedparser, trafilatura, sqlite-utils, apscheduler, gitpython |
| LLM | Claude API (Haiku for triage/decay, Sonnet for planning/writing/synthesis) |
| Site | Astro with markdown content collections |
| Hosting | Vercel (site), Hetzner VPS (engine) |

## Content Types

All content is markdown with YAML frontmatter in `site/content/`:
- `articles/` — Evergreen pages and full articles
- `editorial/` — AI editorial overviews (labelled "Editor's Perspective")
- `curated/` — Link posts to quality content elsewhere
- `trends/` — Periodic trend reports
- `updates/` — Timestamped updates to existing content

## Content Guardrails (Hard Boundaries)

Content must never contain: discriminatory content, overtly sexual content, partisan political campaigning, advertising disguised as editorial, "AI slop" (content without real sources), anti-vaccination misinformation, or content that shames parenting choices.

Quality test: "Would a knowledgeable, caring paediatrician be comfortable sharing this with a parent in their waiting room?"

## LLM Integration Pattern

All LLM calls go through `engine/src/llm/client.py` which:
1. Loads the Site Bible from disk (cached per pipeline run)
2. Selects model based on stage (configured in settings.yaml)
3. Prepends Bible as system context
4. Logs token usage for cost tracking

Individual modules never load the Bible directly — they call `llm_client.call(stage, user_prompt)`.

## Development Phases

The project follows phased development starting with Parenting section only:
- Phase 1: Scanner + Triage pipeline
- Phase 2: Planner + Writer + Publisher (daily batch)
- Phase 3: Editorial synthesis, trends, competitive intel
- Phase 4: Admin dashboard, monitoring
- Phase 5: Expand to additional sections
- Phase 6: Toys & Reviews (monetisation)
