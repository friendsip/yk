# Revitalization & Platform Development Plan

Goal: turn yourkids.com from a clean-but-plain reading site into a vibrant destination parents return to — through a full visual redesign, a backend for subscription and content management, and a new **Family Games** area: original games built by the YourKids team, free to play with a (free) subscription.

## Guiding principles

1. **LLMs write and curate; humans direct.** The editorial engine remains the heart of the site. Every new surface — games copy, quiz packs, story prompts, digests, section blurbs — is designed so the engine can write or curate it through the existing `llm_client.call(stage, ...)` pattern, governed by the Site Bible. Humans build mechanics, set direction, and approve; LLMs produce and refresh content.
2. **Free, but subscribed.** Games (and future member features) cost nothing, but require a subscription — an email-based account. This is a value exchange that builds a direct audience. The architecture must leave room for paid tiers later (development Phase 6 of the original roadmap: monetisation) without rework.
3. **Children's safety and privacy are non-negotiable.** Subscribers are parents/guardians. Games collect no child data; gameplay state stays on-device. Everything still passes the paediatrician test.
4. **The site stays static where it can be.** Astro pages remain statically built and fast. Dynamic behaviour (auth, subscription checks, admin) lives in a small backend; the site calls it from the client or from API routes.

## Target architecture

```
                       ┌──────────────────────────────────────────┐
                       │  Hetzner VPS                             │
  RSS / web sources ─▶ │  Editorial Engine (Python, existing)     │
                       │   scanner → triage → planner → writer ───┼──▶ Git ──▶ Vercel build
                       │             │ shared SQLite/Postgres │    │            (Astro site)
                       │  Backend API (FastAPI, new)              │                 │
                       │   • auth (magic links) & subscriptions   │ ◀── fetch ──────┘
                       │   • games entitlement tokens             │      (browser: gate checks,
                       │   • admin: pipeline, content, approvals  │       signup, unlock)
                       │   • newsletter sync (Buttondown)         │
                       └──────────────────────────────────────────┘
```

- **One new backend service** (FastAPI, co-located with the engine on the VPS, sharing its database) rather than scattered serverless functions. It serves two audiences: subscribers (signup, magic-link login, entitlements) and the admin (pipeline control, content management, Bible amendment approvals — absorbing next-tasks §9).
- **Database**: stay on SQLite initially (engine already uses it; FastAPI reads/writes the same file with WAL mode). Migrate to Postgres only when subscriber volume or concurrent writes demand it — the schema is designed Postgres-compatible from day one.
- **Auth**: passwordless magic links only. No passwords to store, suits a parent audience, and the same flow later carries paid-tier entitlements.
- **Newsletter**: Buttondown remains the delivery mechanism; the backend owns the subscriber record and syncs to Buttondown, not the other way round. Subscription to the site = newsletter membership = games access.

---

## Phase 1 — Foundations: design system & discoverability

*Make the site beautiful and findable before adding anything new.*

> **Status (June 2026): shipped**, with in-house placeholder SVG illustrations
> pending the artwork-sourcing decision. Outstanding from this phase:
> self-hosting fonts (currently preloaded from Google Fonts), Search Console
> submission, and the commissioned artwork swap via `topicArt.ts`.

