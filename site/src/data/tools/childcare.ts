/**
 * Data for the UK childcare costs & funding explorer.
 *
 * Every figure here was checked against live official sources in July 2026:
 * gov.uk (England and UK-wide schemes), mygov.scot, gov.wales, the NI
 * Department of Education, and the Coram Family and Childcare "Childcare
 * Survey 2026" (published March 2026) for regional prices and sufficiency.
 *
 * Funded-hours rules changed substantially in September 2025 (England's
 * working-parent entitlement reached 30 hours from 9 months old) and the
 * money figures (minimum-earnings thresholds, Universal Credit caps, the
 * NI subsidy cap) are the April 2026 uprating. They will change again in
 * April 2027 — see childcareMeta.notes.
 */

import type { Source } from "../types";

export interface FundingScheme {
  id: string;
  nation: "england" | "scotland" | "wales" | "northern-ireland" | "uk-wide";
  name: string;
  summary: string[];
  eligibility: string[];
  ageFromMonths: number | null;
  termAfter: boolean;
  hoursPerWeek: number | null;
  weeksPerYear: number | null;
  /** True if the scheme depends on the working-parent tests (min earnings + £100k cap). */
  requiresWork: boolean;
  applyNotes: string[];
}

export interface RegionCost {
  region: string;
  nurseryUnder2PartTime: number | null;
  nurseryUnder2FullTime: number | null;
  nurseryTwoPartTime: number | null;
  nurseryTwoFullTime: number | null;
  childminderUnder2PartTime: number | null;
  childminderUnder2FullTime: number | null;
  sufficiencyNote: string | null;
}

