# YourKids.com — Project Overview

*Rewritten 20 July 2026 to reflect the current state. For the live task list
see [`next-steps.md`](next-steps.md) (distilled) and [`next-tasks.md`](next-tasks.md)
(detailed); for architecture ground truth see [`CLAUDE.md`](../CLAUDE.md) at the
repo root.*

## What It Is

YourKids.com is a free, self-refreshing, AI-curated parenting site with a
growing set of free interactive tools, guides and games alongside the editorial
content. Two components:

1. A **Python editorial engine** that continuously discovers, triages, writes
   and publishes sourced parenting content in a weekly batch.
2. An **Astro static site** deployed to Vercel, rebuilt from the content store
   on every push.

The core idea is a curated knowledge base for parents, not a news site —
content accumulates through the week and publishes Sunday mornings (Europe/
London). **Everything on the site is free** (July 2026 decision): the strategy
is to build an audience first, with any revenue coming later from sponsorship
or affiliate links, never from charging parents.

- Live: **https://www.yourkids.com** · Games: **https://games.yourkids.com**
- Repo: **github.com/friendsip/yk** (the What the Word game is a separate repo,
  `~/wtw` → github.com/friendsip/whattheword)

---

## What Has Been Built

### The website (Astro) — far more than an article site now

Astro 4, static, on Vercel. Since launch it has grown four distinct surfaces:

**1. Editorial content** — evergreen articles, curated links, and editorials,
in a single markdown content collection (`type` discriminates). Topic pages are
derived automatically from tags. Slugs are permanent URLs; a `redirect_from`
field (July 2026) lets a file be renamed without breaking old links.

**2. Baby & Toddler guides** (`/baby`, `/toddler`) — hand-written, mobile-first,
week-by-week and stage-by-stage guides with feeding and health sections,
verified against NHS/AAP/WHO/Lullaby Trust/CDC guidance. Content lives in
TypeScript data modules, engine-independent.

**3. The apps launcher** (`/tools`) — a phone-home-screen grid of free
client-side tools: baby age / corrected age, naps & wake windows, printable
checklists, the NHS vaccination planner (.ics export), the UK childcare costs &
funding explorer, and the "What can we do today?" activity wheel (344
activities). Plus the installable **PWA** at `/app` — a standalone Baby &
Toddler daily companion, all child data on-device.

**4. Educational games** (`/games`) — four on-screen group games (circle-time
games, quiz packs, co-operative games, printable cards) built as tested
client-side modules, plus **What the Word?!**, a multiplayer team word game on
its own subdomain (games.yourkids.com, separate repo, no LLM — hand-vetted word
packs).

**Design:** the "Warm & Playful" system (July 2026 redesign) — cream base,
coral primary, teal secondary, sand neutral; Baloo 2 (display) + Nunito Sans
(body); pill radii, warm shadows. Tools/games pages use an "app skin"
(`ToolAppLayout`) sharing the PWA's design world; editorial pages use the site
chrome. British English throughout; warm, humble voice everywhere.

**Under the hood:** testable logic lives in `src/lib/*` modules with vitest
coverage (62 unit tests across 7 files) plus a Playwright smoke suite (7 tests);
Pagefind search; a strict Content-Security-Policy and full security headers;
SEO (canonical/OG/JSON-LD/sitemap/RSS); Unsplash article photos (attributed,
hotlinked, off until an API key is set).

### Content editing (admin) — new, July 2026

A self-hosted **Sveltia CMS at `/admin`** edits articles, recommendations and
deals directly in the GitHub repo; each save is a commit as the signed-in user,
and Vercel rebuilds on push. Auth is a small GitHub OAuth bridge in the site's
serverless functions (or a personal-access-token / local-repository mode with
zero setup). Field definitions mirror the content schema. This is in active
use.

### Newsletter — built, July 2026

Homepage signup wired to **Buttondown** with double opt-in, sending from
news.yourkids.com. Pure logic (validation, provider mapping, wording) is
tested; the serverless function and form are thin I/O. Live once the API key is
set in Vercel. The weekly digest *sender* (an engine stage) is not built yet.

### The editorial engine (Python)

A pipeline that runs unattended (APScheduler), all LLM calls routed through one
client that prepends the Site Bible and logs token cost:

1. **Scanner** — polls RSS sources hourly, tracks per-source failures.
2. **Triage** — scores discovered items via Claude every 30 min; above-threshold
   items pass to the planner.
3. **Planner** — weekly (Sun 05:00), produces an editorial plan.
4. **Writer / Editor** — generates or updates markdown articles, validates
   frontmatter and word count, resolves an optional Unsplash photo.
