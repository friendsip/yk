/**
 * Month-by-month baby guide, 3–12 months.
 *
 * Guidance verified July 2026 against NHS, NHS Best Start in Life, UKHSA,
 * CDC "Learn the Signs. Act Early." (2022-revised checklists), AAP
 * (HealthyChildren.org), WHO, the Lullaby Trust and Raising Children
 * Network. Milestones are ranges, never deadlines.
 */

import type { BabyStage } from "../types";

export const babyMonths: BabyStage[] = [
  {
    id: "3-months",
    label: "Around 3 months",
    title: "Smiles, chuckles and discovering those hands",
    ageWeeksFrom: 12,
    ageWeeksTo: 16,
    summary:
      "Your baby is becoming wonderfully sociable — smiling at you on purpose, cooing back when you chat, and staring at their own hands like they've just found treasure. Towards the end of this stage, UK babies have their 16-week vaccinations.",
    expect: [
      {
        heading: "Development",
        paragraphs: [
          "Expect proper social smiles now, and maybe the first chuckles when you play. Many babies this age coo back and forth with you — it's your first real conversation, so do reply.",
          "Head control is getting steadier when you hold them upright, and in tummy time many babies push up onto their forearms. Hands are the discovery of the month: watched intently, brought to the mouth, and swung hopefully at toys.",
          "Every baby does these things on their own timetable. The ages here are when most babies have got there, not a test to pass.",
        ],
      },
      {
        heading: "Sleep",
        paragraphs: [
          "Some babies start doing a longer stretch at night around now; plenty don't yet. Naps are usually still short and scattered — a predictable nap rhythm tends to come later.",
          "Keep the safer sleep basics going: on their back for every sleep, in a clear flat cot or Moses basket, in your room for at least the first 6 months.",
          "Watch for early signs of rolling — wriggling onto the side, swinging legs over. The Lullaby Trust advises stopping arms-in swaddling as soon as any signs of rolling appear.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "In the UK, the 16-week vaccinations land at the end of this stage — currently the third 6-in-1 dose and the first pneumococcal dose. The schedule was updated in 2025, so the NHS vaccinations page always has the current list. In the US, this roughly lines up with the 4-month well-child visit.",
          "Days may be finding a loose rhythm, and the intense crying of the early weeks has usually eased. If it doesn't feel easier — or you feel low, flat or anxious — please say so to your health visitor or GP. Postnatal depression can start at any point in the first year, and help works.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Feeds often get much quicker around now — an efficient baby can empty a breast in a few minutes, so short feeds usually mean skill, not a problem.",
        "Softer breasts don't mean your supply has dropped; it has simply settled to match what your baby takes.",
        "A day or two of near-constant feeding is often a growth spurt — feed through it and things settle again.",
      ],
      "breast-expressed": [
        "Pumping output per session often steadies around now — a settled amount is normal, not a decline.",
        "Date your frozen milk and use the oldest first, so the stash keeps rotating.",
        "Paced bottle feeding — baby fairly upright, slow-flow teat, little breaks — keeps bottle feeds calm and lets your baby set the pace.",
      ],
      "breast-formula": [
        "Keeping your breastfeeds at roughly consistent times of day helps your supply stay steady around the formula feeds.",
        "There's no required order or ratio — follow your baby's cues rather than the clock, and adjust as you go.",
        "Whatever mix you've settled on, it's feeding your baby and it counts — combination feeding is a completely valid way to do this.",
      ],
      formula: [
        "As a rough NHS guide, babies need about 150–200ml of formula per kilogram of body weight a day until around 6 months — but appetites genuinely vary, so let your baby lead.",
        "Plenty of wet nappies and steady weight gain are much more helpful signs than exact millilitres.",
        "Watch for pauses and turning away during feeds — stopping when your baby says so helps them keep a healthy sense of their own appetite.",
      ],
    },
    dontWorry: [
      "Feeds that suddenly take five minutes instead of forty — that's efficiency, not a supply problem.",
      "Breastfed babies can start pooing much less often around now; even several days between soft poos can be normal.",
      "Dribbling and fist-chewing at this age are usually just exploration, not necessarily teething.",
      "Short, chaotic naps with no pattern — nap rhythm usually arrives in the months ahead.",
      "A clingy, fussy day or two out of nowhere — growth spurts and busy brains pass.",
      "Mild fussiness or a slightly raised temperature after the 16-week jabs is common and short-lived.",
    ],
    watchFor: [
      "Your baby isn't smiling back at you yet.",
      "They don't startle at, settle to, or turn towards voices and sounds.",
      "They don't follow your face or a toy with their eyes.",
      "Their head still feels very wobbly when you hold them upright at around 4 months.",
      "They feel unusually stiff, or unusually floppy, when you pick them up.",
      "They strongly favour one side — head always turned the same way, or one arm doing all the work.",
      "You know your baby best — if anything here rings true, or something else is niggling, a chat with your health visitor or GP (or your baby's doctor elsewhere) is never wasted.",
    ],
    sources: [
      {
        title: "Milestones by 4 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/4-months.html",
        region: "US",
      },
      {
        title: "NHS vaccinations and when to have them",
        org: "NHS",
        url: "https://www.nhs.uk/vaccinations/nhs-vaccinations-and-when-to-have-them/",
        region: "UK",
      },
      {
        title: "How to swaddle your baby",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/baby-product-information/swaddling/",
        region: "UK",
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
        url: "https://www.nhs.uk/mental-health/conditions/post-natal-depression/overview/",
        region: "UK",
      },
    ],
  },
  {
    id: "4-months",
    label: "Around 4 months",
    title: "Laughing, rolling practice and the famous sleep shift",
    ageWeeksFrom: 17,
    ageWeeksTo: 21,
    summary:
      "Chuckles are turning into laughs, toys are being grabbed on purpose, and rolling may be on the way. Sleep often gets bumpier around now — it's a normal developmental shift, not something you've broken.",
    expect: [
      {
        heading: "Development",
        paragraphs: [
          "Most babies this age hold their head steady when upright, swing at dangling toys, and grip one when you put it in their hand. Everything heads straight to the mouth — that's how babies explore.",
          "You'll likely hear lots of cooing, and sounds made back at you when you talk. Chuckles are common; full belly laughs may follow soon.",
          "Some babies attempt their first roll (usually front to back) around now; many wait weeks or months longer. Both are normal.",
        ],
      },
      {
        heading: "The 4-month sleep shift",
        paragraphs: [
          "Around 4 months, babies' sleep matures into adult-like cycles — the AAP notes that regular sleep cycles only emerge at about this age. More stirring between cycles means more wakings, which is why sleep can suddenly feel worse.",
          "It's often called a regression, but it's really progression — the new sleep architecture is permanent, and babies gradually learn to link cycles themselves.",
          "Keeping nights calm, dim and a bit boring helps, as does an unhurried, repeatable wind-down. Most families find the bumpiest patch passes within a few weeks.",
        ],
      },
      {
        heading: "Rolling and safety",
        paragraphs: [
          "Stop any arms-in swaddling at the very first signs of rolling — a baby who rolls while swaddled can't push themselves back.",
          "Once rolling starts, never leave your baby on a bed, sofa or changing table even for a second; a mat on the floor is the safe spot for nappy changes.",
          "Keep putting your baby down on their back for every sleep. If they roll themselves over once they can roll both ways, you don't need to keep flipping them back — but always start them on their back, in a clear cot.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "Broken sleep on top of months of broken sleep is genuinely hard. Share the load where you can, lower the bar on everything non-essential, and remind yourself this phase passes.",
          "Your baby staring longingly at your dinner isn't a sign to start solids yet — the NHS notes that fist-chewing, extra night waking and wanting more milk are often mistaken for readiness. Around 6 months is still the mark.",
          "If the 16-week vaccinations were missed, they can be caught up any time — just ring your GP surgery.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Distractibility often starts around now — your baby pops on and off to look at every noise; a quiet, dim room for some feeds can help.",
        "Shorter daytime feeds may be balanced by more evening or night feeding for a while — that's your baby topping up, not your supply failing.",
        "Extra night waking during the sleep shift isn't always hunger; feeding back to sleep is fine if it works for you, and so is trying other soothing first.",
      ],
      "breast-expressed": [
        "Bottle feeds get distractible too — a calm corner away from the action helps your baby focus.",
        "Try not to drop pumping sessions too quickly during the sleepy chaos; supply is easiest to keep than to rebuild.",
        "Keep rotating the freezer stash — oldest milk first.",
      ],
      "breast-formula": [
        "More night waking around now is often the sleep shift rather than hunger — settling first is fine, and so is feeding; you know your baby.",
        "Protect the breastfeeds that matter most to you — for many that's morning and bedtime — and let the rest flex.",
        "There's no need to change your mix because of a rough sleep patch; consistency usually helps more than switching things around.",
      ],
      formula: [
        "Waking more doesn't automatically mean needing bigger bottles — follow your baby's appetite at each feed.",
        "There's no need for 'hungry baby' milk — the NHS is clear that first infant formula is the only formula your baby needs for the whole first year.",
        "Keep feeds responsive: offer breaks, watch for turning away, and let your baby decide when they're done.",
      ],
    },
    dontWorry: [
      "Sleep suddenly falling apart after a settled patch — the 4-month shift is developmental and temporary.",
      "Rolling only one way, or not at all yet — the range is wide.",
      "Nap refusal and contact naps — many babies this age only nap on a person, and that changes with time.",
      "Intense interest in watching you eat — it's curiosity, not a signal to start solids early.",
      "Baby hair thinning or a bald patch at the back of the head — it grows back.",
      "A day of feeding constantly followed by a day of barely bothering.",
    ],
    watchFor: [
      "Your baby can't hold their head steady when you hold them upright.",
      "They don't make sounds back when you talk to them, or don't coo at all.",
      "They don't bring their hands to their mouth.",
      "They don't push up onto their forearms during tummy time.",
      "They don't watch things as they move, or one eye turns in or out most of the time beyond this age.",
      "They feel very stiff or very floppy.",
      "If any of these sound familiar, mention them to your health visitor or GP — it's always OK to get your baby checked, and most checks end in reassurance.",
    ],
    sources: [
      {
        title: "Milestones by 4 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/4-months.html",
        region: "US",
      },
      {
        title: "Getting your baby to sleep",
        org: "AAP (HealthyChildren.org)",
        url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/getting-your-baby-to-sleep.aspx",
        region: "US",
      },
      {
        title: "How to swaddle your baby",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/baby-product-information/swaddling/",
        region: "UK",
      },
      {
        title: "Your baby's first solid foods",
        org: "NHS",
        url: "https://www.nhs.uk/baby/weaning-and-feeding/babys-first-solid-foods/",
        region: "UK",
      },
      {
        title: "Sudden infant death syndrome (SIDS)",
        org: "NHS",
        url: "https://www.nhs.uk/baby/caring-for-a-newborn/sudden-infant-death-syndrome-sids/",
        region: "UK",
      },
    ],
  },
  {
    id: "5-months",
    label: "Around 5 months",
    title: "Grabbing everything, squealing with joy, and getting ready for food",
    ageWeeksFrom: 22,
    ageWeeksTo: 25,
    summary:
      "Your baby is turning into a little gymnast and comedian — rolling, reaching, squealing and blowing raspberries. Solids are on the horizon, but around 6 months is still the moment for most babies.",
    expect: [
      {
        heading: "Development",
        paragraphs: [
          "Rolling front-to-back is common now, and some babies add back-to-front; others are still working up to their first roll. Reaching is getting accurate — toys are grabbed, held and thoroughly taste-tested.",
          "Expect squeals, raspberries and experimental noises. Answer back and pause for their reply — turn-taking is how conversation starts.",
          "Some babies enjoy supported sitting, propped on your lap or between cushions with you right there. Independent sitting usually comes later — no rush.",
        ],
      },
      {
        heading: "Sleep",
        paragraphs: [
          "Sleep cycles are still consolidating after the 4-month shift. Naps may be forming a loose shape — often three a day — but short naps are still very normal.",
          "Early waking is common at this age; a dark room and an early-ish bedtime often help more than a later one.",
          "Keep the basics: back to sleep, clear cot, no swaddling once rolling signs appeared, room shared with you until at least 6 months.",
        ],
      },
      {
        heading: "Getting ready for solids",
        paragraphs: [
          "The NHS advises starting solids around 6 months, when three signs appear together: staying in a sitting position holding their head steady; coordinating eyes, hands and mouth to pick food up and get it in; and swallowing rather than pushing food back out.",
          "Most babies aren't showing all three at 5 months — chewing fists and wanting extra milk aren't readiness signs. If you're wondering about starting earlier, talk to your health visitor first; solids should never start before 17 weeks.",
          "You don't need much kit: a soft spoon, a couple of open or free-flow cups, bibs, and a washable floor covering will see you a long way.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "If you're returning to work later this year, this is when childcare thinking often begins — visits, waiting lists and settling-in sessions all take time, so starting early lowers the stress.",
          "You don't have to have it all decided. Plans made now can change, and babies adapt better than we fear.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Distractibility often peaks around now — feeding somewhere quiet, or when your baby is just waking and still sleepy, usually goes better.",
        "Breast milk is still everything your baby needs until around 6 months — daytime snacking-style feeds still add up.",
        "Keep taking your vitamin D, and give your baby their daily 8.5–10 microgram vitamin D drops (UK advice for breastfed babies).",
      ],
      "breast-expressed": [
        "If work is coming, a practice run helps: one bottle of expressed milk a day from another adult gets everyone used to the routine.",
        "Building a stash is gentlest with one extra pump a day — often mid-morning when supply is highest.",
        "Stick with paced, baby-led bottle feeds; a distractible baby may take less per bottle and make up for it at the breast.",
      ],
      "breast-formula": [
        "Distraction hits both breast and bottle feeds now — quiet and low light help either way.",
        "A steady combination rhythm — same feeds breast, same feeds formula most days — keeps your supply predictable.",
        "Night feeds are still completely normal at this age, whichever milk they're getting.",
      ],
      formula: [
        "Appetite growth often levels off as 6 months approaches — bottles may stop getting bigger, and that's expected.",
        "First infant formula remains the only formula your baby needs; there's no benefit in switching brands or types for a fussy patch.",
        "Solids aren't needed before around 6 months — if you're considering starting earlier, chat with your health visitor first, and never before 17 weeks.",
      ],
    },
    dontWorry: [
      "No teeth yet — most babies cut their first around 6 months, and some not until after their first birthday.",
      "Rolling in one direction only, or preferring not to roll at all yet.",
      "Naps that last exactly one sleep cycle (30–45 minutes) and no more.",
      "Ear-splitting happy squeals — volume control comes much, much later.",
      "Chewing on everything — it's exploration and gum comfort, not necessarily teething.",
      "Eating less during the day because the world is too interesting — babies usually balance it out.",
    ],
    watchFor: [
      "Your baby doesn't reach for or try to grasp toys held within reach.",
      "Their head still lags right back when you pull them gently to sitting.",
      "They don't make vowel sounds, squeals or noises back at you.",
      "They don't turn towards your voice or react to sounds around them.",
      "They seem very stiff or very floppy, or don't seem interested in what's going on around them.",
      "None of these on its own is a diagnosis — but each is worth a conversation with your health visitor or GP, and it's always OK to ask.",
    ],
    sources: [
      {
        title: "Milestones by 6 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/6-months.html",
        region: "US",
      },
      {
        title: "Your baby's first solid foods",
        org: "NHS",
        url: "https://www.nhs.uk/baby/weaning-and-feeding/babys-first-solid-foods/",
        region: "UK",
      },
      {
        title: "Baby teething symptoms",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/teething/baby-teething-symptoms/",
        region: "UK",
      },
      {
        title: "Getting your baby to sleep",
        org: "AAP (HealthyChildren.org)",
        url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/getting-your-baby-to-sleep.aspx",
        region: "US",
      },
      {
        title: "Formula milk: common questions",
        org: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/formula-milk-questions/",
        region: "UK",
      },
    ],
  },
  {
    id: "6-months",
    label: "Around 6 months",
    title: "First tastes — a lovely, messy milestone",
    ageWeeksFrom: 26,
    ageWeeksTo: 30,
    summary:
      "Half a year in, and it's time for food — tiny tastes, spectacular faces and a lot of mess. Milk is still doing the heavy lifting; solids are about exploring, not calories, for now.",
    expect: [
      {
        heading: "Development",
        paragraphs: [
          "Most babies this age roll from tummy to back, push up on straight arms, and sit leaning on their hands — some are getting steadier by the week. They know their familiar people, laugh, squeal and blow raspberries.",
          "Reaching is confident now, and everything still goes in the mouth — which is handy, because that's exactly the skill eating needs.",
          "Take turns making sounds together; those back-and-forth exchanges are the roots of talking.",
        ],
      },
      {
        heading: "Starting solids",
        paragraphs: [
          "Start when the three readiness signs appear together, around 6 months: sitting and holding their head steady, coordinating eyes-hands-mouth to get food in, and swallowing rather than pushing it back out.",
          "The NHS suggests starting with single vegetables, including less-sweet ones like broccoli, cauliflower and spinach, to broaden tastes early. Mashed food on a spoon and soft finger foods are both fine — baby-led weaning and spoon-feeding are equally valid, and many families mix the two.",
          "Introduce allergen foods — peanut (as smooth butter or ground), cooked hen's egg, gluten, fish and so on — from around 6 months, one at a time and in small amounts so you can spot any reaction; delaying peanut and egg past 6–12 months may actually increase allergy risk. No honey before 1, no added salt or sugar, no whole nuts, and cut small round foods like grapes into strips.",
          "Gagging is common and noisy — it's a protective reflex while your baby learns, and it looks worse than it is. Choking is different and usually quiet: always stay with your baby while they eat, seated upright, and never leave them alone with food.",
        ],
      },
      {
        heading: "Sleep",
        paragraphs: [
          "Some babies manage longer night stretches now; many still wake to feed, and that's normal. Naps often settle towards three a day.",
          "The Lullaby Trust advises your baby sleeps in your room for at least the first 6 months — after that, moving them to their own room is your call, whenever it suits your family.",
          "Teething can ruffle sleep around now; extra comfort during the rough nights doesn't create bad habits.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "Weaning is messier and slower than anyone expects — a wipeable mat under the highchair and low expectations are the kit that matters.",
          "Half a year of keeping a small human alive is worth acknowledging. And if your mood has dipped — even now — postnatal depression can begin at any time in the first year, and your GP or health visitor will take it seriously.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Milk stays the main food for now — solids at 6 months are about practice and flavours, so breastfeed as usual and offer tastes when your baby is awake and content.",
        "The WHO supports continuing breastfeeding alongside food right through this year and beyond — starting solids is an addition, not an ending.",
        "Keep the daily vitamin D drops (8.5–10 micrograms) going for your breastfed baby — UK advice for the whole first year.",
      ],
      "breast-expressed": [
        "Everything about milk-first applies to expressed feeds too — bottles carry on as normal while tastes begin.",
        "Expressed milk is lovely for mixing into first foods like porridge or mashed vegetables.",
        "Your pumping pattern shouldn't need to change much yet; solids replace very little milk at this stage.",
      ],
      "breast-formula": [
        "Keep your usual mix of breast and formula feeds while solids start — food comes alongside milk, not instead of it, for a while yet.",
        "First infant formula can be used in cooking and mixed into food, just like breast milk.",
        "There's no need to move to follow-on milk at 6 months — the NHS says first infant formula is fine right up to 12 months.",
      ],
      formula: [
        "Milk is still the main event — expect bottle amounts to stay roughly steady at first and ease down only gradually as meals grow.",
        "Babies drinking more than 500ml of formula a day don't need a vitamin D supplement — it's already in the formula.",
        "From 6 months, offer sips of water in an open or free-flow cup with meals — messy at first, brilliant for teeth and sipping skills.",
      ],
    },
    dontWorry: [
      "Your baby eats barely a teaspoon — first meals are practice, and milk is still doing the nutritional work.",
      "Dramatic faces of betrayal at new flavours — it can take 10 or more tries before a food is accepted.",
      "Noisy gagging while learning to move food around — it's a normal protective reflex.",
      "Poo changing colour and texture (sometimes startlingly) once food goes in.",
      "No teeth yet — some babies don't cut their first until after 12 months.",
      "Not sitting unaided yet, or not rolling in both directions — both have wide normal ranges.",
    ],
    watchFor: [
      "Your baby hasn't rolled in any direction at all and doesn't push up in tummy time.",
      "They don't laugh, squeal or make sounds back at you.",
      "They don't seem to know or respond differently to their familiar people.",
      "They don't reach for things they want.",
      "They can't hold their head steady when sitting supported on your lap.",
      "They seem very stiff or very floppy.",
      "Any of these is simply worth raising with your health visitor or GP — most turn out fine, and asking early is always the right move.",
    ],
    sources: [
      {
        title: "Your baby's first solid foods",
        org: "NHS",
        url: "https://www.nhs.uk/baby/weaning-and-feeding/babys-first-solid-foods/",
        region: "UK",
      },
      {
        title: "What to feed your baby from around 6 months",
        org: "NHS",
        url: "https://www.nhs.uk/best-start-in-life/baby/weaning/what-to-feed-your-baby/from-around-6-months/",
        region: "UK",
      },
      {
        title: "Baby food allergies",
        org: "NHS",
        url: "https://www.nhs.uk/best-start-in-life/baby/weaning/safe-weaning/food-allergies/",
        region: "UK",
      },
      {
        title: "Infant and young child feeding",
        org: "WHO",
        url: "https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding",
        region: "Global",
      },
      {
        title: "Milestones by 6 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/6-months.html",
        region: "US",
      },
      {
        title: "Vitamins for children",
        org: "NHS",
        url: "https://www.nhs.uk/baby/weaning-and-feeding/vitamins-for-children/",
        region: "UK",
      },
    ],
  },
  {
    id: "7-months",
    label: "Around 7 months",
    title: "Sitting up and joining the conversation",
    ageWeeksFrom: 31,
    ageWeeksTo: 34,
    summary:
      "Sitting is getting steadier, babble is turning consonant-shaped, and your baby is starting to understand that things (and people) still exist when they disappear — which explains the new clinginess.",
    expect: [
      {
        heading: "Development",
        paragraphs: [
          "Many babies now sit with less and less support, and some manage steady unaided moments. Objects get passed hand to hand, banged, shaken and studied.",
          "Listen for consonants creeping into the babble — 'ba', 'da', 'ma' sounds. Chat back, name things, and leave gaps for their turn.",
          "Object permanence is dawning: your baby is learning that a dropped toy hasn't ceased to exist, which makes drop-it-again games and peek-a-boo suddenly hilarious. It also means they notice when you leave — early separation anxiety is a sign of healthy attachment, not of anything wrong.",
        ],
      },
      {
        heading: "Sleep",
        paragraphs: [
          "Naps often consolidate towards two or three a day, with slightly more predictable timing. Night sleep may still include feeds — that's within the range of normal.",
          "New separation awareness can bring bedtime protest or fresh night waking; a consistent, unhurried wind-down and calm, boring resettles help most.",
          "Back to sleep for every sleep, in a clear cot, still applies all year.",
        ],
      },
      {
        heading: "Food",
        paragraphs: [
          "Meals are building — many babies head towards two or three small ones a day around now, still with milk doing plenty of work.",
          "Keep textures moving on: mashed food with soft lumps and easy finger foods build chewing skills, which also exercise the muscles used for talking. Staying on smooth purée for a long time can make lumps harder later.",
          "Offer water in an open or free-flow cup with meals — the NHS recommends a cup from 6 months, and early practice pays off.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "A baby who cries when you leave the room can squeeze your heart — remember it's a milestone, not a complaint about your parenting. The NHS notes separation anxiety is common from around 6 months and completely normal.",
          "If childcare is coming, short practice separations — a happy goodbye, a reliable return — genuinely help both of you.",
          "Somewhere in here you might get a flicker of your evenings back. Take it; it's allowed.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Milk feeds carry on alongside meals — some babies briefly feed a little less as food gets exciting, others don't change at all; both are fine.",
        "If a teething baby bites, take them off calmly, offer something cool to chew, and try again — most babies stop quickly.",
        "Night breastfeeds at 7 months are still common and can be dropped later, gradually, when you're ready — there's no deadline.",
      ],
      "breast-expressed": [
        "If you're returning to work in the UK, tell your employer in writing that you're breastfeeding — they must provide somewhere suitable for you to rest, and many will also arrange time and a private space for expressing.",
        "A breastfeed at drop-off and another at pick-up keeps supply steady around a working day for many mums.",
        "Insulated bags and cool packs make transporting expressed milk straightforward — label with the date and refrigerate as soon as you can.",
      ],
      "breast-formula": [
        "Solids don't replace milk yet — keep your familiar breast-and-formula pattern and let meals grow around it slowly.",
        "If you decide to swap a breastfeed for formula, drop it gradually over several days so your breasts adjust comfortably.",
        "Whatever your ratio looks like this month, it's working if your baby is fed, growing and content.",
      ],
      formula: [
        "Milk needs ease slightly as meals become real — follow your baby's appetite rather than chasing fixed amounts, and the NHS Best Start pages give a feel for the direction of travel.",
        "Keep offering water in a cup at mealtimes so cups feel normal well before bottles wind down.",
        "Still no need for follow-on milk — first infant formula remains the NHS recommendation to 12 months.",
      ],
    },
    dontWorry: [
      "No crawling — the usual window is roughly 7 to 12 months, and some babies skip it entirely.",
      "Not sitting unaided yet — plenty of babies get there closer to 9 months.",
      "Food dropped and thrown from the highchair — your baby is doing physics, not defiance.",
      "Refusing a food they loved last week — tastes swing wildly and keep swinging.",
      "Sudden clinginess with people they know well — separation anxiety is a healthy sign of attachment.",
      "Waking again at night after a stretch of sleeping through.",
    ],
    watchFor: [
      "Your baby can't sit even with support.",
      "There's no babbling or experimenting with sounds at all.",
      "They don't turn towards sounds or your voice.",
      "They don't show warmth or pleasure with their familiar people.",
      "They only ever use one hand or one side of their body.",
      "They seem very stiff or very floppy.",
      "If anything here fits, mention it to your health visitor or GP — early conversations are easy, and you know your baby best.",
    ],
    sources: [
      {
        title: "Milestones by 9 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/9-months.html",
        region: "US",
      },
      {
        title: "Weaning — Best Start in Life",
        org: "NHS",
        url: "https://www.nhs.uk/best-start-in-life/baby/weaning/",
        region: "UK",
      },
      {
        title: "Separation anxiety",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/behaviour/separation-anxiety/",
        region: "UK",
      },
      {
        title: "Baby teething symptoms",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/teething/baby-teething-symptoms/",
        region: "UK",
      },
      {
        title: "Drinks and cups for babies and young children",
        org: "NHS",
        url: "https://www.nhs.uk/baby/weaning-and-feeding/drinks-and-cups-for-babies-and-young-children/",
        region: "UK",
      },
    ],
  },
  {
    id: "8-months",
    label: "Around 8 months",
    title: "On the move — time to baby-proof",
    ageWeeksFrom: 35,
    ageWeeksTo: 38,
    summary:
      "However your baby chooses to travel — rolling, shuffling, commando-dragging or classic crawling — movement is probably arriving, and your home is about to be inspected at floor level. Stranger anxiety often shows up around now too.",
    expect: [
      {
        heading: "Development",
        paragraphs: [
          "Many babies now sit steadily and are finding a way to get around: rolling as transport, bottom-shuffling, commando crawling or hands-and-knees. The variety is enormous, and an estimated 4–15% of babies never crawl on hands and knees at all — many are simply saving themselves for walking.",
          "Babble is turning into strings — 'mamamama', 'bababababa' — and peek-a-boo is at its comedy peak as object permanence beds in.",
          "New wariness of unfamiliar people is common and healthy: your baby has worked out who their people are.",
        ],
      },
      {
        heading: "Baby-proofing",
        paragraphs: [
          "Get down to floor level and see what a determined baby can reach. Small objects — coins, buttons, small toy parts and especially button batteries — need to live out of reach.",
          "In the UK, the NHS recommends safety gates meeting BS EN 1930:2011 to keep stairs off-limits, and keeping hot drinks well away — they can still scald 15 minutes after being made.",
          "Anchor bookcases and TVs that could be pulled over, mind trailing blind cords and cables, and use the highchair's harness every time.",
        ],
      },
      {
        heading: "Sleep",
        paragraphs: [
          "Two naps a day is a common shape now, though not universal. Separation anxiety can make bedtime partings harder — a consistent goodnight ritual and calm, brief returns work better than sneaking off.",
          "Lower the cot base before your baby can sit or pull up, and keep the cot clear of anything they could climb on or pull over themselves.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "Supervising a newly mobile baby is genuinely tiring — a well-stocked playpen or the cot gives you a safe two minutes to make tea or just breathe.",
          "If your baby now howls at handover to grandparents or nursery, it isn't a verdict on your choices — stranger anxiety is a phase, and it passes with warm, patient repetition.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "As meals firm up towards three a day, breastfeeds often reduce naturally — follow your baby rather than a schedule.",
        "Night feeds may be hunger, comfort or both — all are legitimate, and if you want fewer, dropping them slowly and gently works better than sudden stops.",
        "If you do drop a feed, give your body a few days before dropping another, to stay comfortable and avoid blocked ducts.",
      ],
      "breast-expressed": [
        "With solids carrying more, many mums start trimming a pumping session — drop one at a time and watch comfort for a few days.",
        "Frozen stash mixes nicely into porridge, sauces and mash — a lovely way to use older milk.",
        "If output dips during a busy patch, a few days of feeding or pumping slightly more often usually nudges it back.",
      ],
      "breast-formula": [
        "Milk feeds — both kinds — often ease back as three meals take shape; keep the feeds that anchor your day, commonly morning and bedtime.",
        "It's fine to let mealtimes lead at midday and keep milk for the edges of the day if that suits your baby.",
        "No formula change is needed as food grows — same milk, gradually a little less of it.",
      ],
      formula: [
        "Many babies drift towards three or four milk feeds around their meals now — appetites vary, so treat NHS stage guides as direction rather than targets.",
        "Keep water in an open or free-flow cup at every meal — cup skills now make the eventual goodbye to bottles much easier.",
        "Avoid letting your baby fall asleep drinking a bottle — milk pooling around new teeth is a decay risk.",
      ],
    },
    dontWorry: [
      "Bottom-shuffling or commando-style movement instead of textbook crawling — all styles count.",
      "Skipping crawling altogether — some babies go straight to pulling up and walking, and research shows no link with later development.",
      "Sudden suspicion of people they adored last month — stranger anxiety is developmental, not rudeness.",
      "Food flung to the floor at every meal — it's learning (and the dog's gain).",
      "Still no teeth — the late end of normal runs past the first birthday.",
      "A week of cot protest that vanishes as mysteriously as it arrived.",
    ],
    watchFor: [
      "Your baby isn't sitting without support by around 9 months.",
      "There are no babbled consonant strings like 'bababa' or 'mamama'.",
      "They don't look when you call their name by around 9 months.",
      "They don't pass objects from one hand to the other.",
      "They don't seem to notice or respond to people across the room.",
      "They've lost any skill they used to have — this one is always worth raising promptly.",
      "For any of these, book a chat with your health visitor or GP — checking is free, calming and never a fuss over nothing.",
    ],
    sources: [
      {
        title: "Milestones by 9 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/9-months.html",
        region: "US",
      },
      {
        title: "Baby and toddler safety",
        org: "NHS",
        url: "https://www.nhs.uk/baby/first-aid-and-safety/safety/baby-and-toddler-safety/",
        region: "UK",
      },
      {
        title: "Learning to crawl",
        org: "Pregnancy, Birth and Baby",
        url: "https://www.pregnancybirthbaby.org.au/learning-to-crawl",
        region: "Australia",
      },
      {
        title: "Separation anxiety",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/behaviour/separation-anxiety/",
        region: "UK",
      },
      {
        title: "Safer sleep overview",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/safer-sleep-overview/",
        region: "UK",
      },
    ],
  },
  {
    id: "9-months",
    label: "Around 9 months",
    title: "Sitting steady, babbling strings — and the big review",
    ageWeeksFrom: 39,
    ageWeeksTo: 43,
    summary:
      "Most babies now sit solidly, babble in cheerful strings and light up at peek-a-boo. In the UK, the health visitor review lands somewhere between 9 and 12 months — a great excuse to ask every question you've been saving.",
    expect: [
      {
        heading: "Development",
        paragraphs: [
          "By around 9 months, most babies sit without support and can get themselves into sitting. Watch for raking food towards themselves with their fingers, passing things hand to hand, and banging two toys together with satisfaction.",
          "Socially there's a lot happening: looking when you call their name, reacting when you leave, lifting arms to be picked up, and giggling through peek-a-boo.",
          "They'll look for a toy that drops out of sight now — object permanence in action — and babble strings of sounds like 'mamamama' without meaning them as names quite yet.",
        ],
      },
      {
        heading: "Sleep",
        paragraphs: [
          "Two naps is the common shape at this age. Separation anxiety can peak around bedtime — a warm, predictable routine and brief reassuring check-ins usually beat prolonged negotiations.",
          "Early waking and the odd rough week (teeth, new skills, colds) are part of the landscape; consistency brings things back.",
        ],
      },
      {
        heading: "Food",
        paragraphs: [
          "Three meals a day is a common rhythm now, with lumpier textures and plenty of finger foods. Iron matters at this age — meat, beans, lentils, eggs and fortified cereals all help.",
          "A pincer grip is often emerging, so small soft pieces — peas, blueberry halves, bits of banana — make brilliant practice.",
          "Keep the open or free-flow cup at every meal; water and milk are the only drinks a baby needs.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "In the UK, your baby will be offered a health and development review between 9 and 12 months, looking at language, learning, safety, diet and behaviour — you'll usually fill in an ASQ questionnaire beforehand. It's a conversation, not an exam, so bring your list of niggles.",
          "In the US, the 9-month well-child visit typically includes formal developmental screening — the AAP recommends it at 9, 18 and 30 months.",
          "If you're back at work, the juggle is real — and if your mood has slid at any point, that still counts as postnatal depression territory; your GP or health visitor wants to know.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Many babies settle around three or four breastfeeds a day alongside meals — but there's no single right number, and feeding to sleep is still fine if it works for you.",
        "The morning and bedtime feeds are usually the keepers; midday feeds often fade first as lunch gets interesting.",
        "Keep up your baby's daily vitamin D drops while breastfeeding remains their main milk.",
      ],
      "breast-expressed": [
        "Now meals carry more, work-time pumping can often shrink — drop a session at a time and let comfort guide the pace.",
        "A feed either side of the workday keeps supply humming for many mums without any daytime pumping at all.",
        "If your stash outpaces demand, remember expressed milk cooks beautifully into family food.",
      ],
      "breast-formula": [
        "Mixed patterns often simplify around now — for example breast at morning and bedtime, with formula or meals in between.",
        "If you'd like fewer night feeds, go gradually: shorten or shrink one feed at a time and add other comfort in its place.",
        "There's still no need for follow-on or 'good night' milks — the NHS doesn't recommend them over first infant formula.",
      ],
      formula: [
        "The direction is fewer, smaller milk feeds as food grows — the NHS 10–12 months guidance shows where you're heading, without rigid numbers.",
        "Keep the bedtime bottle calm and finished before sleep, then teeth cleaned — falling asleep on the bottle isn't kind to new teeth.",
        "Offer milk after or alongside food rather than just before, so appetite goes to the meal.",
      ],
    },
    dontWorry: [
      "Not pulling to stand yet — that often comes over the next couple of months, and later for some.",
      "No real words — rich, varied babble is exactly the right sound for 9 months.",
      "Still toothless — a small number of babies stay gummy past their first birthday.",
      "An appetite that swings from seagull to sparrow day by day.",
      "Tears at nursery drop-off followed by happy playing within minutes — the settling is real even if you don't see it.",
      "Utter fury at having their face wiped — this appears to be universal.",
    ],
    watchFor: [
      "Your baby doesn't sit without support by around 9 months.",
      "They don't babble — no strings of sounds like 'mamama' or 'bababa'.",
      "They don't look when you call their name.",
      "They don't look for things that fall out of sight.",
      "They don't take any weight on their legs when you hold them standing.",
      "They don't seem to recognise or respond differently to familiar people.",
      "The 9–12 month review is a perfect moment to raise any of these — or see your health visitor or GP sooner; you never need to wait for an appointment to ask.",
    ],
    sources: [
      {
        title: "Your baby's health and development reviews",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/height-weight-and-reviews/baby-reviews/",
        region: "UK",
      },
      {
        title: "Milestones by 9 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/9-months.html",
        region: "US",
      },
      {
        title: "Babies development",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/babies/development",
        region: "Australia",
      },
      {
        title: "Drinks and cups for babies and young children",
        org: "NHS",
        url: "https://www.nhs.uk/baby/weaning-and-feeding/drinks-and-cups-for-babies-and-young-children/",
        region: "UK",
      },
      {
        title: "Postnatal depression",
        org: "NHS",
        url: "https://www.nhs.uk/mental-health/conditions/post-natal-depression/overview/",
        region: "UK",
      },
    ],
  },
  {
    id: "10-months",
    label: "Around 10 months",
    title: "Pulling up, cruising and clever little pincer fingers",
    ageWeeksFrom: 44,
    ageWeeksTo: 47,
    summary:
      "Furniture is now gym equipment: many babies pull to stand around now, and some begin cruising along the sofa. Meanwhile fingers are getting precise — tiny things picked up between thumb and forefinger, usually en route to the mouth.",
    expect: [
      {
        heading: "Development",
        paragraphs: [
          "Pulling up to stand is the headline act for many babies around now, with cruising — stepping sideways while holding furniture — sometimes following. Others are perfecting their crawl or shuffle first; the order varies hugely.",
          "The pincer grip is refining: peas, crumbs and specks of fluff you can't even see will be expertly harvested. It's great self-feeding practice — and a reason to keep floors clear of small hazards.",
          "Understanding is racing ahead of speech: many babies now respond to their name, pause at 'no', and may wave or start to point.",
        ],
      },
      {
        heading: "Safety as they climb",
        paragraphs: [
          "If you haven't already, lower the cot base to its lowest setting — a standing baby can tip over a high side surprisingly fast.",
          "Think about what a standing baby can now pull: tablecloths, cables, cups of tea near table edges. Anchor anything tippable, and keep stair gates in action.",
          "Falls will still happen — cruising is a contact sport. Soft landings and corner cushions help; so does remembering that small tumbles are part of learning.",
        ],
      },
      {
        heading: "Sleep",
        paragraphs: [
          "Two naps remains the common shape. A baby who has just learned to stand will often practise in the cot — standing up, wailing, sitting, repeat. Boring consistency and letting them practise the sitting-down part by day speeds this phase along.",
          "Keep bedtime routines short, warm and predictable; big skills weeks often mean bumpy sleep weeks.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "Chasing a mobile baby is a workout you never signed up for — 'safe enough and mostly tidy' is a perfectly good standard for your home right now.",
          "If you're back at work, guilt has a habit of visiting — it isn't evidence of anything except how much you care. Babies attach firmly to their people, including the ones who go to work.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Breastfeeds often continue their gentle step-down as meals do more — many babies are somewhere around two to four feeds a day, with wide variation.",
        "Distractibility can return with mobility — a busy baby may prefer efficient feeds in a quiet spot.",
        "If you'd like fewer night feeds, gradual works: shorten feeds bit by bit, and let a partner take some resettles if you can.",
      ],
      "breast-expressed": [
        "Many mums are down to one or no pumping sessions at work by now if supply is established — go by comfort and your baby's needs.",
        "Direct feeds when you're together plus meals when you're apart is a pattern that works well for lots of families around this age.",
        "Keep using the frozen stash in cooking so nothing goes to waste.",
      ],
      "breast-formula": [
        "Your pattern is probably fairly settled — protect the feeds you love and let the rest follow your baby's appetite.",
        "The NHS 10–12 months feeding pages sketch the meals-plus-milk balance you're heading towards.",
        "Cows' milk is fine in cooking and on cereal from 6 months, but shouldn't be the main drink until 12 months — formula and breast milk still hold that job.",
      ],
      formula: [
        "Many babies take roughly two or three milk feeds a day alongside three meals now — treat published amounts as a compass, not a contract.",
        "Keep shifting daytime milk into cups where you can; the fewer bottle habits to unwind at 12 months, the easier.",
        "First infant formula remains the right milk until the first birthday — no switching needed.",
      ],
    },
    dontWorry: [
      "Not pulling to stand yet — the range runs well past a year for some perfectly healthy babies.",
      "No cruising or standing — sitting-and-shuffling specialists get there in their own time.",
      "A distinctly bow-legged look when standing — normal at this age and usually straightens with growth.",
      "Constant falls onto their bottom — nappies are excellent crash mats.",
      "One food adored on repeat this week and rejected next week.",
      "Still only a tooth or two, or none — teeth follow their own calendar.",
    ],
    watchFor: [
      "Your baby isn't sitting steadily without support.",
      "They aren't moving around by any means at all — no rolling, shuffling, crawling or scooting.",
      "They consistently ignore or don't use one hand or one side of the body.",
      "Babble hasn't developed variety — few or no different sounds.",
      "They rarely make eye contact or share smiles and attention with you during play.",
      "They don't respond to their name or to familiar voices.",
      "Any of these deserves a conversation with your health visitor or GP — calm, early questions are exactly what they're there for.",
    ],
    sources: [
      {
        title: "Milestones by 1 year",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/1-year.html",
        region: "US",
      },
      {
        title: "Baby and toddler safety",
        org: "NHS",
        url: "https://www.nhs.uk/baby/first-aid-and-safety/safety/baby-and-toddler-safety/",
        region: "UK",
      },
      {
        title: "Learning to crawl",
        org: "Pregnancy, Birth and Baby",
        url: "https://www.pregnancybirthbaby.org.au/learning-to-crawl",
        region: "Australia",
      },
      {
        title: "What to feed your baby: 10 to 12 months",
        org: "NHS",
        url: "https://www.nhs.uk/best-start-in-life/baby/weaning/what-to-feed-your-baby/10-to-12-months/",
        region: "UK",
      },
      {
        title: "Safer sleep overview",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/safer-sleep-overview/",
        region: "UK",
      },
    ],
  },
  {
    id: "11-months",
    label: "Around 11 months",
    title: "Nearly one — first words warming up",
    ageWeeksFrom: 48,
    ageWeeksTo: 51,
    summary:
      "Cruising is getting confident, 'mama' and 'dada' are starting to mean someone, and a few babies take their first wobbly steps — though plenty save that party trick for well after their birthday.",
    expect: [
      {
        heading: "Development",
        paragraphs: [
          "Many babies now cruise along furniture with confidence, and some stand alone for breathless seconds. First independent steps happen anywhere in a huge window — a few before the first birthday, many between 12 and 18 months.",
          "'Mama' and 'dada' may be attaching to the right people, alongside waves, claps and pointing. Games with rules — pat-a-cake, give-and-take — are suddenly playable.",
          "Understanding outstrips talking by miles: watch them pause at 'no' or look for the cat when you mention it.",
        ],
      },
      {
        heading: "Sleep",
        paragraphs: [
          "Most babies are still best on two naps; the move to one usually happens somewhere between 12 and 18 months, so there's no rush.",
          "An almost-walker often wants to practise at bedtime — expect standing ovations in the cot. Calm, consistent resettling and daytime practice shrink the phase.",
        ],
      },
      {
        heading: "Food and cups",
        paragraphs: [
          "Three meals plus milk is the shape now, edging towards family food — just go easy on salt and skip added sugar for everyone's benefit.",
          "Start moving remaining bottle feeds into cups, one at a time; the NHS advises discouraging bottles from 12 months for the sake of teeth. Open and free-flow cups are the aim.",
          "Self-feeding — messy, slow, gloriously proud — deserves as much floor coverage and patience as you can spare.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "Birthday plans may be brewing, and with them thoughts about feeding changes. Nothing has to change overnight at 12 months — milk transitions, bottle goodbyes and weaning decisions can all be gradual.",
          "However feeding has gone this year — breast, bottle, both, bumpy — you've fed a baby through their fastest year of growth. That's the whole assignment, done.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "There's no reason to stop at one — the WHO supports breastfeeding alongside food to 2 years or beyond, for exactly as long as you both want.",
        "If you are winding down, drop one feed at a time with a week or so between — kinder to your body and your baby.",
        "Feeding gymnastics — latched baby attempting a headstand — is standard issue at this age.",
      ],
      "breast-expressed": [
        "If pumping is ending around now, taper rather than stop dead — stretch the gaps between sessions over a couple of weeks.",
        "The freezer stash can keep being used in food and drinks up to its storage limits — check dates and use oldest first.",
        "Any expressed feeds you keep can move into cups now, same as other milk feeds.",
      ],
      "breast-formula": [
        "From 12 months, formula's job is done — whole cows' milk can take over as the drink, while breastfeeds continue as long as you like.",
        "Start pouring formula feeds into cups now so the bottle goodbye is gentle rather than sudden.",
        "No need to buy anything new for the transition — no toddler milks required.",
      ],
      formula: [
        "Plan the 12-month switch: whole cows' milk becomes fine as the main drink from the first birthday.",
        "The NHS says toddler and growing-up milks aren't needed — whole cows' milk plus a balanced diet (and vitamin drops) does the job.",
        "Aim to retire bottles around 12 months — moving one feed at a time into a cup now makes that nearly painless.",
      ],
    },
    dontWorry: [
      "No steps and no solo standing — many confident walkers start at 13, 15, even 18 months.",
      "'Words' only you can decode — consistent sounds for things are real progress.",
      "No clear 'mama' or 'dada' aimed at the right person yet — most babies get there around a year, with a wide spread.",
      "Still wanting a bedtime milk feed — comfort and nutrition can share a job.",
      "Dinner refused, thrown, then eaten off the floor — appetite and manners mature separately.",
      "Weight gain slowing down — growth naturally decelerates near the first birthday.",
    ],
    watchFor: [
      "Your baby doesn't take any weight on their legs when you support them standing.",
      "They aren't sitting confidently on their own.",
      "There are no gestures — no waving, reaching up, or early pointing — as their first birthday approaches.",
      "Babble is absent or hasn't grown any variety.",
      "They don't respond to their name or seem to notice familiar voices.",
      "They've lost any skill they once had — always mention this one promptly.",
      "A quick word with your health visitor or GP settles most worries — and starts help early on the rare occasions it's needed.",
    ],
    sources: [
      {
        title: "Milestones by 1 year",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/1-year.html",
        region: "US",
      },
      {
        title: "What to feed your baby: 10 to 12 months",
        org: "NHS",
        url: "https://www.nhs.uk/best-start-in-life/baby/weaning/what-to-feed-your-baby/10-to-12-months/",
        region: "UK",
      },
      {
        title: "Drinks and cups for babies and young children",
        org: "NHS",
        url: "https://www.nhs.uk/baby/weaning-and-feeding/drinks-and-cups-for-babies-and-young-children/",
        region: "UK",
      },
      {
        title: "Bottle feeding advice",
        org: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/advice/",
        region: "UK",
      },
      {
        title: "Infant and young child feeding",
        org: "WHO",
        url: "https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding",
        region: "Global",
      },
    ],
  },
  {
    id: "12-months",
    label: "Around 12 months",
    title: "One! Waves, maybe steps, and a whole personality",
    ageWeeksFrom: 52,
    ageWeeksTo: 56,
    summary:
      "Happy birthday to your baby — and to you, for a year of feeds, nights and firsts. Around now: cruising or first steps, waving bye-bye, a name for you, and in the UK the one-year vaccinations.",
    expect: [
      {
        heading: "Development",
        paragraphs: [
          "By around a year, most babies pull up to stand and walk holding onto furniture; some are taking independent steps, and plenty aren't yet — walking anywhere from about 10 to 18 months is within the normal range.",
          "Communication blossoms: waving bye-bye, calling a parent 'mama' or 'dada' or their own special name, and pausing at 'no'. The pincer grip is precise, and games like pat-a-cake and putting blocks into cups are big hits.",
          "They'll hunt for a toy they watched you hide — memory and problem-solving arriving together.",
        ],
      },
      {
        heading: "Sleep",
        paragraphs: [
          "Many babies begin drifting towards one big lunchtime nap over the coming months — the transition weeks can be messy, with some days needing two naps and some managing one.",
          "Separation anxiety often flares around the first birthday, so extra bedtime clinginess is common and temporary. Warm, boring consistency remains the trick.",
          "Night waking hasn't necessarily finished — some one-year-olds sleep through, many don't yet, and both are normal.",
        ],
      },
      {
        heading: "Food and milk",
        paragraphs: [
          "From 12 months: three meals a day plus a couple of healthy snacks, and whole cows' milk can now be the main drink. Breast milk remains great too, for as long as you both want.",
          "Bottles should start retiring now in favour of cups — the NHS discourages bottle feeding from age 1 to protect teeth.",
          "In the UK, children aged 1 to 4 are advised to have daily vitamin drops containing vitamins A, C and D (10 micrograms of vitamin D) — unless they're still having 500ml or more of formula a day.",
        ],
      },
      {
        heading: "And you",
        paragraphs: [
          "In the UK, the one-year vaccinations are due — following the 2025–26 schedule update, this now includes the MMRV jab (measles, mumps, rubella and chickenpox) alongside pneumococcal and MenB boosters; the NHS vaccinations page has the current list, as combinations were updated recently. In the US, the 12-month well-child visit covers similar ground.",
          "If the 9–12 month health visitor review hasn't happened yet, it should be offered soon — chase it if it hasn't appeared.",
          "And take a breath: you got a tiny human through an entire year. However this year looked, that took love, stamina and about a thousand small decisions — well done.",
        ],
      },
    ],
    feedingNotes: {
      breast: [
        "Carry on as long as you both want — the WHO supports breastfeeding to 2 years and beyond, and every extra month counts.",
        "Feeds often become bookends now — morning and bedtime — with food and other drinks in between.",
        "If or when you stop, gradual is kindest: one feed at a time, with cuddles taking over the comfort role.",
      ],
      "breast-expressed": [
        "Routine pumping usually isn't needed from now unless you want to continue — direct feeds plus cows' milk in a cup covers it.",
        "Taper any remaining pumping slowly for comfort rather than stopping abruptly.",
        "Remaining frozen milk can go into cooking, cereal and cups — nothing wasted.",
      ],
      "breast-formula": [
        "Formula can simply stop at 12 months — swap those feeds for whole cows' milk in a cup, and keep any breastfeeds you're both enjoying.",
        "No follow-on or toddler milk needed for the transition — the NHS recommends plain whole cows' milk from 1.",
        "Change one feed at a time if your baby side-eyes the new milk; mixing during the switch is fine.",
      ],
      formula: [
        "From the first birthday, whole cows' milk can be the main drink and formula can be retired — no toddler milks needed.",
        "Milk becomes a drink alongside food rather than the main event — the NHS feeding pages give a feel for how much, without rigid targets.",
        "Serve milk in an open or free-flow cup and let bottles bow out gently over the coming weeks.",
      ],
    },
    dontWorry: [
      "Not walking yet — many babies take first steps at 13 to 18 months and stride off just as well.",
      "Few or no clear words — understanding you is the milestone that matters most right now.",
      "Never crawled — some babies cruise straight past that chapter with no ill effects.",
      "Still waking at night sometimes — plenty of one-year-olds do.",
      "Eating heroically one day and hardly at all the next — growth is slowing, and appetite follows.",
      "Only a couple of teeth, or none — late teeth are almost always just late.",
      "Full-body devastation over the wrong-coloured cup — big feelings are part of the age.",
    ],
    watchFor: [
      "Your baby can't pull to stand or take weight on their legs with support.",
      "They aren't sitting steadily on their own.",
      "There's no babbling — none of those conversational strings of sounds.",
      "They use no gestures at all — no waving, pointing or lifting arms to be picked up — by around 12 months.",
      "They don't respond to their name or to people talking to them.",
      "They don't look for a toy they watched you hide.",
      "They've lost any skill they used to have.",
      "Raise any of these at the review, or book a GP or health visitor chat — early support helps, most concerns melt away on checking, and it is always OK to ask.",
    ],
    sources: [
      {
        title: "Milestones by 1 year",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/1-year.html",
        region: "US",
      },
      {
        title: "NHS vaccinations and when to have them",
        org: "NHS",
        url: "https://www.nhs.uk/vaccinations/nhs-vaccinations-and-when-to-have-them/",
        region: "UK",
      },
      {
        title: "Changes to the childhood vaccination schedule from January 2026",
        org: "UKHSA",
        url: "https://ukhsa.blog.gov.uk/2025/12/30/changes-to-the-childhood-vaccination-schedule-from-january-2026/",
        region: "UK",
      },
      {
        title: "Your baby's health and development reviews",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/height-weight-and-reviews/baby-reviews/",
        region: "UK",
      },
      {
        title: "Infant and young child feeding",
        org: "WHO",
        url: "https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding",
        region: "Global",
      },
      {
        title: "Vitamins for children",
        org: "NHS",
        url: "https://www.nhs.uk/baby/weaning-and-feeding/vitamins-for-children/",
        region: "UK",
      },
    ],
  },
];