**Visual core (the redesign):**
- Logomark + wordmark (SVG, favicon-ready), default OG image.
- Illustration style guide added to the Site Bible: warm, hand-drawn, flat colour; existing palette (sage/amber/plum) extended with coral, sky, sunshine accents. No stock photos; no AI-photo-realism of children. Decide artwork sourcing now (commissioned set of ~20 recommended — it's the long pole).
- Topic→illustration/accent-colour map (`site/src/lib/topicArt.ts`) so engine-published content gets art automatically, with an optional `image` frontmatter field for future per-article art.
- Homepage hero (headline, subhead, signup CTA, hero illustration), featured-story slot, illustrated topic cards, colour-coded section bands (articles=sage, curated=amber, editorial=plum, games=coral), real 3-column footer, custom 404, micro-interactions honouring `prefers-reduced-motion`.
- Reading experience: key-takeaways box component, reading time, preloaded/self-hosted fonts, accessibility pass on the new palette.

**Discoverability (from next-tasks §1):**
- `@astrojs/sitemap`, robots.txt, OG/Twitter meta in `BaseLayout`, JSON-LD Article schema, canonical URLs, per-page descriptions, `/rss.xml` feed (also feeds the digest later).

**LLM hooks in this phase:** engine writer prompts updated to use the key-takeaways convention; section/homepage blurbs become engine-maintainable snippets rather than hardcoded strings.

**Exit criteria:** redesigned site live; Lighthouse ≥ 90 across the board; valid structured data; site submitted to Search Console.

---

## Phase 2 — Backend core: subscriptions & auth

*Build the service that everything member-facing will sit on.*

- **FastAPI app** (`backend/` — new top-level directory, same repo) deployed on the VPS behind Caddy/nginx with TLS at `api.yourkids.com`. Systemd service alongside the engine (dovetails with next-tasks §2 VPS deployment — do that provisioning here).
- **Schema** (new tables in the shared DB): `subscribers` (email, status, consent timestamp, source), `auth_tokens` (magic-link + session tokens, hashed, expiring), `entitlements` (subscriber → feature, e.g. `games`; future-proofs paid tiers).
- **Endpoints:** `POST /subscribe` (create subscriber, double-opt-in email via Buttondown, consent recorded), `POST /auth/magic-link`, `GET /auth/verify` (issues a long-lived signed session token, JWT or itsdangerous-style), `GET /me/entitlements` (the games gate calls this), basic rate limiting throughout.
- **Buttondown sync:** backend is the source of truth; subscribe/unsubscribe webhooks keep the two consistent.
- **Site integration:** `NewsletterSignup.astro` component (footer, hero) posting to the API; a tiny client-side session helper (`site/src/lib/member.ts`) that stores the session token and exposes `isSubscribed()`.
- **Compliance gate (blocking):** privacy policy page; Site Bible §14 (GDPR) amendment covering subscriber data — protected section, requires explicit human sign-off before launch. Signup copy is explicitly for parents/guardians.

**LLM hooks:** welcome email and double-opt-in copy drafted by the engine (new `membership` stage prompt), human-approved.

**Exit criteria:** a parent can subscribe, confirm via email, and hold a verified session; unsubscribes propagate both ways; zero secrets in the static site.

---

## Phase 3 — Backend: content management & admin

*Give the engine a control surface (absorbs next-tasks §9, pulled forward because games content will need it).*

- **Admin API** (same FastAPI app, separate router, token-auth single admin user): content inventory, pipeline status & last-run per stage, token spend reports, source health, trigger-stage endpoints, **Bible amendment review queue** (approve/reject proposals — currently DB-only with no interface).
- **Admin UI:** server-rendered FastAPI + Jinja/HTMX (no SPA build to maintain) at `/admin`. Pages: dashboard (pipeline health, cost, recent publishes), content browser, sources manager, amendments queue, and — added in Phase 5 — games content review.
- **Editorial workflow upgrade:** staged content becomes reviewable in the admin (preview rendered markdown, approve → publish batch, reject → back to writer with notes). Publishing can stay `auto` mode, but the option to require approval per content type now exists — games-related content will use it.
- **Monitoring hooks** (from next-tasks §3): stage-failure and cost-threshold alerts via email/webhook, surfaced on the dashboard.

**LLM hooks:** rejection notes feed back into a rewrite action for the writer — the human curates, the LLM revises.

**Exit criteria:** pipeline fully observable and steerable from a browser; Bible amendments have a real review flow; alerts fire on failure.

---

## Phase 4 — Games platform & subscription gate

*Ship the games area with one free-preview game and the real gate.*

- **Games collection:** second Astro collection (`site/src/content/games/`): `title`, `summary`, `age_range`, `players`, `duration`, `skills`, `cover_image`, `first_published`, `free_preview`. Body = how-to-play + "what your child practises" parent notes.
- **GameShell component:** shared frame — fullscreen, restart, sound toggle, how-to-play drawer, and the gate logic: `free_preview` games mount immediately; others call `GET /me/entitlements` via `member.ts` and render the signup/login card if unentitled. Server-side the games are still statically built — the gate is a UX layer plus an entitlement check, not DRM; that's deliberate and acceptable for free content.
- **Game runtime convention:** each game is a self-contained vanilla TS/Canvas bundle in `site/src/games/<slug>/` implementing a small `Game` interface (`mount`, `unmount`, `onResize`). No game framework at this scale. Progress in `localStorage` only — nothing leaves the device.
- **First game: Memory Match — Topics Edition** (pairs game using the topic illustrations; `free_preview: true`). Proves the shell, has SEO value, doubles as brand exposure.
- **Design principles** (new Site Bible section, human-authored): co-play on one device; 5–15 minute sessions with natural stopping points; no ads, no purchases, no engagement-maximising loops, no external chat; works on a phone in a waiting room.
- **Site integration:** "Games" in nav with launch badge; homepage Family Games section; coral-themed games index.

**LLM hooks:** game page copy (summaries, how-to-play, parent notes) written by the engine writer against a `games_copy` prompt, reviewed via the Phase 3 admin before publish.

**Exit criteria:** `/games` live; Memory Match playable by anyone; a second stub game correctly gated end-to-end (subscribe → confirm → unlocked on any device via magic link).

---

## Phase 5 — Games lineup & LLM game-content pipeline

*Make the subscription worth it, and put the engine to work inside the games.*

- **Ship the lineup** (each independent work once the shell exists):
  1. **Word Sprout** — cooperative daily word puzzle, kid mode with shorter words. Daily mechanic = return visits.
  2. **Bedtime Story Spinner** — three illustrated wheels (character/place/problem) generate a story prompt families tell aloud.
  3. **Kitchen Maths Market** — pretend-shop arithmetic, age-banded difficulty.
  4. **Family Quiz Night** — weekly 10-question pack, half for kids, half for grown-ups.
- **LLM game-content pipeline — the core of this phase.** Games separate *mechanics* (human-built, static) from *content packs* (data files the engine generates on schedule):
  - New engine stage `game_content` with per-game generator prompts: weekly quiz packs, daily word lists (age-banded, vetted against a safety wordlist), story-spinner prompt sets, market item/price sets.
  - Output is JSON validated against per-game schemas; failures reject before staging.
  - Packs flow through the existing staging → publish batch into `site/src/content/game-packs/`, with **approval required** in the Phase 3 admin (games content stays human-reviewed even while articles remain auto-published).
  - Site Bible governs tone and safety for game content exactly as for articles.
- **Newsletter digest:** engine-written weekly digest (new `digest` stage) replacing RSS-to-email: the week's content + "this week's game night pick" + the new quiz teaser. The digest is itself a recurring proof of principle 1.
- **Cross-promotion:** `related_games` map keyed on topic tags → "Try a game together" cards on relevant articles; launch editorial ("Editor's Perspective") on screens, co-play, and why our games have stopping points.

**Exit criteria:** ≥4 gated games live; quiz and word content refreshing weekly with zero hand-authoring (human approval only); digest sending weekly; measurable signup conversion from the gate.

---

## Phase 6 — Growth, polish & monetisation groundwork

- **Analytics** (privacy-respecting: Plausible or Umami): page views, game starts/completions (anonymous), gate-view → signup conversion, digest click-through. Feed topic-level engagement back to the planner — closing the loop so the LLM curates toward what parents actually read and play.
- **Search** (Pagefind), dark mode, print styles, full accessibility audit.
- **Member home** (`/account`): manage email, see new-since-last-visit, future preferences (children's age bands → personalised digest, opt-in).
- **Monetisation groundwork** (original Phase 6): the `entitlements` table grows a paid tier when ready — e.g. premium game packs or ad-free guarantees — without architectural change. Amazon Associates per next-tasks §8 proceeds independently.
- **Scale checkpoint:** revisit SQLite→Postgres and engine/backend resource isolation based on real load.

---

## Sequencing & dependencies

| Phase | Depends on | Headline deliverable | Effort |
|-------|-----------|----------------------|--------|
| 1 Design & SEO | artwork decision | Redesigned, findable site | Medium |
| 2 Backend core | VPS provisioning, Bible §14 sign-off | Working subscriptions & magic-link auth | Medium |
| 3 Admin & CMS | Phase 2 | Pipeline control + review workflows | Medium |
| 4 Games platform | Phases 1–3 | `/games` live, gate working, first game | Medium–large |
| 5 Lineup & LLM packs | Phase 4 | 4+ games, engine-generated game content, digest | Large |
| 6 Growth & polish | Phase 5 | Analytics loop, search, member home, paid-tier readiness | Medium |

Phases 1 and 2 can run in parallel (different surfaces). Phase 3 before Phase 4 is deliberate: games content review needs the admin to exist.

**Decisions needed from Mark up front:**
1. **Artwork sourcing** — commission (~20 pieces, recommended) vs. open-licence set vs. AI-generated within guardrails.
2. **Site Bible §14 amendment** — protected section; explicit sign-off on subscriber data wording before Phase 2 ships.
3. **Confirm Buttondown** as the newsletter/delivery provider before the sync is built.
4. **Domain for the API** (e.g. `api.yourkids.com`) and confirmation the Hetzner VPS hosts both engine and backend.
