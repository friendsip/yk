# What needs doing next

*Written 17 July 2026. This is the distilled action list — the full detail
stays in `next-tasks.md` (section numbers referenced throughout). Update this
file as items complete; delete it when it's empty.*

---

## A. Fix-it-now (blockers, ~20 minutes total)

- [ ] **1. Give What the Word its Redis back** — games.yourkids.com currently
  can't start games (`FUNCTION_INVOCATION_FAILED`: the Upstash store vanished
  with the old, deleted `wtw` Vercel project; the recreated project has no
  env vars at all). Fix in the Vercel dashboard:
  **My Team → Storage → Create Database → Upstash for Redis** (free plan,
  an EU region) → **Connect Project → `wtw`** (all environments) → then
  **redeploy wtw** (Deployments → newest → ⋯ → Redeploy) so the function
  picks up the credentials. Verify: create a game on games.yourkids.com.
- [ ] **2. Commit + push the `yk` repo.** The working tree holds, unpushed:
  the **newsletter signup fix** (production signups still show the error
  message until this lands), the **four on-site games** (`/games/*`), the
  **`/admin` CMS**, the header-CTA scroll fix, privacy updates and docs.
  One push takes them all live.
- [ ] **3. Commit + push the `wtw` repo** (comment tidy-up + emptied `.env`
  files), and **delete the old Anthropic API key** at console.anthropic.com →
  API keys — nothing uses it any more, and it appeared in a local session log
  on 16 July. Deleting beats rotating.

## B. Activation switches (built features waiting on a key or account)

- [ ] **Newsletter live test** — after the push in A2, sign up on the
  homepage with your own email: expect the "check your inbox" message, a
  confirmation email from news.yourkids.com, and yourself in Buttondown as
  *unactivated* until you click. (§6 — everything else is already done:
  account ✓, sending domain ✓, API key in Vercel ✓.)
- [ ] **/admin sign-in** — works immediately after A2 with a GitHub
  fine-grained PAT (repo `friendsip/yk`, Contents read/write) pasted into
  "Sign In Using Access Token". For the nicer "Sign in with GitHub" button:
  create a GitHub OAuth App (callback `https://www.yourkids.com/api/callback`),
  add `GITHUB_OAUTH_CLIENT_ID` + `GITHUB_OAUTH_CLIENT_SECRET` to the Vercel
  project, redeploy. (§9.)
- [ ] **App sign-in gate** — create a Google OAuth client ID and set
  `PUBLIC_GOOGLE_CLIENT_ID` at build time; until then `/app` stays
  open-access. (§11.)
- [ ] **Article photos** — register an Unsplash app, put
  `UNSPLASH_ACCESS_KEY` in `engine/.env`, set `media.enabled: true` in
  settings.yaml. (§12.)
- [ ] **Amazon Associates** — sign up, add the tag to recommendation/deal
  entries; the disclosure component is already in place. (§8.)

## C. The big one: deploy the engine to the VPS

Nothing self-refreshing happens until this — no scanning, no weekly publish,
no data-maintenance reviews. The engine is hardened and tested (130 tests)
but has never run in production. Follow `engine/deploy/DEPLOY.md`
step-by-step (systemd service, healthcheck, backups, `gh` auth for the
reviewer's GitHub issues). (§2, §3.)

## D. Development queue (roughly in order)

1. **Weekly digest stage** in the engine — compose the Sunday email from the
   publish batch and send via Buttondown's API; the first four issues are
   planned in `newsletter-plan.md`. (§6.)
2. **Member backend + free-registration gating** — the FastAPI service with
   magic-link auth that owns the subscriber record and later gates games /
   sync / printables. The strategic centre of the audience plan. (§13.)
3. **Analytics** — pick a privacy-respecting tool, update privacy §3 first.
   (§5.)
4. **Small health-check fixes** — app wizard private-browsing crash, service
   worker `.ok` guard, checklist stable IDs, aria-live announcements. (§10.)
5. **Engine Phase-3 stubs** — editorial synthesis, trend snapshots,
   article-level decay, competitive intel, web discovery. (§4.)

## E. Where the detail lives

| Topic | Document |
|---|---|
| Everything, by area | `docs/next-tasks.md` |
| Honest state assessment | `docs/state-of-yourkids-2026-07-04.md` (+ addenda) |
| Newsletter content plan | `docs/newsletter-plan.md` |
| Engine VPS runbook | `engine/deploy/DEPLOY.md` |
| What the Word ops | `~/wtw/DEPLOYMENT.md` (subdomain + Redis + deploy) |
| Architecture ground truth | `CLAUDE.md` (root) |
