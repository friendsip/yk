# Next Tasks

## Where We Are

The core pipeline works end-to-end: Scanner → Triage → Planner → Writer → Publisher → Git push → Vercel rebuild. The site is live with 17 pieces of content across three content types and five topic categories. 43 tests pass. The engine is configured for weekly Sunday-morning publishing.

What follows is everything that still needs doing, roughly in priority order.

---

## 1. SEO — Not Optional, Currently Missing Entirely

The site has no SEO infrastructure at all. Without this, content won't be discoverable via search engines.

**Tasks:**

- [x] **Sitemap generation** — Add `@astrojs/sitemap` integration. Configure in `astro.config.mjs` with the production URL.
- [x] **robots.txt** — Create `public/robots.txt` allowing all crawlers, pointing to the sitemap.
- [x] **OpenGraph and Twitter meta tags** — Update `BaseLayout.astro` to include `og:title`, `og:description`, `og:type`, `og:url`, and `twitter:card` meta tags. Pass these from each page.
- [x] **Structured data (JSON-LD)** — Add `Article` schema markup to article detail pages. Include `headline`, `datePublished`, `dateModified`, `author`, `publisher`.
- [x] **Canonical URLs** — Add `<link rel="canonical">` to all pages.
- [x] **Page descriptions** — Ensure every page passes a unique `description` prop to `BaseLayout`. The homepage and listing pages currently don't have tailored descriptions.

**Effort:** Small. Mostly template changes and one Astro integration.

---

## 2. Deploy Engine to VPS

The engine is designed for continuous operation but is currently only run manually. It needs to be deployed to the Hetzner VPS.

**Tasks:**

