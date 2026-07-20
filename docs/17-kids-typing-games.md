# 17 — Kids' Typing Games for YourKids.com

A design + build record for a **new, kid-focused typing game** (or small
family of them) branded for **yourkids.com** — completely separate from the
mutant theme. It captures four game concepts and, more importantly, exactly
how to build one by reusing the engine and hard-won lessons from *Night of
the Living Mutant* (NotLM) and *Mutant Invaders*.

> **Status:** design only — nothing built yet. This doc is the brief.

---

## 1. Brand fit (why this shapes the build)

YourKids.com is a **parent-first, evidence-based, warm-and-honest**
parenting resource (Health, Family Life, Education, Safety, Good News,
Special Needs), with an "Educational games" section and age-banded content
(baby week-by-week, toddler guide). It currently has **no mascot**.

Consequences for the game:

- **Parents are the buyers/gatekeepers.** The game must *look* wholesome and
  *be* genuinely educational, and it should surface progress to parents.
- **A "parent progress view" is the killer feature** and a perfect brand
  fit: we already track per-key accuracy and speed, so we can honestly
  report "Emma has mastered `a s d f`, is working on `e` and `i`, types 12
  WPM." Evidence-based and non-judgemental — exactly the site's voice. No
  free kids' typing game does this well.
- **This is a chance to create YourKids' first character** (a mascot that
  can grow site-wide).
- **Zero wemutate/mutant branding.** New entry point, new palette, new name.

---

## 2. The four concepts

Ranked by recommended build order. All reuse the same typing core (§3).

### 2.1 Letter Garden — ages 4–7 (**build first**)

Typing grows things. Each letter is a seed: type it → a flower pops up with
a *boing*; finish a word → it blooms into something bigger (sunflower,
butterfly, ladybird that trundles across the screen). A session ends with
"your garden today" — a picture the child *made* by practising, with a
save/print button for the fridge. **No enemies, no timer, nothing to lose;
the only direction is more garden.**

- **Curriculum:** strict letter progression — home row first (`f j`, then
  `d k`, `s l`, `a ;`…), one new letter at a time, words only once the
  needed letters are known. Re-serve fumbled letters (per-key heatmap).
- **Graphics:** storybook-bright, big flat blossoms, round bumblebees, fat
  friendly outlines, sky gradient that advances morning→sunset over a
  session. Mascot ("Wiggle" the worm/gnome) introduces each new letter.
