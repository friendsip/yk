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
- [x] **Pre-deployment hardening, round 3 (5 July 2026)** — the P0 engine items from `docs/state-of-yourkids-2026-07-04.md`: the weekly pipeline is stage-isolated so one LLM failure no longer skips the whole week (publish always runs; startup catch-up also fires on leftover staging); LLM retry now covers overloaded/5xx (`APIStatusError`/`InternalServerError`); the planner is bounded (`planner.max_candidate_items`, `triaged_item_ttl_days` expiry) with a `limits.daily_cost_usd_cap`; a file lock (`src/utils/lock.py`) prevents a second instance double-publishing; and **alerting** (`src/utils/notify.py`, email/webhook, off-by-default) fires on stage/publish/source failures. Engine tests 86 → 120.
- [x] **Deploy artefacts prepared** — `engine/deploy/`: `yourkids-engine.service` (systemd, auto-restart, journald), `healthcheck.py` (cron-friendly staleness check), `backup.sh` (WAL-safe DB backup + retention), and `DEPLOY.md` (the full provisioning runbook). **Provisioning itself is Mark's to run** — follow `engine/deploy/DEPLOY.md`.
- [ ] **Provision VPS (Mark)** — follow `engine/deploy/DEPLOY.md`: Python 3.11+, git, `gh auth login`, `engine/.env` (API keys + alerting secrets), enable the systemd service, add the healthcheck + backup crons, set `alerting.enabled: true` and a channel.
- [ ] **Environment variables** — Deploy `.env` with `ANTHROPIC_API_KEY` and `GITHUB_TOKEN`.
- [ ] **Database persistence** — Ensure `engine/data/yourkids.db` survives restarts and is backed up regularly (cron job copying to a separate location or cloud storage).
- [ ] **Log management** — Configure journald or file-based logging with rotation. The engine already logs to stdout.
- [ ] **Health check** — Simple script or endpoint to verify the engine is running and the last pipeline completed successfully.

**Effort:** Medium. Infrastructure work, no code changes to the engine itself.

---

## 3. Monitoring and Alerting

No visibility into whether the engine is working, failing, or overspending.

**Tasks:**

- [x] **Pipeline status monitoring** — `engine/deploy/healthcheck.py` checks last-run staleness (scanner >2h, no plan >8d) and exits non-zero + `notify()`s; run it from cron every 15 min per `DEPLOY.md`.
- [ ] **Token cost tracking** — The engine already logs token usage to the database. Build a simple report (daily/weekly cost summary) and alert if daily cost exceeds a threshold.
- [x] **Error alerting** — `src/utils/notify.py` (SMTP email or Slack/Discord webhook, config-driven, safe-by-default) fires on weekly-pipeline stage failures, publish failures, the cost cap, and repeated source failures. Enable via the `alerting:` block in settings.yaml + secrets in `.env`.
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

- [x] **Data maintenance review (July 2026)** — implemented tools-first: the
  weekly job re-checks the apps/tools/guides data against authoritative
  sources via LLM and raises GitHub issues with ready-to-run update prompts
  (see §11). Article-level decay below remains open.
- [ ] **Staleness check (articles)** — Query published content older than threshold. Use LLM to assess whether the content is still accurate given current information.
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

## 12. Article Photography (Unsplash) — built July 2026, needs an API key

The engine can now auto-illustrate articles with relevant, attributed Unsplash
photos: the writer emits an `image_search` hint, `src/media/illustrate.py`
resolves it via `src/media/unsplash.py`, and the site renders a photo hero with
the required "Photo by … on Unsplash" credit. Hotlinked (not re-hosted),
download-tracked, `content_filter=high`, and skipped on sensitive tags. **Off
until Mark enables it:**

