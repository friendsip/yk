# Next Tasks

> **Start here: [`next-steps.md`](next-steps.md)** — the distilled, dated
> action list (blockers → activation switches → development queue). This file
> holds the full detail behind it.

## Where We Are — status snapshot (15 July 2026)

A lot has shipped. This is the honest current picture; the numbered sections
below hold the detail. The companion health-check is
`docs/state-of-yourkids-2026-07-04.md` (with 5 & 7 July addenda).

**Live on yourkids.com** (everything up to the last push):
- The "Warm & Playful" redesign; 20 published articles.
- Baby & Toddler guides (`/baby`, `/toddler`) — weeks 1–12, months 3–12,
  feeding, health, toddler stages + guides.
- The Baby & Toddler **app** (`/app`) — installable PWA, on-device profiles.
- Five tools + the **activity wheel** (`/tools`), all phone-app styled, behind
  an "Our Free Apps" launcher.
- Educational-games teaser (`/games`); Recommended / Deals / Trusted Sites.
- SEO plumbing, a strict CSP + security headers, and a site test suite
  (42 vitest + a Playwright smoke run).

**Built but INERT until switched on** (see the numbered sections):
- **Newsletter signup with double opt-in** — Buttondown chosen; needs the
  account + `BUTTONDOWN_API_KEY` in Vercel, then sending-domain DNS (§6).
- App Google sign-in gate — needs a Google OAuth client ID (§11, app follow-ups).
- Unsplash article photos — needs an Unsplash API key (§12).
- Amazon affiliate links — need Associates signup (§8).

**Built but NOT deployed:**
- The whole editorial **engine** is hardened and production-ready (130 tests,
  alerting, deploy artefacts in `engine/deploy/`) but has **never run on the
  VPS** — so nothing auto-scans, auto-publishes, or auto-reviews the tool data
  yet. Deploying it (§2) is the highest-leverage outstanding action.

**Not started (the strategically important gaps):**
- **Weekly digest sending** (§6) — capture is built; the engine stage that
  composes and sends the Sunday email via Buttondown is not.
- **Free-registration gating + member backend** (§13) — the "free, but
  subscribed" value exchange; the FastAPI backend that later owns the
  subscriber list and carries the games gate.
- The **admin dashboard's engine-monitoring half** (content editing shipped:
  `/admin` CMS, 17 July — see §9), and the remaining engine Phase-3 stubs
  (synthesis, trends, article decay, competitive intel, web discovery).
  Games are done: four on-screen games + What the Word?! live at
  games.yourkids.com (17 July).

**Top 3 next actions:** (1) commit + push the working tree so the built
improvements go live; (2) create the Buttondown account, set
`BUTTONDOWN_API_KEY` in Vercel and the sending-domain DNS — signups open (§6);
(3) deploy the engine to the VPS.

What follows is everything outstanding, by area.

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

**Status (15 July 2026): signup capture is BUILT** — provider chosen
(**Buttondown**, Mark's decision), double-opt-in flow wired end to end. It goes
live the moment the Buttondown account exists and its API key is set. What
runs today:

- `site/api/subscribe.ts` — a Vercel serverless function (deployed from the
  `api/` directory alongside the static build) that creates the subscriber via
  the Buttondown API. Buttondown then sends the **confirmation email**; nobody
  joins the list without clicking it (double opt-in is Buttondown's default).
- The homepage band + footer link + header CTA all feed it. The form shows warm
  per-outcome messages (confirmation sent / already subscribed / try again),
  has a honeypot against bots, a same-origin check, and a no-JS fallback.
  Without the key it degrades to the honest "signups open very soon" message —
  so deploying this before the account exists is safe.
- Logic is unit-tested in `src/lib/newsletter.ts` (+ a Playwright smoke test);
  privacy policy §5 now names Buttondown and describes double opt-in.

**Mark's activation steps** (~30 min, no code):

- [x] Create the Buttondown account/newsletter (buttondown.com). ✅ 16 July 2026.
- [x] **Custom sending domain** — ✅ 16 July 2026: `news.yourkids.com`,
  delegated to Buttondown's Managed DNS (NS records verified pointing at
  ns1/ns2.onbuttondown.com). Emails will come from …@news.yourkids.com; pick
  the exact from-address in Buttondown's settings.
- [x] Copy the API key (Settings → API) into a `BUTTONDOWN_API_KEY`
  environment variable in the **Vercel project**. ✅ 16 July 2026.
- [x] Commit + push (`fab6464 newsletter`, 16 July 2026).
- [ ] **Un-pin the domain and redeploy** (found 16 July): www.yourkids.com is
  aliased to an old deployment (`yk-1ysi-quwgzsbti`) — new production builds
  complete but the domain doesn't follow them (a leftover instant-rollback /
  auto-assign pin). Also the API key was added ~20 min *after* the 18:01
  build, so no existing deployment has it. Fix: push the pending scroll fix
  (triggers a fresh build with the key), then in the Vercel dashboard →
  project **yk-1ysi** → Deployments → newest → ⋯ → *Promote to Production*
  (or undo the rollback banner if one shows). CLI equivalent from `site/`:
  `vercel ls yk-1ysi --scope my-team89` then `vercel promote <newest-url>
  --scope my-team89`.
