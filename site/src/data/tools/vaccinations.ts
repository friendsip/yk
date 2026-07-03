/**
 * Data for the NHS childhood vaccination planner.
 *
 * Covers the routine schedule in England as it applies to a baby born today
 * (i.e. born on or after 1 January 2025), following the changes introduced on
 * 1 July 2025 and 1 January 2026: MenB second dose moved to 12 weeks,
 * pneumococcal moved to 16 weeks, Hib/MenC (Menitorix) withdrawn, a new
 * 18-month appointment added, and MMRV replacing MMR.
 *
 * Verified against the UKHSA "Complete routine immunisation schedule from
 * 1 January 2026" (as updated 3 March 2026) and NHS.uk in July 2026.
 *
 * dueOffsetDays is the number of days after birth from which the appointment
 * is due — these are "from" dates, not deadlines. GP surgeries invite
 * families automatically and a little later is fine (with the exception of
 * rotavirus, which has upper age limits — see the notes on those events).
 */

import type { Source } from "../types";

export interface VaccineDose {
  name: string;
  protectsAgainst: string;
}

export interface VaccineEvent {
  id: string;
  ageLabel: string;
  dueOffsetDays: number;
  vaccines: VaccineDose[];
  notes: string[];
}

export const ukSchedule: VaccineEvent[] = [
  {
    id: "8-weeks",
    ageLabel: "8 weeks",
    dueOffsetDays: 56,
    vaccines: [
      {
        name: "6-in-1 vaccine (1st dose)",
        protectsAgainst:
          "Diphtheria, tetanus, whooping cough (pertussis), polio, Hib (Haemophilus influenzae type b) and hepatitis B — six serious infections in a single injection.",
      },
      {
        name: "MenB vaccine (1st dose)",
        protectsAgainst:
          "Meningococcal group B bacteria, a leading cause of meningitis and septicaemia (blood poisoning) in babies.",
      },
      {
        name: "Rotavirus vaccine (1st dose)",
        protectsAgainst:
          "Rotavirus, a very common tummy bug that causes diarrhoea and vomiting in babies. This one is drops in the mouth, not an injection.",
      },
    ],
    notes: [
      "Due from 8 weeks old. Your GP surgery will invite you automatically — this planner just helps you see what's coming. If the date they offer doesn't work, ring the surgery and rearrange.",
      "Afterwards it's normal for your baby to have a sore or slightly red leg where the injections went in, a mild temperature, and a grizzly day or so. A cuddle and a feed go a long way.",
      "Because the MenB vaccine quite often causes a fever, the NHS advises giving babies three doses of infant paracetamol, starting soon after the appointment, with the later doses spaced a few hours apart. Your practice nurse will explain exactly how much and when, and it's all in the leaflet you'll be given — you don't need to memorise it now.",
      "One genuine deadline to know about: the first rotavirus dose can't be given once a baby reaches 15 weeks old, so this is the appointment not to let drift too far.",
      "If your baby was born prematurely, vaccinations still start 8 weeks after their actual birth date — not their due date.",
    ],
  },
  {
    id: "12-weeks",
    ageLabel: "12 weeks",
    dueOffsetDays: 84,
    vaccines: [
      {
        name: "6-in-1 vaccine (2nd dose)",
        protectsAgainst:
          "Diphtheria, tetanus, whooping cough (pertussis), polio, Hib and hepatitis B — the second of three baby doses.",
      },
      {
        name: "MenB vaccine (2nd dose)",
        protectsAgainst:
          "Meningococcal group B bacteria, a leading cause of meningitis and septicaemia in babies.",
      },
      {
        name: "Rotavirus vaccine (2nd and final dose)",
        protectsAgainst:
          "Rotavirus — the second lot of drops in the mouth completes this one.",
      },
    ],
    notes: [
      "Due from 12 weeks old — around 4 weeks after the first appointment. Since July 2025 the second MenB dose is given here rather than at 16 weeks, so babies are protected earlier.",
      "The same paracetamol advice applies as at 8 weeks: because MenB is being given, the NHS recommends three doses of infant paracetamol starting soon after the appointment to head off a fever. The nurse will run through it again.",
      "The second rotavirus dose needs to be at least 4 weeks after the first, and can't be given once a baby reaches 24 weeks old.",
      "Expect the same mild after-effects as last time — a sore leg, a slightly raised temperature and some extra clinginess for a day or two are all normal.",
    ],
  },
  {
    id: "16-weeks",
    ageLabel: "16 weeks",
    dueOffsetDays: 112,
    vaccines: [
      {
        name: "6-in-1 vaccine (3rd and final baby dose)",
        protectsAgainst:
          "Diphtheria, tetanus, whooping cough (pertussis), polio, Hib and hepatitis B — this completes the baby course.",
      },
      {
        name: "Pneumococcal vaccine (1st dose)",
        protectsAgainst:
          "Pneumococcal bacteria, which can cause pneumonia, meningitis and serious ear infections.",
      },
    ],
    notes: [
      "Due from 16 weeks old — the last of the three close-together baby appointments. The pneumococcal vaccine moved to this visit in July 2025 to keep the number of injections at each appointment down.",
      "No MenB dose this time, so a fever is a little less likely and there's no routine paracetamol advice for this visit — though a sore leg and a mildly off-colour day or two are still perfectly normal.",
      "After this appointment there's a lovely long gap: nothing more is due until around the first birthday.",
    ],
  },
  {
    id: "12-months",
    ageLabel: "12 months",
    dueOffsetDays: 365,
    vaccines: [
      {
        name: "MMRV vaccine (1st dose)",
        protectsAgainst:
          "Measles, mumps, rubella and chickenpox (varicella) — four illnesses in one injection.",
      },
      {
        name: "Pneumococcal vaccine (2nd dose)",
        protectsAgainst:
          "Pneumococcal bacteria — this booster strengthens the protection from the 16-week dose.",
      },
      {
        name: "MenB vaccine (3rd dose)",
        protectsAgainst:
          "Meningococcal group B — a booster to keep protection strong through toddlerhood.",
      },
    ],
    notes: [
      "Given on or after the first birthday — this appointment shouldn't be brought forward, but soon after the birthday is ideal.",
      "The MMRV vaccine replaced the separate MMR in January 2026, adding chickenpox protection. Babies born on or after 1 January 2025 — which includes any baby you'd be planning for with this tool — get it at 12 months and again at 18 months.",
      "Three injections in one visit sounds a lot, but it's over quickly. Afterwards, a mild temperature and sore spots are common. Because MMRV is a live vaccine, a faint measles-like or chickenpox-like rash can appear a week or two later — this is usually mild and passes on its own, but do mention it to your GP if you're unsure.",
      "Since Menitorix went out of production, the old Hib/MenC vaccine is no longer given at this visit — Hib protection is topped up at 18 months instead.",
    ],
  },
  {
    id: "18-months",
    ageLabel: "18 months",
    dueOffsetDays: 548,
    vaccines: [
      {
        name: "6-in-1 vaccine (4th dose)",
        protectsAgainst:
          "Diphtheria, tetanus, whooping cough (pertussis), polio, Hib and hepatitis B — an extra dose that tops up protection, particularly against Hib, before nursery and pre-school.",
      },
      {
        name: "MMRV vaccine (2nd and final dose)",
        protectsAgainst:
          "Measles, mumps, rubella and chickenpox — the second dose completes this protection.",
      },
    ],
    notes: [
      "Due from 18 months old. This appointment is new — it was added to the schedule in January 2026 for children born on or after 1 July 2024, so friends with slightly older children may not have had it.",
      "Moving the second MMRV dose here (it used to be at 3 years 4 months) means toddlers are fully protected against measles, mumps, rubella and chickenpox much earlier.",
      "Two injections this time. The usual mild after-effects apply — a sore arm or leg and a slightly grumpy day or two. At this age, a favourite toy and a planned distraction afterwards work wonders.",
    ],
  },
  {
    id: "annual-flu",
    ageLabel: "2 to 3 years (then every year)",
    dueOffsetDays: 730,
    vaccines: [
      {
        name: "Children's flu vaccine (every autumn)",
        protectsAgainst:
          "Flu (influenza). For most children it's a quick nasal spray — no needle at all.",
      },
    ],
    notes: [
      "This one follows the flu season rather than your child's birthday: it's offered every autumn or early winter, starting the year your child is 2 (eligibility is usually based on their age on 31 August). The offset here simply marks the second birthday.",
      "Aged 2 and 3, children have it at the GP surgery; once they start school it's usually given there, each year up to Year 11.",
      "Your surgery will invite you when the season's programme opens — nothing to book until then.",
    ],
  },
  {
    id: "3-years-4-months",
    ageLabel: "3 years 4 months",
    dueOffsetDays: 1217,
    vaccines: [
      {
        name: "4-in-1 pre-school booster",
        protectsAgainst:
          "Diphtheria, tetanus, whooping cough (pertussis) and polio — a booster to carry that protection through the school years.",
      },
    ],
    notes: [
      "Due from 3 years and 4 months — the classic pre-school booster before they start school.",
      "For children born on or after 1 January 2025, both MMRV doses are already done by 18 months, so this visit is normally just the one injection.",
      "A sore arm for a day or two is normal. At this age honesty helps: a simple, calm explanation beforehand and something to look forward to afterwards tends to go better than a surprise.",
      "If any earlier doses were missed along the way, it's almost never too late to catch up — your GP surgery can put together a catch-up plan.",
    ],
  },
];