- [ ] **Register an Unsplash application (Mark)** at
  https://unsplash.com/oauth/applications → copy the **Access Key**. Demo mode
  allows 50 requests/hour (plenty for a weekly batch of ≤5 articles); apply for
  production only if volume grows. Set the app's name to match
  `media.app_name` in settings.yaml (`yourkids`) — it's used in the required
  attribution UTM links.
- [ ] **Set `UNSPLASH_ACCESS_KEY` in `engine/.env`** and flip
  `media.enabled: true` in `engine/config/settings.yaml`, then redeploy the
  engine. Until both are done the feature is inert (articles keep their
  illustrations).
- [ ] **Review the first batch** — the weekly content PR will now include
  chosen photos + attribution; check tone/appropriateness before merging (the
  human PR gate is the safety net for auto-selected imagery).
- [ ] Optional later: extend to the tools/apps or curated cards; consider a
  self-hosted fallback if Unsplash CDN dependence ever becomes a concern.

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
  `site/.env`) and redeploy. **Setting the ID activates the sign-in
  REQUIREMENT** (decided July 2026): the app is gated behind Google sign-in,
  sign-out locks it, and the wizard stores first name + DOB only, on-device.
  Until the ID is set the app stays open-access ("Get started").
- [ ] **Subdomain (Mark)** — when ready, add `app.yourkids.com` to the Vercel
  project and redirect/rewrite it to `/app` (the PWA scope/manifest work
  as-is at the path; revisit `start_url` if serving natively on the
  subdomain).
- [ ] **Service-worker cache version** — bump `CACHE` in `public/app/sw.js`
  if the app shell changes in a breaking way (network-first means normal
  deploys just work).
- [ ] **Homepage promo** — the app promo banners exist on /baby and /toddler;
  consider one on the homepage too.
- [x] **Tools shipped (July 2026)** — `/tools`: baby age + corrected-age
  calculator, naps & wake windows guide, four interactive/printable
  checklists, NHS vaccination planner (Jan 2026 schedule, personalised dates
  + .ics download), and the UK childcare costs & funding explorer (all four
  nations' schemes, term-after start dates from the child's DOB, Coram 2026
  regional prices with the survey's cost-basis handled correctly, regional
  availability notes). All client-side, data in `site/src/data/tools/`.
- [x] **Tools maintenance register — automated (July 2026)** — the engine's
  data-maintenance reviewer (`engine/src/decay/checker.py`, register in
  `engine/config/data_maintenance.yaml`) runs every Monday 03:00: for each
  due artefact (9 registered — all tools, guides and app content, with
  calendar checkpoints for April rates, March Coram, Jan/Jul UKHSA changes)
  it fetches the authoritative sources, has the LLM compare them against the
  published data, and opens a GitHub issue with findings and a ready-to-run
  update prompt. Updates stay human-gated. Add new tools to the register.
  Needs `gh` authenticated on the VPS for issue creation. This also
  supersedes the manual "quarterly re-verification cadence" item above.
- [x] **Educational games section page (July 2026)** — `/games` live as a
  coming-soon teaser (classroom/group framing, coral accent, in nav +
  footer). Announced: circle-time games, quiz packs, co-operative mixed-age
  games, printable game cards. The actual games are revitalization-plan
  Phases 4–5; see the note there about classroom use vs the subscription gate.
- [x] **"What can we do today?" activity wheel (July 2026)** —
  `/tools/activities`: phone-app-style spinning wheel, 344 original
  activities across five age bands (1–3 to teens) and twelve categories,
  inside/outside toggle, deterministic daily pick + respins, share button,
  SEO/no-JS browse list. In the "Our Free Apps" nav menu and hub; in the
  data-maintenance register. See `docs/activity-generator-plan.md` for v2
  ideas (favourites, energy filters, per-band SEO pages, sibling mode).
- [ ] **More tools** — remaining ideas in `docs/app-ideas-research.md`:
  on-device feed/sleep logger, printable visual routine builder, first-foods
  lookup (needs clinical review), growth tracker (UK-WHO charts), due-date
  calculator.

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