- **Why first:** youngest entry point (where YourKids' audience starts),
  strongest "show mum" factor, technically simplest, mascot seed.

### 2.2 Rainbow Rescue Rocket — ages 6–9 (the adventure/graduation game)

A friendly rocket flies through candy worlds (Cloud Kingdom, Jelly Jungle,
Star Sea) rescuing animals: each floats in a bubble carrying a word; type it
→ bubble pops → animal slides down a rainbow into the rocket. Rescued
animals fill a **sticker-album collection** (retention loop). Soft failure:
miss too long and the bubble drifts away to return later — never a loss.

- **Direct descendant of the rail-game tech:** travel between worlds =
  travel segments; bubbles of words = encounters. Swap the dark corridor for
  sky. See doc 12; most of it transfers.
- **Graphics:** the showcase — parallax worlds, glowing bubbles, rainbow
  trails, ~20 collectible animals each with a happy dance.

### 2.3 Word Chef — ages 6–10 (typing makes lunch)

Run a café for animal customers. A bear orders pancakes: type `flour`,
`egg`, `milk` → ingredients hop into the bowl; finish the recipe → the dish
assembles and the bear wiggles. Levels are menus; customers/cuisines
unlock. **Cross-content hook unique to YourKids:** pull recipe words from the
site's real "cooking with kids" articles.

- **Graphics:** cosy kitchen palette, plump food, steam curls, expressive
  customer faces.

### 2.4 Deep Sea Post Office — ages 5–8 (the calm one)

A submarine delivers letters (the pun) to sea creatures. Each envelope shows
a word; type it → the letter floats down to an octopus who beams. Slow,
soothing, ambient — deliberately the **calm, no-stress** typing game (a
differentiator parents search for; fits "never judgemental").

- **Graphics:** glowing teal/coral underwater world, bioluminescent accents,
  gentle drift on everything.

---

## 3. What we reuse — the typing core is theme-free

The single biggest lesson from NotLM/Invaders: **the game logic is pure
TypeScript with no Phaser** (`src/core/`), driven by `tick(dtMs)` and
`handleKey(char)`, rendered by thin Phaser scenes off `engine.snapshot()`.
Every kids' game above is a **re-skin + rule tweaks over the same core**, not
a rewrite.

Reusable as-is or with light change:

| Piece | Reuse |
|---|---|
| `core/TypingEngine` lock-on + per-letter matching | As-is. First correct key locks the target; finishing the word completes it. |
| Single-letter & word tiers (`data/words/*`) | Perfect for kids — Letter Garden lives almost entirely in the **single-letter tier**; a curriculum is just an ordered letter list. |
| `StatsTracker` per-key confusion heatmap | This *is* the parent dashboard and the adaptive re-serve. Already built. |
| `core/Rng` (mulberry32, seeded) | Deterministic word/spawn order → testable, reproducible. |
| `fx/RuntimeFont` (canvas bitmap font) | Reuse for HUD/UI, but pick a **rounded, friendly** typeface for kids (see §6). |
| Input pipeline (`input/normalizeKey`, `KeyRouter`) | Reuse; kids need the same filters (ignore modifiers, key-repeat, IME). |
| `AudioBus` (procedural WebAudio SFX) | Reuse; kids' audio wants warmer tones + more reward sounds. |
| Multi-entry Vite build | Add another HTML entry, exactly like `invaders.html`. |

Deliberately **dropped** for kids (see §4): losing/health, timers as
pressure, scary art, dense HUDs.

---

## 4. Kid-specific design rules (the real work)

These are rule changes on top of the core, not new tech:

1. **No-fail loop.** Failure = *slower progress*, never "you lost." A missed
   letter: the target waits, wobbles, maybe shows a gentle hint (highlight
   the key). No build-breaking, no game-over. (In NotLM a miss breaks combo
   and can lose the level — remove both.)
2. **Letters before words.** Start in the single-letter tier with a
   **curriculum** — an ordered list introducing keys a few at a time, home
   row first. Only form words from already-taught letters. Store the
   child's current curriculum position in their profile.
3. **Adaptive re-serve.** Use the existing per-key error counts to weight
   selection toward the letters the child fumbles — but cap repetition so it
   never feels like punishment. (We scoped this as "practice mode" already.)
4. **Big, few, slow targets.** One or two large targets at a time for the
   youngest; generous timing; large hit/lock tolerance.
5. **Celebrate everything.** Confetti, sounds, a happy mascot, a growing
   collection/garden. The *progress artifact* (garden, sticker album) is the
   reward system — more motivating than score for this age.
6. **Show, don't score.** Replace WPM/accuracy on the kid's screen with
   pictures they made. Keep the numbers for the **parent** view only.
7. **On-screen keyboard support (tablets).** Big deal for ages 4–7 — see §5.
8. **Left-hand/right-hand colour coding** of keys (optional) teaches proper
   finger habits early; ties to a colourful on-screen keyboard.

---

## 5. Platform & input (lessons that bite)

- **Tablet is the primary device for young kids.** Physical-keyboard typing
  and touch both matter. Provide an **on-screen keyboard** rendered in-game
  (big colourful keys), because most tablets won't have a hardware keyboard
  and the native soft keyboard is cramped and covers the screen. Route its
  taps through the *same* `handleKey(char)` path as physical keys — one code
  path, tested once. (This also sidesteps IME/soft-keyboard `keydown`
  quirks that our filter currently drops, doc 03.)
- **`Scale.FIT` pointer coordinates arrive already in game space** (0..W) —
  no manual unscaling. (Lesson from Invaders; applies to the on-screen
  keyboard hit-testing.)
- **Orientation:** Letter Garden/Post Office suit portrait tablet;
  Rescue Rocket suits landscape. Pick per-game and lock it, or design the
  layout to reflow — don't assume desktop 16:9.
- **Audio needs a user-gesture unlock** (doc 09 §audio). Kids' games should
  start audio on the first tap of the title screen; default sound **on** for
  kids (unlike our default-off), but give parents a mute in settings.
- **Big tap targets, generous debounce** — small fingers double-tap.

---

## 6. Art & graphics (where kids' games are won)

Honest lesson from our builds: **procedural canvas art got us far** (the
mutant creatures, ships, grids, glows are all code) **but a kids' product
lives or dies on art charm.** Plan for both:

- **Procedural is great for:** backgrounds/gradients, the rainbow road,
  bubbles, confetti, particle bursts, UI panels, the on-screen keyboard,
  sky-time-of-day shifts. I can make these genuinely vivid in code.
- **Commission or AI-generate (in a consistent style) for:** the **mascot**
  and the **collectible cast** (animals, blossoms, food, sea creatures).
  These carry the charm and are worth real illustration.
- **The architecture already supports swap-in art:** sprites are loaded by
  **texture key** (doc 16). Build with procedural placeholders, drop in
  final PNG sprite sheets later without touching game logic.
- **Asset gotcha we hit twice:** a renamed/missing asset shows a Phaser
  **green "missing texture" box**, silently. Keep one asset-manifest file
  (the Boot loader) as the single place filenames appear, and grep it before
  assuming a name. Consider a boot check that warns on any texture that
  failed to load.
- **Font:** generate the bitmap font from a **rounded, friendly** typeface
  (e.g. a Baloo/Fredoka-style) at 2 sizes. Remember: our bitmap glyph width
  is ~0.87×fontSize — **titles clip past the field width** if too long
  (doc 16). Size text to the portrait width from the start.
- **Colour:** high-saturation, high-contrast, few colours per screen; big
  flat shapes with fat dark outlines (the toothy-mutant style already reads
  as kid-friendly). Avoid the dark UI of NotLM entirely.

---

## 7. Concrete architecture for a new kids' game

Mirror the two existing games. Recommended for **Letter Garden**:

```
src/garden/
  engine/
    GardenEngine.ts     # pure TS: current target(s), letter matching,
                        # bloom state, curriculum position, session stats.
                        # tick(dt) + handleKey(char) + snapshot(). NO Phaser.
    curriculum.ts       # ordered key groups; next-letter logic; adaptive
                        # re-serve using the per-key heatmap.
    events.ts           # 'seed' | 'bloom' | 'miss' | 'newLetterUnlocked' ...
  scenes/
    BootScene.ts        # load fonts/sprites, register procedural textures
    MenuScene.ts        # pick child profile, big TAP TO PLANT
    GardenScene.ts      # render garden from snapshot; spawn blossoms on bloom
    KeyboardScene.ts    # on-screen keyboard (parallel scene), routes to handleKey
    ParentScene.ts      # progress dashboard (recharts-style bars) — gated
  fx/
    GardenTextures.ts   # procedural flowers/particles/sky
  profiles/
    ProfileStore.ts     # localStorage: name, curriculum position, key heatmap,
                        # gardens saved. Versioned + corruption-safe (doc 07).
  main.ts               # Phaser.Game (portrait), registers scenes + AudioBus
garden.html             # new Vite entry (like invaders.html)
tests/GardenEngine.test.ts  # curriculum order, matching, adaptive re-serve,
                            # determinism (golden run) — Node, no Phaser
```

Reuse directly from the existing tree: `core/Rng`, `core/events` (`Emitter`),
`input/normalizeKey` + `KeyRouter`, `fx/RuntimeFont`, `fx/AudioBus`,
`StatsTracker` (the per-key heatmap engine).

### Multi-child profiles (new vs. our single-user model)

Families share a device. Add a **profile picker** (avatar + name) on the
menu; each profile stores its own curriculum position, heatmap, and saved
gardens in localStorage (schema-versioned, backup slot, corruption recovery
— all per doc 07). This replaces our single 5-char username model.

### Parent dashboard

A separate, lightly-gated scene/route (e.g. hold a corner button, or a
simple "what year were you born" gate — enough to keep a 5-year-old out,
not real auth). Reads the profile's heatmap + session history and renders:
mastered letters, in-progress letters, accuracy per finger/hand, WPM trend,
practice time. The site already ships `recharts` — if the dashboard lives in
the **Next.js site** rather than the canvas, use that; if in-canvas, draw
simple bars. Honest, non-judgemental copy.

---

## 8. Lessons-learned checklist (carry these in)

Concrete traps we already paid for — don't re-pay:

- **Keep `engine/` free of Phaser.** It's what makes the logic testable in
  Node and the art swappable. Enforce with the ESLint boundary rule (doc 02).
- **Seed all randomness** via `core/Rng`; no `Math.random`/`Date.now` in the
  engine. Enables a **golden-run determinism test** (doc 10) — one fixed
  seed + scripted keystrokes → snapshot; trips on any unintended change.
- **Fixed-timestep tick with a delta clamp (~250 ms).** A backgrounded tab
  otherwise delivers one giant delta and everything teleports (doc 02/09).
- **One `handleKey` path for physical + on-screen keys.** Test once.
- **Pool sprites and reset every field on reuse** (position, alpha, tint,
  scale, tweens) or you get "ghost" state carried between lives (doc 09 §8).
- **Scene `shutdown` must unsubscribe** engine/DOM/window listeners or a
  restart doubles every sound/handler (doc 09 §1).
- **BitmapText, not `Text`,** for anything that changes per keystroke
  (per-char tinting for typed/next/remaining), and mind the ~0.87×fontSize
  glyph width vs. screen width.
- **Audio unlock on first gesture**; procedural SFX = zero audio assets.
- **Single asset-manifest** (Boot loader) as the only place filenames live;
  missing assets fail as silent green boxes — add a load-error warning.
- **Storage is versioned + corruption-safe from day one** (doc 07): parse
  on load, backup slot, fresh-default on failure. Kids' profiles are
  precious (a lost garden = tears).
- **Deploy as an extra static entry** (doc 14) and **embed via iframe** in
  the YourKids games section — but note the **iframe keyboard-focus gotcha**
  (doc 14 §C): a keyboard game in an iframe gets no keys until focused;
  add a "tap to play" cover that focuses it. On-screen-keyboard input
  sidesteps this for tablets.

---

## 9. Build order (proposed)

1. **M1 — Letter Garden core (the fun test).** New Vite entry; `GardenEngine`
   + curriculum + on-screen keyboard, one letter blooming one flower, with
   Node tests. Exit criterion: *a 5-year-old typing `f` and seeing a flower
   pop is already delightful.* (Same "feel first" gate we used for NotLM M1.)
2. **M2 — Curriculum + adaptive re-serve + profiles.** Home-row-first
   progression, per-key heatmap re-serve, multi-child profiles, save/print
   "your garden today."
3. **M3 — Parent dashboard.** Honest progress view (mastered / working-on /
   WPM trend). This is the parent-facing sell.
4. **M4 — Art & polish pass.** Swap procedural placeholders for the
   commissioned mascot + blossoms; audio reward pass; time-of-day sky.
5. **M5 — Ship on yourkids.com.** Static entry, iframe embed with focus
   cover, tablet QA (portrait, on-screen keyboard, audio unlock), COPPA-aware
   data note (all data local; no accounts).
6. **Later — Rainbow Rescue Rocket** as the older-kid graduation game,
   reusing the rail tech (doc 12) with a sky re-skin, giving the games
   section an age ladder mirroring the site's baby→toddler content.

---

## 10. Compliance & trust notes (parent brand)

- **Keep all data on-device** (localStorage) — no accounts, no server, no
  PII. This is both the simplest build and the strongest privacy story for a
  parenting brand (and sidesteps COPPA account concerns). State it plainly
  in a parent note.
- **No ads, no external calls at runtime** (our games already make none —
  procedural art/audio, local saves). Worth preserving and advertising.
- **Non-judgemental copy** everywhere, per the YourKids voice — "still
  learning `e`" not "failed."
