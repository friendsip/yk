/**
 * Nap & wake-windows guide data (0–3 years).
 *
 * Total-sleep figures are drawn from the AASM consensus recommendations and
 * NHS guidance. Wake-window ranges themselves are not official medical
 * guidance from any of these bodies — they are typical ranges collated from
 * reputable sleep-education sources and widely used by parents. The copy is
 * deliberately honest about that distinction.
 *
 * Ages are in completed weeks since birth, matching the convention in
 * ../types.ts (a baby who is "3 months" is ~13 weeks).
 */

import type { Source } from "../types";

export interface WakeWindowBand {
  id: string;
  ageLabel: string;
  fromWeeks: number;
  toWeeks: number;
  wakeWindow: string;
  napsPerDay: string;
  totalSleep24h: string;
  notes: string[];
}

export const wakeWindowBands: WakeWindowBand[] = [
  {
    id: "newborn-0-3-weeks",
    ageLabel: "Newborn (0–3 weeks)",
    fromWeeks: 0,
    toWeeks: 3,
    wakeWindow: "30–60 minutes",
    napsPerDay: "4–6+",
    totalSleep24h: "14–17 hours, in short bursts round the clock",
    notes: [
      "At this age a 'wake window' is often just a feed, a nappy change and a cuddle — and that is exactly as it should be. Many newborns doze straight back off before you have finished winding them.",
      "Early tired cues look subtle: staring into the distance, jerky arm and leg movements, clenched fists, or turning their face away. Crying is usually a late sign — they may already be overtired by then.",
      "Newborn sleep is famously all over the place, and days and nights are often muddled at first. Anywhere from about 11 to 19 hours in 24 can be normal, so please do not measure yourself against a chart.",
      "For every sleep, day or night: on their back, in a clear, flat, separate sleep space, in the same room as you — the Lullaby Trust and NHS advise this for at least the first six months.",
    ],
  },
  {
    id: "4-11-weeks",
    ageLabel: "4–11 weeks (around 1–2 months)",
    fromWeeks: 4,
    toWeeks: 11,
    wakeWindow: "60–90 minutes",
    napsPerDay: "4–5",
    totalSleep24h: "14–17 hours, still spread across day and night",
    notes: [
      "Wake windows stretch a little now, but many babies still only manage an hour or so before the yawns, eye-rubbing and grizzling start. A short window is not a problem to fix.",
      "You may notice the first hints of a pattern — perhaps a longer stretch of night sleep — but plenty of babies this age have no discernible routine at all, and that is completely normal.",
      "Naps can be anything from 20 minutes to a couple of hours, and they often happen on you, in the pram or in the sling. Contact naps are not a bad habit; they are a newborn being a newborn.",
    ],
  },
  {
    id: "12-16-weeks",
    ageLabel: "12–16 weeks (around 3–4 months)",
    fromWeeks: 12,
    toWeeks: 16,
    wakeWindow: "1.5–2 hours",
    napsPerDay: "3–4",
    totalSleep24h: "12–16 hours (including naps)",
    notes: [
      "Around now, sleep cycles mature and become more adult-like — which, slightly unfairly, can make sleep temporarily worse. If nights fall apart around four months, it is a well-known developmental phase, not something you have done wrong.",
      "Tired cues at this age often include rubbing eyes or ears, losing interest in toys and faces, and going quiet or clingy. Catching the window before overtiredness makes settling gentler for everyone.",
      "Some babies settle into three predictable naps here; others still catnap all day. Both are within normal — nap consolidation comes with time, not training.",
    ],
  },
  {
    id: "4-6-months",
    ageLabel: "4–6 months",
    fromWeeks: 17,
    toWeeks: 26,
    wakeWindow: "1.5–2.5 hours",
    napsPerDay: "3",
    totalSleep24h: "12–16 hours (including naps)",
    notes: [
      "Most babies this age manage roughly three naps — often two longer ones and a short late-afternoon catnap that keeps them going until bedtime.",
      "The last wake window of the day is often the longest, and the first one after waking the shortest. If your baby does the opposite, they have not read the manual either.",
      "Watch the baby, not the clock: on a big day of visitors or a growth spurt they may need to sleep sooner; after a bumper nap they may happily stretch further.",
      "Day naps still count for safer sleep: back to sleep, clear flat cot or pram, and in the same room as you until six months.",
    ],
  },
  {
    id: "7-9-months",
    ageLabel: "7–9 months",
    fromWeeks: 27,
    toWeeks: 39,
    wakeWindow: "2–3.5 hours",
    napsPerDay: "2–3",
    totalSleep24h: "12–16 hours (including naps)",
    notes: [
      "Somewhere in this stretch most babies drop the third catnap and settle into two naps — typically mid-morning and early afternoon. The changeover weeks can be wobbly, with an earlier bedtime picking up the slack.",
      "New skills (sitting, crawling, pulling up) and separation anxiety both peak around now, and both are famous for disrupting sleep. It passes.",
      "Tired cues get easier to spot: yawning, eye-rubbing, burying their face in you, or suddenly becoming clumsy and cross with their toys.",
    ],
  },
  {
    id: "10-12-months",
    ageLabel: "10–12 months",
    fromWeeks: 40,
    toWeeks: 52,
    wakeWindow: "2.5–4 hours",
    napsPerDay: "2",
    totalSleep24h: "12–16 hours (including naps)",
    notes: [
      "Two naps a day is the usual shape now, with the longest wake window before bedtime. Naps commonly last between 30 minutes and 2 hours each.",
      "Some babies flirt with refusing a nap around their first birthday, then go back to two for months. A few genuinely stubborn nap refusals in a row are usually a phase, not the one-nap transition arriving early.",
      "By now you know your baby's tells better than any table does. If they are cheerful, feeding well and sleeping somewhere in the broad range, their schedule is right for them.",
    ],
  },
  {
    id: "13-18-months",
    ageLabel: "13–18 months",
    fromWeeks: 53,
    toWeeks: 78,
    wakeWindow: "3–5 hours",
    napsPerDay: "1–2",
    totalSleep24h: "11–14 hours (including naps)",
    notes: [
      "This is prime territory for the famous two-to-one nap transition, most often somewhere around 15–18 months. It is rarely tidy: expect weeks of one-nap days and two-nap days mixed together.",
      "On the messy in-between days, an earlier bedtime is your friend. Overtired toddlers tend to sleep worse, not better, so there is no prize for pushing through.",
      "The single nap usually lands after lunch and lasts one to two hours. Some children take months to settle into it — that is normal, not a regression.",
    ],
  },
  {
    id: "18-24-months",
    ageLabel: "18–24 months",
    fromWeeks: 79,
    toWeeks: 104,
    wakeWindow: "4–6 hours",
    napsPerDay: "1",
    totalSleep24h: "11–14 hours (including naps)",
    notes: [
      "One post-lunch nap of roughly one to two hours is the classic pattern, book-ended by a longer morning and afternoon awake.",
      "Toddler sleep can be disrupted by big feelings, new siblings, moving to a bed, or a sudden conviction that bedtime is negotiable. Boring consistency and warmth win out over any clever technique.",
      "Tired cues now include meltdowns over the wrong-coloured cup, sudden clinginess, and heroic denials of being tired at all. You are not imagining the irony.",
    ],
  },
  {
    id: "2-3-years",
    ageLabel: "2–3 years",
    fromWeeks: 105,
    toWeeks: 156,
    wakeWindow: "5–6+ hours",
    napsPerDay: "0–1",
    totalSleep24h: "11–14 hours (including a nap, if they still have one)",
    notes: [
      "Around a quarter of children stop napping by age 3, and about half stop between 3 and 4 — so within this band you will find happy nappers and happy non-nappers side by side.",
      "If the nap starts pushing bedtime very late, shortening it or swapping it for calm 'quiet time' with books often works better than fighting on either front.",
      "A child who has dropped their nap may need an earlier bedtime for a while to land in the 11–14 hour range. Ratty late afternoons are the usual clue.",
      "Whether they nap or not, if your child seems happy and full of beans most of the day, they are almost certainly getting the sleep they need.",
    ],
  },
];