5. **Publisher** — stages, then commits to Git in a weekly batch. **PR mode**
   (currently): opens a `content/daily-YYYY-MM-DD` branch and PR for a human to
   merge, capped at 5 items per batch. Git-first ordering, so failed batches
   retry.
6. **Data-maintenance reviewer** — weekly, works from a register of the tools'
   data files, re-checks their authoritative sources with the LLM, and opens a
   GitHub issue when something looks out of date. Never edits data itself.

**Supporting:** the Site Bible (living editorial context, protected sections for
guardrails/monetisation/GDPR); a SQLite database for all pipeline state;
prompt-injection fencing on all scraped content; UTC clock discipline; process
locking; SMTP/webhook alerting.

**Tests:** 131 passing (pytest), 16 test files.

---

## Content (as of 20 July 2026)

20 pieces of editorial content: **11 evergreen articles, 7 curated links, 2
editorials**, plus **3 recommendations** (and the deals section built but
empty). Topic categories (Health, Family Life, Education, Safety, Special
Needs, Good News) derive automatically from tags. All Baby/Toddler guide,
tool and game content is hand-maintained and separate from the engine.

---

## Infrastructure & operations

- **Hosting:** Vercel — the main site (`yk-1ysi` project), the What the Word
  game (`wtw` project, games.yourkids.com), Upstash Redis for game state.
- **DNS:** Squarespace (migrated from Google Domains); `news` delegated to
  Buttondown, `games` → Vercel.
- **Serverless functions** (`site/api/`): newsletter subscribe, the admin OAuth
  bridge. ESM — relative imports must keep the `.js` extension.
- **Secrets** live in Vercel env / `engine/.env`, never in the repo.
- **Deployment:** push to `main` → Vercel rebuilds. The engine will commit
  content via the weekly PR once deployed.

---

## What is NOT done yet

Being honest about the gaps (see `next-steps.md` for the ordered plan):

- **The engine has never run in production.** It is hardened and tested but not
  yet deployed to a VPS — so nothing auto-scans or auto-publishes yet. This is
  the single biggest gap.
- **Engine Phase-3/4 stubs** raise `NotImplementedError`: editorial synthesis
  (`synthesis/editorial.py`), trend snapshots (`synthesis/trends.py`),
  article-level decay checking (`decay/checker.py:check_content_decay` — the
  *data-maintenance* reviewer in that file IS implemented), competitive intel
  (`scanner/competitive.py`), and web-search discovery (`scanner/web.py`).
- **The weekly newsletter sender** (compose + send the Sunday digest) is not
  built; only signup capture is.
- **No member accounts / no analytics** — both are planned (a FastAPI member
  backend underpins free-registration gating and owns the subscriber list).
- **Activation pending:** several built features are inert until a key/account
  is added — Buttondown API key, Google sign-in for the app, Unsplash key,
  Amazon Associates.

---

## Future direction

- **Full automation:** deploy the engine to a VPS with monitoring; close the
  content-decay loop; expand sources.
- **Audience & the "free but subscribed" model:** the newsletter digest, then a
  member backend with passwordless auth that gates some features (games sync,
  saved favourites) behind a *free* account — the strategic centre of the plan.
- **Analytics** (privacy-respecting), then reader feedback signals feeding the
  engine's planning.
- **Monetisation, carefully:** Amazon/Bookshop affiliate links on genuinely
  editorial recommendations (disclosure built in); sponsorship later. Never
  charging parents, never advertising disguised as editorial (a hard
  guardrail).
- **More games and tools**, and eventually additional content sections.

Detailed future ideas live in `docs/app-ideas-research.md`,
`docs/features-revenue-research.md`, and the phased
`docs/revitalization-plan.md`.

---

## Technical Summary

| Component | Technology | Status |
|-----------|-----------|--------|
| Site | Astro 4, static, plain CSS ("Warm & Playful"), Pagefind, strict CSP | Live on Vercel (www.yourkids.com) |
| Guides / tools / PWA | TypeScript data modules + tested `src/lib` logic | Live |
| Games | Client-side game modules (`/games`) + What the Word (separate repo) | Live; What the Word needs its Redis reconnected |
| Admin | Self-hosted Sveltia CMS at `/admin` + GitHub OAuth bridge | Live, in use |
| Newsletter | Buttondown, double opt-in, serverless function | Built; live once API key set |
| Engine | Python 3.11+, Claude API, SQLite, APScheduler, gitpython | Built, tested (131), **not yet deployed** |
| Publishing | Weekly batch, **PR mode**, capped at 5/batch | Built |
| Site tests | vitest (62) + Playwright (7) | Green |
| Hosting | Vercel (site + game), Upstash Redis, Squarespace DNS | Active |
