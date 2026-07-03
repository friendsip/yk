# Parenting Apps & Tools — Market Research and Suggestions (July 2026)

> **Status update (3 July 2026):** shipped — all of Tier 1 (age/corrected-age
> calculator, wake windows, checklists; the "this week" layer lives in the
> app), plus the childcare explorer and vaccination planner from Tier 2, at
> `/tools`. Remaining ideas below are still open.

Four-category market survey (baby tracking, toddler development/activities,
family organisation, parent support/health) researched against live sources in
July 2026. Full agent reports summarised; this doc keeps the conclusions and
the build list.

## The thesis

The parenting-app market monetises anxiety and exhaustion, and parents have
noticed. The dominant complaints across every category:

1. **Subscription fatigue** — $40–320/yr per app, retro-paywalls (Wonder Weeks,
   Cozi, Tinybeans +87%), trial-to-annual billing traps, hard cancellation
   (Kinedu, Speech Blubs, Moshi, BabySparks).
2. **Privacy scandals as mainstream knowledge** — Ovia selling pregnancy data
   to employers, BabyCenter/What to Expect flagged by Mozilla and a US Senate
   investigation, Glow's medical-privacy settlement. Privacy-first trackers
   (Pebbi) now market *against* the leaders on this.
3. **Ads served to exhausted people** — banner ads during 3am feed logging and
   before white-noise playback are the angriest review themes.
4. **Paying for content** — activity ideas, picture schedules, sticker charts
   and reassurance behind $5–12/mo paywalls.
5. **Short-lived needs sold as annual subs** — potty training (2–6 weeks),
   single developmental stages, apps that die at 12–18 months of age.

Meanwhile the most *trusted* products in the space are free, offline-capable,
account-free and institution-backed: British Red Cross first aid, NHS Start
for Life emails (96% would recommend), Baby Buddy, HANDi. That posture —
free forever, on-device, no ads, evidence-based — is exactly the position
yourkids.com already holds. Every tool below reinforces it and feeds the two
strategic assets: the daily PWA habit and (once live) the email list.

## Suggestions, prioritised

### Tier 1 — quick wins (client-side, low risk, days each)

| Tool | Why | Notes |
|---|---|---|
| **Baby age + corrected-age calculator** | "How many weeks is my baby" is habitual; the premature/corrected-age variant is underserved and high-empathy | Trivial client-side; feeds the PWA |
| **Nap & wake-window guide by age** | Huckleberry's SEO flywheel ("3 month old sleep schedule") without the $12/mo | Present as *typical ranges*, never prescriptions; NHS-anchored |
| **Interactive + printable checklists** (hospital bag, newborn essentials, travelling with baby, school readiness) | Babylist's proven acquisition pattern | localStorage ticks + print CSS; natural future affiliate surface |
| **"What's happening this week" shareable layer** | Wonder Weeks refugees (paywall backlash) want a free leap-style calendar | Mostly already built in the PWA; add honest framing that leap *evidence* is weak |

### Tier 2 — differentiators (medium effort, the traffic/habit bets)

| Tool | Why | Notes |
|---|---|---|
| **UK childcare funding calculator** (30 funded hours + tax-free childcare + net nursery cost) | Genuinely unserved: gov.uk is clunky, indie rivals thin; entitlements expanded Sept 2025 so demand is hot | England-specific labelling; **annual maintenance obligation** (rates change each April/Sept) |
| **NHS immunisation timeline** (birth date → personalised schedule + calendar download) | Unserved; the Jan 2026 MMRV schedule change made most competitor content stale (our guide data already reflects it) | Strictly pro-vaccination (guardrail); track UKHSA changes |
| **"What can we do today?" activity generator** (age + indoors/outdoors + energy level) | Attacks Kinedu/BabySparks/Playfully paywalls; daily habit | Reuses existing games/stage data; pure client-side |
| **Feed/sleep/nappy logger, on-device** | Completes the PWA as a true tracker; sidesteps the paywalled-sync complaint via file export to partner instead of accounts | IndexedDB; "your data stays on your phone" is the marketing line |
| **Printable visual routine builder** (picture cards → morning/bedtime chart PDF) | Undercuts Brili ($49.99/yr); strong toddler + SEND appeal | Client-side drag/drop + print CSS |

### Tier 3 — high-trust builds (bigger moats, need editorial/clinical care)

| Tool | Why | Risk management |
|---|---|---|
| **"Can my baby eat X?" first-foods lookup** | Solid Starts' killer feature (600+ foods, free DB, 6M users); a UK/NHS-aligned version is the wedge | Highest risk in this list: per-food citations (NHS Start4Life/AAP/RCPCH), Solid Starts-style disclaimers + explicit acknowledgement, extreme care on choking/honey/whole nuts; ideally external clinical review. Build format, never copy their data |
| **Growth tracker with UK-WHO percentiles, on-device** | Rankable (many thin indie competitors); pairs with Red Book | Must use RCPCH UK-WHO reference data (what health visitors use), "not medical advice" framing |
| **First-aid quick-reference cards, offline in the PWA** | Red Cross/SJA prove offline safety reference works | Mirror Red Cross/NHS wording exactly, dated review stamps, prominent links to their apps + 999/111; "refresher, not training" |

### Content & list plays (from the research, not apps)

- **Week-by-week email companion** — the NHS Start for Life model (96% would
  recommend). The single strongest list-building lever; needs the roadmapped
  newsletter infrastructure. Every tool above should end with this signup.
- **Dad/partner onboarding track** — real UK gap (DadPad is region-locked);
  pure content, low risk.
- **Sleep-methods honest-broker explainer** — what Huckleberry/Taking Cara
  Babies/gentle methods actually are, evidence and cost; nobody selling a
  course can write it. Culture-war care needed.
- **"Your data stays on your phone" privacy pledge page** — one page, high
  trust ROI given Ovia/BabyCenter scandals.
- **Couples check-in prompt cards**; **potty-training tracker + printable
  sticker chart** (one-time-use subscriptions anger parents most here).

## Do NOT build

- **Symptom checkers / triage flows** ("home vs A&E" logic) — UK medical
  device (MHRA/DTAC) territory; leave to NHS HANDi.
- **Cry translators** — press-friendly, scientifically shaky; reputational risk.
- **Community forums / friend matching** — Mush folded, Peanut struggles with
  moderation and scam accounts; a moderation burden that fights the static
  architecture.
- **Paid courses or method-selling** (Taking Cara Babies at $179–319 shows the
  resentment ceiling) — conflicts with free-first anyway.
- **Custody-grade co-parenting tools** — legal-adjacent, market moved paid,
  wrong audience fit.

## Suggested order

1. Tier 1 (all four) — roughly a week of combined work, immediate SEO + PWA
   value.
2. Childcare calculator + immunisation timeline — the two unserved UK tools;
   highest differentiation per effort.
3. Activity generator + on-device logger — deepen the daily PWA habit.
4. Tier 3 — gate on appetite for clinical review; first-foods lookup is the
   biggest prize and the biggest responsibility.

**Maintenance register** (tools create obligations): childcare rates
(April/September), UKHSA immunisation schedule, RCPCH chart data, first-aid
wording review — diarise alongside the guide-content quarterly re-check in
next-tasks §11.