- [x] **Pre-deployment hardening (July 2026)** — LLM-supplied `target_path` is sanitised to a flat filename (`src/utils/paths.py` — no traversal or absolute-path reads/writes from planner output); publish is git-first (DB records and staging cleanup happen only after a successful push/PR, so a failed batch retries next run instead of the DB claiming it shipped); triage tracks per-item attempts and marks items `triage_failed` after 3 tries so one bad batch can't wedge the queue; all Python-side timestamps are UTC in SQLite's format (`src/utils/clock.py` — fixes stale-action detection, which previously mis-fired on every same-day action); editor output is validated before staging (a refusal can no longer overwrite a live article); content commits use `git commit --only` so unrelated staged changes aren't swept into content commits. `publishing.mode` switched to `pr` — a human merges the weekly content PR — until prompt-injection mitigation for scraped content exists (the remaining precondition for `auto`).
- [x] **Pre-deployment hardening, round 2 (July 2026)** — prompt-injection fencing: all scraped fields (titles, URLs, content) are sanitised via `src/llm/fencing.py` before entering triage/planner/writer/editor prompts (angle brackets become lookalikes so scraped text can't break its prompt frame), and every prompt carrying scraped material includes a standing treat-as-data-not-instructions notice. Planner is crash-safe: malformed LLM actions are skipped rather than aborting the run mid-write, and `item_ids` are constrained to the triaged set. Scanner: URL-level dedup *before* fetching (hourly scans no longer re-fetch every entry, and page churn no longer re-inserts known URLs) plus a 30s timeout on feed fetches. Missed-Sunday catch-up: the weekly cron gets a 6-hour misfire grace window, and on startup the engine detects a missed weekly run from the plans table and runs it. Note: returning to `auto` publish mode would still warrant an output-side guardrail review pass — fencing is input-side mitigation, and the weekly PR remains the human gate.
- [ ] **Provision VPS** — Set up Python 3.12+, Git, SSH keys, and GitHub access on the Hetzner box.
- [ ] **Systemd service** — Create a service file for the engine process with auto-restart and log rotation.
- [ ] **Environment variables** — Deploy `.env` with `ANTHROPIC_API_KEY` and `GITHUB_TOKEN`.
- [ ] **Database persistence** — Ensure `engine/data/yourkids.db` survives restarts and is backed up regularly (cron job copying to a separate location or cloud storage).
- [ ] **Log management** — Configure journald or file-based logging with rotation. The engine already logs to stdout.
- [ ] **Health check** — Simple script or endpoint to verify the engine is running and the last pipeline completed successfully.

**Effort:** Medium. Infrastructure work, no code changes to the engine itself.

---

## 3. Monitoring and Alerting

No visibility into whether the engine is working, failing, or overspending.

**Tasks:**

- [ ] **Pipeline status monitoring** — Track last successful run of each stage. Alert if scanner hasn't run in 2+ hours, or if Sunday pipeline didn't produce any content.
- [ ] **Token cost tracking** — The engine already logs token usage to the database. Build a simple report (daily/weekly cost summary) and alert if daily cost exceeds a threshold.
- [ ] **Error alerting** — Send notifications on repeated failures. Options: simple email via SMTP, or a webhook to Slack/Discord.
- [ ] **Source health** — Alert when a source hits 3+ consecutive failures (the engine tracks this but doesn't notify).

**Effort:** Small to medium. Could start with a cron script that queries the database and sends email.

---

## 4. Implement Stub Modules (Phase 3)

Five engine modules are stubbed with `NotImplementedError`. These are the Phase 3 features.

### 4a. Trend Analysis

The database tables exist (`trend_signals`, `trend_snapshots`). The triage stage already generates topic tags. What's missing is the analysis.

- [ ] **Trend snapshot generation** — Weekly job (currently scheduled for Sunday 02:00) that aggregates signals from the past 30 days, identifies trending topics, and stores a snapshot.
- [ ] **Monthly trend report** — LLM-generated narrative summarising what topics are growing, declining, or emerging. Could be published as a content piece.
- [ ] **Planner integration** — Feed trend data into the planner so it can prioritise content in growing areas.

### 4b. Editorial Synthesis

Triggered when triage detects opposing viewpoints on the same topic.

- [ ] **Opposing view detection** — Triage already flags this. Build the handler that groups related items and triggers a synthesis action.
- [ ] **Synthesis writer** — LLM prompt that takes multiple sources with different perspectives and produces a balanced overview, labelled "Editor's Perspective."
- [ ] **Auto-publish as editorial** — Route synthesis output through the publisher as `type: editorial`.

### 4c. Content Decay Checker

Configured for Monday 03:00, 90-day max age.

- [ ] **Staleness check** — Query published content older than threshold. Use LLM to assess whether the content is still accurate given current information.
- [ ] **Broken link detection** — HTTP HEAD requests against all source URLs in published content. Flag broken links.
- [ ] **Auto-update trigger** — When decay is detected, create a plan action of type `update` targeting the stale article, with instructions to refresh it.

### 4d. Competitive Intelligence

- [ ] **Competitor scanner** — Parse `competitors.yaml`, scan competitor sites periodically, identify topics they're covering that we're not.
- [ ] **Gap analysis** — Feed into the planner as "competitor is covering X, we have nothing on it."

### 4e. Web Search Discovery

- [ ] **Search-based discovery** — Beyond RSS, use web search to find relevant content. The `discovery_searches` in `sources.yaml` define the queries.
- [ ] **Deduplication** — Ensure web-discovered items don't duplicate RSS-discovered items.

**Effort:** Large. Each sub-module is a meaningful piece of work. Trend analysis and decay checking have the highest immediate value.

---

## 5. Analytics

No way to know if anyone is reading the site.

**Tasks:**

- [ ] **Add analytics** — Integrate a privacy-respecting analytics tool. Options: Plausible (paid, privacy-first), Umami (self-hosted, free), or Vercel Analytics (built-in, basic).
- [ ] **Track key metrics** — Page views, top articles, topic popularity, referral sources.
- [ ] **Feed back into engine** — Longer term: use page view data to inform the planner about what readers care about.

**Effort:** Small for basic setup. Plausible or Vercel Analytics is a single script tag.

---

## 6. Newsletter

Weekly email digest of new content, timed to the Sunday publish batch.
**Free to sign up, always — no paid tier** (July 2026 decision, see the
revitalization plan): the list is the audience-building asset; revenue comes
later from sponsorship, never from charging subscribers.

**Tasks:**

- [ ] **Choose provider** — Buttondown (simple, developer-friendly) or Mailchimp (established, RSS-to-email).
- [ ] **Subscribe form** — Add to the site footer or homepage. Just an email input.
- [ ] **Weekly digest** — Auto-generate from the publish batch. Include titles, summaries, and links for the week's content.
- [ ] **Unsubscribe and GDPR** — Handled by the provider; the privacy policy page is live (update its §5 to name the provider when chosen).

**Effort:** Small to medium. The content is already structured for this.

---

## 7. Search

Client-side search across all content.

**Tasks:**

- [x] **Integrate Pagefind** — Installed as a dev dependency; `npm run build` now runs `pagefind --site dist` after the Astro build. Works in `preview`/production (not `astro dev` — the index isn't generated there).
- [x] **Search UI** — Dedicated `/search` page using the Pagefind default UI, themed with the brand palette; linked from the nav.
- [x] **Index configuration** — `data-pagefind-body` on the `ContentLayout` article so search returns content pieces (articles/curated/editorial), not nav/footer or listing pages. 20 content pages indexed.

**Effort:** Small. Pagefind is straightforward with Astro.

---

## 8. Amazon Affiliate Integration

Monetisation through book and educational toy recommendations, plus a deals
section for big-ticket parent kit (pushchairs/buggies, car seats, cots,
monitors) — see the revitalization plan Phase 6 for the editorial rules
(recommend what's genuinely good, dated prices, clear disclosure).

### Phase 1: Manual affiliate links
- [ ] **Sign up for Amazon Associates UK**
- [ ] **Add affiliate links to existing articles** — Several articles already recommend specific books (bereavement, anxiety, therapeutic parenting). Add Amazon links with the associate tag.
- [ ] **Affiliate disclosure** — Add a disclosure component to `ContentLayout.astro` that appears on any page with affiliate links. Required by Amazon and ASA.
- [ ] **Site Bible update** — Add monetisation guidelines to the protected Section 12: recommend what's good, not what pays well.

### Phase 2: Curated product pages
- [x] **Product content type** — Two data collections: `recommendations` (toys/books/gear/apps/finance) and `deals` (big-ticket kit, dated prices). Schemas in `site/src/content/config.ts`.
- [x] **`/recommended` section** — Category-grouped product pages, seeded with the three anxiety books already cited in articles. Plus a separate **`/deals`** section with an empty-state until real, dated deals are added.
- [x] **Product cards** — `ProductCard.astro` (handles both recommendations and deals), `AffiliateDisclosure.astro` (shows only when a live affiliate link exists), nav links, section heroes. **Go-live gate:** Amazon Associates signup is now the only gate — the privacy-policy page is live with real controller/contact details, and `AffiliateDisclosure.astro` carries the Amazon-required wording ("As an Amazon Associate, we earn from qualifying purchases"). See `docs/recommendations-and-deals.md`.

### Phase 3: Engine-generated recommendations
- [ ] **Product database** — Table in SQLite tracking recommended products, categories, and which articles reference them.
- [ ] **Writer integration** — Update writer instructions to include relevant product recommendations where editorially appropriate.
- [ ] **Revenue tracking** — Amazon provides reporting via the Associates dashboard. Longer term, correlate with article analytics to understand which content drives purchases.

**Effort:** Phase 1 is small (manual work, template change). Phase 2 is medium. Phase 3 is larger and depends on the engine being stable in production first.

---

## 9. Admin Dashboard (Phase 4)

Currently the only way to manage the engine is via CLI and direct database queries.

**Tasks:**

- [ ] **API layer** — FastAPI app exposing read-only endpoints: content inventory, pipeline status, token usage, source health.
- [ ] **Dashboard UI** — Simple web interface showing pipeline health, recent publishes, cost tracking, and source status.
- [ ] **Content browser** — View and search all published content, with links to the live site.
- [ ] **Manual actions** — Ability to trigger a pipeline run, approve/reject Bible amendments, manage sources.
- [ ] **Authentication** — Basic auth or token-based. Single admin user is sufficient initially.

**Effort:** Large. This is a separate application. Defer until the engine is stable in production and the need for manual intervention is clearer.

---

## 10. Site Polish

Lower-priority improvements to the site itself.

- [x] **Favicon and social images** — Create a favicon and default OG image for social sharing.
- [x] **404 page** — Custom not-found page.
- [x] **Loading performance** — Move Google Fonts from CSS `@import` to preloaded `<link>` tags in `<head>` to avoid flash of unstyled text.
- [ ] **Print styles** — Articles should print cleanly (hide nav, footer, tag chips).
- [ ] **Accessibility audit** — Check colour contrast, keyboard navigation, screen reader experience.
- [ ] **Dark mode** — Optional. The CSS variables make this straightforward to add.

---

## 11. Baby & Toddler Guides

Shipped July 2026 (see the revitalization plan note): `/baby` (weeks 1–12 +
months 3–12, feeding guides, health section) and `/toddler` (5 stages + 4
guides), 39 static pages over data modules in `site/src/data/`, with on-device
birth-date personalisation. Follow-ups:

- [ ] **Search indexing** — Pagefind currently indexes only ContentLayout
  pages; add `data-pagefind-body` to the guide pages so /search finds them.
- [ ] **Content re-verification cadence** — health guidance moves (the UK and
  US vaccination schedules both changed in 2025–26); diarise a quarterly
  re-check, or extend the Phase 3 decay checker to cover `site/src/data/`.
- [ ] **Homepage promo** — a section on the homepage introducing the guides
  (currently reachable via nav/footer only).
- [ ] **Commissioned artwork** — `baby` and `toddler` sectionArt entries are
  placeholder SVGs; add to the illustration brief.
- [ ] **Printables** — the guides are a natural base for the printable
  checklists mentioned in the Phase 6 funnel note.

**The app** (`/app`, shipped July 2026): standalone installable PWA — wizard
(name/birthdate/sex), daily Today screen (celebrations, hints, facts,
affirmations, feeding/games), in-app guide, multi-child, all data on-device.
App follow-ups:

- [ ] **Google sign-in setup (Mark)** — create an OAuth client ID (type: Web)
  in Google Cloud Console; authorised JavaScript origins:
  `https://yourkids.com` (and `http://localhost:4321` for local testing).
  Then set `PUBLIC_GOOGLE_CLIENT_ID=<id>` in Vercel env vars (and
  `site/.env`) and redeploy — the "Sign in with Google" button appears
  automatically. Until then the app shows "Get started" only.
- [ ] **Subdomain (Mark)** — when ready, add `app.yourkids.com` to the Vercel
  project and redirect/rewrite it to `/app` (the PWA scope/manifest work
  as-is at the path; revisit `start_url` if serving natively on the
  subdomain).
- [ ] **Service-worker cache version** — bump `CACHE` in `public/app/sw.js`
  if the app shell changes in a breaking way (network-first means normal
  deploys just work).
- [ ] **Homepage promo** — the app promo banners exist on /baby and /toddler;
  consider one on the homepage too.

---

## Suggested Order

| Priority | Task | Reason |
|----------|------|--------|
| Now | SEO setup | No point publishing content nobody can find |
| Now | Deploy engine to VPS | Pipeline needs to run unattended |
| Soon | Monitoring and alerting | Need to know when things break |
| Soon | Analytics | Need to know if anyone is reading |
| Next | Trend analysis + decay checker | Highest-value Phase 3 features |
| Next | Newsletter | Low-effort reader acquisition |
| Next | Amazon affiliate (Phase 1) | Revenue with minimal work |
| Later | Search | Nice-to-have, improves with more content |
| Later | Editorial synthesis | Needs more content volume to be meaningful |
| Later | Admin dashboard | Defer until manual intervention patterns are clear |
| Later | Competitive intelligence | Lower priority than own content quality |
| Later | Translation / multi-language | After games ship; needs i18n string layer + human review of translated health guidance |