export const wakeWindowIntro: string[] = [
  "A 'wake window' is simply the stretch of time a baby or toddler is awake between one sleep and the next — from the moment they wake to the moment they drop off again. Because little ones can only comfortably stay awake for so long before tipping into overtiredness, laying these windows end to end is a handy way to guess roughly when the next nap might land. That is all a wake window is: a rough planning tool, not a schedule handed down from on high.",
  "It is worth being honest about where these numbers come from. The official bodies — the NHS, the American Academy of Sleep Medicine, Australia's Raising Children Network — publish recommended totals for sleep across 24 hours, and those are well grounded in evidence. Wake windows themselves are not: there are no clinical trials behind that table. The ranges below are typical patterns collated from reputable sleep-education sources and the experience of a great many parents. Lots of families find them genuinely useful. They are averages, though, not medicine — typical ranges, not rules.",
  "Your baby's cues beat any table, including this one. Rubbing eyes or ears, staring into space, jerky movements, going quiet, getting clingy or grizzly — these tell you far more about your child in this moment than a chart ever could. If the clock says twenty minutes to go but your baby is yawning and burrowing into your shoulder, trust the baby. And if they are cheerful long past the 'end' of their window, that is fine too.",
  "Every child is different, and the same child differs from one day to the next — after illness, on growth-spurt days, during nap transitions, or for no reason anyone can name. A baby who sleeps outside these ranges and is otherwise content, feeding well and full of personality is almost certainly getting what they need. None of this is a test you can fail. If you are ever worried about your child's sleep, your GP or health visitor will always rather hear from you.",
];

export const wakeWindowSources: Source[] = [
  {
    title: "Helping your baby to sleep",
    org: "NHS",
    url: "https://www.nhs.uk/baby/caring-for-a-newborn/helping-your-baby-to-sleep/",
    region: "UK",
  },
  {
    title: "Recommended amount of sleep for paediatric populations (consensus statement)",
    org: "American Academy of Sleep Medicine",
    url: "https://aasm.org/advocacy/position-statements/child-sleep-duration-health-advisory/",
    region: "US",
  },
  {
    title: "Newborn wake windows: what's normal?",
    org: "Sleep Foundation",
    url: "https://www.sleepfoundation.org/baby-sleep/newborn-wake-windows",
    region: "US",
  },
  {
    title: "Toddler sleep: what to expect",
    org: "Raising Children Network",
    url: "https://raisingchildren.net.au/toddlers/sleep/understanding-sleep/toddler-sleep",
    region: "Australia",
  },
  {
    title: "Safer sleep overview",
    org: "Lullaby Trust",
    url: "https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/safer-sleep-overview/",
    region: "UK",
  },
];