export const fundingSchemes: FundingScheme[] = [
  {
    id: "england-30-hours-working-parents",
    nation: "england",
    name: "30 hours funded childcare for working parents (England)",
    summary: [
      "If you live and work in England, your child can get 30 funded hours of childcare a week, for 38 weeks a year, from the term after they turn 9 months old right up until they start school.",
      "The “term after” rule matters: funded terms start on 1 September, 1 January and 1 April. So a baby who turns 9 months old in May starts their funded hours on 1 September — not on their 9-month birthday.",
      "Many nurseries and childminders will let you “stretch” the hours over more weeks of the year — typically around 22 hours a week across the whole year instead of 30 hours in term time. Worth asking about if you need year-round care.",
      "The funded hours themselves are free. Providers can ask you to pay for extras like meals, nappies or trips — but these charges must be voluntary, and they must let you provide your own (a packed lunch, your own nappies) instead.",
    ],
    eligibility: [
      "You — and your partner, if you have one — each expect to earn at least the equivalent of 16 hours a week at the National Minimum Wage over the next 3 months. From April 2026 that works out as £2,643.68 over 3 months if you are 21 or over (£2,256.80 if you are 18 to 20, £1,664 if you are under 18 or an apprentice).",
      "Each parent must also have an adjusted net income of £100,000 a year or less. It is per parent, not combined — two parents on £99,000 each qualify; one parent on £101,000 does not.",
      "You still count as working if you are on maternity, paternity, shared parental or adoption leave, on sick or annual leave, getting Statutory Neonatal Care Pay, or about to start a new job.",
      "You will need a National Insurance number, and at least one parent needs British or Irish citizenship, settled or pre-settled status, or permission to access public funds.",
    ],
    ageFromMonths: 9,
    termAfter: true,
    hoursPerWeek: 30,
    weeksPerYear: 38,
    requiresWork: true,
    applyNotes: [
      "Apply through the government's childcare service (the same HMRC account used for Tax-Free Childcare) at gov.uk. You will get an 11-digit code to give to your nursery or childminder, along with your National Insurance number and your child's date of birth.",
      "You can apply from when your baby is 23 weeks old. The hard deadlines are the day before each term starts: apply by 31 August for a 1 September start, by 31 December for 1 January, and by 31 March for 1 April.",
      "Do not leave it until deadline day — give yourself a few weeks so the code arrives and your provider can validate it in time. And if you apply very early, note that you may need to reconfirm your details before the term actually starts.",
      "Once you are in, you reconfirm your details every 3 months — HMRC sends a reminder. If you miss it, the funding stops, so it is worth putting a repeating note in your phone.",
    ],
  },
  {
    id: "england-15-hours-universal",
    nation: "england",
    name: "Universal 15 hours for all 3 and 4 year olds (England)",
    summary: [
      "Every 3 and 4 year old in England gets 570 funded hours a year — usually taken as 15 hours a week for 38 weeks — from the term after their third birthday until they start school.",
      "This one has no strings attached: it does not matter whether you work, what you earn, or what benefits you get.",
      "If you are eligible for the working-parent entitlement too, the 30 hours includes these 15 — they do not stack on top of each other.",
    ],
    eligibility: [
      "Simply living in England with a 3 or 4 year old — there are no work or income tests at all.",
      "The hours start from the term after your child turns 3 (terms begin 1 September, 1 January and 1 April).",
    ],
    ageFromMonths: 36,
    termAfter: true,
    hoursPerWeek: 15,
    weeksPerYear: 38,
    requiresWork: false,
    applyNotes: [
      "There is no code and no HMRC application for this one — you simply ask your nursery, pre-school or childminder for a funded place, and they claim the funding through the council.",
      "Popular settings still fill up, so it is worth asking about places well before the term your child becomes eligible.",
    ],
  },
  {
    id: "england-15-hours-2-year-olds",
    nation: "england",
    name: "15 hours for 2 year olds in families getting extra support (England)",
    summary: [
      "Some 2 year olds in England get 15 funded hours a week (38 weeks a year) from the term after their second birthday — aimed at families receiving certain benefits and children who need extra support.",
      "If you also qualify for the working-parent entitlement, the two can combine to give a 2 year old 30 hours in total.",
      "It is claimed through your local council rather than HMRC, and take-up is lower than it should be — if you think you might qualify, it genuinely costs nothing to check.",
    ],
    eligibility: [
      "Your household gets Universal Credit and earns £15,400 a year or less after tax (not counting benefit payments) — or you get certain other benefits, such as Income Support or income-based JSA.",
      "Some children qualify regardless of household income: children with an Education, Health and Care Plan, children who get Disability Living Allowance, and children who are looked after by the local authority or have left care through adoption or a guardianship order.",
    ],
    ageFromMonths: 24,
    termAfter: true,
    hoursPerWeek: 15,
    weeksPerYear: 38,
    requiresWork: false,
    applyNotes: [
      "Apply through your local council — search “15 hours 2 year old” plus your council's name, or ask their Family Information Service to walk you through it.",
      "If your child qualifies through an EHCP, DLA or being looked after, the council may confirm eligibility automatically — but it is still worth a call to make sure nothing is missed.",
    ],
  },
  {
    id: "uk-tax-free-childcare",
    nation: "uk-wide",
    name: "Tax-Free Childcare (UK-wide)",
    summary: [
      "For every £8 you pay into an online childcare account, the government adds £2 — a 20% top-up on what you pay a registered provider.",
      "The top-up is capped at £500 every 3 months (£2,000 a year) per child, or £1,000 every 3 months (£4,000 a year) if your child is disabled.",
      "It works across the whole UK, for children aged 11 or under (16 or under if disabled), and you can use it alongside funded hours — for example to pay for extra hours, holiday care, or a childminder after school.",
      "One big caveat: you cannot get Tax-Free Childcare and the Universal Credit childcare element at the same time. If you get UC, do the sums first — UC covers up to 85% of costs, which beats a 20% top-up for most families on UC.",
    ],
    eligibility: [
      "The same work tests as England's 30 hours: you (and your partner) each expect to earn at least the equivalent of 16 hours a week at the National Minimum Wage over 3 months (£2,643.68 if you are 21 or over, from April 2026), and each have adjusted net income of £100,000 or less.",
      "Your childcare provider must be registered with the scheme — most nurseries, childminders, wraparound and holiday clubs are, but always check before counting on it.",
      "Applying for Tax-Free Childcare affects other support: your Universal Credit or tax credits will stop, and you must tell your employer within 90 days to stop childcare vouchers. If you are on UC, wait for a decision on your Tax-Free Childcare application before cancelling your claim.",
    ],
    ageFromMonths: 0,
    termAfter: false,
    hoursPerWeek: null,
    weeksPerYear: null,
    requiresWork: true,
    applyNotes: [
      "Apply at gov.uk/tax-free-childcare — it is the same childcare service account as the 30 hours code, so in England one application can cover both.",
      "You reconfirm every 3 months (a couple of minutes online). Money in the account can sit there until you need it, and you can withdraw your own contributions if plans change — the government just takes its top-up back.",
    ],
  },
  {
    id: "uk-universal-credit-childcare",
    nation: "uk-wide",
    name: "Universal Credit childcare costs element (UK-wide)",
    summary: [
      "If you get Universal Credit and you are working, you can claim back up to 85% of what you pay for registered childcare.",
      "From April 2026 the most you can get back each month is £1,071.09 for one child or £1,836.16 for two or more children.",
      "There is no minimum-hours rule — any paid work can qualify — and it covers any registered childcare: nurseries, childminders, breakfast and after-school clubs, holiday schemes.",
      "You cannot claim it alongside Tax-Free Childcare. For most families on UC, the 85% rate is worth far more than the 20% top-up — but check both before deciding.",
    ],
    eligibility: [
      "You (and your partner, if you live together) usually need to be in paid work, or have a firm job offer — the number of hours does not matter.",
      "The childcare must be with a registered or approved provider, and you claim costs back through your UC account after you have paid them, with receipts.",
    ],
    ageFromMonths: 0,
    termAfter: false,
    hoursPerWeek: null,
    weeksPerYear: null,
    requiresWork: false,
    applyNotes: [
      "Report your childcare costs in your Universal Credit online account each month — you will need to show what you paid, so keep invoices and receipts.",
      "Because it normally repays you after you have paid, the first month can be a squeeze. Ask your work coach about help with upfront costs — the Flexible Support Fund or a budgeting advance can cover a deposit or first month so you are not left carrying it alone.",
    ],
  },
  {
    id: "scotland-funded-elc",
    nation: "scotland",
    name: "Funded early learning and childcare — 1,140 hours (Scotland)",
    summary: [
      "In Scotland, all 3 and 4 year olds get up to 1,140 funded hours a year — about 30 hours a week in term time, or around 22 hours a week if you spread it across the whole year.",
      "Unlike England's 30 hours, there is no work or income test for 3 and 4 year olds — every child qualifies.",
      "Some 2 year olds qualify too, mainly in families receiving certain benefits or with care experience.",
      "Councils run the scheme locally and offers vary — some are more generous on start dates and how you can split hours between nurseries and childminders — so your council's early learning team is the place to get the real picture for your area.",
    ],
    eligibility: [
      "All 3 and 4 year olds, usually from the start of the term after their third birthday until they start school.",
      "2 year olds qualify if the family gets certain benefits — for example Universal Credit with take-home pay of £885 a month or less — or if the child is or has been looked after, is under a kinship care or guardianship order, or a parent is care-experienced.",
    ],
    // Timed from the universal (3+) entitlement; eligible 2-year-olds are
    // covered in the text above rather than the timeline date.
    ageFromMonths: 36,
    termAfter: true,
    hoursPerWeek: 30,
    weeksPerYear: 38,
    requiresWork: false,
    applyNotes: [
      "Apply through your local council — each publishes its own list of funded nurseries, childminders and family centres, and its own application windows.",
      "mygov.scot and Parent Club (parentclub.scot) explain the scheme in plain language and link to every council's early learning pages — a good first stop before ringing round.",
    ],
  },
  {
    id: "wales-flying-start-childcare-offer",
    nation: "wales",
    name: "Flying Start and the Childcare Offer for Wales",
    summary: [
      "Wales has two schemes. Flying Start gives 2 year olds 12.5 funded hours of childcare a week (2.5 hours a day in term time) — it is being rolled out to all 2 year olds across Wales, area by area, so whether your street is covered yet depends on your council.",
      "The Childcare Offer for Wales then gives working parents of 3 and 4 year olds up to 30 hours a week of combined nursery education and funded childcare — and unusually, it runs for up to 48 weeks a year, so it covers most school holidays too.",
      "All 3 and 4 year olds in Wales are also entitled to a free part-time nursery education place (a minimum of 10 hours a week) regardless of whether their parents work.",
      "Because Flying Start is still expanding, the honest answer on the 2-year-old offer is: check locally — your council's Family Information Service can tell you in one phone call.",
    ],
    eligibility: [
      "Childcare Offer (3–4s): you live in Wales, your household gross income is £100,000 or less, and each parent earns at least the equivalent of 16 hours a week at the National Minimum Wage — or is enrolled on a further or higher education course at least 10 weeks long.",
      "Flying Start childcare (2s): based on where you live rather than what you earn — originally the most disadvantaged areas, now expanding towards all 2 year olds in Wales.",
    ],
    // Timed from the Childcare Offer (3+); Flying Start's area-based 2-year-old
    // hours are covered in the text rather than the timeline date.
    ageFromMonths: 36,
    termAfter: true,
    hoursPerWeek: 30,
    weeksPerYear: 48,
    requiresWork: false,
    applyNotes: [
      "Apply for the Childcare Offer through the Welsh Government's national digital service (gov.wales) — you will need your child's birth certificate, proof of address, and proof of income or course enrolment.",
      "For Flying Start, contact your local council's Flying Start or Family Information Service team — they will confirm whether your address is covered and help you find a place.",
    ],
  },
  {
    id: "ni-childcare-subsidy-scheme",
    nation: "northern-ireland",
    name: "Northern Ireland Childcare Subsidy Scheme (NICSS)",
    summary: [
      "Northern Ireland does not have funded hours like the rest of the UK. Instead, the NI Childcare Subsidy Scheme takes 15% off your childcare bill if you are a working parent registered for Tax-Free Childcare.",
      "Since September 2025 it covers children up to the end of primary school, and from April 2026 the subsidy is capped at £203 per child per month.",
      "It stacks with Tax-Free Childcare — together they can cut around 32% off your bill — and the discount is applied by your provider, so there is no separate claim to make each month.",
      "NI also runs a funded part-time pre-school place for the year before school through the Pre-School Education Programme — apply through the Education Authority. The subsidy scheme is confirmed for 2026–27, but it is reviewed year to year, so check the current position when you plan.",
    ],
    eligibility: [
      "You qualify for (and are registered for) Tax-Free Childcare — so the same work and income tests apply: each parent earning at least the equivalent of 16 hours a week at minimum wage, and £100,000 or less adjusted net income.",
      "Your child is of pre-school or primary school age, and your provider — daycare, playgroup, childminder or school-age setting — is registered and taking part in the scheme.",
    ],
    ageFromMonths: 0,
    termAfter: false,
    hoursPerWeek: null,
    weeksPerYear: null,
    requiresWork: true,
    applyNotes: [
      "First register for Tax-Free Childcare at gov.uk, then check your provider is signed up to NICSS — the Early Years organisation (early-years.org/nicss) and your provider can confirm.",
      "The 15% comes off your invoice automatically once you and your provider are both registered — you pay the reduced amount into your Tax-Free Childcare account as usual.",
    ],
  },
];

