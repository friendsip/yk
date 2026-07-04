# "What can we do today?" — Activity Generator Plan (July 2026)

> **Status: shipped 4 July 2026** at `/tools/activities`, with two amendments
> from Mark: the content brief broadened well beyond the original source list
> (board games, quizzes, kitchen science, song-making, book-making,
> photography, crafts, sports — 344 activities across 12 categories), and the
> page is styled as a standalone phone-app experience (the Baby & Toddler
> app's design world), not a site tool page. In the "Our Free Apps" menu and
> hub; registered in the data-maintenance register. v2 ideas below remain
> open.

A fun, mobile-first inspiration tool: pick your child's age, flick the
inside/outside toggle, spin the wheel, get a genuinely good activity — with a
fresh "today's idea" every day. Free, no account, works offline-ish, attacks
the Kinedu/BabySparks paywall model with hundreds of free ideas.

## Where it lives

**`/tools/activities`** on the main site (not inside the baby app):

- The age range runs to **teens**, well beyond the app's 0–3 scope.
- Static + indexable = SEO surface ("activities for 4 year olds indoors" is a
  big search family), consistent with the tools strategy.
- The app's Today screen later gets a "Need an idea? Spin the wheel →" link
  with the child's age pre-selected (query param) — the app stays the daily
  habit, the wheel serves everyone.

## The experience (mobile-first)

1. **Age chips** — six bands: 1–2 · 2–3 · 3–5 · 5–8 · 8–12 · teens (13–16).
   Remembered on-device; if the baby app's profiles exist we pre-select the
   right band for the active child.
2. **Setting toggle** — Inside / Outside / Don't mind (three-state pill).
3. **The wheel** — a colourful SVG wheel whose ~10 segments are activity
   *categories* (get moving, make-believe, messy, quiet-time, kitchen,
   crafty, explore, science-y, water, games), each with an emoji. Tap
   **Spin** → springy rotation → lands on the picked activity's category →
   the activity card pops in below with a little confetti. The wheel is
   theatre; the real selection comes from the full filtered pool.
4. **Today's idea** — the first result each day is deterministic (seeded by
   date + age band + setting, same pattern as the app's daily rotation) and
   badged "Today's idea". **Spin again** gives fresh random picks without
   repeats until the pool is exhausted. Tomorrow brings a new default.
5. **The activity card** — title, 1–3 friendly steps, what you need (biased
   to "nothing" or household stuff), age fit, a safety note where warranted,
   and a **Share** button (`navigator.share` on mobile, copy-link fallback).
6. **Accessibility & no-JS** — `prefers-reduced-motion` skips the spin
   (instant result); without JavaScript the page renders the full activity
   list grouped by category — which doubles as the crawlable SEO content.

## Content plan — the real work

Target: **≈320 original activities** (~50–55 per band), each band split
roughly half inside / half outside (plus "either").

Schema (`site/src/data/activities/types.ts`):

```ts
interface Activity {
  id: string;
  title: string;              // "Sock-pair Olympics"
  how: string[];              // 1–3 short, warm steps
  ageFromYears: number;       // inclusive
  ageToYears: number;
  setting: "inside" | "outside" | "either";
  category: "get-moving" | "make-believe" | "messy" | "quiet" | "kitchen"
          | "crafty" | "explore" | "science" | "water" | "games";
  materials: string;          // "nothing", "paper + pens", "a torch"
  parentEnergy: "low" | "medium" | "high";
  safetyNote?: string;        // choking, water, road, online — only where real
}
```

One data file per band (`toddler.ts`, `preschool.ts`, `early-school.ts`,
`tween.ts`, `teen.ts`), written by **three parallel research agents**:

1. **1–5s** (toddler + preschool, ~110 activities) — heuristic sources: NHS
   Start for Life play ideas, CBeebies-style games, Raising Children Network;
   reuse the tone (and avoid duplicating the content) of our existing
   toddler-stage games and easy-games guide.
2. **5–12s** (early school + tween, ~110) — den-building, garden science,
   scavenger hunts, card/word games, kitchen experiments, Scouts/Guides-style
   activity ideas rewritten originally.
3. **Teens** (~55, hardest to get right) — non-cringe framing: things to do
   *together* that teenagers won't hate (cook-off challenges, photo walks,
   two-player games, film-club night, learn-a-thing-together) plus
   low-supervision solo boredom-busters. Plus a cross-band QA pass rule for
   all agents: original wording only (ideas aren't copyrightable, text is),
   British English, budget-of-zero bias, no screens-shaming.

Safety rules baked into the agent prompts: choking-size awareness under 3,
water supervision always, road/stranger sense for outside tween/teen
activities, no dangerous "challenge" formats.

## Technical plan

- **Data**: files above + `site/src/pages/tools/activities/data/[band].json.ts`
  endpoints (same pattern as the app's stage JSON) so the page loads light and
  fetches one band at a time.
- **Page**: `site/src/pages/tools/activities/index.astro` — server-renders the
  full list (SEO/no-JS), client script hides it and mounts the wheel when JS
  is available. Wheel = inline SVG segments + CSS transform rotation with
  `cubic-bezier` easing; result card animates in; confetti reuses the
  celebration pattern. Styles in `global.css` under the tools section, using
  the Warm & Playful tokens (the wheel gets the full coral/teal/sand tint
  family — this page is allowed to be the playful end of the spectrum).
- **State** (localStorage): `yk-activity-band`, `yk-activity-setting`,
  `yk-activity-seen` (session respin dedup). Reads `yk-app-children` to
  pre-select a band when a profile exists.
- **Daily determinism**: `pick = pool[hash(dateString + band + setting) % pool.length]`
  — same helper approach as the app's daily cards.
- **Integration**: tools hub card + `/tools` index entry; footer stays as-is;
  app Today screen gets the "Spin the wheel" link (with `?age=` param) in a
  small follow-up edit; add the activities data to the **data-maintenance
  register** (365-day cadence — evergreen content, safety refs re-checked
  annually).

## Not in v1 (noted for later)

- Favourites ("save this one"), energy/time filters (the data carries the
  fields, so filters are a UI-only addition later).
- Per-band static SEO pages ("50 indoor activities for toddlers") rendered
  from the same data — high-value follow-up.
- Engine-generated seasonal packs (fits the roadmap's future `game_content`
  stage; the register + schema make this drop-in).
- Sibling mode (two age bands at once → activities that work for both).

## Verification

Build (should be ~90 pages); browser walkthrough at 390px: band select →
toggle → spin lands and matches category → "Today's idea" badge → spin-again
non-repeating → same-day determinism on reload → reduced-motion instant
result → no-JS list renders → share button; then desktop coherence check and
screenshots to Mark.

## Estimate

One focused session: research agents run in parallel (~30–45 min) while the
wheel/page is built; verify and ship the same day.
