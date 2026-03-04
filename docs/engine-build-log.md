# Engine Build Log

## Date: 2026-03-04

## What was built

The editorial engine for yourkids.com — a Python application that scans RSS sources, triages content via LLM, plans editorial actions, writes articles, and publishes them to the Astro static site. This covers Phase 1 (Scanner + Triage) and Phase 2 (Planner + Writer + Publisher) from the development plan.

## Files created

47 files across the `engine/` directory:

### Configuration
| File | Purpose |
|------|---------|
| `pyproject.toml` | Project metadata, dependencies, editable install |
| `.env.example` | API key template |
| `.gitignore` | Ignores data/, .env, __pycache__, staging/ |
| `config/site_bible.md` | Editorial context document (13,852 chars), sent to every LLM call |
| `config/sources.yaml` | 8 active RSS feeds (NHS, GOV.UK, NSPCC, Barnardo's, AAP, Guardian, BBC) + inactive Phase 2+ sources |
| `config/competitors.yaml` | 9 competitor/partner sites for Phase 3 intelligence |
| `config/settings.yaml` | Scheduling, model choices, triage thresholds, publishing config |

### Core modules
| Module | Files | Purpose |
|--------|-------|---------|
| `src/db/` | `migrations.py`, `models.py`, `__init__.py` | SQLite database — 13 tables, CRUD helpers, singleton accessor |
| `src/llm/` | `client.py` | Anthropic API wrapper — Bible injection, model routing, token logging, retry logic |
| `src/bible/` | `manager.py` | Site Bible loader/cache, amendment proposals (protects sections 3/12/14) |
| `src/scanner/` | `rss.py`, `extractor.py`, `web.py` (stub), `competitive.py` (stub) | RSS feed fetching via feedparser, article extraction via httpx + trafilatura |
| `src/triage/` | `triage.py` | LLM-based scoring (relevance/novelty/importance/reliability), guardrail checks, trend signal capture |
| `src/planner/` | `planner.py` | Daily editorial planning — considers triaged items, content inventory, trends |
| `src/writer/` | `writer.py`, `editor.py` | Article generation from source material, existing article updates |
| `src/publisher/` | `publisher.py` | Filesystem staging queue, batch publish to site/src/content/, Git PR workflow |
| `src/utils/` | `hashing.py`, `config.py`, `git.py` | SHA-256 dedup, YAML config loaders, GitPython operations |
| `src/` | `main.py` | CLI entry point + APScheduler for continuous operation |
| `src/synthesis/` | `editorial.py` (stub), `trends.py` (stub) | Phase 3 placeholders |
| `src/decay/` | `checker.py` (stub) | Phase 3 placeholder |

### Tests
| File | Tests | Covers |
|------|-------|--------|
| `tests/conftest.py` | — | Shared fixtures: test DB, mock LLM, sample data |
| `tests/test_scanner.py` | 6 | Hashing, dedup, RSS parsing, item insertion |
| `tests/test_triage.py` | 6 | JSON parsing (clean, fenced, embedded, invalid), triage with mock LLM, threshold filtering |
| `tests/test_planner.py` | 5 | Plan parsing, action generation, empty-queue handling |
| `tests/test_writer.py` | 9 | Markdown extraction (preamble, code fences), frontmatter validation, word count |
| `tests/test_publisher.py` | 6 | Staging, title extraction, source counting |
| **Total** | **32** | All passing |

## Pipeline architecture

```
Scanner (RSS feeds)
  │  feedparser + httpx/trafilatura
  │  Stores in discovered_items table
  ▼
Triage (LLM: claude-sonnet-4-6)
  │  Scores: relevance, novelty, importance, reliability
  │  Guardrail checks against Site Bible Section 3
  │  Topic tags → trend_signals table
  │  Items below threshold → discarded
  ▼
Planner (LLM: claude-sonnet-4-6)
  │  Reviews triaged items + content inventory + trend data
  │  Produces prioritised editorial plan
  │  Stores in editorial_plans + plan_actions tables
  ▼
Writer (LLM: claude-sonnet-4-6)
  │  Generates markdown articles from source material
  │  Validates frontmatter format, word count, source citations
  │  Stages to engine/staging/
  ▼
Publisher
  │  Copies from staging → site/src/content/articles/
  │  PR mode: creates Git branch + PR for human review
  │  Auto mode: commits directly to main
  │  Tracks in published_content table
  ▼
Vercel rebuild (triggered by Git push)
```

## CLI interface

```
python -m src.main --init                          # Seed DB + sources from config
python -m src.main --run-once --stage scanner      # Scan RSS feeds
python -m src.main --run-once --stage triage       # Triage unprocessed items
python -m src.main --run-once --stage planner      # Create editorial plan
python -m src.main --run-once --stage writer       # Write articles from plan
python -m src.main --run-once --stage publisher    # Publish staged content
python -m src.main --run-once                      # Full pipeline once
python -m src.main                                 # Continuous mode (APScheduler)
python -m src.main --verbose                       # Debug logging
```

## First pipeline run results

Run on 2026-03-04 against live RSS feeds.

### Scanner
- 8 active sources configured (NHS x2, GOV.UK, NSPCC, Barnardo's, AAP, Guardian, BBC)
- NHS feeds returned XML parsing errors (malformed XML) — logged and skipped
- **42 items discovered** from Guardian Family and BBC Education feeds
- Article text extracted via trafilatura for most items

### Triage
- 30 items triaged across 2 batches (15 per batch)
- 12 items scored above threshold → status `triaged`
- 18 items scored below threshold → status `discarded`
- 12 items remained unprocessed (from a partial third batch)
- 59 trend signals captured across topics including: education, SEND, safeguarding, mental health
- Total triage cost: $0.15 (2 API calls)

### Planner
- Created 1 editorial plan with 4 actions:
  1. **SEND reforms explainer** (priority: high) — combining 2 BBC items on the Schools White Paper SEND changes
  2. **SEND transport safety** (companion piece) — on support for children with complex needs during school transport
  3. **Nursery safeguarding guide** — practical guidance for parents prompted by a safeguarding case
  4. **NEET curated link** — editorial note on youth NEET statistics with mental health angle
- Planner deliberately held back a school "disorder" story as needing more sourcing
- Plan cost: $0.07 (1 API call)

### Writer
- 3 of 4 articles **failed validation** — the LLM returned preamble text before the markdown frontmatter
- 1 curated link article succeeded and was staged to `engine/staging/`
- **Bug fixed**: added `_extract_markdown()` function to strip preamble text and code fences from LLM responses before validation
- Writer cost: $0.25 (5 API calls including retries)

### Publisher
- 1 item in staging (curated-links/neet-young-people-mental-health-2026.md)
- Not yet published (writer needs re-run for the failed items)

### Total API cost for first run
- **$0.46** across 8 API calls (63,476 input tokens + 18,234 output tokens)
- All calls used claude-sonnet-4-6

## Database schema

13 tables tracking the full pipeline state:

| Table | Purpose |
|-------|---------|
| `sources` | Monitored RSS feeds |
| `discovered_items` | Raw content from scanner |
| `triage_results` | LLM evaluation scores |
| `editorial_plans` | Daily editorial plans |
| `plan_actions` | Individual actions within plans |
| `published_content` | Content inventory |
| `decay_checks` | Content freshness checks (Phase 3) |
| `trend_signals` | Topic signal accumulation |
| `trend_snapshots` | Periodic trend summaries (Phase 3) |
| `editorial_syntheses` | Cross-item editorial pieces (Phase 3) |
| `bible_amendments` | Proposed Site Bible changes |
| `competitive_intel` | Competitive intelligence (Phase 3) |
| `token_usage` | API cost tracking |

## Key design decisions

1. **All models set to claude-sonnet-4-6** — can be split to Haiku for triage/decay later via settings.yaml to reduce costs
2. **Frontmatter matches existing Astro schema** — `title`, `summary`, `publishedDate`, `sources` (flat URL array). The development plan described a richer format but the engine outputs what the site currently expects.
3. **Content directory**: engine writes to `site/src/content/articles/` where the existing seed articles live
4. **PR mode by default** — the publisher creates Git branches and PRs for human review rather than committing directly
5. **Staging as filesystem queue** — markdown files in `engine/staging/` with JSON metadata sidecars, cleaned up after publish
6. **Site Bible injected into every LLM call** as the system prompt via `llm/client.py` — individual modules never load it directly

## Known issues

1. **NHS RSS feeds return XML errors** — the feeds at `nhs.uk/rss/conditions/` have malformed XML that feedparser cannot parse. These sources discover 0 items. Needs investigation — the feeds may have moved or changed format.
2. **Writer preamble stripping** — fixed in this session. The LLM sometimes returns explanatory text before the markdown. `_extract_markdown()` now handles this, but the 3 failed articles from the first run need to be re-generated by running the writer stage again.
3. **GOV.UK, NSPCC, Barnardo's, AAP feeds** — returned 0 items in the first scan. May be rate-limited, require different parsing, or have infrequent updates. Needs monitoring over several days.

## What's next

### Immediate
- Re-run `python -m src.main --run-once --stage writer` to generate the 3 failed articles with the frontmatter fix
- Run the publisher to push staged content to the site
- Monitor the pipeline for 3-5 days to validate triage quality and feed reliability

### Phase 3 (not yet built)
- Editorial synthesis — cross-item editorial pieces when opposing viewpoints detected
- Trend tracking reports — periodic summaries of topic signal accumulation
- Content decay checker — link validation and staleness detection
- Competitive intelligence scanner
- Site Bible amendment proposals after daily publish

### Phase 4 (not yet built)
- Admin dashboard (FastAPI + HTMX)
- Web search discovery
- Cost monitoring dashboard
- Alerting (feed failures, budget thresholds)