/**
 * Weekly prices from the Coram Family and Childcare "Childcare Survey 2026"
 * (Great Britain, published March 2026). Part-time = 25 hours/week,
 * full-time = 50 hours/week, term-time prices.
 *
 * Basis (important — the survey publishes different columns for different
 * groups):
 * - England part-time columns = the price for families NOT eligible for the
 *   30-hours working-parent entitlement. Eligible working families using 25
 *   hours or fewer pay roughly nothing in term time.
 * - England full-time columns = what parents pay AFTER the 30 funded hours
 *   are deducted (i.e. paying for about 20 of the 50 hours).
 * - Scotland and Wales rows = full price without entitlements (there are no
 *   funded hours for under-2s in either nation; Flying Start is not
 *   deducted from the Welsh age-2 figures).
 * - London = simple average of Coram's Inner and Outer London figures
 *   (Inner London is markedly higher — e.g. £238.01 vs £216.94 for a
 *   part-time under-2 nursery place).
 */
export const regionCosts: RegionCost[] = [
  {
    region: "London",
    nurseryUnder2PartTime: 227.48,
    nurseryUnder2FullTime: 178.25,
    nurseryTwoPartTime: 218.09,
    nurseryTwoFullTime: 176.66,
    childminderUnder2PartTime: 212.74,
    childminderUnder2FullTime: 167.17,
    sufficiencyNote:
      "Availability splits sharply: 88% of Outer London councils report enough places for at least three-quarters of under-2s with the working-parent entitlement, but only 45% of Inner London councils do — and just 18% of Inner London councils have enough for under-2s without the entitlement. Start looking early, especially in inner boroughs.",
  },
  {
    region: "South East",
    nurseryUnder2PartTime: 201.91,
    nurseryUnder2FullTime: 161.28,
    nurseryTwoPartTime: 184.6,
    nurseryTwoFullTime: 151.68,
    childminderUnder2PartTime: 148.98,
    childminderUnder2FullTime: 118.43,
    sufficiencyNote:
      "One of the better-supplied regions: 83% of councils report enough places for at least three-quarters of under-2s with the working-parent entitlement — and it has the highest reported availability in England (72%) for under-2s without an entitlement.",
  },
  {
    region: "South West",
    nurseryUnder2PartTime: 180.64,
    nurseryUnder2FullTime: 145.34,
    nurseryTwoPartTime: 164.83,
    nurseryTwoFullTime: 133.19,
    childminderUnder2PartTime: 174.87,
    childminderUnder2FullTime: 127.13,
    sufficiencyNote:
      "67% of councils report enough places for at least three-quarters of under-2s with the working-parent entitlement, falling to 42% for under-2s without one — so baby-room places can take some finding.",
  },
  {
    region: "East of England",
    nurseryUnder2PartTime: 191.75,
    nurseryUnder2FullTime: 154.56,
    nurseryTwoPartTime: 175.67,
    nurseryTwoFullTime: 140.83,
    childminderUnder2PartTime: 156.01,
    childminderUnder2FullTime: 125.03,
    sufficiencyNote:
      "70% of councils report enough places for at least three-quarters of under-2s — with or without the working-parent entitlement — around the middle of the pack for England.",
  },
  {
    region: "East Midlands",
    nurseryUnder2PartTime: 165.32,
    nurseryUnder2FullTime: 127.7,
    nurseryTwoPartTime: 159.02,
    nurseryTwoFullTime: 129.8,
    childminderUnder2PartTime: 139.2,
    childminderUnder2FullTime: 102.71,
    sufficiencyNote:
      "Among the cheaper English regions. 75% of councils report enough places for at least three-quarters of under-2s with the working-parent entitlement (63% for those without) — and it reports England's highest availability for school-age children with SEND.",
  },
  {
    region: "West Midlands",
    nurseryUnder2PartTime: 174.83,
    nurseryUnder2FullTime: 141.79,
    nurseryTwoPartTime: 171.26,
    nurseryTwoFullTime: 137.51,
    childminderUnder2PartTime: 143.41,
    childminderUnder2FullTime: 118.11,
    sufficiencyNote:
      "85% of councils report enough places for at least three-quarters of under-2s with the working-parent entitlement, and every responding council had enough universal 15-hours places for 3–4 year olds — one of England's stronger pictures.",
  },
  {
    region: "Yorkshire and the Humber",
    nurseryUnder2PartTime: 156.15,
    nurseryUnder2FullTime: 126.38,
    nurseryTwoPartTime: 153.78,
    nurseryTwoFullTime: 123.9,
    childminderUnder2PartTime: 125.47,
    childminderUnder2FullTime: 100.74,
    sufficiencyNote:
      "The cheapest English region for a part-time under-2 nursery place in 2026. 80% of councils report enough places for at least three-quarters of under-2s with the working-parent entitlement (53% for those without).",
  },
  {
    region: "North East",
    nurseryUnder2PartTime: 166.3,
    nurseryUnder2FullTime: 140.3,
    nurseryTwoPartTime: 159.1,
    nurseryTwoFullTime: 125.81,
    childminderUnder2PartTime: 122.65,
    childminderUnder2FullTime: 106.33,
    sufficiencyNote:
      "The cheapest region in England for a childminder for an under-2 — but availability is tighter than prices suggest: only 58% of councils report enough places for at least three-quarters of under-2s with the working-parent entitlement (42% for those without).",
  },
  {
    region: "North West",
    nurseryUnder2PartTime: 178.01,
    nurseryUnder2FullTime: 135.54,
    nurseryTwoPartTime: 158.01,
    nurseryTwoFullTime: 123.5,
    childminderUnder2PartTime: 137.42,
    childminderUnder2FullTime: 108.06,
    sufficiencyNote:
      "A relatively healthy picture: 82% of councils report enough places for at least three-quarters of under-2s with the working-parent entitlement (68% for those without).",
  },
  {
    region: "Scotland",
    nurseryUnder2PartTime: 133.08,
    nurseryUnder2FullTime: 259.1,
    nurseryTwoPartTime: 133.3,
    nurseryTwoFullTime: 259.68,
    childminderUnder2PartTime: 145.65,
    childminderUnder2FullTime: 286.53,
    sufficiencyNote:
      "Scotland-wide figures (there are no funded hours for under-2s, so these are full prices — the full-time figures have no 30 funded hours deducted, unlike England's). Most councils could not say whether they have enough places for under-2s, but availability for funded 2 year olds (67% of responding councils) and 3–4 year olds (74%) is good. Scotland is the only nation where childminders typically cost more than nurseries.",
  },
  {
    region: "Wales",
    nurseryUnder2PartTime: 163.33,
    nurseryUnder2FullTime: 325.12,
    nurseryTwoPartTime: 166.01,
    nurseryTwoFullTime: 329.84,
    childminderUnder2PartTime: 136.96,
    childminderUnder2FullTime: 271.78,
    sufficiencyNote:
      "Wales-wide figures, full price without entitlements — Flying Start, where available, halves the age-2 part-time cost, and the full-time figures have no funded hours deducted (unlike England's). Under half of responding councils (47%) report enough places for at least three-quarters of under-2s; the strongest availability is for Flying Start 2 year olds (59%). Many councils simply do not hold the data, so ask locally.",
  },
];