export const scheduleMeta: { asOf: string; nation: string; cohortNotes: string[] } = {
  asOf: "3 March 2026 (UKHSA complete routine immunisation schedule, in effect from 1 January 2026)",
  nation: "England",
  cohortNotes: [
    "This planner follows the schedule for babies born on or after 1 January 2025, who receive the MMRV vaccine at 12 months and 18 months. Children born earlier follow slightly different timings — for example, children born before 1 July 2024 had their second MenB dose at 16 weeks, pneumococcal at 12 weeks, no 18-month appointment, and their second measles-containing dose at 3 years 4 months.",
    "Children born between 1 September 2022 and 31 December 2024 are moving onto MMRV at their remaining appointments, and a one-off MMRV catch-up dose is being offered to children born between 1 January 2020 and 31 August 2022 (if they haven't already had chickenpox or a chickenpox vaccine) between November 2026 and March 2028 — your surgery will be in touch if your child is eligible.",
    "Scotland, Wales and Northern Ireland set their own schedules. They're currently very close to England's, but timings can differ slightly — if you're outside England, check NHS inform (Scotland), Public Health Wales or the Public Health Agency (Northern Ireland).",
    "Some babies are offered extra vaccines that aren't part of this routine planner: the BCG vaccine (usually around 28 days old) for babies more likely to come into contact with tuberculosis, and additional hepatitis B doses for babies whose mothers have hepatitis B. Your midwife or GP will tell you if these apply.",
    "Premature babies are vaccinated according to their actual birth date, not their due date — so the timeline still starts from the day they were born.",
    "On top of the timeline above, all children are offered a free flu vaccine (usually a nasal spray) every autumn from the age of 2 until the end of school Year 11.",
  ],
};

export const vaccinationSources: Source[] = [
  {
    title: "NHS vaccinations and when to have them",
    org: "NHS",
    url: "https://www.nhs.uk/vaccinations/nhs-vaccinations-and-when-to-have-them/",
    region: "UK",
  },
  {
    title: "Complete routine immunisation schedule from 1 January 2026",
    org: "UKHSA",
    url: "https://www.gov.uk/government/publications/the-complete-routine-immunisation-schedule/complete-routine-immunisation-schedule-from-1-january-2026",
    region: "UK",
  },
  {
    title: "Changes to the childhood vaccination schedule from January 2026",
    org: "UKHSA",
    url: "https://ukhsa.blog.gov.uk/2025/12/30/changes-to-the-childhood-vaccination-schedule-from-january-2026/",
    region: "UK",
  },
  {
    title: "Vaccination tips for parents (including what to expect afterwards)",
    org: "NHS",
    url: "https://www.nhs.uk/vaccinations/vaccination-tips-for-parents/",
    region: "UK",
  },
  {
    title: "Children's flu vaccine",
    org: "NHS",
    url: "https://www.nhs.uk/vaccinations/child-flu-vaccine/",
    region: "UK",
  },
];
