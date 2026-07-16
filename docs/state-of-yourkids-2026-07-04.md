# State of yourkids.com — Honest Assessment

> **Addendum — 5 July 2026: P0 consolidation done.** The consolidation pass
> recommended below has been carried out:
> - **Site logic extracted to tested `src/lib` modules** — `dates.ts`,
>   `ics.ts`, `childcare.ts`, `activities.ts`, `storage.ts` — with **42 vitest
>   unit tests** and a **4-test Playwright smoke suite** (`npm test`,
>   `npm run test:e2e`). Test quality for the site: **F → C+** (the core maths
>   is now covered; the DOM glue is smoke-tested, not unit-tested).
> - **ICS off-by-one fixed** (H1) with a regression test; the `.max`
>   date-input and daily-rotation UTC bugs (M3) fixed at source; the childcare
>   `£0` and month-granularity bugs (M4) fixed; the wheel dead-end and
>   silent-fetch failures (M2) hardened.
> - **45 MB of dead images deleted** (H4).
> - **Engine P0 done** (F1/F2): the weekly pipeline no longer fails silently
>   (stage isolation + publish-always + staging catch-up), the LLM retry
>   covers overloaded/5xx, the planner is bounded (candidate limit + stale
>   expiry + daily cost cap), a process lock prevents double-publish, and
>   **alerting** (email/webhook) is wired in. Engine tests **86 → 120**.
> - **VPS deploy artefacts prepared** in `engine/deploy/` (systemd unit,
>   healthcheck, backup, and `DEPLOY.md` runbook). The actual provisioning is
>   Mark's to run — see that runbook.
>
> **P2 done (7 July):** a Content-Security-Policy + security headers
> (`site/vercel.json`) — strict `script-src 'self' 'wasm-unsafe-eval'` (all
> inline scripts externalised; empirically verified that Pagefind/search,
> fonts and the tools still work under it, with Google sign-in and Unsplash
> origins pre-allowed for when they're enabled); the two self-XSS interpolations
> (M6) now escaped; and the SEO/crawl gaps (L1/L2) closed — `/app` removed from
> the sitemap, `WebApplication` JSON-LD added to every tool page, and Pagefind
> now indexes the guides too (**20 → 56 pages**).
>
> Remaining (not yet done): the engine's self-defeating scanner failure counter
> — now surfaced via alerting, but the counter logic itself (F6) is unchanged.
> The engine is ready to deploy.

**Date:** 4 July 2026
**Scope:** the Astro site + PWA/tools, and the Python editorial engine (content
generation, curation, and the data-maintenance reviewer).
**Method:** two independent fresh-eyes code reviews (engine, site) with
file:line evidence, plus direct verification of the headline findings and the
build/test numbers below. This is an internal health-check, written to be
useful rather than flattering.

---

## TL;DR

The project has gone from a clean content site to a genuine multi-app estate
in about a week, and the ambition has paid off: the guides, the daily
companion app, five tools, the activity wheel, a self-maintaining data
reviewer, and a full visual redesign are all live or ready. The engineering is
better than most one-week sprints — the engine's security hardening is
genuinely good, and the client apps are careful about privacy and escaping.

The honest problem is a **testing and observability gap that has grown with the
surface area**. The site now runs ~2,000 lines of untested inline TypeScript
doing date maths, financial estimates and health scheduling, and the engine's
biggest risk has shifted from "the LLM could escape its sandbox" (largely
closed) to "the weekly pipeline could fail silently and nobody would know". The
next fortnight should be consolidation, not new surface.

### Grades

| Area | Engine | Site |
|---|---|---|
| Correctness | B | B− |
| Security | B+ | B |
| Code quality | B− | C |
| Test quality | C+ | **F (none)** |

The site's F is not "weak tests" — it is **zero automated tests**. That single
fact is the most important line in this report.

---

## By the numbers (verified 4 July)

- **Engine:** ~2,950 lines Python, **86 tests passing** (3.1s, 0 failures).
- **Site:** 48 Astro pages, ~5,250 lines of `.astro`; **89 pages** build clean
  in ~2.3s; ~11,900 lines of TypeScript data modules; ~4,100 lines of CSS
  across three stylesheets; **0 automated tests**.
- **Content:** 20 published articles; ~344 activities; ~260 daily app items;
  the Baby (weeks 1–12 + months 3–12), feeding, health and toddler guides;
  five tools; all source-verified in the last two weeks.
- **Deploy:** live at www.yourkids.com and current, except today's
  app-styling work which is still in the working tree. **The engine has never
  been deployed** — it only runs when triggered by hand.

---

## What's genuinely good

- **The engine's security hardening is real and well-built.** Untrusted
  scraped content is fenced at every LLM call site (triage, planner, writer,
  editor, data reviewer), with an actual prompt-frame breakout test. LLM-chosen
  file paths are reduced to safe flat filenames (no traversal/absolute writes).
  Publishing is git-first (DB records only after git succeeds) and defaults to
  PR mode so a human gates every content change. This is the right threat model,
  competently executed.
- **The self-maintaining data reviewer is a standout idea.** A weekly job
  re-checks every tool/guide/app data file against its authoritative sources and
  opens a GitHub issue with a ready-to-run update prompt when something drifts —
  the childcare rates and vaccination schedule watch themselves. Human-gated,
  rate-limited, honestly scoped.
- **The client apps respect the privacy promise.** Verified: children's data
  never leaves the device; the Google sign-in is client-side and contained;
  the policy matches the code.
- **The childcare estimator is more honest than most commercial ones** — it
  correctly handles the Coram survey's "full-time price is already after funded
  hours" quirk, the term-after start rule, and the TFC cap.
- **Accessibility basics that are often skipped are present:** reduced-motion is
  genuinely handled (confetti/wheel/scroll-fade all gated), no-JS fallbacks
  exist, and the tool pages are keyboard-operable.
- **The content is well-sourced and warm**, and the "Warm & Playful" redesign
  reads as a coherent, friendly brand.

---

## What needs improvement — prioritised

### P0 — do before adding any new surface

1. **Add a test safety net to the site (currently zero).** The maths that most
   needs it is inlined in `.astro` script blocks and can't even be imported.
   Extract the shared logic into `src/lib` modules (age/date maths, the
   childcare estimator, `termStartAfter`, ICS generation, wheel selection) and
   add a small **vitest** unit suite + **one Playwright smoke test** (wizard →
   today; spin the wheel; run a childcare scenario). The build passing only
   means it compiled — a wrong £ figure would ship unnoticed for months.

2. **Fix the vaccination ICS off-by-one date (verified real).**
   `tools/vaccinations.astro` builds due dates at *local* midnight but
   serialises with `toISOString()` (UTC) — a BST/UTC+ birth writes every
   calendar event **one day early** (on-screen dates are correct, so it ships
   silently). On a health tool this is the worst possible page for it. Format
   the date from local Y/M/D parts instead.

3. **Engine: stop the weekly run failing silently.** A single LLM error at
   Sunday 05:00 aborts the whole pipeline *and* skips the publish step, and the
   only signal is a stdout log line. Wrap `run_daily_pipeline` stages so a
   planner/writer failure still attempts publish; broaden the LLM retry to
   include `APIStatusError`/overloaded; and add **any** alerting (even an email
   on failure) before VPS deployment.

4. **Engine: bound the planner prompt.** `get_triaged_items_for_planning` has
   no limit and items stay `triaged` until planned, so the prompt grows every
   week; past a point the response truncates, the plan fails to parse, nothing
   gets planned, and the backlog *grows* — a self-amplifying failure plus an
   uncapped token bill. Add a limit + stale-item expiry + a cost cap (usage is
   logged but nothing reads it).

### P1 — soon

5. **Delete the 45 MB of unreferenced images (verified).**
   `public/illustrations/larger/` is 45 MB of a 50 MB dist (single files up to
   7.4 MB), referenced only by a code comment — uploaded on every deploy. Also
   add width/height to the injected `<img>`s (layout shift) and consider
   `astro:assets`.

6. **Fix the silent-corruption data-keying bugs.** Checklist tick-state and app
   state key off array *position*, so editing a data file shifts saved progress
   onto the wrong items. Give checklist items and (where used) activities stable
   IDs.

7. **Harden the app's error paths.** The wizard dereferences a possibly-null
   child after a swallowed localStorage write (crashes in private browsing at
   the final step); `getDaily()`/`getStage()`/the wheel's `pool()` have no
   `r.ok`/catch, so one failed first-visit fetch leaves a blank screen — and the
   wheel's `spinning` flag never resets, dead-ending every later spin. Add
   `.ok` checks, catches, and a null-guard.

8. **Engine: fix the self-defeating scanner failure counter.** A parse-level
   feed failure increments then immediately resets the counter, so the
   "3 consecutive failures" warning is unreachable for that class. Wire the
   planner's hardcoded `max_daily`/`min_score` to settings while you're there.

9. **Service worker: only cache `response.ok`.** It currently caches error
   pages, so one transient 500 during a deploy becomes the offline fallback.

### P2 — hygiene / debt

10. **Consolidate duplication.** `hashStr`, `load`/`save`, `ageDays`, `esc`,
    confetti and the `yk-*` localStorage keys are copy-pasted across 3–4 pages
    (and `lib/childAge.ts` exists but the tools hardcode the keys instead of
    importing it). One `src/lib/toolKit.ts` erases most of it. Split the
    900-line app page and 600-line wheel page.
11. **Two parallel design systems.** ~250 lines of the old tool CSS in
    `global.css` are now dead (the tool pages moved to `app-tools.css`, which
    reimplements the same class names) — a restyle of one will silently miss the
    other. Delete the dead block.
12. **Add a CSP** (`vercel.json`) — with 20+ `innerHTML` sinks and an injected
    Google script, one header turns every future escaping slip from XSS into
    nothing. Fix the two known self-XSS slips (unescaped feeding-mode label and
    raw `c.id` in a `data-` attribute) regardless.
13. **Engine dead config is misleading.** Whole `settings.yaml` blocks are never
    read (`scheduling.publish`, `trend_snapshot`, `bible_reflection`,
    `trends.*`, `synthesis.*`, most `publishing.*`, the extra triage
    thresholds), plus a dead migration constant and an unused `respx` dep. It
    reads as if features exist that don't. Prune or wire.
14. **Second-order (LLM→LLM) injection seam.** Planner-produced `instructions`
    are embedded unfenced into the writer/editor prompts. Human PR review is the
    backstop, and flipping `publishing.mode` back to `auto` removes the entire
    output-side defence with one config line — worth a code-level guard or at
    least a loud comment.
15. **SEO/crawl gaps on the app-styled tools.** They dropped site nav, so
    they're near crawl dead-ends with no JSON-LD; `/app` is both `noindex` and
    in the sitemap (contradictory); Pagefind indexes only the 20 article pages,
    so the guides/tools/activities are invisible to the site's own search.

---

## Security posture (summary)

**Engine: B+.** Input fencing and path handling are exemplary for the threat
model. Residual: second-order LLM injection (unfenced inter-stage text), SSRF
via feed-controlled URLs the scanner fetches on the VPS (no scheme/private-IP
filter), and an output-side defence that is one config line from disappearing.
No secrets in logs; `.env` gitignored; subprocess uses list-form args, no shell.

**Site: B.** No remote-XSS path found; escaping is *mostly* disciplined and the
unverified Google JWT is properly contained (display-only, nothing trusts it).
Docked for: no CSP anywhere, two self-XSS slips that break the file's own
escaping rule, and the service worker caching error responses. The
`set:html={JSON.stringify(...)}` data islands are safe today but a `</script>`
foot-gun tomorrow.

---

## Test quality (the honest part)

**Engine: C+.** The 86 tests are meaningful and adversarial, not happy-path
theatre — git-failure crash safety, prompt-frame breakout, path-traversal
rejection, triage attempt caps, catch-up scheduling. Crucially, the *hardened*
surfaces are the *tested* surfaces. The gap: `git.py`, `llm/client.py`,
`extractor.py`, and `main.py` orchestration have **0%** coverage, migrations are
tested only on fresh DBs, and the one live availability bug found (silent weekly
skip) sits squarely in untested `main.py`.

**Site: F.** No unit tests, no integration tests, no e2e specs, no CI. The only
gate is TypeScript compilation. Verification to date has been manual Playwright
during development — good for catching what you look for, useless as regression
protection. This is the single highest-leverage thing to change.

---

## Operational readiness (engine → VPS)

**Not ready for unattended operation.** Missing: alerting (a dead week is a log
line), cost caps, source auto-deactivation, a process lock (two instances would
double-publish), and deployment artefacts (no systemd unit or Dockerfile).
Present and good: WAL SQLite with per-call connections + lock, idempotent
auto-run migrations, cron misfire-grace + coalesce, and startup catch-up for a
missed week (though it keys on plan-creation time, so a plan-made-but-publish-
failed week is invisible to it — see P0 #3). Honestly-declared stubs remain:
article decay, editorial synthesis, trends, competitive intel, web discovery.

---

## Suggested sequence

1. **Consolidation fortnight (P0):** extract site logic to `src/lib` + vitest +
   one Playwright smoke test; fix the ICS date bug; add engine failure-handling
   + alerting + planner bound; delete the 45 MB image dir.
2. **Then deploy the engine to the VPS** (it is otherwise ready, and deploying
   is what makes the self-maintaining reviewer actually run) — with the
   monitoring from step 1 in place.
3. **Then resume new surface** (feed/sleep logger, first-foods lookup, the
   remaining Tier-2/3 tools), on the firmer footing.

The instinct to keep shipping is right — the product is genuinely taking shape.
This is the moment to spend a fortnight making the existing surface trustworthy
before doubling it again.