export const availabilityGuidance: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "Start with your council — they literally keep a list",
    paragraphs: [
      "Every local council in England has a Family Information Service whose whole job is helping parents find childcare — they know which nurseries have baby-room spaces, which childminders are taking on new families, and which settings offer funded places. It is free, and honestly underused. Find yours through gov.uk's “Find free early education and childcare” service (gov.uk/find-free-early-education) — pop in your postcode and it takes you to your council's pages. The wider “Get childcare: step by step” guide on gov.uk walks through the whole process, from finding a place to applying for help with costs.",
      "Elsewhere in the UK the equivalents are just as helpful: in Scotland, your council's early learning and childcare team (Parent Club at parentclub.scot is a friendly way in); in Wales, every council runs a Family Information Service; and in Northern Ireland, Family Support NI lists registered childcare across the country.",
    ],
  },
  {
    heading: "Check the register before you fall in love with a setting",
    paragraphs: [
      "Any nursery, pre-school or childminder you use needs to be properly registered — with Ofsted in England (or a registered childminder agency), the Care Inspectorate in Scotland, and Care Inspectorate Wales. Registration is not just a formality: it is what makes a provider eligible for funded hours, Tax-Free Childcare and Universal Credit childcare support, and it means they are inspected.",
      "Inspection reports are public and genuinely worth ten minutes of your time — search the provider's name on the regulator's website and read the most recent one. Look at what inspectors said about how babies and toddlers are settled and cared for, not just the headline grade. An older “good” report with warm detail can tell you more than a shiny new website.",
    ],
  },
  {
    heading: "Get your name down early — especially for a baby room",
    paragraphs: [
      "This is the bit nobody warns you about: baby rooms are small (often just 6–12 places, because the staffing ratio for under-2s is one adult to three babies), and spaces mostly open up only when a baby moves up to the toddler room. In cities — London especially — it is common to join waiting lists 12 months or more before you need the place, which can mean while you are still pregnant. In quieter areas, 3–6 months ahead may be fine. For 2 year olds and up there is usually more movement, particularly each September when the oldest children leave for school.",
      "Work backwards from your return-to-work date, visit a few settings, and get on two or three lists rather than pinning everything on one. Ask each setting how their list actually works — is it first-come-first-served, do siblings get priority, and is there a fee to join? Some charge a registration fee or deposit; if a deposit relates to a funded place it must be refundable, so ask for the terms in writing. And keep in touch — a friendly check-in call every couple of months keeps you on their radar.",
    ],
  },
  {
    heading: "Questions worth asking — and being savvy about extra charges",
    paragraphs: [
      "When you visit, trust your eyes and ask the ordinary questions: Who would be my child's key person? How do you settle new babies in, and can we do it gradually? How long have the staff been here? What does a typical day look like, and how much time outdoors? How will you tell me about my child's day? What happens about food, naps and nappies? There are no perfect answers — you are listening for warmth, and for a team that seems to genuinely like the children.",
      "On money: the funded hours themselves must be completely free, but providers in England can charge for extras — meals, nappies, sun cream, trips, and extra hours beyond your entitlement. Those charges must be voluntary, and the setting must let you opt out (bringing a packed lunch or your own nappies) without it affecting your child's place. Since January 2026, invoices in England should be itemised so you can see funded hours (at £0), paid hours, food and consumables as separate lines — if yours is one mysterious lump sum, you are entitled to ask for the breakdown. A “free” place with £30 a week of compulsory-feeling extras is not free, so ask for the full fee schedule in writing before you sign anything.",
    ],
  },
];