- [ ] **Tidy the duplicate project**: a second Vercel project (`yk`) also
  builds every push of this repo but holds no domains and no env vars —
  consider deleting or pausing it to avoid double builds and confusion.
- [ ] **Test with a real signup** once the new deploy is serving: expect the
  confirmation email from news.yourkids.com, and the address showing in
  Buttondown as *unactivated* until confirmed.
- [ ] Note: Buttondown's API allows ~100 signups/day at first (rises with
  reputation) — plenty for launch; ask them to raise it if growth spikes.

**Content plan:** the first four issues are outlined in
`docs/newsletter-plan.md` (16 July 2026) — site intro + ideas ask, apps +
activity-wheel deep dive, Baby & Toddler app deep dive, Educational Games
intro.

**Still to build (the sending side):**

- [ ] **Weekly digest** — an engine `digest` stage that builds the email from
  the Sunday publish batch (titles, summaries, links; later a "game night pick"
  / tool highlight) and sends it via Buttondown's emails API using the same
  key. Structured content already exists.
- [ ] Later, the member backend (§13) takes ownership of the subscriber record
  and syncs to Buttondown — capture doesn't wait on it any more.

**Effort:** activation is Mark-only; the digest stage is small–medium engine
work.

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

- [x] **Content editing at `/admin` (17 July 2026)** — Sveltia CMS (self-hosted
  single script in `site/public/admin/`, v0.171.1) edits articles,
  recommendations and deals straight in the GitHub repo; each save is a commit
  as the signed-in user → Vercel rebuilds. Collections mirror
  `site/src/content/config.ts` — **keep `admin/config.yml` in sync when the
  schema changes.** Auth is a tiny OAuth bridge in `site/api/auth.ts` +
  `api/callback.ts` (pure logic tested in `src/lib/adminAuth.ts`); the token
  is handed to a static page via URL fragment so no inline scripts and no
  tokens in logs. `/admin` has its own CSP block in `vercel.json`, is
  `Disallow`ed in robots.txt and X-Robots-Tag noindexed.
  **Three sign-in modes:**
  1. *Local repository* — zero setup: open `/admin` (even on localhost),
     "Work with Local Repository", pick the `yk` folder; edits land in the
     working tree for a normal commit.
  2. *Access token* — zero setup in prod: paste a GitHub fine-grained PAT
     (repo `friendsip/yk`, Contents read/write).
  3. *Sign in with GitHub* — nicest; needs Mark to create a **GitHub OAuth
     App** (Settings → Developer settings → OAuth Apps: homepage
     `https://www.yourkids.com`, callback `https://www.yourkids.com/api/callback`)
     and set `GITHUB_OAUTH_CLIENT_ID` + `GITHUB_OAUTH_CLIENT_SECRET` in the
     Vercel project env, then redeploy.
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
- [ ] **Print styles** — Articles should print cleanly (hide nav, footer, tag chips). (Checklists already print cleanly.)
- [ ] **Accessibility audit** — Check colour contrast, keyboard navigation, screen reader experience.
- [ ] **Dark mode** — Optional. The CSS variables make this straightforward to add.

