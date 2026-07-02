/**
 * Week-by-week guide for weeks 1–12 of a baby's life.
 *
 * Content is drawn from NHS, AAP/HealthyChildren, CDC, WHO, the Lullaby Trust,
 * UNICEF Baby Friendly, NCT and the Raising Children Network (sources on each
 * entry, verified July 2026 — including the UK vaccination schedule changes
 * effective January 2026). Ages are completed weeks: week 1 = 0 completed weeks.
 */

import type { BabyStage } from "../types";

export const babyWeeks: BabyStage[] = [
  {
    id: "week-1",
    label: "Week 1",
    title: "Hello, tiny person",
    ageWeeksFrom: 0,
    ageWeeksTo: 0,
    summary:
      "Your baby is adjusting to life outside, and you're adjusting to life with them. This week is about feeding, sleeping, keeping them close — and being gentle with yourself.",
    expect: [
      {
        heading: "Getting to know each other",
        paragraphs: [
          "Newborns focus most clearly at about 20 to 30 centimetres — roughly the distance to your face when you hold them for a feed. They already know your voice, and they'll turn towards it.",
          "Lots of skin-to-skin contact helps with bonding, calms your baby, and helps feeding get started — and that goes for both parents. There's no such thing as holding a newborn too much.",
          "Some things about brand-new babies look odd but are completely normal: a slightly pointy or bruised head from the birth, puffy eyes, swollen genitals, and skin that's blotchy or peeling. Most of this settles within days or weeks.",
        ],
      },
      {
        heading: "Feeding, nappies and weight",
        paragraphs: [
          "Expect feeding to be very frequent — often 8 to 12 times or more in 24 hours, and sometimes every hour in the first days. Tiny tummies need little and often, whatever milk they're getting.",
          "Nappies tell you a lot this week. The first poos are black and sticky (meconium), turning greenish then yellow by around day 4 or 5, and wet nappies build up day by day — roughly one on day one, two on day two, and so on.",
          "Most babies lose some weight in the first few days — up to around 10% of their birth weight can be normal — and then start gaining again. Your midwife will keep an eye on this, so you don't have to do the maths.",
        ],
      },
      {
        heading: "Sleep — theirs, safely",
        paragraphs: [
          "Newborns sleep in short bursts around the clock, often only one to three hours at a time, with no day–night pattern yet. That's how they're built, not a problem to fix.",
          "For every sleep, day and night: on their back, in their own clear, flat, firm sleep space (cot or Moses basket) in the same room as you. No pillows, bumpers, toys or loose bedding, and a room temperature of about 16–20°C is ideal.",
          "Never fall asleep with your baby on a sofa or armchair — it's one of the riskiest situations for a baby. If you think you might doze off during a feed, it's safer to feed on a bed prepared with the Lullaby Trust's co-sleeping advice in mind.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "You've just done something enormous. Bleeding, afterpains, soreness and exhaustion are all part of normal recovery — rest when you can and accept every offer of help.",
          "Around day 2 or 3, many mums feel weepy, anxious or irritable as hormones shift. This is the 'baby blues' and it usually passes within about two weeks — if it doesn't, tell your midwife or health visitor.",
          "In the UK, your midwife team will visit in the first days, and around day 5 they'll offer the heel-prick blood spot test, plus a hearing screen if it wasn't done in hospital. Partners: your job this week is protection and provisions — guarding rest, making food appear, and holding the baby so someone can shower.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Feed whenever your baby shows hunger signs — rooting, hands to mouth, stirring — without watching the clock; very frequent feeding now is how your supply gets established.",
        "The first milk (colostrum) comes in tiny amounts and that's exactly what your baby needs; your milk usually 'comes in' around day 2 to 4 and your breasts will feel fuller.",
        "If latching hurts beyond the first few seconds, ask your midwife to check positioning and attachment early — small tweaks now prevent sore nipples later.",
        "Breastfed babies need daily vitamin D drops (8.5–10 micrograms in the UK) from birth — ask your midwife or pharmacist.",
      ],
      "breast-expressed": [
        "In the first days, hand expressing works better than a pump for collecting colostrum — a midwife can show you, and tiny syringes are perfectly normal for these tiny volumes.",
        "If your baby can't feed at the breast yet, expressing 8 or more times in 24 hours (including once at night) tells your body to build a full supply.",
        "Any expressed milk can be given by syringe, cup or bottle this week — your midwife can help you find what works for your baby.",
      ],
      "breast-formula": [
        "Combining breast and formula from the start is a valid, loving choice — and any amount of breastmilk your baby gets counts.",
        "If you'd like to keep breastfeeding as part of the mix, offering the breast before a formula top-up helps protect your supply while it's establishing.",
        "Use a first infant formula (the one labelled 'first' or 'stage 1') — it's the only kind babies need this year, and brands are all nutritionally similar.",
        "Formula top-ups in the early days are sometimes advised for weight or jaundice — that's a medical bridge, not a verdict on your breastfeeding.",
      ],
      formula: [
        "Formula feeding is a safe, healthy way to feed your baby — feed responsively, whenever they show hunger cues, rather than to a schedule.",
        "Make up each feed fresh, follow the instructions on the tin exactly, and never add extra powder — too much can cause constipation or dehydration.",
        "Hold your baby close and semi-upright, keep the bottle fairly horizontal, and let them pause and take breaks — this 'paced' style lets them control the feed.",
        "Don't worry if they don't finish the bottle — your baby knows how much they need, and leftover milk should be thrown away within an hour.",
      ],
    },
    dontWorry: [
      "Losing a little weight in the first days — up to around 10% of birth weight — is common and is usually regained within two to three weeks.",
      "Black, tar-like first poos (meconium) are exactly what should be in those first nappies.",
      "Tiny white spots on the face (milk spots) and blotchy newborn rashes are very common and clear on their own.",
      "Newborn breathing is naturally irregular — fast bursts, slow patches and brief pauses of a few seconds are normal.",
      "Frequent hiccups and sneezing are normal — sneezing is just how babies clear their little noses, not a sign of a cold.",
      "Swollen genitals or breasts (in boys and girls), and a small spot of blood in a girl's nappy in the first week, are caused by your hormones and settle by themselves.",
      "Eyes that occasionally drift or cross are normal at this age and usually settle by around 4 months.",
    ],
    watchFor: [
      "A temperature of 38°C (100.4°F) or higher — in a baby under 3 months this always needs same-day advice: call your midwife, GP or NHS 111 (UK); in the US, call your pediatrician straight away.",
      "Yellowing skin or eyes in the first 24 hours of life — call your midwife or maternity unit urgently; in the US, your pediatrician.",
      "Fewer wet nappies than expected for their day of life, dark urine, or a dry mouth — call your midwife or health visitor or GP; in the US, your pediatrician.",
      "A baby who is very sleepy, hard to wake for feeds, or not interested in feeding — call your midwife or GP; in the US, your pediatrician.",
      "Working hard to breathe — grunting, sucking in under the ribs, nostrils flaring — or a pause in breathing that frightens you: call 999 (UK) or 911 (US).",
      "Blue or grey lips or tongue, or a baby who is floppy and unresponsive — call 999 (UK) or 911 (US).",
      "Heavy vaginal bleeding for you (soaking a pad in an hour), fever or feeling faint — call your midwife urgently or 111; if severe, 999 (UK) or 911 (US).",
    ],
    sources: [
      {
        title: "Getting to know your newborn",
        org: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/getting-to-know-your-newborn/",
        region: "UK",
      },
      {
        title: "Breastfeeding: the first few days",
        org: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/breastfeeding/the-first-few-days/",
        region: "UK",
      },
      {
        title: "Safer sleep overview",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/safer-sleep-overview/",
        region: "UK",
      },
      {
        title: "Your newborn's first weeks: what to expect",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/pregnancy/labour-birth/first-week-of-life/newborns-first-week",
        region: "Australia",
      },
      {
        title: "Breastfeeding",
        org: "WHO",
        url: "https://www.who.int/health-topics/breastfeeding",
        region: "Global",
      },
    ],
  },
  {
    id: "week-2",
    label: "Week 2",
    title: "Finding your feet (slowly)",
    ageWeeksFrom: 1,
    ageWeeksTo: 1,
    summary:
      "Feeding is settling into something recognisable, the cord stump is on its way out, and most babies are back to their birth weight by the end of this week.",
    expect: [
      {
        heading: "Little milestones of week two",
        paragraphs: [
          "Most babies are back at their birth weight by around 10 to 14 days — a few healthy babies take up to three weeks, which is why your midwife or health visitor keeps weighing until they're happy.",
          "The umbilical cord stump usually dries out and drops off around one to two weeks. Keep it clean and dry and let it do its thing — a tiny smear of blood as it separates is normal.",
          "If your baby had mild jaundice, it's typically fading now. Jaundice that's still obvious after two weeks needs a check — it's usually harmless, but there's a simple test your GP or midwife will want to do.",
        ],
      },
      {
        heading: "Feeding finds a rhythm (sort of)",
        paragraphs: [
          "Feeds are still frequent — 8 to 12 or more in 24 hours is normal — but you may start to recognise your baby's hunger cues before the crying starts.",
          "From day 5 onwards, around six heavy wet nappies a day plus regular soft yellow poos are the most reliable sign that feeding is going well, however you're feeding.",
          "Evening fussiness and wanting to feed almost constantly for a few hours (cluster feeding) often starts around now. It's normal baby behaviour, not a sign that your milk or your formula isn't enough.",
        ],
      },
      {
        heading: "Days and nights are still muddled",
        paragraphs: [
          "Your baby doesn't yet make the sleep hormone patterns that separate day from night, so plenty of babies do their longest sleep in the daytime. This sorts itself out over the coming weeks.",
          "You can gently help by keeping daytime feeds light and sociable and night feeds dark, quiet and boring. Gently is the word — this is a nudge, not a training programme.",
          "Keep every sleep on their back in a clear cot or Moses basket in your room. If you're exhausted, plan for where sleep might happen rather than risking accidentally dozing off on the sofa together.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "The baby blues should be lifting by the end of this week. If low mood, anxiety or tearfulness are carrying on or getting worse, that's worth a conversation with your midwife or health visitor — not because you've failed, but because help works.",
          "Your body is still healing. Bleeding (lochia) continues for a few weeks and gradually lightens; sudden heavier bleeding or a bad smell needs a check.",
          "Partners can get overlooked in week two, and depression and anxiety affect them too. Whoever you are, saying 'I'm finding this hard' out loud to someone is a strength.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Your supply is calibrating to your baby's demand this week — frequent, effective feeds are the whole mechanism, so let them feed as often as they like.",
        "Cluster feeding in the evening is common and normal; it isn't evidence of low supply — heavy wet nappies and steady weight are the true measures.",
        "Sore or cracked nipples aren't something to push through — ask your midwife, health visitor or a breastfeeding drop-in to watch a full feed.",
        "Keep going with daily vitamin D drops for your baby.",
      ],
      "breast-expressed": [
        "If you're expressing some or all feeds, aiming for the same frequency as a baby would feed (8+ times in 24 hours) protects your supply in these calibration weeks.",
        "Many people find they get more milk in the morning — a good slot if you're building a small stash.",
        "Use paced bottle feeding for expressed milk: baby semi-upright, bottle horizontal, plenty of pauses — it keeps bottle feeds comfortable and lets baby stay in charge.",
        "Freshly expressed milk keeps in the fridge (at 4°C or lower) for up to a few days — label it, and store it at the back rather than in the door.",
      ],
      "breast-formula": [
        "If combination feeding is your plan, keeping breastfeeds frequent while topping up with formula helps your supply settle at a level that works for you.",
        "Watch nappy output rather than the clock or the tin — six heavy wet nappies a day from day 5 means your combination is working.",
        "Paced, responsive bottle feeding for the formula feeds keeps switching between breast and bottle easier for your baby.",
      ],
      formula: [
        "Let your baby set the pace — appetite varies feed to feed and day to day, and the amounts on the tin are a starting point, not a target.",
        "Cluster-type behaviour happens with formula-fed babies too — wanting smaller, more frequent feeds some evenings is normal.",
        "Winding halfway through and after a feed helps many babies settle; there's no single right technique, just what works for yours.",
        "Whoever gives the bottle, holding baby close with eye contact makes feeds a bonding moment — and letting the parents do most feeds helps baby feel secure.",
      ],
    },
    dontWorry: [
      "A few extra days to regain birth weight — some healthy babies take up to three weeks, and your midwife or health visitor is tracking it.",
      "A slightly gunky or faintly smelly navel as the cord separates, with a tiny smear of blood, is part of normal healing.",
      "Cluster feeding — long stretches of almost constant feeding, often in the evening — is normal and usually passes within days.",
      "Grunts, squeaks and snuffly noises during sleep are standard newborn soundtrack, not a cold.",
      "Explosive yellow poos after nearly every feed (breastfed) or firmer, less frequent poos (formula-fed) can both be completely normal.",
      "Milk spots, flaky skin and mild baby rashes are still common and still clear up on their own.",
      "Your baby having no schedule whatsoever — day–night confusion is biology, not bad habits.",
    ],
    watchFor: [
      "A temperature of 38°C (100.4°F) or higher always needs same-day advice at this age — call your GP or NHS 111 (UK); in the US, your pediatrician.",
      "Jaundice that is getting deeper rather than fading, or still obvious past two weeks — call your midwife, health visitor or GP; in the US, your pediatrician.",
      "Very pale, chalky poos or dark yellow urine alongside jaundice — call your GP promptly; in the US, your pediatrician.",
      "Redness spreading on the skin around the cord stump, swelling, or a genuinely bad smell with oozing — call your midwife or GP; in the US, your pediatrician.",
      "Fewer than six wet nappies in 24 hours from day 5, or a baby too sleepy to feed — call your midwife, health visitor or GP; in the US, your pediatrician.",
      "Green (bile-stained) vomit at any age — call your GP or 111 urgently; in the US, your pediatrician or urgent care.",
      "Blue or grey lips, long pauses in breathing, floppiness or unresponsiveness — call 999 (UK) or 911 (US).",
    ],
    sources: [
      {
        title: "Newborn jaundice",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/jaundice-newborn/",
        region: "UK",
      },
      {
        title: "Newborn baby poo in nappies",
        org: "NCT",
        url: "https://www.nct.org.uk/information/baby-toddler/caring-for-your-baby-or-toddler/newborn-baby-poo-nappies",
        region: "UK",
      },
      {
        title: "Is my baby getting enough milk?",
        org: "NCT",
        url: "https://www.nct.org.uk/baby-toddler/feeding/early-days/my-baby-getting-enough-milk-breastfeeding-or-formula",
        region: "UK",
      },
      {
        title: "Co-sleeping with your baby",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/co-sleeping/",
        region: "UK",
      },
      {
        title: "Cluster feeding and growth spurts",
        org: "WIC (USDA)",
        url: "https://wicbreastfeeding.fns.usda.gov/cluster-feeding-and-growth-spurts",
        region: "US",
      },
    ],
  },
  {
    id: "week-3",
    label: "Week 3",
    title: "The first growth spurt",
    ageWeeksFrom: 2,
    ageWeeksTo: 2,
    summary:
      "Around two to three weeks, many babies hit a growth spurt: hungrier, fussier and clingier for a few days. It passes — and there are lovely new alert moments in between.",
    expect: [
      {
        heading: "Hungrier all of a sudden",
        paragraphs: [
          "Growth spurts often land around 2–3 weeks and again around 6 weeks. For a couple of days your baby may want to feed much more often and be harder to settle.",
          "This is normal and temporary, whatever way you feed. With breastfeeding, the extra feeding is precisely how your baby orders more milk for next week; with bottles, they may simply take a little more, a little more often.",
          "It can shake your confidence — a previously settled baby suddenly frantic at 11pm. Hold your nerve, feed responsively, and it usually settles within two or three days.",
        ],
      },
      {
        heading: "More awake, more aware",
        paragraphs: [
          "You'll notice longer alert windows now — wide-eyed stretches where your baby stares at your face, follows it briefly, and listens hard to your voice.",
          "Talking, singing and pulling faces at this range is genuinely developmental. You can't spoil a baby with attention; responding to them is how their brain learns the world is safe.",
          "Short bouts of tummy time — a few minutes, a few times a day, always awake and supervised — start building the neck and shoulder strength for everything that comes later. Chest-to-chest on you counts.",
        ],
      },
      {
        heading: "Crying is ramping up",
        paragraphs: [
          "From around two weeks, normal crying starts to increase, heading for a peak around six to eight weeks. Knowing this curve exists helps: more crying doesn't mean something is wrong or that you're doing a bad job.",
          "Work through the checklist — hungry, windy, nappy, too hot or cold, overtired, wants holding — and then remember some crying has no findable reason at all.",
          "If you're at the end of your rope, it is always OK to put your baby down safely in their cot, on their back, and step into another room for a few minutes to breathe. Never, ever shake a baby.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "In the UK, care usually transfers from your midwife to your health visitor around now — they're your go-to for feeding, sleep, crying and your own wellbeing questions.",
          "Sleep deprivation is at its most brutal in these weeks. If there are two of you, shifts genuinely help — one covers till 2am while the other sleeps, then swap.",
          "Check in on each other, not just the baby. 'How are you actually doing?' is the most useful question two exhausted parents can trade.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "During the growth spurt, feed on demand and trust the system — a day or two of near-constant feeding boosts your supply to match your bigger baby.",
        "Resist judging your supply during spurt days; nappy output and weight gain over the week are the honest signals.",
        "Look after the feeder: drinks and snacks within reach make marathon feed days survivable.",
      ],
      "breast-expressed": [
        "If you're exclusively expressing, add a pumping session or two during spurt days to mirror the demand a baby at the breast would create.",
        "A hands-free pumping bra and pumping while your baby naps nearby can claw back some sanity this week.",
        "If bottles of expressed milk are vanishing faster than you can pump, it's fine to bridge with formula — protecting your rest also protects your supply.",
      ],
      "breast-formula": [
        "In spurt days, offering extra breastfeeds before increasing formula keeps your supply responsive to your baby's new appetite.",
        "If you'd like to nudge the balance towards more breastmilk over time, growth-spurt weeks are actually a workable moment — extra time at the breast does the signalling for you.",
        "Equally, adding an extra formula feed to get through a rough patch is a legitimate call — feeding plans are allowed to flex.",
      ],
      formula: [
        "Expect your baby to take a bit more during a growth spurt — follow their appetite rather than yesterday's amounts.",
        "Keep feeds paced and responsive even when they're frantic — short pauses reduce gulping, wind and the misery after.",
        "Making up feeds fresh each time is still the safest routine; if you need speed at 3am, a flask of just-boiled water measured out in advance helps.",
      ],
    },
    dontWorry: [
      "A sudden 48-hour feeding frenzy around now — the 2–3 week growth spurt is textbook normal.",
      "Crying that is noticeably more than last week — normal crying increases from about 2 weeks towards a 6–8 week peak.",
      "Baby acne appearing on the face around 2–4 weeks — it clears without treatment.",
      "Hiccups after feeds, sometimes several times a day, don't bother babies nearly as much as they bother us.",
      "Hating tummy time at first — a few protesting minutes still count, and chest-to-chest on you counts too.",
      "Breastfed babies sometimes start pooing less often around now — for some, several days between soft poos is normal.",
      "Wanting to be held constantly — closeness is a need at this age, not a habit you're creating.",
    ],
    watchFor: [
      "A temperature of 38°C (100.4°F) or higher still means same-day advice — call your GP or NHS 111 (UK); in the US, your pediatrician.",
      "Fussiness with fever, refusing several feeds in a row, or vomiting most feeds — call your health visitor or GP; in the US, your pediatrician.",
      "Forceful projectile vomiting after most feeds, especially if your baby seems hungry again straight after and wet nappies are dropping — call your GP promptly; in the US, your pediatrician.",
      "A cry that sounds high-pitched, weak or unlike your baby, or a baby who can't be woken properly — call 999 (UK) or 911 (US).",
      "Fewer heavy wet nappies over a couple of days — call your health visitor or GP; in the US, your pediatrician.",
      "A rash that doesn't fade when you press a glass against it — call 999 (UK) or 911 (US).",
      "You feeling rage or despair when the crying won't stop — put baby down safely and call someone: a friend, your health visitor, or Cry-sis (UK); in the US, the 988 helpline. It's a sign you need support, not that you're a bad parent.",
    ],
    sources: [
      {
        title: "Cluster feeding and growth spurts",
        org: "WIC (USDA)",
        url: "https://wicbreastfeeding.fns.usda.gov/cluster-feeding-and-growth-spurts",
        region: "US",
      },
      {
        title: "Soothing a crying baby",
        org: "NHS",
        url: "https://www.nhs.uk/baby/caring-for-a-newborn/soothing-a-crying-baby/",
        region: "UK",
      },
      {
        title: "The importance of tummy time",
        org: "AAP (HealthyChildren.org)",
        url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/The-Importance-of-Tummy-Time.aspx",
        region: "US",
      },
      {
        title: "How can I tell that breastfeeding is going well? (checklist)",
        org: "UNICEF Baby Friendly",
        url: "https://www.unicef.org.uk/babyfriendly/wp-content/uploads/sites/2/2016/10/mothers_breastfeeding_checklist.pdf",
        region: "UK",
      },
      {
        title: "Baby development at 0–1 month",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/newborns/development/development-tracker/0-1-month",
        region: "Australia",
      },
    ],
  },
  {
    id: "week-4",
    label: "Week 4",
    title: "One month in — and louder about it",
    ageWeeksFrom: 3,
    ageWeeksTo: 3,
    summary:
      "A month already. Your baby is more alert and more vocal — including about their discontent. Crying is climbing towards its natural peak, so this week is partly about coping kit.",
    expect: [
      {
        heading: "What a one-month-old can do",
        paragraphs: [
          "Your baby is likely fixing on faces, briefly following them side to side, startling at noises and calming to your voice. Their fists are mostly clenched and their movements still jerky — smoothness comes later.",
          "In tummy time they may turn their head from side to side and make the first tiny attempts to lift it. Little and often is still the recipe.",
          "Every baby's timetable is its own. These are ranges, not deadlines — health visitors and paediatricians look at the overall picture, not a single tick-box.",
        ],
      },
      {
        heading: "Crying: the hard-work phase",
        paragraphs: [
          "Crying typically keeps building from now towards a peak around six to eight weeks — at the peak, a couple of hours a day is average, and some perfectly healthy babies do more. Late afternoon and evening are prime time.",
          "About 1 in 5 babies cry so much and so inconsolably that it gets called colic. It happens across breastfed and formula-fed babies alike, it isn't caused by anything you did, and it fades — usually well before 5 months.",
          "Soothing is trial and error: holding close or in a sling, gentle motion, sucking (breast, clean finger or a dummy if you use one), a warm bath, white noise, or stepping outside. What worked yesterday may not work today; that's babies.",
        ],
      },
      {
        heading: "Sleep at one month",
        paragraphs: [
          "Total sleep is still spread around the clock, though some babies start to give one slightly longer stretch — often, unhelpfully, starting at 7pm while you're awake.",
          "Keep following safer sleep for every sleep, naps included: back to sleep, clear flat cot, same room as you. If you use blankets, tuck them below shoulder height with baby's feet at the foot of the cot.",
          "Dummies divide opinion, and honestly the evidence is mixed on some points — but if you use one for sleep, the Lullaby Trust suggests offering it consistently, and if you're breastfeeding, many families wait until feeding is well established.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "The one-month mark can feel like hitting a wall: the adrenaline is gone, the visitors have stopped, and the nights are still relentless. Feeling flat or trapped in the loop of feed–wind–change is common and worth saying out loud.",
          "If low mood, hopelessness, constant anxiety or not enjoying anything has lasted more than a couple of weeks, that could be postnatal depression — it affects around 1 in 10 mums, and dads and partners get it too. Your GP and health visitor genuinely want to hear about it.",
          "Build the crying-peak survival plan now: who you can call, who can take a shift, and the reminder on the fridge that it's OK to put the baby down safely and step away.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Feeds may be getting slightly more efficient — some babies now finish in 15–20 minutes what once took 45, while others still linger; both are fine.",
        "Evening cluster feeding often continues through the crying-peak weeks — feeding to soothe is allowed, and you cannot overfeed a breastfed baby.",
        "If you're thinking about introducing an occasional bottle of expressed milk, somewhere around now — once feeding feels established — is when many families find it works smoothly.",
      ],
      "breast-expressed": [
        "If you're combining breast and expressed bottles, keeping most feeds at the breast (or matching removed feeds with a pump) keeps supply steady.",
        "Evening expressing can be dispiriting — output is naturally lower then; mornings remain the generous slot.",
        "Let someone else give an expressed bottle occasionally — a fed baby, a rested parent and a bonding partner is a good trade all round.",
      ],
      "breast-formula": [
        "Many combination-feeding families settle into a pattern around now — for example, breastfeeds by day and one formula feed in the evening; there's no single right recipe.",
        "If your baby is fussier at the breast in the evening, that's usually the normal evening fussies, not your milk — formula-fed babies have the same witching hour.",
        "Keep bottle feeds paced so your baby can move happily between breast and bottle.",
      ],
      formula: [
        "Appetite still varies day to day — responsive feeding (offering when hungry, stopping when done) beats chasing a fixed number of millilitres.",
        "During evening fussiness, resist the urge to keep offering more milk as the only tool — motion, sucking, a bath and being held work for formula-fed babies too.",
        "If your baby seems uncomfortable after feeds, check teat flow and pacing before blaming the formula — and talk to your health visitor before switching brands, as frequent switches make it harder to spot what helps.",
      ],
    },
    dontWorry: [
      "Crying more than ever, especially in the evening — the normal crying curve is still climbing and peaks around 6–8 weeks.",
      "Inconsolable patches where nothing works — some crying at this age has no findable cause, even for professionals.",
      "No smiles yet — many babies smile for the first time around 5 to 8 weeks, and a bit later is still normal.",
      "Jerky arm and leg movements and trembling chins — smooth movement is a work in progress.",
      "A flat-ish patch developing on the back of the head — common with back-sleeping; tummy time and varying head position while awake help, and it usually rounds out.",
      "Cradle cap — greasy yellow scales on the scalp — looks dramatic and bothers babies not at all.",
      "Your baby feeding to sleep — at this age it's biology, not a bad habit.",
    ],
    watchFor: [
      "Fever of 38°C (100.4°F) or above — same-day advice, every time, at this age: call your GP or NHS 111 (UK); in the US, your pediatrician.",
      "Crying that is constant and can't be soothed at all for hours, especially with fever, vomiting or a swollen tummy — call your GP or 111; in the US, your pediatrician.",
      "A baby who has stopped feeding, or wet nappies dropping noticeably — call your health visitor or GP; in the US, your pediatrician.",
      "Breathing that looks like hard work — grunting with each breath, ribs sucking in, unusually fast — call 999 (UK) or 911 (US).",
      "A bulging or noticeably sunken soft spot (fontanelle) when your baby is calm and upright — call your GP urgently or 111; in the US, your pediatrician.",
      "A non-blanching rash, blue or grey lips, floppiness or a seizure — call 999 (UK) or 911 (US).",
      "If you ever feel you might hurt your baby or yourself — put baby somewhere safe and call 999 (UK) or 911/988 (US), or Samaritans on 116 123 (UK). Help is real and nobody will judge you for asking.",
    ],
    sources: [
      {
        title: "Soothing a crying baby",
        org: "NHS",
        url: "https://www.nhs.uk/baby/caring-for-a-newborn/soothing-a-crying-baby/",
        region: "UK",
      },
      {
        title: "The Period of PURPLE Crying",
        org: "Cleveland Clinic",
        url: "https://my.clevelandclinic.org/health/articles/purple-crying",
        region: "US",
      },
      {
        title: "Crying babies: what to do",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/newborns/behaviour/crying-colic/crying-babies",
        region: "Australia",
      },
      {
        title: "Safer sleep overview",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/safer-sleep-overview/",
        region: "UK",
      },
      {
        title: "Postnatal depression",
        org: "NHS",
        url: "https://www.nhs.uk/mental-health/conditions/postnatal-depression/",
        region: "UK",
      },
    ],
  },
  {
    id: "week-5",
    label: "Week 5",
    title: "Watch for the smile",
    ageWeeksFrom: 4,
    ageWeeksTo: 4,
    summary:
      "Somewhere around now, many parents get paid: the first real, sociable smile. Crying is still heavy going for many babies — the two facts coexist, oddly enough.",
    expect: [
      {
        heading: "The first smile (maybe)",
        paragraphs: [
          "Many babies produce their first genuine social smile — aimed at you, in response to you — somewhere around five to eight weeks. Earlier fleeting smiles in sleep were reflexes; this one has intent.",
          "If it hasn't happened yet, that's common and usually fine. It's one of the things looked at around the 8-week review (UK) or 2-month well-visit (US), so there's a natural checkpoint coming.",
          "You can invite smiles by getting your face close (20–30cm), smiling, and talking in that sing-song voice adults produce automatically. Babies are wired to prefer exactly that.",
        ],
      },
      {
        heading: "First conversations",
        paragraphs: [
          "Cooing — those small round vowel sounds — often starts around six to eight weeks, with throaty gurgles alongside. When your baby makes a sound, answer it and pause; you're teaching turn-taking, the skeleton of all conversation.",
          "Your baby increasingly turns towards sounds and studies faces at close range. They may recognise you at a bit of a distance now.",
          "Narrating your day sounds silly and works brilliantly: 'Now we're putting the kettle on…' is early language teaching, free of charge.",
        ],
      },
      {
        heading: "Sleep and the long game",
        paragraphs: [
          "Some babies begin stretching one night sleep a little longer around now; plenty don't. Both are normal at five weeks, and it isn't something you can force.",
          "Keep naps and nights on their back in the clear cot, in your room — the same-room advice runs to at least six months.",
          "Overtiredness makes evening crying worse, and five-week-olds can often only manage about an hour to ninety minutes awake before needing sleep again. Watching wake windows loosely can shave the edge off the witching hour.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "Take stock of your own fortnight: if most days have felt dark rather than just hard — persistent sadness, no pleasure in anything, withdrawing from people, feeling worthless — that pattern lasting over two weeks is the marker for postnatal depression, and your GP or health visitor can actually help.",
          "Anxiety counts too: constant dread, a racing mind that won't let you sleep even when the baby sleeps, or intrusive scary thoughts. These are common, treatable, and nothing to be ashamed of.",
          "Partners: around 1 in 10 of you develop depression in this first year as well. The checks and the compassion apply to you too.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Feeding is often becoming more predictable in daylight hours, with the evening still busy — that shape is typical for weeks yet.",
        "Some babies start feeding faster and popping off sooner; efficiency, not rejection.",
        "Fussy, pull-off-and-cry evening feeds are usually about tiredness and the crying peak, not your supply drying up.",
        "Still going with vitamin D drops — easily forgotten around week five, easily restarted.",
      ],
      "breast-expressed": [
        "If your baby now takes a bottle of expressed milk happily, keeping it regular (a few times a week) helps them stay practised.",
        "Pumping output per session often looks smaller than what a baby takes — babies are simply better at it than pumps; judge supply by your baby, not the bottle.",
        "If exclusively expressing is your route, around 6–8 sessions in 24 hours typically maintains supply now — and dropping the overnight pump too early is the classic supply trap.",
      ],
      "breast-formula": [
        "By now combination routines often stabilise — your breasts have adjusted to which feeds they're covering, so engorgement at skipped feeds should be easing.",
        "If you want to breastfeed more (or less), change one feed at a time over several days and your supply will follow you.",
        "Whichever milk a feed is, the ritual matters more than the vessel: close, unhurried, eyes on each other.",
      ],
      formula: [
        "Feeds may be settling towards a loose pattern — roughly every 3 hours daytime for many babies now, though yours may differ and that's fine.",
        "As appetite grows, follow your baby's cues upwards rather than a chart — finishing every bottle fast and rooting for more is the signal to offer a little extra.",
        "First infant formula is still the only formula they need — 'hungrier baby' milks aren't recommended for young babies.",
      ],
    },
    dontWorry: [
      "No social smile yet at five weeks — the range runs to eight weeks and sometimes beyond; it's checked at the 8-week review.",
      "Crying still rising or at its worst — you're inside the normal peak window now (roughly weeks 6–8), and it does come down.",
      "Sleep that's still chaotic with no long night stretch — five-week-olds owe you nothing on this front yet.",
      "Noisy, snuffly breathing without other symptoms — tiny nasal passages amplify everything.",
      "Sudden hair loss — many babies shed their newborn hair around now, sometimes leaving a distinguished bald patch.",
      "Wanting to feed for comfort as much as for food — sucking is a genuine soothing tool for babies, not manipulation.",
      "Explosive growth in appetite one week and calm the next — babies grow in fits and starts.",
    ],
    watchFor: [
      "Any temperature of 38°C (100.4°F) or above — same-day advice at this age, always: call your GP or NHS 111 (UK); in the US, your pediatrician.",
      "Your baby not looking at faces at all, not startling to sounds, or seeming floppy compared with other babies — mention it to your health visitor or GP now rather than waiting for the review; in the US, your pediatrician.",
      "Vomiting that is forceful and frequent with weight worries or fewer wet nappies — call your GP; in the US, your pediatrician.",
      "One eye that is consistently turned in or out all the time (rather than occasional drifting) — mention to your health visitor or GP; in the US, your pediatrician.",
      "Signs of dehydration — fewer heavy wet nappies, dark urine, a sunken fontanelle — call your GP or 111; in the US, your pediatrician.",
      "Blue or grey lips or tongue, breathing that stops or is a visible struggle, or a baby you can't rouse — call 999 (UK) or 911 (US).",
      "Thoughts of harming yourself, or feeling life isn't worth living — call your GP today, or Samaritans on 116 123 (UK); in the US, call or text 988. Urgent help: 999 (UK) or 911 (US).",
    ],
    sources: [
      {
        title: "Milestones by 2 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/2-months.html",
        region: "US",
      },
      {
        title: "Baby development at 1–2 months",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/newborns/development/development-tracker/1-2-months",
        region: "Australia",
      },
      {
        title: "Postnatal depression",
        org: "NHS",
        url: "https://www.nhs.uk/mental-health/conditions/postnatal-depression/",
        region: "UK",
      },
      {
        title: "Perinatal depression in parents",
        org: "NCT",
        url: "https://www.nct.org.uk/information/life-parent/wellbeing-mental-health/perinatal-depression-parents",
        region: "UK",
      },
      {
        title: "The importance of tummy time",
        org: "AAP (HealthyChildren.org)",
        url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/The-Importance-of-Tummy-Time.aspx",
        region: "US",
      },
    ],
  },
  {
    id: "week-6",
    label: "Week 6",
    title: "Peak crying, first check-ups",
    ageWeeksFrom: 5,
    ageWeeksTo: 5,
    summary:
      "Week six is a big one: the crying curve typically peaks around now, another growth spurt often lands, and in the UK it's time to book your own postnatal check if it hasn't happened yet.",
    expect: [
      {
        heading: "The summit of the crying curve",
        paragraphs: [
          "Across studies and countries, babies' daily crying peaks around six weeks — averaging roughly two to three hours a day, with healthy babies both well above and below that. From here it declines steadily, usually noticeably by 10–12 weeks.",
          "Some hospitals teach this as the Period of PURPLE Crying: Peak pattern, Unexpected, Resists soothing, Pain-like face, Long-lasting, Evening. The point of the acronym is reassurance — this profile is normal infant behaviour, not illness or bad parenting.",
          "The safety message bears repeating at peak week: crying doesn't hurt babies, but shaking does, catastrophically. Safe cot, closed door, five minutes of breathing is always an acceptable move.",
        ],
      },
      {
        heading: "Growth spurt, round two",
        paragraphs: [
          "The six-week growth spurt often overlaps with peak crying — a hungry, fussy, unsettled few days. Feed responsively and know it passes.",
          "In better news, smiles and coos are arriving or consolidating for many babies this week, which takes some of the sting out of the 5pm–9pm shift.",
          "Head control is coming along: many babies now lift head and briefly chest in tummy time.",
        ],
      },
      {
        heading: "Your 6-week check (UK) — and theirs coming up",
        paragraphs: [
          "In the UK, GP surgeries should offer mothers a postnatal check at 6–8 weeks covering four things: your mental health, your physical recovery, pelvic health, and contraception. It's about you, not the baby — if it feels rushed or skipped, you're entitled to ask for proper time.",
          "Worth knowing: you can become pregnant again before your first period returns, so the contraception chat is more practical than it might feel at 6 weeks.",
          "Your baby's own 6–8 week examination (heart, hips, eyes, testes, weight, development) is usually booked together with yours, and the first vaccinations come at 8 weeks — get both in the diary now. In the US, this all rolls into the 2-month well-child visit.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "Be honest at the postnatal check. The questions about mood aren't a test to pass — under-reporting is the main reason parents don't get help that exists.",
          "Physically, six weeks is when many people are told they 'should' feel recovered. Bodies don't read the memo; ongoing pain, incontinence or heaviness aren't things to put up with — the check is exactly the place to raise them.",
          "Partners don't get an NHS check of their own, so borrow the format: how is your mood, your sleep, your body, your relationship? Two-minute audit, potentially important answers.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Growth spurt plus peak crying can mean feeding feels constant this week — supply worries spike at six weeks, but nappies and weight gain almost always tell a calmer story.",
        "Feeding through the evening fussies at the breast is a legitimate soothing strategy, not spoiling.",
        "If feeding hurts, or you're dreading feeds, a lactation consultant or breastfeeding counsellor this week is a better plan than gritting your teeth to eight weeks.",
      ],
      "breast-expressed": [
        "Mirror the spurt if you're exclusively expressing: an extra session for two or three days nudges supply up to the new demand.",
        "Power-pumping (pumping in bursts over an hour, mimicking cluster feeds) is a tool some find helpful for spurt weeks — evidence is mostly practical rather than trial-based, so treat it as worth a try, not gospel.",
        "Check pump parts this week — worn valves and poorly fitting flanges quietly steal output.",
      ],
      "breast-formula": [
        "Spurt weeks can unbalance a combination routine — it's fine to add an extra breastfeed, an extra top-up, or both, and rebalance next week.",
        "If your baby is taking more formula and your breasts feel fuller at skipped feeds, expressing just to comfort avoids both blocked ducts and unintended supply increase.",
        "There is no ranking hidden in your ratio — a baby getting some breastmilk and some formula is simply a fed baby with a flexible family.",
      ],
      formula: [
        "Appetite often steps up around six weeks — offering a little more per feed, guided by your baby, is the responsive move.",
        "Peak-crying evenings tempt everyone to over-feed as a soother; if the bottle isn't the answer, swap to motion, sucking or a bath rather than another ounce.",
        "Reflux-ish behaviour (spitting up, fussing after feeds) peaks around now in many babies — smaller, more frequent, well-winded feeds help more often than formula switches; your health visitor or pediatrician can advise.",
      ],
    },
    dontWorry: [
      "Two to three hours of crying a day around now — that is literally the average at the peak of the normal crying curve.",
      "Crying that intensifies in the evening and resists every trick — 'resists soothing' is part of the normal pattern, not proof of pain.",
      "Another ravenous, unsettled patch — the 6-week growth spurt is as classic as the 3-week one.",
      "A baby who still wakes every 2–3 hours at night — completely standard at six weeks.",
      "Spitting up small amounts after many feeds — if your baby is gaining weight and mostly content, this is laundry, not illness.",
      "Still no smile in some babies — the 8-week review is the natural checkpoint, and late smilers usually turn out fine.",
      "Feeling no magic at the postnatal check question 'and how are you?' — six weeks is many people's hardest point; say so.",
    ],
    watchFor: [
      "Fever of 38°C (100.4°F) or above — same-day medical advice without exception at this age: call your GP or NHS 111 (UK); in the US, your pediatrician.",
      "Crying with fever, vomiting, a bulging fontanelle, or a baby who becomes unusually quiet and floppy after crying — call 999 (UK) or 911 (US).",
      "A baby who never has calm alert periods, barely responds to you, or feels stiff or floppy when handled — raise with your GP or health visitor this week; in the US, your pediatrician.",
      "Crying that changed suddenly in character today (high-pitched, moaning) rather than the usual evening build — call your GP or 111 today; in the US, your pediatrician.",
      "Feeding refusal beyond a couple of feeds, or wet nappies tailing off — call your health visitor or GP; in the US, your pediatrician.",
      "Leaking urine or faeces, or pain that stops you functioning at six weeks postpartum — not an emergency, but book the GP: effective treatment exists and 'it's just having a baby' is not the standard you should accept.",
      "Scoring high on the mood questions, or knowing you fudged the answers — go back, or ring your health visitor and say so; in the US, tell your OB or pediatrician (they screen parents for exactly this).",
    ],
    sources: [
      {
        title: "The Period of PURPLE Crying",
        org: "Cleveland Clinic",
        url: "https://my.clevelandclinic.org/health/articles/purple-crying",
        region: "US",
      },
      {
        title: "Your 6-week postnatal check",
        org: "NHS",
        url: "https://www.nhs.uk/baby/support-and-services/your-6-week-postnatal-check/",
        region: "UK",
      },
      {
        title: "The 6–8 week postnatal check with the GP",
        org: "NCT",
        url: "https://www.nct.org.uk/information/baby-toddler/baby-and-toddler-health/6-8-week-postnatal-check-gp",
        region: "UK",
      },
      {
        title: "Cluster feeding and growth spurts",
        org: "WIC (USDA)",
        url: "https://wicbreastfeeding.fns.usda.gov/cluster-feeding-and-growth-spurts",
        region: "US",
      },
      {
        title: "Soothing a crying baby",
        org: "NHS",
        url: "https://www.nhs.uk/baby/caring-for-a-newborn/soothing-a-crying-baby/",
        region: "UK",
      },
    ],
  },
  {
    id: "week-7",
    label: "Week 7",
    title: "Holding steady through the peak",
    ageWeeksFrom: 6,
    ageWeeksTo: 6,
    summary:
      "Still in the crying-peak zone, but with more smiles, stronger necks and slightly longer sleep stretches beginning to appear. You're closer to the downhill side than the uphill one.",
    expect: [
      {
        heading: "Strength and senses",
        paragraphs: [
          "Head control improves visibly around now — steadier when held upright, and lifting higher in tummy time. The AAP suggests working up towards a total of 15–30 minutes of tummy time a day by about this age, in short instalments.",
          "Your baby is tracking moving faces and objects more smoothly and may study high-contrast patterns with real concentration. Hands are starting to unclench.",
          "Cooing conversations are getting richer for many babies — answer, pause, let them reply. They're learning the rhythm of dialogue long before words.",
        ],
      },
      {
        heading: "Crying: cresting the hill",
        paragraphs: [
          "For many babies, crying holds at its peak around weeks six to eight before easing. If your evenings are still loud, you are not behind schedule — you're in the widest part of normal.",
          "Keep the rotation going: sling, motion, sucking, white noise, bath, fresh air. And keep the tag-team going — nobody should be sole audience to the witching hour every night.",
          "If crying comes with feeding problems, poor weight gain, or your gut says something is wrong, get it checked. Colic is common, but 'you know your baby best' is genuinely how clinicians want you to operate.",
        ],
      },
      {
        heading: "Sleep: green shoots",
        paragraphs: [
          "Some babies now offer a first longer night stretch — perhaps four to six hours at the start of the night. If yours doesn't, that's equally normal at seven weeks; this isn't within your control, so it can't be your failing.",
          "The room-sharing, back-sleeping, clear-cot rules continue exactly as before — increasing wriggliness doesn't change safer sleep advice.",
          "If a longer stretch does arrive and you're breastfeeding, you might wake engorged — expressing a little for comfort keeps you comfortable without ordering a full extra feed's worth of supply.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "Seven weeks of broken sleep accumulates. Treat rest as logistics, not luck: shifts, a weekend nap handover, one protected lie-in each — whatever your household can engineer.",
          "Loneliness peaks around now for many parents at home with a baby. Baby groups, breastfeeding cafés, buggy walks — the activity is a pretext; the point is other adults who get it.",
          "Next week is vaccination week in the UK (and the 2-month well-visit in the US). Booking a calm slot — not squeezed before nap-collapse hour — makes the day gentler for everyone.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Post-spurt, feeding often settles this week — shorter, more businesslike feeds are a sign of skill, not waning interest.",
        "If a longer night stretch appears, no need to wake for feeds once weight gain is established — but express a little if you wake uncomfortable.",
        "Feeding in public gets easier with practice and layers; UK law explicitly protects breastfeeding anywhere, if reassurance helps.",
      ],
      "breast-expressed": [
        "If baby sleeps a longer night stretch, decide deliberately whether to sleep through it too or add a pump before your own bedtime — sudden long gaps are the main cause of supply dips and blocked ducts.",
        "A small freezer stash buys real flexibility now — even 60–90ml a day adds up.",
        "Check bottle-feed pacing again as baby gets stronger and faster — gulping a bottle in five minutes usually means the flow is running the show.",
      ],
      "breast-formula": [
        "Combination-fed babies may also stretch out at night — if the dropped feed was a breastfeed, a comfort express protects you from engorgement while your supply adjusts.",
        "A pre-bed formula feed given by a partner is a popular pattern; the evidence it makes babies sleep longer is honestly mixed, but the shared load is a benefit in itself.",
        "Keep any formula feeds paced and cuddly — consistency of experience matters more to your baby than consistency of milk.",
      ],
      formula: [
        "Some formula-fed babies begin a longer night stretch around now — follow their lead, no need to wake a thriving baby to feed.",
        "Daily total intake matters more than any single feed — a snacky day followed by a hungry day is standard baby accounting.",
        "Sterilising and safe preparation still apply in full — it's tedious and it matters; a routine (make, feed, rinse, restock) keeps 3am simple.",
      ],
    },
    dontWorry: [
      "Evenings that are still loud — weeks 6 to 8 are the recognised peak of normal crying; the curve bends down from here.",
      "A four-hour night stretch one night and hourly waking the next — consistency is not a seven-week-old skill.",
      "Feeds shrinking from 40 minutes to 15 — efficiency improves with practice on both sides.",
      "A sweaty head during feeds and sleep — babies run warm doing their hardest work; just keep the room around 16–20°C.",
      "Loud, dramatic straining and going red to pass a perfectly soft poo — infant dyschezia, in the trade; babies are learning to coordinate, not constipated.",
      "Drooling starting up — salivary glands are switching on; it isn't a teething announcement at this age.",
      "Preferring one parent for comfort some weeks — allegiances rotate; nobody is being voted off.",
    ],
    watchFor: [
      "Fever of 38°C (100.4°F) or above — still automatic same-day advice at this age: call your GP or NHS 111 (UK); in the US, your pediatrician.",
      "A baby whose head lags completely with no improvement, or who feels persistently stiff or unusually floppy — raise at the 8-week review or sooner with your GP or health visitor; in the US, your pediatrician.",
      "Not fixing on faces or following anything with their eyes by now — book the GP or mention to your health visitor; in the US, your pediatrician.",
      "Poo that is white or clay-coloured, or persistent yellow jaundice still visible — call your GP promptly; in the US, your pediatrician.",
      "Coughing fits that end in a whoop, vomit or a colour change — call your GP or 111 today (whooping cough circulates, and this age group is most vulnerable before vaccination); in the US, your pediatrician. If breathing pauses or lips go blue: 999 (UK) or 911 (US).",
      "Vomiting with a swollen or tender tummy, or blood in vomit or poo — call your GP or 111 urgently; in the US, your pediatrician or urgent care.",
      "You running on empty — falling asleep while holding the baby in a chair or bed is a real risk; tell someone today and re-plan the nights rather than white-knuckling.",
    ],
    sources: [
      {
        title: "The importance of tummy time",
        org: "AAP (HealthyChildren.org)",
        url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/The-Importance-of-Tummy-Time.aspx",
        region: "US",
      },
      {
        title: "Period of PURPLE Crying",
        org: "Seattle Children's",
        url: "https://www.seattlechildrens.org/health-safety/parenting/purple-education-crying/",
        region: "US",
      },
      {
        title: "Soothing a crying baby",
        org: "NHS",
        url: "https://www.nhs.uk/baby/caring-for-a-newborn/soothing-a-crying-baby/",
        region: "UK",
      },
      {
        title: "Safer sleep overview",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/safer-sleep-overview/",
        region: "UK",
      },
      {
        title: "Is my baby getting enough milk?",
        org: "NCT",
        url: "https://www.nct.org.uk/baby-toddler/feeding/early-days/my-baby-getting-enough-milk-breastfeeding-or-formula",
        region: "UK",
      },
    ],
  },
  {
    id: "week-8",
    label: "Week 8",
    title: "Check-up and first vaccinations week",
    ageWeeksFrom: 7,
    ageWeeksTo: 7,
    summary:
      "The big admin week: in the UK, the 8-week review for your baby (often alongside your own postnatal check) and the first routine vaccinations. In the US, this is the 2-month well-child visit.",
    expect: [
      {
        heading: "The 8-week vaccinations (UK)",
        paragraphs: [
          "In the UK (schedule current from January 2026), 8-week-olds are offered three things: the 6-in-1 injection (diphtheria, tetanus, whooping cough, polio, Hib and hepatitis B), the MenB injection, and rotavirus drops given by mouth.",
          "Because MenB commonly causes fever, you'll usually be advised to give doses of infant paracetamol afterwards — the practice nurse will talk you through amounts and timing. A miserable, feverish 24 hours after jabs is common and expected.",
          "In the US, the 2-month well-visit vaccines cover similar ground: DTaP, Hib, polio, hepatitis B, pneumococcal and rotavirus. Multiple vaccines in one visit are safe — your pediatrician can talk through the schedule.",
        ],
      },
      {
        heading: "The 8-week review (UK) / 2-month visit (US)",
        paragraphs: [
          "Your baby gets a top-to-toe repeat of their newborn examination — heart, hips, eyes, and testes in boys — plus weight, length and head circumference, and a chat about smiling, responsiveness and how feeding and sleep are going.",
          "Bring your questions written down; this is a protected slot with a professional whose job is exactly this. Nothing is too small — 'is this rash normal' and 'she hates the car seat' are both legitimate.",
          "In the US, the 2-month visit also includes a depression screen for the parent — answer honestly; it's there because helping you is part of helping the baby.",
        ],
      },
      {
        heading: "Meanwhile, your actual baby",
        paragraphs: [
          "By around two months, most babies smile at people, coo and gurgle, hold their head up in tummy time, calm briefly when comforted, and watch faces with open fascination.",
          "These are population patterns, not pass marks — the review exists precisely so that anything worth a closer look gets one early, calmly.",
          "Crying is typically at or just past its peak now. If it's easing, enjoy the descent; if not yet, the decline usually shows within the next fortnight or so.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "Vaccination day is often harder on parents than babies — the crying at the needle moment is real but brief, and feeding or cuddling straight after (breast, bottle or dummy) is proven comfort.",
          "If your own 6–8 week check hasn't happened, chase it — it's a contractual entitlement in England, covering your mood, recovery, pelvic health and contraception.",
          "Two months in is a fair moment to audit the load-sharing at home. Night shifts, feeds, admin, the mental inventory of nappy stocks — redistribute deliberately rather than by drift.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Breastfeeding during or immediately after injections is genuinely analgesic for babies — offer the breast in the appointment if you're comfortable.",
        "Post-vaccine babies often want extra comfort feeds for a day or two — supply handles it, and it's soothing for feverish little bodies.",
        "A slightly sleepy, feed-y day after jabs is normal; keep offering and let them lead.",
      ],
      "breast-expressed": [
        "Bring an expressed bottle to the appointment if that's your comfort tool — sucking plus holding is the comfort package, whatever the container.",
        "If baby feeds extra after vaccines, pump to match if you're tracking supply closely — or just let a clingy day be a clingy day.",
        "Two months is when some parents return to work planning starts — if that's you, begin gently building the freezer stash now rather than in a panic later.",
      ],
      "breast-formula": [
        "Offer whichever feed comforts fastest on vaccine day — this is a day for the path of least resistance.",
        "A feverish post-MenB baby may feed smaller and oftener for 24 hours — normal, with either milk.",
        "If your combination ratio has drifted from your intention, the 8-week review is a good place to talk it through without judgement — health visitors support all feeding choices.",
      ],
      formula: [
        "A bottle straight after the injections is excellent comfort — pack one made-up-fresh or ready-to-feed for the appointment.",
        "Expect possibly smaller, more frequent feeds during the post-vaccine 24 hours, plus extra clinginess — respond freely.",
        "Rotavirus drops are given by mouth at this visit — feeding can carry on as normal afterwards.",
      ],
    },
    dontWorry: [
      "Fever, fussiness and a sore leg in the 48 hours after vaccinations — common, expected, and the one situation where fever at this age doesn't automatically mean a doctor visit (if it started within 48 hours of jabs and baby is otherwise well).",
      "A small hard lump at the injection site lingering for a few weeks — normal and harmless.",
      "Sleepier-than-usual for a day or two post-jabs — recovery mode, not a red flag, as long as they're rousable and feeding.",
      "Crying at the appointment itself — needle pain is over in moments even when the protest is operatic.",
      "Being the parent who cried more than the baby — extremely well-documented phenomenon.",
      "A baby who still hasn't smiled by the review — that's exactly what the review is for; many late smilers are simply late smilers.",
      "Weight tracking a lower centile than the baby next to you at clinic — babies follow their own line; the trend is what professionals watch.",
    ],
    watchFor: [
      "Fever of 38°C or above NOT within 48 hours of vaccination, or any fever with your baby seeming really unwell — call your GP or NHS 111 (UK); in the US, your pediatrician. If in doubt after jabs, call anyway — nobody minds.",
      "A fever above 39°C after vaccines, a fever lasting beyond 48 hours, or a baby who is hard to rouse — call your GP or 111; in the US, your pediatrician.",
      "A high-pitched or unusual cry lasting hours after vaccination, or a seizure — call 999 (UK) or 911 (US).",
      "Blood in the nappy or a swollen tummy in the days after rotavirus vaccine (a rare bowel problem called intussusception) — call your GP or 111 urgently; in the US, your pediatrician or the ER.",
      "A non-blanching rash at any time — call 999 (UK) or 911 (US).",
      "No smiling, no response to sound, or no head control at all by this review — the GP will usually arrange follow-up; make sure it's raised rather than politely skipped.",
      "Your own mood questions flagging at the check — accept the follow-up appointment; postnatal depression responds well to treatment, and going untreated helps nobody.",
    ],
    sources: [
      {
        title: "NHS vaccinations and when to have them",
        org: "NHS",
        url: "https://www.nhs.uk/vaccinations/nhs-vaccinations-and-when-to-have-them/",
        region: "UK",
      },
      {
        title: "Complete routine immunisation schedule from 1 January 2026",
        org: "UKHSA (GOV.UK)",
        url: "https://www.gov.uk/government/publications/the-complete-routine-immunisation-schedule/complete-routine-immunisation-schedule-from-1-january-2026",
        region: "UK",
      },
      {
        title: "Checkup checklist: 2 months old",
        org: "AAP (HealthyChildren.org)",
        url: "https://www.healthychildren.org/English/ages-stages/Your-Childs-Checkups/Pages/Your-Checkup-Checklist-2-Months-Old.aspx",
        region: "US",
      },
      {
        title: "High temperature (fever) in children",
        org: "NHS",
        url: "https://www.nhs.uk/symptoms/fever-in-children/",
        region: "UK",
      },
      {
        title: "Your 6-week postnatal check",
        org: "NHS",
        url: "https://www.nhs.uk/baby/support-and-services/your-6-week-postnatal-check/",
        region: "UK",
      },
    ],
  },
  {
    id: "week-9",
    label: "Week 9",
    title: "Coming down the other side",
    ageWeeksFrom: 8,
    ageWeeksTo: 8,
    summary:
      "For most babies the crying curve is now bending downwards, and in its place: more smiling, more chatting, and the first hints of personality on display.",
    expect: [
      {
        heading: "A more sociable baby",
        paragraphs: [
          "Smiles are usually flowing more freely now, and cooing is turning into little exchanges — sound, pause, your reply, their reply. This 'serve and return' is the developmental gold of the next few months.",
          "Your baby recognises you at a distance and may greet you with whole-body wriggling. Enjoy being famous.",
          "They're also becoming interested in the world beyond faces: high-contrast toys, ceiling fans, and the eternal mystery of the light fixture.",
        ],
      },
      {
        heading: "Crying eases, evenings soften",
        paragraphs: [
          "The average daily crying declines steadily from the 6-week peak, usually noticeably by 10–12 weeks. If your evenings are calming, that's the curve, not a fluke — and it's fine to take credit anyway.",
          "If yours is a baby still crying at peak levels, hold on: some babies simply ride the curve later, and colic typically resolves by 3 to 5 months.",
          "As crying recedes, you may spot clearer signals in its place — a tired grizzle distinct from a hungry one. You're both getting fluent in each other.",
        ],
      },
      {
        heading: "Sleep and rhythm",
        paragraphs: [
          "Night sleep often consolidates a little now — a longer first stretch for many babies — while daytime naps remain gloriously random. A loose rhythm of feed–play–sleep may start to emerge on its own.",
          "It's still too early for strict routines or sleep training; at this age the kindest and most effective tools are watching wake windows and a simple, repeated wind-down.",
          "Same-room, back-sleeping, clear-cot rules all still apply — and will until at least six months.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "As the crying eases, some parents suddenly feel the accumulated exhaustion they've been outrunning. Flat, teary, or oddly numb weeks after the birth still counts — postnatal depression can start any time in the first year, not just the first month.",
          "Getting out of the house daily — even one lap of the block — measurably improves most parents' days. The baby doesn't care about the destination; the parent shouldn't either.",
          "If you're in the UK, your health visitor remains your low-friction contact for absolutely anything; you don't need a 'good enough' reason to call.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Supply and demand are usually in smooth agreement by now — softer breasts than the early weeks means regulation, not loss of milk.",
        "Distracted feeding begins around this age — a quieter, dimmer room for feeds keeps meals from becoming sightseeing tours.",
        "Feeds may be quick now; a baby who finishes in ten minutes and thrives is efficient, not underfed.",
      ],
      "breast-expressed": [
        "Output per session settling to a predictable level is a sign of regulation, like softer breasts — judge trends over a week, not single sessions.",
        "If returning to work is coming, practise the future rhythm now: which feeds will be pumped, where, and who gives the bottles.",
        "Keep an occasional bottle in the routine even if you're mostly at the breast — practised babies stay flexible.",
      ],
      "breast-formula": [
        "Combination feeding is often at its most stable around now — supply has adjusted to your pattern, and switching between breast and bottle is routine for your baby.",
        "If you want to shift the ratio in either direction, one feed at a time over several days remains the gentle method.",
        "Both milks work for the distracted-feeder phase — calm, low-stimulation feeds help whichever is on the menu.",
      ],
      formula: [
        "Feeds are likely larger and further apart than a month ago — following appetite is still the whole method.",
        "Your baby may hold their own bottle-adjacent opinions now — pausing to look around mid-feed is developmental curiosity, not rejection.",
        "Still no need for anything but first infant formula — and if baby takes over 500ml a day, they don't need vitamin drops (formula already contains vitamin D).",
      ],
    },
    dontWorry: [
      "A baby who abruptly cries much less than before — the curve coming down can feel almost suspicious; it's the schedule working.",
      "Naps of 20 minutes and naps of 3 hours in the same week — daytime sleep organises itself much later than night sleep.",
      "Fewer poos than the newborn weeks — many babies' output spaces out around 2 months, and soft poo after several days is still normal for some.",
      "Sucking fists and drooling constantly — hand discovery, not necessarily hunger and almost certainly not teething yet.",
      "A bald patch on the back of the head from sleeping on their back — hair returns; safe sleep position stays.",
      "Post-vaccination grumpiness lingering a couple of days into this week — common after the 8-week set.",
      "Loving the sling and refusing the pram, or vice versa — babies have logistics preferences; it's allowed.",
    ],
    watchFor: [
      "Fever of 38°C (100.4°F) or above — under 3 months this remains an automatic same-day call to your GP or NHS 111 (UK); in the US, your pediatrician.",
      "No smiles at all by around 8–9 weeks, or a baby who doesn't respond to sounds or look at you — book the GP or raise with your health visitor; in the US, your pediatrician.",
      "Fast, laboured or pausing breathing, or a blue tinge to lips or tongue — call 999 (UK) or 911 (US).",
      "A baby suddenly crying inconsolably for hours when the pattern had settled, drawing knees up, with vomiting or blood/red-jelly stools — call 999 (UK) or 911 (US).",
      "Noticeably fewer wet nappies, sunken eyes or fontanelle, or listlessness — call your GP or 111 today; in the US, your pediatrician.",
      "One or both eyes still consistently crossed or turning most of the time — mention to your GP or health visitor; in the US, your pediatrician.",
      "Feeling persistently hopeless, anxious or detached from your baby — call your GP or health visitor this week; in the US, your OB or pediatrician can connect you to help. You deserve treatment, not endurance.",
    ],
    sources: [
      {
        title: "Milestones by 2 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/2-months.html",
        region: "US",
      },
      {
        title: "Baby development at 1–2 months",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/newborns/development/development-tracker/1-2-months",
        region: "Australia",
      },
      {
        title: "Postnatal depression",
        org: "NHS",
        url: "https://www.nhs.uk/mental-health/conditions/postnatal-depression/",
        region: "UK",
      },
      {
        title: "High temperature (fever) in children",
        org: "NHS",
        url: "https://www.nhs.uk/symptoms/fever-in-children/",
        region: "UK",
      },
      {
        title: "Infant formula and responsive bottle feeding",
        org: "UNICEF Baby Friendly",
        url: "https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/bottle-feeding-resources/infant-formula-responsive-bottle-feeding-guide-for-parents/",
        region: "UK",
      },
    ],
  },
  {
    id: "week-10",
    label: "Week 10",
    title: "Hands, hands, hands",
    ageWeeksFrom: 9,
    ageWeeksTo: 9,
    summary:
      "Your baby has discovered they own hands, and this is roughly as exciting as news gets at ten weeks. Movements are smoothing out, and a loose daily shape may be emerging.",
    expect: [
      {
        heading: "The great hand discovery",
        paragraphs: [
          "Around now, many babies find their hands: staring at them, bringing them together, jamming them in their mouth, and making first swipes at dangling toys — usually missing, gloriously.",
          "Movements generally are smoother and more purposeful than the newborn jerkiness. In tummy time, expect higher head lifts and the beginnings of pushing up on forearms.",
          "Hands-to-mouth sucking is also self-soothing — one of the first tools babies get for calming themselves, and worth celebrating rather than preventing.",
        ],
      },
      {
        heading: "Play is now a real thing",
        paragraphs: [
          "Short play sessions land well now: a baby gym or dangling toys for swiping practice, high-contrast pictures, singing with actions, and the timeless hit of being gently 'flown' about.",
          "Talking remains the highest-value activity per minute — narrate, question, pause for their reply, respond to their coos as if they were sparkling conversation. To their brain, they are.",
          "Keep sessions short; ten-week-olds tire fast, and looking away or fussing means 'thanks, done now', not disinterest in you personally.",
        ],
      },
      {
        heading: "A rhythm you can almost see",
        paragraphs: [
          "Many families notice a loose daily shape now: wake, feed, play, grizzle, sleep, repeat, with a longer sleep at the start of the night. It's a sketch, not a timetable — babies redraw it weekly.",
          "A short, consistent wind-down before night sleep (dim lights, feed, song, cot) is worth starting if you haven't — not to train anything, just to let familiarity do its slow work.",
          "Naps stay scrappy for months yet. Nap-on-the-move counts as sleep; a nap in the pram is not a parenting compromise, it's a walk.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "If you had a straightforward birth and your postnatal check cleared you, gentle exercise can build from here — walking, postnatal-specific classes, and pelvic floor work being the unglamorous foundation of everything else.",
          "Ten weeks is deep in the 'is this my life now' zone for some parents. It is and it isn't — the baby you'll have at six months is a different, easier companion in most respects.",
          "Couples: the six-to-twelve-week stretch is statistically rocky for relationships. Low-cost repairs — one honest conversation, one hour off each, one shared takeaway after bedtime — punch above their weight.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Regulated supply means your breasts may rarely feel full now — trust output (nappies, growth, a thriving baby) over sensation.",
        "Baby may pop on and off to grin at you mid-feed — infuriating and delightful in equal measure, and completely normal.",
        "Vitamin D drops: still daily, still easy to forget.",
      ],
      "breast-expressed": [
        "Your pumping routine can likely get more strategic now — fewer, well-timed sessions (first thing especially) often hold output steady.",
        "If a session's output dips, look at the boring causes first: parts wearing out, a rushed session, a stressful week — before concluding supply is falling.",
        "Practise whoever-else-will-feed-baby giving bottles regularly if a return to work or shared care is on the horizon.",
      ],
      "breast-formula": [
        "Your pattern is probably settled — revisit it only if it stops suiting you, not because any ratio is more virtuous than another.",
        "Distracted feeding hits combination babies too — quiet rooms for breastfeeds, and paced bottles without a TV audience.",
        "If baby is taking under about 500ml of formula a day alongside breastmilk, they should have daily vitamin D drops (UK guidance).",
      ],
      formula: [
        "Bigger feeds, longer gaps, and a fairly recognisable daily pattern are typical now — still let appetite lead within it.",
        "Baby may start patting or grabbing at the bottle — let them get involved; feeding is a joint activity from here on.",
        "Out-and-about feeds get easier with kit: pre-measured powder pots and a flask, or ready-to-feed cartons for zero-faff days.",
      ],
    },
    dontWorry: [
      "Swiping at toys and missing every time — aim arrives weeks after ambition.",
      "Constant fist-sucking and drool — hands are the current hobby; teething is (probably) still months away.",
      "A skipped nap or a chaotic day after weeks of emerging rhythm — the sketch gets redrawn constantly.",
      "Crying much reduced but not gone — some daily crying remains normal all through infancy.",
      "A head still wobblier than other babies' at the same age — control develops across a range; steady progress is the measure.",
      "Loving the bath so much that bathtime doubles as a soothing tool — free entertainment, use liberally.",
      "Feeling bored some days — loving your baby and finding the days long are fully compatible.",
    ],
    watchFor: [
      "Fever of 38°C (100.4°F) or above — still under 3 months, still an automatic same-day call: your GP or NHS 111 (UK); in the US, your pediatrician.",
      "Hands kept tightly fisted all the time with stiffness, or a baby who feels floppy as a rag doll — raise with your GP or health visitor; in the US, your pediatrician.",
      "Not following moving objects or faces with their eyes at all — book the GP or mention to your health visitor; in the US, your pediatrician.",
      "Struggling with every feed — coughing, choking, going blue or exhausted — call your GP promptly; in the US, your pediatrician. Any blue episode: 999 (UK) or 911 (US).",
      "Repeated vomiting that is forceful or green, or refusing feeds with fewer wet nappies — call your GP or 111; in the US, your pediatrician.",
      "Any breathing pauses over about 10 seconds, breathing that is a visible struggle, or lips changing colour — call 999 (UK) or 911 (US).",
      "Leaking urine, heaviness or pain 'down below' that isn't improving — book your GP and ask about pelvic health physiotherapy; this is treatable, not a tax on motherhood.",
    ],
    sources: [
      {
        title: "The importance of tummy time",
        org: "AAP (HealthyChildren.org)",
        url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/The-Importance-of-Tummy-Time.aspx",
        region: "US",
      },
      {
        title: "Baby development at 1–2 months",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/newborns/development/development-tracker/1-2-months",
        region: "Australia",
      },
      {
        title: "Safer sleep overview",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/safer-sleep-overview/",
        region: "UK",
      },
      {
        title: "Your 6-week postnatal check",
        org: "NHS",
        url: "https://www.nhs.uk/baby/support-and-services/your-6-week-postnatal-check/",
        region: "UK",
      },
      {
        title: "Perinatal depression in parents",
        org: "NCT",
        url: "https://www.nct.org.uk/information/life-parent/wellbeing-mental-health/perinatal-depression-parents",
        region: "UK",
      },
    ],
  },
  {
    id: "week-11",
    label: "Week 11",
    title: "Nearly laughing",
    ageWeeksFrom: 10,
    ageWeeksTo: 10,
    summary:
      "Squeals, big gummy grins and almost-giggles: your baby is becoming genuinely fun. A pre-three-month growth spurt may stir things up, and the 12-week vaccinations are next week (UK).",
    expect: [
      {
        heading: "Personality, incoming",
        paragraphs: [
          "Expect more vocal experiments — squeals, growls, expressive coos — and delighted whole-body responses when you appear. Real laughs often arrive somewhere around three to four months, and yours may be rehearsing.",
          "Your baby may now hold their head quite steadily upright and push up firmly in tummy time. Some start attempting a roll from tummy to back — usually by accident, to their own visible astonishment.",
          "Preferences are showing: a favourite song, a preferred hold, strong opinions on the car seat. This is personality, arriving on schedule.",
        ],
      },
      {
        heading: "The pre-12-week stir-up",
        paragraphs: [
          "Another growth spurt commonly lands around three months, and some babies start early — a hungrier, clingier, wakeful few days at eleven weeks is nothing unusual.",
          "Sleep can wobble at the same time: a baby who'd found a longer night stretch may briefly unfind it. Growth, appetite and development surges all tangle together around now; ride it rather than diagnosing it.",
          "The steady trend underneath is real, though: crying well down from the peak, and daily life more predictable than a month ago.",
        ],
      },
      {
        heading: "Getting ready for the 12-week jabs (UK)",
        paragraphs: [
          "Next week brings the second round: 6-in-1, MenB and rotavirus doses two. You know the drill now — book a calm slot, plan the paracetamol for after the MenB dose, and expect an off-colour day.",
          "Second doses matter as much as first ones — protection against whooping cough and meningitis B in particular builds with the series, at the age babies are most vulnerable.",
          "In the US, the equivalent second round comes at the 4-month well-visit; nothing is due at 12 weeks, but it's a fine moment to check you're booked in.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "If a return to work is on your horizon — soon for many US parents, later for most UK ones — the thinking-about-it feelings can be heavy: relief, guilt, dread, sometimes all at once. All normal, none a verdict on your parenting.",
          "Whatever your feeding method, don't let anyone (including yourself) audit it against week-one intentions. The plan that survived contact with an actual baby is the right plan.",
          "Look back deliberately this week: the parent handling week eleven would barely recognise the shell-shocked person from week two. That progress was you.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "A spurt-driven feeding frenzy at 10–12 weeks makes many parents suspect their supply has failed — it hasn't; a few days of extra feeding recalibrates it, as before.",
        "Because regulated breasts feel soft, the three-month spurt is the classic moment families stop breastfeeding unintentionally — if you want to continue, feed through it and trust the nappies.",
        "Feeding a distractible, grinning baby is a new skill — boring rooms, feeding first before play, and accepting shorter feeds all help.",
      ],
      "breast-expressed": [
        "Add a pumping session during spurt days to match the demand signal a baby at the breast would send.",
        "If output has plateaued and you need more, tweak one variable at a time — an extra morning session usually beats longer sessions everywhere.",
        "A fed-by-others bottle routine pays off around now if you're preparing for work or shared care — keep it regular.",
      ],
      "breast-formula": [
        "During the spurt, decide consciously whether extra hunger gets extra breastfeeds, extra formula, or both — any of the three works; the choice just shapes where your supply settles.",
        "If you're happy with your current balance, offer the breast first during spurt days so the extra demand doesn't quietly shift your ratio.",
        "Combination feeding into months three and beyond is common and sustainable — supply can hold at a part-time level for as long as you keep those feeds regular.",
      ],
      formula: [
        "Expect appetite to step up around the three-month spurt — bigger bottles or an extra feed for a few days, guided as ever by your baby.",
        "Don't move to 'hungry baby' or follow-on milks for spurt hunger — first infant formula remains the recommended milk all year; just offer more of it.",
        "If night waking returns with the spurt, a calm feed and straight back to the cot keeps the wobble temporary.",
      ],
    },
    dontWorry: [
      "A sudden return to ravenous feeding and night waking — the ~3-month growth spurt often previews itself around now.",
      "Almost-laughs that dissolve into hiccups — real giggles commonly arrive around 3 to 4 months.",
      "An accidental roll off the play mat's centre — normal progress; it just means never leaving baby on raised surfaces, which was already the rule.",
      "Hands permanently in mouth with waterfall drool — still hand-discovery and salivary glands, still (probably) not teething.",
      "A previously settled evening turning fussy again for a few days — development surges temporarily scramble the settings.",
      "Refusing the bottle this week after taking it fine before (or vice versa) — preferences flicker at this age; calm persistence usually wins.",
      "Feeling ambivalent about work, weaning, or the future — every option involving a baby involves trade-offs; ambivalence is just accuracy.",
    ],
    watchFor: [
      "Fever of 38°C (100.4°F) or above — your baby is still under 3 months, so this is still an automatic same-day call: GP or NHS 111 (UK); in the US, your pediatrician.",
      "A baby who has become less responsive over days — smiling less, vocalising less, harder to engage — call your GP or health visitor; in the US, your pediatrician.",
      "Losing skills they had (stopped smiling, stopped cooing, stopped tracking) — book the GP promptly; in the US, your pediatrician.",
      "Head strongly preferring one side always, or a visibly flattening or tilted head — raise with your health visitor or GP (early treatment for tightness is simple); in the US, your pediatrician.",
      "Persistent vomiting, refusal of several feeds, or a dropping nappy count during the spurt — call your GP or 111; in the US, your pediatrician.",
      "Any seizure, breathing colour change, floppiness or unresponsiveness — call 999 (UK) or 911 (US).",
      "Feeling worse rather than better as the weeks pass — postnatal depression and anxiety can begin at any point in the first year; call your GP or health visitor this week. In the US, your OB, pediatrician, or the 988 line.",
    ],
    sources: [
      {
        title: "Cluster feeding and growth spurts",
        org: "WIC (USDA)",
        url: "https://wicbreastfeeding.fns.usda.gov/cluster-feeding-and-growth-spurts",
        region: "US",
      },
      {
        title: "Infant formula and responsive bottle feeding",
        org: "UNICEF Baby Friendly",
        url: "https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/bottle-feeding-resources/infant-formula-responsive-bottle-feeding-guide-for-parents/",
        region: "UK",
      },
      {
        title: "NHS vaccinations and when to have them",
        org: "NHS",
        url: "https://www.nhs.uk/vaccinations/nhs-vaccinations-and-when-to-have-them/",
        region: "UK",
      },
      {
        title: "Milestones by 2 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/2-months.html",
        region: "US",
      },
      {
        title: "Crying babies: what to do",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/newborns/behaviour/crying-colic/crying-babies",
        region: "Australia",
      },
    ],
  },
  {
    id: "week-12",
    label: "Week 12",
    title: "The end of the fourth trimester",
    ageWeeksFrom: 11,
    ageWeeksTo: 11,
    summary:
      "Twelve weeks: second vaccinations in the UK, and the unofficial close of the 'fourth trimester'. The frantic newborn phase is genuinely behind you — a more interactive, more predictable stage is opening up.",
    expect: [
      {
        heading: "The 12-week vaccinations (UK)",
        paragraphs: [
          "This week UK babies are offered the second doses of the 6-in-1 injection, MenB injection and rotavirus drops — the same trio as at 8 weeks. (Since the July 2025 schedule change, the pneumococcal vaccine now comes at 16 weeks instead.)",
          "As before: paracetamol after the MenB dose as advised by the nurse, comfort feeding freely, and a possibly grumpy, feverish 24–48 hours that then passes.",
          "In the US there's no 12-week appointment — the second vaccine round lands at the 4-month well-visit — so consider this a UK-labelled week with an American breather.",
        ],
      },
      {
        heading: "What twelve weeks looks like",
        paragraphs: [
          "Typical (not obligatory) twelve-week form: steady-ish head control, strong push-ups in tummy time, smooth tracking of moving things, easy smiles, rich cooing, hands busy grabbing at everything within range.",
          "Crying is usually a fraction of its 6-week peak, and colic — for the families who've been in its trenches — most often resolves between 3 and 5 months. If you're still waiting, you're near the exit.",
          "Night sleep frequently shows one decent long stretch now, though babies remain magnificently inconsistent — and a wobble around the 3-month spurt is standard.",
        ],
      },
      {
        heading: "From surviving to living",
        paragraphs: [
          "The 'fourth trimester' framing holds that babies spend their first three months finishing the womb work — needing constant holding, feeding and soothing. That phase is now closing: your baby can be awake, content and interested without being held every second.",
          "What comes next is more fun and differently tiring: play, laughing (soon), rolling, and opinions. The ratio of delight to endurance keeps improving from here.",
          "Nothing changes on safe sleep yet: back to sleep, clear cot, same room as you until at least six months. When your baby starts rolling both ways, keep placing them on their back and let them settle as they choose.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "You have done twelve weeks of the hardest shift in family life. Whatever mixture of methods, milks and muddling-through got you here — it worked, and you're allowed to be proud of it.",
          "Keep a weather eye on your own mind even as things ease: postnatal depression can surface at any point in the first year, in any parent, and treatment works at every stage. Feeling worse as things get 'easier' is a flag worth raising, not hiding.",
          "And a small forward look: the next stretch brings the 3-month growth spurt, first laughs, rolling, and — eventually — the 16-week vaccinations (UK) or 4-month visit (US). Same boat, calmer waters.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Twelve-week feeding is typically fast, efficient and distractible — shorter feeds with good nappies and growth mean skill, not shortage.",
        "The 3-month spurt may land any day now — a feeding-heavy 48 hours is the fix, not a failure.",
        "However long you breastfeed — weeks, months or years — every stretch has counted; if you're weighing up what's next, your health visitor or a breastfeeding counsellor can help you plan without pressure either way.",
        "Vitamin D drops continue daily for breastfed babies throughout the first year.",
      ],
      "breast-expressed": [
        "If you've been exclusively expressing for twelve weeks, that is a serious logistical achievement — and supply is usually stable enough now to survive streamlining a session if you need your life back.",
        "Comfort feeds after this week's vaccinations work by bottle too — closeness plus sucking is the medicine.",
        "Freezer stash rotation matters as it grows: oldest milk first, and check your storage times against current guidance.",
      ],
      "breast-formula": [
        "Combination feeding at twelve weeks is a settled, sustainable pattern for many families right through the first year — no expiry date on it.",
        "Offer whichever feed soothes fastest after the jabs; a feverish baby wants comfort, not consistency.",
        "If the 3-month spurt arrives, decide again where the extra hunger goes — breast, bottle or both — knowing supply will follow whatever you choose.",
      ],
      formula: [
        "A made-up bottle for straight after the 12-week injections is the same good trick as last month.",
        "Feeds are probably well-established now — appetite will step up with the 3-month spurt, so let your baby order the bigger portion.",
        "First infant formula remains the only milk needed until 12 months, when full-fat cows' milk can take over — nothing to change or upgrade between now and then.",
      ],
    },
    dontWorry: [
      "Fever and grumpiness in the 48 hours after the 12-week vaccinations — expected, especially after the MenB dose; paracetamol as advised and extra cuddles.",
      "A sleep wobble or feeding frenzy around now — the 3-month growth spurt is the last of the trio (3 weeks, 6 weeks, 3 months) in this guide's window.",
      "No rolling yet — plenty of babies don't roll until 4, 5 or 6 months.",
      "No laugh yet either — giggles most often start around 3 to 4 months.",
      "Still waking at night for feeds — entirely normal at three months and for a good while yet, whatever the internet's champion sleepers claim.",
      "A baby who's dropped their epic newborn sleep totals in favour of nosiness — more awake time is development, not insomnia.",
      "Mixed feelings as the newborn phase ends — grief and relief in the same breath is the standard parental condition.",
    ],
    watchFor: [
      "Fever of 38°C (100.4°F) or above not within 48 hours of this week's vaccinations — your baby is under 3 months for a few more days, so keep treating it as an automatic same-day call: GP or NHS 111 (UK); in the US, your pediatrician.",
      "Post-vaccine fever above 39°C, lasting beyond 48 hours, or with a baby who is drowsy, pale or hard to rouse — call your GP or 111; in the US, your pediatrician. If unresponsive: 999 (UK) or 911 (US).",
      "Blood in the nappy, a swollen tummy or episodes of severe crying with legs drawn up in the days after the rotavirus dose — call your GP or 111 urgently; in the US, your pediatrician or the ER.",
      "A baby not smiling, not making sounds, not fixing on faces, or with very poor head control by the end of the third month — book the GP or health visitor for a proper look; in the US, your pediatrician. Early checks help, whatever they find.",
      "Any non-blanching rash, seizure, blue lips or breathing struggle — call 999 (UK) or 911 (US).",
      "Fewer wet nappies, dry lips and unusual sleepiness — call your GP or 111 today; in the US, your pediatrician.",
      "Still feeling flat, anxious, hopeless or detached now the 'hard part' is meant to be over — please call your GP or health visitor this week; in the US, your doctor or 988. Twelve weeks of coping is not evidence you should keep just coping.",
    ],
    sources: [
      {
        title: "Complete routine immunisation schedule from 1 January 2026",
        org: "UKHSA (GOV.UK)",
        url: "https://www.gov.uk/government/publications/the-complete-routine-immunisation-schedule/complete-routine-immunisation-schedule-from-1-january-2026",
        region: "UK",
      },
      {
        title: "NHS vaccinations and when to have them",
        org: "NHS",
        url: "https://www.nhs.uk/vaccinations/nhs-vaccinations-and-when-to-have-them/",
        region: "UK",
      },
      {
        title: "High temperature (fever) in children",
        org: "NHS",
        url: "https://www.nhs.uk/symptoms/fever-in-children/",
        region: "UK",
      },
      {
        title: "Milestones by 2 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/2-months.html",
        region: "US",
      },
      {
        title: "Postnatal depression",
        org: "NHS",
        url: "https://www.nhs.uk/mental-health/conditions/postnatal-depression/",
        region: "UK",
      },
      {
        title: "Breastfeeding",
        org: "WHO",
        url: "https://www.who.int/health-topics/breastfeeding",
        region: "Global",
      },
    ],
  },
];