export const childcareMeta: { ratesAsOf: string; costsSourceLabel: string; notes: string[] } = {
  ratesAsOf: "July 2026 (2026–27 rates, applying from April 2026)",
  costsSourceLabel:
    "Coram Family and Childcare, Childcare Survey 2026 (Great Britain, published March 2026) — weekly term-time prices; England part-time figures are for families not eligible for the working-parent entitlement, England full-time figures are what parents pay after 30 funded hours are deducted, Scotland and Wales figures are full price without entitlements, and London is a simple average of the survey's Inner and Outer London figures",
  notes: [
    "The money figures change every April: minimum-earnings thresholds track the National Minimum Wage, and Universal Credit caps and the NI subsidy cap are uprated each spring — so treat anything you read (including this) as needing a fresh check each spring.",
    "In England (and broadly in Scotland and Wales too), funded hours start from the term AFTER your child reaches the qualifying age — terms begin 1 September, 1 January and 1 April in England. A baby who turns 9 months in May starts funded hours on 1 September; a child who turns 3 in October starts their universal hours on 1 January.",
    "The regional costs here are survey averages, not quotes. Every nursery and childminder sets its own fees, and prices within one town can vary as much as between regions — use these numbers to set expectations, then get real quotes locally.",
    "England's part-time and full-time cost columns are on different bases (see the source label): part-time is the price without the working-parent entitlement, while full-time already has 30 funded hours deducted. Scotland and Wales full-time figures have nothing deducted, which is why they look so much higher.",
    "These are term-time (38-week) prices. Holiday weeks usually cost more, and if you “stretch” funded hours across the year you get fewer funded hours each week — so budget for the whole year, not just term time.",
    "Funded hours must be free, but providers can make voluntary charges for meals, nappies and activities — always ask for an itemised fee list so you know the true monthly cost before you commit.",
  ],
};

