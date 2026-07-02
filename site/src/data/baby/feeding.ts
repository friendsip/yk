/**
 * Feeding guides for the Baby & Toddler guide.
 *
 * Four in-depth guides, one per feeding mode. All safety-critical numbers
 * (milk storage times, formula preparation temperatures, vitamin D doses)
 * were verified against live NHS, CDC, AAP, UNICEF Baby Friendly and
 * La Leche League pages in July 2026. UK guidance leads; US differences
 * are labelled. None of this replaces advice from a midwife, health
 * visitor or GP.
 */

import type { FeedingGuide } from "../types";

export const feedingGuides: FeedingGuide[] = [
  {
    mode: "breast",
    label: "Breastfeeding",
    intro: [
      "Breastfeeding is a lovely, complete way to feed your baby. Your milk adapts to your baby as they grow, and every feed offers comfort and closeness as well as food. If this is the path you've chosen, this guide is here to help it go well.",
      "It's also a skill that you and your baby learn together, and the early weeks can be genuinely hard work. Bumpy starts are common and say nothing about how things will go — most difficulties ease with good support and a little time.",
      "You don't have to figure it out alone. Your midwife, health visitor and breastfeeding counsellors (through the National Breastfeeding Helpline, La Leche League or NCT) have seen it all and are glad to help — asking early is a strength, not an admission of failure.",
      "One idea underpins everything here: responsive feeding. Offering the breast whenever your baby shows hunger — for food or for comfort — is exactly what your body expects. There's no schedule to enforce and no counting required.",
    ],
    stages: [
      {
        range: "The first few days",
        tips: [
          "Your first milk, colostrum, comes in tiny amounts — a newborn's tummy is about the size of a cherry, so small, frequent feeds are exactly right.",
          "Aim for lots of skin-to-skin contact; it steadies your baby and triggers the hormones that get milk production going.",
          "Expect at least 8 to 12 feeds in 24 hours, day and night — frequent feeding now is what tells your body to make milk.",
          "Ask your midwife to check the latch: chin touching your breast, mouth wide open, and more of the dark skin around your nipple showing above their top lip than below.",
          "Around day two or three many babies feed almost constantly for a stretch, often at night — this is normal cluster feeding, not a sign anything is wrong.",
          "Your milk usually 'comes in' around day three to five; your breasts may feel full, warm and tender for a day or two while things settle.",
          "A little weight loss in the first days is normal and expected; your midwife will keep an eye on it, along with wet and dirty nappies.",
        ],
      },
      {
        range: "Weeks 1–6: getting established",
        tips: [
          "Keep feeding on demand — watching your baby works better than watching the clock, and feed lengths vary hugely between babies.",
          "Signs it's going well (NHS): you can hear swallowing, your baby comes off the breast by themselves and seems settled, and there are at least 6 wet nappies a day after the first week.",
          "In the UK, give your breastfed baby a daily vitamin D supplement of 8.5 to 10 micrograms from birth.",
          "Growth spurts around 7 to 10 days, 3 weeks and 6 weeks often bring a day or two of near-constant feeding — your supply catches up quickly.",
          "Feeding should be comfortable once the first moments pass; ongoing pain is a sign to get the latch checked, not something to push through.",
          "Partners: winding, nappies, water and snacks delivered mid-feed, and guarding nap time — the feeding parent needs a support crew.",
          "Look after yourself too: eat, drink to thirst, and accept every offer of help — there's no special diet required to make good milk.",
        ],
      },
      {
        range: "Months 2–6: settling in",
        tips: [
          "Feeds usually get much quicker — a baby who once fed for 40 minutes may be done in 10, because they've become efficient.",
          "Your breasts will likely feel softer as supply settles to match your baby; this is regulation, not a drop in milk.",
          "Around 4 months many babies become wonderfully distractible, popping off at every noise — a quiet, dimmer room can rescue a feed.",
          "Feeding out and about gets easier with practice, and in the UK you have a legal right to breastfeed in public places.",
          "The WHO recommends exclusive breastfeeding for about the first 6 months — your milk is all the food and drink your baby needs until then.",
          "Nights still usually include feeds at this age, and that's biologically normal rather than a problem to fix.",
        ],
      },
      {
        range: "Around 6 months: starting solids",
        tips: [
          "Solids begin around 6 months, but your milk remains your baby's main food for a while yet — meals start as practice, not replacement.",
          "Keep feeding on demand; babies gradually take less milk as meals grow, without you needing to engineer it.",
          "Breastfeeding alongside solids keeps providing immune protection and comfort — there's no cliff-edge where it stops mattering.",
          "From 6 months, UK guidance recommends daily vitamin drops containing vitamins A, C and D for breastfed children — keep going with the vitamin D you already give.",
        ],
      },
      {
        range: "6–12 months and beyond",
        tips: [
          "Many babies settle to a few feeds a day — often morning, bedtime, and comfort top-ups — but wide variation is completely normal.",
          "Feeding to sleep isn't a bad habit you must break; it's a normal, effective settling tool used the world over.",
          "The WHO supports breastfeeding for 2 years or beyond alongside food — how long you continue is entirely up to you and your baby.",
          "Returning to work doesn't have to end breastfeeding: many parents feed mornings and evenings, and supply adjusts to the new pattern.",
          "Whenever you decide to stop, go gradually — dropping one feed every few days keeps you comfortable and lowers the risk of blocked ducts.",
        ],
      },
    ],
    troubleshooting: [
      {
        problem: "Painful latch or sore, damaged nipples",
        help: [
          "Pain usually means a shallow latch — break the suction gently with a clean finger and start again, lining your baby's nose up with your nipple so they open wide.",
          "Try different positions; a laid-back position or a rugby hold can transform a tricky latch.",
          "A little expressed milk smoothed on afterwards can soothe; if you use a nipple cream, pick one that doesn't need washing off before feeds.",
          "If pain lasts beyond the first moments of feeds, or nipples are cracked or bleeding, ask your midwife, health visitor or a breastfeeding counsellor to watch a full feed.",
        ],
      },
      {
        problem: "Engorged, rock-hard breasts when your milk comes in",
        help: [
          "Feed often and don't skip feeds — your baby is the most effective relief available.",
          "If the breast is too firm to latch onto, hand express just a little first to soften the dark area around the nipple.",
          "A cold cloth after feeds eases the swelling, and paracetamol or ibuprofen are fine if you need them.",
          "Engorgement usually settles within a day or two; if you develop a fever or one hot, painful area, treat it as possible mastitis and contact your midwife or GP.",
        ],
      },
      {
        problem: "A blocked duct or mastitis (a hard, hot, painful area)",
        help: [
          "Keep breastfeeding as normal from both breasts — it's safe for your baby, and stopping suddenly makes things worse.",
          "Current NHS advice: hold a cold, wet cloth on the area for about 10 minutes at a time, and do not massage firmly or pump extra milk to 'empty' the breast — gentle is the rule now.",
          "Rest, drink plenty, and take paracetamol or ibuprofen (not aspirin) if you need them.",
          "If you feel feverish and fluey, or you're not improving after 12 to 24 hours of home care, contact your GP — mastitis sometimes needs antibiotics, which are safe to take while feeding.",
        ],
      },
      {
        problem: "Worrying that your supply is low",
        help: [
          "Softer breasts, shorter feeds, no leaking and a baby who still cries are all normal — none of them proves low supply.",
          "The reliable signs milk is going in: steady weight gain and at least 6 heavy wet nappies a day.",
          "Milk works on demand and supply — feeding more often, offering both breasts and plenty of skin-to-skin all nudge production up.",
          "If weight gain is genuinely slow or you can't shake the worry, ask your health visitor for a weigh-in and a feeding review, or call the National Breastfeeding Helpline.",
        ],
      },
      {
        problem: "Cluster feeding is wearing you out",
        help: [
          "Evening marathons of short, fussy feeds are common for weeks — think of them as your baby placing next week's milk order, not a supply failure.",
          "Set up camp: water, snacks, phone charger, something good to watch, and let the rest of the evening go.",
          "Hand your baby to someone else for a walk between bursts so you can shower, eat or lie flat.",
          "It usually passes within a few days at a time; if your instinct says something more is wrong, your health visitor will gladly check.",
        ],
      },
      {
        problem: "You suspect a tongue-tie",
        help: [
          "Signs include trouble latching or staying latched, very long or constantly hungry feeds, clicking sounds and persistently sore nipples.",
          "Plenty of babies with a visible tongue-tie feed perfectly well — what matters is whether feeding is actually affected.",
          "If division is needed, it's a quick, simple procedure done without anaesthetic in young babies, and most feed better afterwards.",
          "Ask your midwife, health visitor or GP for an assessment — many areas have specialist infant feeding teams.",
        ],
      },
      {
        problem: "Nervous about feeding in public",
        help: [
          "In the UK, the law protects your right to breastfeed anywhere you're otherwise allowed to be.",
          "A vest under a loose top lets you feed with very little showing, if that helps you relax — practise at home first if you like.",
          "Start somewhere friendly: a café near a parent group, a feeding room, or a bench with a trusted friend beside you.",
          "Most people notice far less than you fear, and confidence builds quickly with each feed.",
        ],
      },
      {
        problem: "Your partner feels shut out of feeding",
        help: [
          "Feeding is only one way to be close — bath time, winding, skin-to-skin naps and pram walks all build the same bond.",
          "A hugely valuable role is protecting the feeding parent's rest: taking the baby after morning feeds, fielding visitors, keeping food arriving.",
          "If you'd like to introduce occasional bottles of expressed milk later, that can become a partner's moment — our expressed-milk guide covers how to do it gently.",
        ],
      },
    ],
    sources: [
      {
        title: "Breastfeeding: positioning and attachment",
        org: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/breastfeeding/positioning-and-attachment/",
        region: "UK",
      },
      {
        title: "Breastfeeding: is my baby getting enough milk?",
        org: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/breastfeeding-problems/enough-milk/",
        region: "UK",
      },
      {
        title: "Mastitis",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/mastitis/",
        region: "UK",
      },
      {
        title: "Vitamins for children",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/vitamins-for-children/",
        region: "UK",
      },
      {
        title: "Beginning breastfeeding",
        org: "La Leche League GB",
        url: "https://laleche.org.uk/beginning-breastfeeding/",
        region: "UK",
      },
      {
        title: "Infant and young child feeding (fact sheet)",
        org: "WHO",
        url: "https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding",
        region: "Global",
      },
    ],
  },
  {
    mode: "breast-expressed",
    label: "Breast + expressed",
    intro: [
      "Feeding your baby with a mix of breastfeeds and bottles of your expressed milk — or with expressed milk alone — is a genuinely good way to feed a baby. It's the same milk, with the same benefits, delivered in a way that fits your life.",
      "Families arrive here from every direction: going back to work, wanting to share feeds, a baby who finds latching hard, or simply liking the flexibility. All solid reasons, none needing justification.",
      "If you're exclusively expressing, this guide treats that as the complete, valid feeding path it is — not a stopgap or a consolation. It's demanding, generous work, and it counts as feeding your baby your milk in full.",
      "Below are the practical bits: when to pump, how to store milk safely (with verified NHS and CDC numbers — they differ a little, and we label which is which), and how to keep your supply happy as bottles join the routine.",
    ],
    stages: [
      {
        range: "The first few days",
        tips: [
          "If your baby is latching and feeding well, you don't need to express yet — feeding directly is what establishes supply in these early days.",
          "If you do need to express (a sleepy baby, separation, latching trouble), start as soon as you can and express often — frequency matters far more than session length.",
          "Hand expressing works especially well for colostrum, which comes in small, precious amounts; your midwife can show you, and it can be fed by syringe or cup.",
          "If your baby can't feed at the breast at all, aim for 8 to 12 expressing sessions in 24 hours, including at night — you're standing in for a hungry newborn.",
          "Keep up skin-to-skin cuddles; they boost your milk hormones whether or not your baby is latching.",
        ],
      },
      {
        range: "Weeks 1–6: finding your rhythm",
        tips: [
          "If breastfeeding is going well and bottles are a choice rather than a need, many families wait until feeding feels settled — often around 4 to 6 weeks — before regular bottles, though there's no perfect moment.",
          "Most people pump more in the morning, so that's an easy time to add a session after or between feeds.",
          "Expect small amounts at first — pumping is a skill your body learns, and output says very little about what your baby gets at the breast.",
          "Store milk in small portions (about 60 to 120ml) so less gets wasted, and label everything with the date.",
          "Let someone else give the bottle while you pump or rest, using paced, gentle bottle feeding so your baby switches happily between breast and bottle.",
          "Check your flange (funnel) size — a poor fit is a very common cause of pain and disappointing output.",
        ],
      },
      {
        range: "Months 2–6: pumping as part of life",
        tips: [
          "UK (NHS) storage times: up to 8 days in a fridge at 4°C or lower (3 days if you're not sure of the temperature), 2 weeks in a fridge's ice compartment, and up to 6 months in a freezer at -18°C or lower.",
          "US (CDC) guidance is a little more cautious: up to 4 hours at room temperature, up to 4 days in the fridge, and about 6 months (up to 12 is acceptable) in the freezer — when in doubt, follow the shorter time.",
          "Defrost frozen milk slowly in the fridge if you can, use it straight away once thawed, and never refreeze it.",
          "Warm milk in a jug of warm water, never a microwave — microwaves create hot spots that can scald your baby's mouth.",
          "Once your baby has started a bottle of breast milk, use it within 1 hour and throw away what's left (NHS).",
          "Replacing a breastfeed with a bottle? Pump at roughly that time instead, so your body keeps getting the message to make milk.",
          "Back at work, pumping about as often as your baby would feed keeps supply steady — chilled milk travels home in a cool bag with ice packs (fine for up to 24 hours, NHS).",
        ],
      },
      {
        range: "Exclusive expressing: a path of its own",
        tips: [
          "Exclusively expressing is a complete way to feed your baby your milk, and everything in this guide applies to you.",
          "To build supply over the first 3 to 4 months, La Leche League suggests 8 to 12 sessions in 24 hours, avoiding gaps longer than 2 to 3 hours, with one longer stretch at night if supply holds up.",
          "One overnight session — ideally somewhere between 2am and 5am — punches above its weight, because milk-making hormones peak then.",
          "A double electric pump saves real time, and 'hands-on pumping' (breast compressions and massage while you pump) noticeably increases output.",
          "Short and frequent beats long and rare: the number of sessions matters more than minutes per session.",
          "Find your people — exclusive-pumping communities are warm and practical — and take every shortcut you can, from spare pump parts to fridge storage between same-day sessions.",
        ],
      },
      {
        range: "6–12 months: solids, scaling back and stopping",
        tips: [
          "As meals grow from 6 months, milk needs gently shrink — you can usually drop pumping sessions slowly without your baby going short.",
          "Drop one session at a time and give your body several days to adjust before the next; sudden stops invite blocked ducts.",
          "Stretching the gap between sessions, or shortening sessions bit by bit, both work for winding down (La Leche League).",
          "Expressed milk can go into porridge and cooking as well as bottles.",
          "If a session has to go but your breasts complain, express just enough for comfort — that eases the pressure without ordering more milk.",
          "However long you expressed — weeks, months or beyond a year — every bottle of your milk counted.",
        ],
      },
    ],
    troubleshooting: [
      {
        problem: "The pump barely gets anything out",
        help: [
          "Pump output is a poor measure of supply — babies are far better at removing milk than any machine.",
          "Check your flange size, warm the breast first, look at photos or videos of your baby, and add breast compressions while you pump.",
          "Let-down is emotional as well as mechanical — privacy, comfort and not staring at the bottle all genuinely help.",
          "If your worry is your baby's weight rather than the pump, talk to your health visitor or a breastfeeding counsellor.",
        ],
      },
      {
        problem: "Your baby refuses the bottle",
        help: [
          "Try having someone else offer it while you're out of the room — many babies hold out for the breast when they can smell your milk.",
          "Experiment with a different teat shape or flow, a different milk temperature, and offering when your baby is calm rather than desperately hungry.",
          "Let your baby draw the teat in themselves — brush it against their top lip and wait for a wide mouth, just like a breast latch.",
          "Keep tries short and low-pressure; if refusal persists near a return to work, an open cup can carry a feed, and the NCT and La Leche League helplines can talk you through options.",
        ],
      },
      {
        problem: "Supply is dipping now bottles have joined in",
        help: [
          "Make sure a pumping session replaces each dropped breastfeed — supply follows milk removal, and skipped signals quietly add up.",
          "Add a short extra morning session, or try occasional power pumping: several short bursts of pumping within an hour, mimicking a cluster-feeding baby (La Leche League).",
          "Keep at least one night feed or pump if you can — the hormone that drives supply runs highest overnight.",
          "A breastfeeding counsellor can help you audit the week and find where the milk messages went quiet.",
        ],
      },
      {
        problem: "Pumping hurts",
        help: [
          "Pumping shouldn't be painful — pain usually means the flange is the wrong size or the suction is set too high.",
          "More suction does not mean more milk; use the highest setting that's still comfortable, and a smear of nipple balm on the flange rim reduces friction.",
          "If nipples are damaged or pain continues after fixing fit and settings, see a breastfeeding counsellor, your health visitor or your GP.",
        ],
      },
      {
        problem: "A blocked duct or mastitis flares up",
        help: [
          "Don't suddenly stop expressing — keep your normal pattern, but resist the urge to pump extra to 'clear it'.",
          "Current NHS advice is a cold, wet cloth on the area (about 10 minutes at a time) and no firm massage; paracetamol or ibuprofen are fine.",
          "If a hot, painful area comes with fever or flu-like feelings, or things aren't improving after 12 to 24 hours of home care, contact your GP.",
        ],
      },
      {
        problem: "You feel chained to the pump",
        help: [
          "It's OK to renegotiate — fewer sessions, combining with formula, or stopping are all sound choices, not failures.",
          "If you're grimly building a freezer stash you may never use, you have permission to pump less; your baby needs a well parent more than a full freezer.",
          "Wind down gradually to stay comfortable, and talk it through with a breastfeeding counsellor or your health visitor if you feel torn.",
        ],
      },
      {
        problem: "Confused by conflicting storage advice",
        help: [
          "UK and US guidance genuinely differ — the NHS allows up to 8 days in a cold fridge while the CDC (US) says 4 days — and each is considered safe within its own system.",
          "If the two leave you unsure, follow the shorter time; write the date on everything and use the oldest milk first.",
          "If milk has been out too long or you can't remember, throw it away — with storage, 'if in doubt, chuck it out'.",
        ],
      },
    ],
    sources: [
      {
        title: "Expressing breast milk",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/baby/breastfeeding-and-bottle-feeding/breastfeeding/expressing-breast-milk/",
        region: "UK",
      },
      {
        title: "Breast milk storage and preparation",
        org: "CDC",
        url: "https://www.cdc.gov/breastfeeding/breast-milk-preparation-and-storage/handling-breastmilk.html",
        region: "US",
      },
      {
        title: "Expressing & storing milk",
        org: "La Leche League GB",
        url: "https://laleche.org.uk/expressing-your-milk/",
        region: "UK",
      },
      {
        title: "Exclusively expressing breastmilk for your baby",
        org: "La Leche League GB",
        url: "https://laleche.org.uk/exclusively-expressing-breastmilk-for-your-baby/",
        region: "UK",
      },
      {
        title: "Sterilising baby bottles",
        org: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/sterilising-baby-bottles/",
        region: "UK",
      },
      {
        title: "Bottles and other tools",
        org: "La Leche League International",
        url: "https://llli.org/breastfeeding-info/bottles/",
        region: "Global",
      },
    ],
  },
  {
    mode: "breast-formula",
    label: "Breast + formula",
    intro: [
      "Combining breastfeeding with formula is a good, complete way to feed a baby — full stop. A huge proportion of families feed exactly this way, and your baby gets the benefits of your milk alongside the reliability of formula.",
      "Combination feeding isn't a halfway house or a failure of anything. For some families it's a bridge from one way of feeding to another; for many it is the destination, chosen and kept because it works. Both are fine.",
      "The main practical question is how to combine in the way you intend, because milk supply responds to how often milk is removed. This guide covers that, plus which feeds families often swap first, safe formula preparation, and how to shift the balance later — in either direction.",
      "Through it all, hold on to this: a fed, loved baby with a responsive parent is the whole game, and you're already providing it.",
    ],
    stages: [
      {
        range: "The first few days",
        tips: [
          "Colostrum in tiny amounts is normal and enough for most babies — if formula top-ups are advised for medical reasons (weight, jaundice, blood sugar), that's a plan, not a verdict on your milk.",
          "Keep offering the breast and plenty of skin-to-skin even when formula is in the mix; both protect your supply and your baby's interest in the breast.",
          "In hospital, top-ups can often be given by cup or syringe to give latching a clear run — ask the staff to show you how.",
          "If you know from the start that you want to combine, that's a legitimate plan too; just build it gradually so your body can calibrate.",
        ],
      },
      {
        range: "Weeks 1–6: introducing formula thoughtfully",
        tips: [
          "In the UK, the NHS suggests waiting until breastfeeding feels settled — often around 6 to 8 weeks — if you want to protect supply; if you're starting sooner for your own good reasons, just go gently.",
          "Introduce one formula feed at a time and keep it steady for several days before swapping another — supply adjusts well to clear, consistent signals.",
          "Use a first infant formula: the NHS is clear it's the only formula your baby needs, whatever the shelf promises.",
          "It can help if someone else gives the first bottles, somewhere your baby can't smell your milk (NHS).",
          "Prepare formula safely every time: water boiled and cooled for no more than 30 minutes so it's still at least 70°C, powder added to the water, cooled quickly, tested on your wrist.",
          "Use paced bottle feeding — baby fairly upright, bottle close to horizontal, regular pauses — to keep bottle feeds close to breastfeeding's rhythm.",
        ],
      },
      {
        range: "Months 2–6: finding your pattern",
        tips: [
          "Families often swap the late-evening feed first (a partner gives a bottle while you sleep) or an afternoon feed when supply feels lowest — there's no officially correct feed to swap.",
          "Many keep the early-morning and bedtime breastfeeds: morning supply is naturally plentiful, and bedtime feeds tend to be the ones everyone treasures.",
          "Consistency is your friend — a stable pattern of which feeds are breast and which are bottle lets supply settle rather than see-saw.",
          "In the UK, if your baby has less than about 500ml of formula a day, give a daily vitamin D supplement (8.5 to 10 micrograms); above 500ml a day, formula's added vitamins cover it.",
          "Steady weight gain and 6 or more heavy wet nappies a day are your signs the overall mix is enough — your health visitor will happily sense-check it.",
        ],
      },
      {
        range: "Changing the balance later — in either direction",
        tips: [
          "Toward more breastfeeding: drop one bottle at a time, offer extra breastfeeds and skin-to-skin, and consider pumping at the dropped feed — supply rebuilds with stimulation, and even long gaps can be partly reversed with support (counsellors call it relactation).",
          "Toward more formula: replace one feed every few days rather than several at once, so you sidestep engorgement and blocked ducts.",
          "Night feeds are powerful supply signals — keep one if protecting breastfeeding matters to you, or swap them last.",
          "There's no deadline: families shift the balance at 6 weeks, 6 months, or whenever life changes — the plan is allowed to change with it.",
        ],
      },
      {
        range: "6–12 months: alongside solids",
        tips: [
          "From around 6 months solids join in, but milk — yours plus formula — remains the main food for a while yet.",
          "Stick with first infant formula until 12 months; the NHS finds no benefit in switching to follow-on milk at 6 months.",
          "As meals grow, babies often drop milk feeds themselves; many settle to breastfeeds morning and evening with formula or meals in between.",
          "From 12 months, whole cows' milk can replace formula as a drink — and breastfeeding can carry on as long as you both like.",
        ],
      },
    ],
    troubleshooting: [
      {
        problem: "Your supply is dropping faster than you intended",
        help: [
          "Count the signals: each bottle that replaced a breastfeed without any pumping told your body to make less — add back a breastfeed or a pumping session at the times that matter to you.",
          "Extra skin-to-skin, and offering the breast for comfort as well as food, both nudge supply upward.",
          "Keep or restore a night breastfeed if you can — overnight feeding is a particularly strong supply signal.",
          "A breastfeeding counsellor or your health visitor can help you rebalance before anything becomes permanent.",
        ],
      },
      {
        problem: "Your baby fusses at the breast after taking bottles",
        help: [
          "Bottles deliver instantly while breasts ask babies to wait for let-down — so use the slowest teat you can and paced feeding, to stop the bottle feeling like the easier option.",
          "An honest note: the evidence on 'nipple confusion' is genuinely mixed — some babies swap between breast and bottle effortlessly, some struggle, and research can't yet predict which.",
          "Offer the breast when your baby is sleepy and calm rather than ravenous, with plenty of skin-to-skin.",
          "If breast refusal is setting in, contact a breastfeeding counsellor soon — it's very often recoverable.",
        ],
      },
      {
        problem: "Your baby refuses the bottle instead",
        help: [
          "Let someone else offer it while you're out of the room — many babies hold out for the breast when they know it's nearby.",
          "Vary the teat, the milk temperature and the timing — calm and half-hungry works better than frantic.",
          "Keep attempts brief and low-pressure, then try again another day; patience beats persistence-by-force.",
          "If nothing works and you need to be away, babies from around 6 months can take milk from an open or soft-spout cup.",
        ],
      },
      {
        problem: "Engorgement or a blocked duct while cutting back",
        help: [
          "Slow the transition down — drop one feed at a time and give it several days before the next.",
          "Express just enough for comfort (not a full pump-out) and hold a cold cloth on the area for about 10 minutes at a time.",
          "If a hot, painful patch arrives with fever or flu-like feelings, or home care isn't working within 12 to 24 hours, contact your GP — mastitis can still happen while winding down.",
        ],
      },
      {
        problem: "Not sure how much formula the bottle feeds should be",
        help: [
          "There's no reliable chart for combination-fed babies — tins assume formula-only, so treat their tables as ceilings rather than targets.",
          "Feed responsively: offer, pause, let your baby decide when they're done, and throw away whatever's left after the feed.",
          "Steady weight gain and plenty of heavy wet nappies are the real evidence the overall mix is right — your health visitor can plot the weight and reassure you.",
        ],
      },
      {
        problem: "Poo has changed since formula arrived",
        help: [
          "Formula poo is usually firmer, less frequent, paler and, frankly, smellier — the change itself is normal, not a warning.",
          "Make formula exactly to the tin's ratio and never add extra powder; over-concentrated feeds are a classic cause of constipation.",
          "If poos become hard pellets, you see blood, or your baby seems in pain, talk to your health visitor or GP.",
        ],
      },
      {
        problem: "Other people have opinions about how you feed",
        help: [
          "You'll meet cheerleaders for every camp; you don't owe anyone the story behind your feeding choices.",
          "Combination feeding is common, sensible and quietly done by families everywhere — a visible bottle says nothing about the breastfeeding around it.",
          "If some of the commentary is coming from inside your own head, be as kind to yourself as you would be to a friend — and if feeding guilt is weighing on your mood, your health visitor genuinely wants to hear about it.",
        ],
      },
    ],
    sources: [
      {
        title: "How to combine breast and bottle feeding",
        org: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/combine-breast-and-bottle/",
        region: "UK",
      },
      {
        title: "Mixed feeding: combining breastfeeding and bottle feeding",
        org: "NCT",
        url: "https://www.nct.org.uk/information/baby-toddler/feeding-your-baby-or-toddler/mixed-feeding-combining-breastfeeding-and-bottle-feeding",
        region: "UK",
      },
      {
        title: "Types of formula milk",
        org: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/types-of-formula/",
        region: "UK",
      },
      {
        title: "Vitamins for children",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/vitamins-for-children/",
        region: "UK",
      },
      {
        title: "Infant milks for parents & carers",
        org: "First Steps Nutrition Trust",
        url: "https://www.firststepsnutrition.org/parents-carers",
        region: "UK",
      },
      {
        title: "Infant formula and responsive bottle feeding: a guide for parents",
        org: "UNICEF Baby Friendly Initiative",
        url: "https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/bottle-feeding-resources/infant-formula-responsive-bottle-feeding-guide-for-parents/",
        region: "UK",
      },
    ],
  },
  {
    mode: "formula",
    label: "Formula",
    intro: [
      "Formula feeding is a safe, nourishing, loving way to feed your baby. Modern infant formula is tightly regulated to meet all of a baby's nutritional needs, and babies grow and thrive on it every day, everywhere.",
      "However you arrived here — choice, medical need, supply struggles, adoption, medication, or simply being done with breastfeeding — you don't owe anyone an explanation. This guide is written for you, not as a runner-up prize.",
      "What genuinely matters with formula feeding: preparing it safely (there are real numbers here, and we've verified them against current guidance), feeding responsively, and enjoying the closeness of feeds. All of it is learnable within a week.",
      "UK (NHS) guidance leads below, with US differences labelled. Where numbers differ between countries, follow your own country's advice.",
    ],
    stages: [
      {
        range: "The first few days",
        tips: [
          "Newborn tummies are tiny — in the first week most babies take only about 30 to 60ml per feed (AAP, US), so little-and-often is exactly right.",
          "A first infant formula is the one to buy: in the UK the NHS says it's the only formula your baby needs, and every brand must meet the same nutritional standards — the cheaper tub is not a lesser choice.",
          "Ready-to-feed cartons are sterile and brilliant for the blurry first days — no boiling, no mixing.",
          "Hold your baby close and semi-upright, skin-to-skin when you can, and chat to them as they feed — the bonding is in the holding, not the milk.",
          "In the early weeks it helps if feeds come mainly from you and your partner, so your baby links feeding with their own people (UNICEF).",
          "Expect roughly 8 or more feeds in 24 hours at first, and count wet nappies as your reassurance that milk is going in.",
        ],
      },
      {
        range: "Weeks 1–6: mastering safe preparation",
        tips: [
          "Boil fresh tap water and let it cool for no more than 30 minutes, so it stays at 70°C or above — that temperature kills any bacteria in the powder, which isn't sterile.",
          "Water goes into the bottle first, to the exact mark; then add the exact number of levelled scoops — never extra powder to 'fill them up' and never less to stretch the tin, as both can make your baby ill.",
          "Make one bottle at a time, as your baby needs it, rather than batches (NHS).",
          "Cool the sealed bottle under cold running water, then test milk on the inside of your wrist — it should feel warm, not hot.",
          "Throw away anything left at the end of a feed, and use a made-up bottle within 2 hours at room temperature (NHS).",
          "Sterilise bottles and teats until your baby is at least 12 months old — cold-water solution, 10 minutes of boiling, or a steam steriliser all work (NHS).",
          "Feed responsively: offer at hunger cues (stirring, rooting, hands to mouth) rather than by the clock, and let your baby pause and stop when they choose.",
        ],
      },
      {
        range: "Months 2–6: amounts, rhythm and nights",
        tips: [
          "As a rough US (AAP) guide: by around 1 month, 90 to 120ml every 3 to 4 hours; by 6 months, 180 to 240ml at 4 to 5 feeds a day — averages, not homework.",
          "Appetite swings from day to day, and growth spurts happen with bottles too — follow your baby, not the tin's table.",
          "Most babies shouldn't need more than about 960ml in 24 hours (AAP); persistent hunger beyond that is worth mentioning to your health visitor.",
          "Watch for fullness cues — turning away, slowing right down, letting milk dribble — and never coax a baby to finish a bottle.",
          "For night feeds, freshest is safest: a vacuum flask of just-boiled water and a pre-measured powder pot by the bed makes 3am feeds quick.",
          "Alternatively, the NHS allows a bottle made up earlier, cooled and stored in the fridge, used within 24 hours — warm it in a jug of warm water, never a microwave.",
          "In the UK, a baby having more than 500ml of formula a day doesn't need vitamin supplements — formula already contains them.",
        ],
      },
      {
        range: "Out and about, travel and childcare",
        tips: [
          "The easiest travel options are ready-to-feed cartons, or a flask of just-boiled water plus pre-measured powder to make feeds fresh — a full, sealed flask stays above 70°C for several hours (NHS).",
          "A made-up bottle straight from the fridge can travel in a cool bag with an ice pack and must be used within 4 hours; without an ice pack, within 2 hours (NHS).",
          "Carry sterilised bottles assembled with their lids on so they stay clean inside.",
          "Nurseries and childminders handle formula every day — send labelled powder and bottles, and tell them your baby's usual pattern.",
          "Flying? Baby milk is generally exempt from cabin liquid limits, but check your airport's rules before you travel.",
          "Abroad, if tap water isn't safe to drink, use bottled water that's low in salt (sodium) — and still boil it before making up feeds (NHS).",
        ],
      },
      {
        range: "6–12 months: alongside solids",
        tips: [
          "From around 6 months, solids start alongside formula — milk remains the main food at first, so there's no need to rush meals.",
          "Stay on first infant formula: the NHS finds no benefit in follow-on milks, whatever the adverts imply.",
          "From about 9 months you'll notice milk demand shrinking as meals grow; around 500 to 600ml a day is the NHS guide until 12 months.",
          "Offer sips of water in an open or free-flow cup with meals from 6 months.",
          "From 12 months, whole cows' milk can take over as the main drink — about 300ml a day keeps calcium covered, and toddler milks aren't needed.",
        ],
      },
    ],
    troubleshooting: [
      {
        problem: "Your baby takes less than the tin says they should",
        help: [
          "Feeding tables are averages across many babies — a content baby with steady weight gain and 6 or more wet nappies a day is eating enough, whatever the tin thinks.",
          "Never push a bottle to be finished; babies regulate themselves well when we let them.",
          "If weight gain worries you, ask your health visitor for a weigh-in — it's a normal, welcome request.",
        ],
      },
      {
        problem: "Your baby seems hungrier than the guide amounts",
        help: [
          "Growth spurts hit bottle-fed babies too — a few days of wanting more is normal, so offer a little extra and it usually settles.",
          "Check the teat: too slow a flow leaves a baby cross and tired before they're full; too fast can mean gulping past their own fullness cues.",
          "If your baby regularly wants far beyond roughly 960ml in 24 hours (AAP, US) or never seems satisfied, talk to your health visitor before switching to a 'hungrier baby' milk — the NHS says there's no evidence those milks help babies settle or sleep.",
        ],
      },
      {
        problem: "Lots of wind, squirming or fussing after feeds",
        help: [
          "Try paced feeding: baby semi-upright, bottle held closer to horizontal, and little pauses every few minutes — it slows the air-gulping.",
          "Wind halfway through the feed as well as at the end, upright against your shoulder.",
          "Comfort milks are marketed for exactly this, but the NHS notes there's no evidence for their claims — technique changes are worth trying first.",
          "If your baby cries inconsolably for long stretches most days, mention it to your health visitor or GP.",
        ],
      },
      {
        problem: "Constipation",
        help: [
          "Formula-fed babies often poo less frequently and more firmly — that alone isn't constipation.",
          "Double-check the powder-to-water ratio; extra powder is a classic cause.",
          "Gentle tummy massage and slow bicycling of the legs can help things along, and from 6 months offer water with meals.",
          "Hard pellet poos, blood, or real distress: talk to your health visitor or GP.",
        ],
      },
      {
        problem: "Bringing milk back up (reflux)",
        help: [
          "Small, effortless spit-ups after feeds — possetting — are extremely common and usually need nothing fixed, as long as your baby is happy and gaining weight.",
          "Smaller, more frequent feeds, paced feeding, and staying upright for a while afterwards all help.",
          "Anti-reflux formulas exist, but the NHS advises using them only under medical supervision — partly because they're made up at lower temperatures, which needs extra care with hygiene.",
          "See your GP if your baby is distressed by feeds, vomits forcefully, or isn't gaining weight.",
        ],
      },
      {
        problem: "Tempted to switch brands or types",
        help: [
          "All first infant formulas in the UK must meet the same compositional standards, and the NHS says there's no evidence that switching brands does good or harm.",
          "'Hungrier baby' and comfort milks make claims the evidence doesn't support, and goodnight or follow-on milks add nothing your baby needs.",
          "If you suspect a genuine problem such as a cows' milk allergy, see your GP — specialist formulas exist, and that's a prescription conversation rather than a supermarket one.",
        ],
      },
      {
        problem: "Night feeds are wearing you down",
        help: [
          "Formula's quiet advantage: anyone can do the 3am shift — split the night with a partner if you have one, in stretches long enough for real sleep.",
          "Set up a night station: flask of just-boiled water, pre-measured powder and a sterilised bottle — or a ready-to-feed carton for the roughest nights.",
          "Keep lights low and chat minimal, so nights stay about feeding and going back down.",
          "If exhaustion keeps deepening, tell your health visitor — support exists for you, not just for the baby.",
        ],
      },
      {
        problem: "Grief or guilt about not breastfeeding",
        help: [
          "If you carry sadness about how feeding worked out, that's real and allowed — and it takes nothing away from the care your baby is getting.",
          "Responsive bottle feeding — cuddled in close, eye contact, following your baby's cues — builds the same connection feeding at the breast does (UNICEF).",
          "The things that matter most to babies are warmth, responsiveness and love, and every one of them is fully available to you.",
          "If guilt or low mood lingers or deepens, please tell your health visitor or GP — postnatal feelings deserve care too.",
        ],
      },
    ],
    sources: [
      {
        title: "How to make up baby formula",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/baby/breastfeeding-and-bottle-feeding/bottle-feeding/making-up-baby-formula/",
        region: "UK",
      },
      {
        title: "Formula milk: common questions",
        org: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/formula-milk-questions/",
        region: "UK",
      },
      {
        title: "Types of formula milk",
        org: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/types-of-formula/",
        region: "UK",
      },
      {
        title: "Amount and schedule of baby formula feedings",
        org: "AAP (HealthyChildren.org)",
        url: "https://www.healthychildren.org/English/ages-stages/baby/formula-feeding/Pages/amount-and-schedule-of-formula-feedings.aspx",
        region: "US",
      },
      {
        title: "Infant milks for parents & carers",
        org: "First Steps Nutrition Trust",
        url: "https://www.firststepsnutrition.org/parents-carers",
        region: "UK",
      },
      {
        title: "Guide to bottle feeding",
        org: "UNICEF Baby Friendly Initiative",
        url: "https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/bottle-feeding-resources/guide-to-bottle-feeding/",
        region: "UK",
      },
    ],
  },
];