**Open findings from the 4 July health-check not yet actioned** (all
low/medium — none block, but worth a cleanup pass):

- [ ] **App wizard crash in private browsing (H2)** — `finishWizard()`
  dereferences `activeChild()!` after a swallowed localStorage write; in
  storage-blocked contexts it throws at the final step. Add a null-guard.
- [ ] **App fetch error paths (M2)** — `getDaily()`/`getStage()` in
  `src/pages/app/index.astro` have no `res.ok`/catch, so one failed first-visit
  fetch leaves the Today screen blank. (The activity wheel was hardened; the app
  wasn't.)
- [ ] **Service worker caches error responses (M1)** — `public/app/sw.js`
  `cache.put()`s every response; guard on `response.ok` so a transient 500
  during a deploy isn't served offline afterwards.
- [ ] **Checklist tick-state keyed by array position (M5)** — still
  `${sectionIndex}-${itemIndex}`; editing `checklists.ts` shifts saved ticks
  onto the wrong items. Give items stable IDs.
- [ ] **App/tool screen-reader announcements (M8)** — no `aria-live` on spin
  results, checklist progress, age results, or wizard errors; selection state
  is class-only. Add `aria-live`/`aria-pressed`.
- [ ] **Contrast (M8)** — `--app-ink-faint` and small coral kicker text fall
  below WCAG AA; nudge the tints.
- [ ] **Homepage app promo** — the app is only reachable via nav/footer; add a
  homepage section introducing it.
- [ ] **Self-hosted fonts + Search Console submission + commissioned artwork**
  — carried over from the Phase 1 design work.

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
(first name + date of birth only, on-device), daily Today screen (celebrations,
hints, facts, affirmations, feeding/games), in-app guide, multi-child, all data
on-device. App follow-ups:

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
- [x] **Educational games section page (July 2026)** — `/games` live
  (classroom/group framing, coral accent, in nav + footer).
- [x] **Four on-screen games shipped (17 July 2026)** — Mark's ykgames
  prototype ported into the site proper: `/games/circle-time` (Buzz!, Odd One
  Out, Chain Reaction, Make the Number), `/games/quiz` (6 packs × 10
  questions), `/games/coop` (Find It Together, Story Circle, Copy Cat Crew),
  `/games/print` (print-and-play cards for all of them). Engines live in
  `site/src/lib/games/` (data + common helpers + per-game modules, all
  client-side; best scores via `lib/storage`), styling in `games.css` on top
  of the app skin, pages on ToolAppLayout (indexable, JSON-LD). 6 data tests
  (incl. a makeIdeas arithmetic sweep) + a quiz e2e flow. Privacy §3a covers
  best scores. **Maintenance:** quiz facts are slow-moving general knowledge —
  not in the decay register (no authoritative URLs to diff); give the packs a
  human skim ~annually when refreshing content.
- [x] **First game: What the Word?! (16 July 2026)** — the standalone `wtw`
  project (same Vercel team) reskinned to the YourKids design and made
  classroom-safe: hand-vetted word packs (13 categories × 3 difficulties,
  ~860 words) replaced live LLM word generation; party/politics categories
  dropped; "your word list" mode kept for teachers; team-name nudge;
  adaptive polling (halves Redis load); YourKids bar + exit link on every
  screen. Featured on `/games` + launcher tile; privacy §3b covers it.
  ✅ **LIVE at games.yourkids.com (17 July 2026)** — Squarespace CNAME →
  Vercel, cert issued, reskinned deploy serving. Still outstanding:
  rotate/remove the now-unused `ANTHROPIC_API_KEY` (it leaked into a local
  session log on 16 July — rotate at console.anthropic.com), and consider
  git-connecting the `wtw` Vercel project so pushes auto-deploy.
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

## 13. Free-registration gating & the member backend

*The "free, but subscribed" value exchange (revitalization plan, principle 2)
and the foundation the newsletter (§6) and future games gate all sit on. Not
started.*

**Where it stands today.** There are two *lightweight, client-side* gates
already, but no real accounts:

- The **app** (`/app`) has an optional client-side Google sign-in that, once a
  client ID is set, is *required* to open it — but this is a courtesy gate:
  it stores only a display name on-device, there is no server record, and
  signing out just locks that device. Children's data never leaves the device
  (a deliberate GDPR choice — see the memory note and privacy §3a).
- Everything else (guides, tools, wheel, games teaser) is fully open.

**What "gating access until users register for free" actually requires** — a
small backend, because a genuine free account has to persist server-side:

- [ ] **Decide the mechanism.** Either (a) the roadmap's own **FastAPI member
  backend** (Phase 2: `subscribers`, magic-link `auth_tokens`, `entitlements`
  tables; endpoints `POST /subscribe`, `/auth/magic-link`, `/auth/verify`,
  `/me/entitlements`), or (b) lean on a managed service (Supabase/Firebase
  auth + a newsletter provider) to avoid running auth ourselves. The plan
  assumes (a), co-located with the engine on the VPS.
- [ ] **Passwordless magic-link auth** — suits a parent audience, no passwords
  to store, and the same session later carries paid-tier entitlements.
- [ ] **`isMember()` client helper** (`site/src/lib/member.ts`) — the gate is
  a UX layer + entitlement check over statically-built pages, not DRM (fine
  for free content).
- [ ] **Decide WHAT gets gated.** Candidates: the games area, "save/sync my
  child across devices", saved favourites, printables. Deliberately keep the
  guides + core tools ungated (they're the SEO funnel). **Open question flagged
  in the revitalization plan:** classroom/group games sit awkwardly behind a
  per-parent gate — those may need to stay ungated or use a lighter code.
- [ ] **GDPR before launch** — storing an email (and any synced child data)
  server-side is a real step up from today's on-device-only posture: privacy
  policy rework, consent + double opt-in, deletion/rights handling, ICO fee.
  Bible §14 (protected) needs explicit sign-off. Contract, not consent, is the
  cleaner lawful basis where a feature genuinely needs the data to work.

**Relationship to the newsletter (§6):** newsletter *capture* now goes
straight to Buttondown via `site/api/subscribe.ts`, so it no longer waits on
this backend. When the backend arrives it takes ownership of the subscriber
record (syncing to Buttondown) so one sign-in can carry newsletter +
entitlements together. This remains the biggest single not-started build, and
the strategic centre of the audience-building plan.

**Effort:** Medium (the backend itself), then small per gated feature.

---

## Suggested Order (refreshed 15 July 2026)

Done since the original list: SEO plumbing, Search (Pagefind), the engine
hardening + monitoring/alerting + deploy artefacts, and the whole guides / app
/ tools / activity-wheel surface.

| Priority | Task | Reason |
|----------|------|--------|
| **Now** | Commit + push the working tree | The built improvements (CSP, tests, tool fixes, Unsplash, engine hardening) aren't live until pushed |
| **Now** | Deploy engine to VPS (§2) | Nothing auto-runs until this — no publishing, no data-maintenance review |
| Now | Activate: Buttondown account + key (§6), Google OAuth key (§11), Unsplash key (§12), Amazon Associates (§8) | Four built features flip on with a key each — Buttondown opens newsletter signups |
| Soon | Weekly digest engine stage + member backend (§6, §13) | The list is the asset; the backend also carries free-registration gating |
| Soon | Analytics (§5) | Need to know if anyone is reading |
| Soon | Health-check cleanup (§10 open findings) | Small; wizard null-guard, SW `.ok`, checklist stable IDs, a11y |
| Next | Trend analysis + article-level decay (§4) | Highest-value remaining Phase 3 engine features |
| Next | More free tools (§12/app-ideas) | Feed/sleep logger, first-foods lookup, growth tracker |
| Later | Games proper + admin dashboard (§9) | Depend on the member backend |
| Later | Editorial synthesis, competitive intel, web discovery | Engine Phase 3/4 stubs; need volume first |
| Later | Translation / multi-language | After games ship; needs an i18n string layer + human review of translated health guidance |