export const childcareSources: Source[] = [
  {
    title: "Free Childcare for Working Parents",
    org: "GOV.UK",
    url: "https://www.gov.uk/free-childcare-if-working",
    region: "UK",
  },
  {
    title: "Help paying for childcare",
    org: "GOV.UK",
    url: "https://www.gov.uk/help-with-childcare-costs",
    region: "UK",
  },
  {
    title: "Tax-Free Childcare",
    org: "GOV.UK",
    url: "https://www.gov.uk/tax-free-childcare",
    region: "UK",
  },
  {
    title: "Find free early education and childcare",
    org: "GOV.UK",
    url: "https://www.gov.uk/find-free-early-education",
    region: "UK",
  },
  {
    title: "Childcare Survey 2026",
    org: "Coram Family and Childcare",
    url: "https://www.coram.org.uk/resource/childcare-survey-2026/",
    region: "UK",
  },
  {
    title: "Funded early learning and childcare",
    org: "mygov.scot",
    url: "https://www.mygov.scot/childcare-costs-help/funded-early-learning-and-childcare",
    region: "UK",
  },
  {
    title: "Childcare Offer for Wales",
    org: "Welsh Government",
    url: "https://www.gov.wales/childcare-offer-for-wales-campaign",
    region: "UK",
  },
  {
    title: "Continuation of the Northern Ireland Childcare Subsidy Scheme",
    org: "Department of Education (Northern Ireland)",
    url: "https://www.education-ni.gov.uk/news/education-minister-announces-continuation-northern-ireland-childcare-subsidy-scheme-education",
    region: "UK",
  },
];
