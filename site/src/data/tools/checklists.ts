import type { Source } from "../types";

export interface ChecklistItem {
  text: string;
  note?: string;
}

export interface ChecklistSection {
  heading: string;
  items: ChecklistItem[];
}

export interface Checklist {
  id: string;
  title: string;
  description: string;
  intro: string[];
  sections: ChecklistSection[];
  sources: Source[];
}

export const checklists: Checklist[] = [
  {
    id: "hospital-bag",
    title: "Hospital bag checklist",
    description:
      "Everything worth packing for labour and birth — for you, your baby and your birth partner — based on NHS advice.",
    intro: [
      "The NHS suggests having your bag packed about three weeks before your due date, because babies are not famous for reading calendars. If you're planning a home birth, it's still worth packing one — a just-in-case bag that stays in the cupboard is a lot nicer than a 3am scramble.",
      "You need less than the shops would have you believe. Hospitals provide the medical things; you're mostly packing for comfort, and a birth partner can always be dispatched for anything forgotten. Borrowed or second-hand is perfect for almost all of this.",
      "One honest tip from parents who've been there: pack it as two bags (labour, and after), and put the going-home outfit for the baby somewhere your partner can actually find it.",
    ],
    sections: [
      {
        heading: "The paperwork",
        items: [
          {
            text: "Your maternity notes",
            note: "If your hospital uses a digital notes app, make sure you can log in and your partner knows where to find it.",
          },
          {
            text: "Your birth plan, if you've made one",
            note: "A couple of printed copies save re-explaining things between shift changes. No birth plan is also a perfectly good birth plan.",
          },
          {
            text: "Any hospital letters and your usual medicines",
            note: "Bring regular medication in its original packaging so staff can see what it is.",
          },
          {
            text: "A short list of phone numbers",
            note: "Written down, for when your phone dies at the crucial moment.",
          },
        ],
      },
      {
        heading: "For you, during labour",
        items: [
          {
            text: "Something loose and comfortable to labour in",
            note: "An old nightie or oversized T-shirt you don't mind never seeing again.",
          },
          { text: "Dressing gown and slippers" },
          {
            text: "Warm socks",
            note: "Feet get surprisingly cold in labour. Nobody knows why. Pack socks.",
          },
          {
            text: "Water bottle, ideally with a straw",
            note: "Straws mean you can drink in any position, which matters more than you'd think.",
          },
          { text: "Snacks and drinks to keep your energy up" },
          { text: "Lip balm and hair ties" },
          {
            text: "TENS machine, if you're planning to use one",
            note: "Practise with it beforehand — mid-contraction is not the moment to read instructions.",
          },
          {
            text: "Something to pass the time",
            note: "Music, podcasts, a book — early labour can be long and surprisingly boring.",
          },
          {
            text: "Your own pillow",
            note: "In a coloured pillowcase, so it doesn't get adopted by the hospital.",
          },
        ],
      },
      {
        heading: "For you, after the birth",
        items: [
          {
            text: "Two packets of super-absorbent maternity pads",
            note: "The NHS specifically says two packets. Ordinary sanitary pads won't cut it in the first days.",
          },
          {
            text: "Five or six pairs of big, comfortable knickers",
            note: "Cheap dark ones or disposables — this is not the moment for anything precious.",
          },
          {
            text: "Two or three comfortable bras",
            note: "Nursing bras if you're planning to breastfeed, plus breast pads either way — milk arrives whatever your plans.",
          },
          {
            text: "Front-opening nightwear",
            note: "Easier for feeding and for all the checks in the first day or two.",
          },
          { text: "Wash bag: toothbrush, toothpaste, hairbrush, deodorant, flannel" },
          { text: "A towel", note: "Hospital towels exist, technically." },
          {
            text: "Loose, comfortable going-home clothes",
            note: "You'll still be roughly six-months-pregnant sized, which is simply physics, not a verdict.",
          },
          { text: "Glasses, if you wear contacts", note: "You may not fancy fiddling with lenses." },
        ],
      },
      {
        heading: "For your baby",
        items: [
          {
            text: "Two or three vests and sleepsuits",
            note: "Newborn or first size. Second-hand ones are ideal — they're worn for about a fortnight.",
          },
          { text: "A small pack of newborn nappies" },
          { text: "Cotton wool or fragrance-free wipes" },
          { text: "Two or three muslin squares", note: "The all-purpose tool of new parenthood." },
          { text: "A baby hat" },
          { text: "A blanket or shawl" },
          { text: "Going-home outfit", note: "Plus a snowsuit or pramsuit if it's cold out." },
          {
            text: "Car seat, fitted in the car before the big day",
            note: "If you're going home by car this is a legal requirement, and fitting it for the first time in the hospital car park is nobody's finest hour. Practise in advance.",
          },
        ],
      },
      {
        heading: "For your birth partner",
        items: [
          { text: "Snacks and drinks", note: "Enough to share. Labour wards are not known for their catering." },
          { text: "A change of clothes and basic toiletries" },
          {
            text: "Phone and charger",
            note: "An extra-long charging cable — the socket is never near the chair.",
          },
          { text: "Change or a payment card for parking and vending machines" },
          { text: "Swimwear, if you might get in a birth pool together" },
          { text: "A list of who to tell, and in what order", note: "Grandparents have long memories about this." },
        ],
      },
      {
        heading: "Nice to have, not need to have",
        items: [
          { text: "Eye mask and earplugs", note: "Postnatal wards are many things; quiet is not one of them." },
          { text: "A small fan or water spray" },
          { text: "Slip-on shoes for shuffling to the bathroom" },
          { text: "A carrier bag for laundry" },
          { text: "Headphones" },
          { text: "Something small to celebrate with", note: "The first cup of tea and toast after birth is legendary, but a treat from home doesn't hurt." },
        ],
      },
    ],
    sources: [
      {
        title: "Pack your bag for labour",
        org: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/preparing-for-the-birth/pack-your-bag-for-labour/",
        region: "UK",
      },
      {
        title: "What you will need for your baby",
        org: "NHS",
        url: "https://www.nhs.uk/baby/caring-for-a-newborn/what-you-will-need-for-your-baby/",
        region: "UK",
      },
    ],
  },
  {
    id: "newborn-essentials",
    title: "Newborn essentials: the first six weeks",
    description:
      "What you genuinely need for a new baby — and an honest list of the things you really don't — with safe-sleep guidance from the Lullaby Trust.",
    intro: [
      "Here is the secret the baby shops don't advertise: newborns need very little. Somewhere safe to sleep, milk, nappies, clothes, and you. Almost everything else is optional, and a remarkable amount of it can be borrowed or bought second-hand — babies outgrow things before they wear them out.",
      "The two things worth buying new if you possibly can are the cot mattress (it must be firm, flat and waterproof — if you do reuse one, check it's clean, undamaged and hasn't gone soft or saggy) and the car seat, unless it comes from someone you trust who can promise it's never been in an accident.",
      "We've also included the anti-shopping list at the end: things marketed as essential that most families happily live without. Your bank balance can thank us later.",
    ],
    sections: [
      {
        heading: "Sleep",
        items: [
          {
            text: "A cot, crib or Moses basket in your room",
            note: "The Lullaby Trust advises baby sleeps in the same room as you, day and night naps included, for the first six months.",
          },
          {
            text: "A firm, flat, waterproof mattress that fits with no gaps",
            note: "Firm and completely flat — no raised or cushioned areas. This is the single most important purchase on this list.",
          },
          { text: "Two or three fitted sheets", note: "One on, one in the wash, one for the 3am incident." },
          {
            text: "Lightweight blankets or baby sleeping bags",
            note: "Sleeping bags should be the right size and season rating (tog). Blankets go no higher than the shoulders, tucked in firmly, with baby's feet at the foot of the cot.",
          },
          {
            text: "That's it — and that's deliberate",
            note: "A safer cot is a clear cot. No pillows, no duvets, no cot bumpers, no pods or nests, no wedges or sleep positioners, no weighted blankets, no soft toys. Bare looks boring; boring is safe.",
          },
          {
            text: "A room thermometer (optional but handy)",
            note: "Aim for roughly 16–20°C. Cheap ones work exactly as well as fancy ones.",
          },
        ],
      },
      {
        heading: "Feeding — whichever way you feed",
        items: [
          {
            text: "Muslin squares, more than seems sensible",
            note: "Burp cloth, sun shade, emergency bib, tiny blanket. Universal, whatever your feeding mode.",
          },
          {
            text: "If breastfeeding: nursing bras and breast pads",
            note: "Lanolin nipple cream is a small purchase many people are very glad of in week one.",
          },
          {
            text: "If bottle feeding (expressed milk or formula): four to six bottles with newborn teats",
            note: "Start small — babies can be opinionated about teats, so don't buy twelve of one kind on day one.",
          },
          {
            text: "If bottle feeding: sterilising kit and a bottle brush",
            note: "Cold-water, steam or boiling all work — none is better than the others, so pick whatever suits your kitchen.",
          },
          {
            text: "If formula feeding: first infant milk",
            note: "First infant milk is the only formula babies need for the first year — the 'hungrier baby' and staged varieties are marketing, not medicine.",
          },
          {
            text: "A comfortable feeding spot",
            note: "A chair you like, water and snacks within reach. Feeds are long in the early weeks, however you feed — and however you feed is fine by us.",
          },
        ],
      },
      {
        heading: "Nappies, changing and clothes",
        items: [
          {
            text: "Nappies — expect ten to twelve changes a day at first",
            note: "Don't bulk-buy one size; newborns outgrow them at speed. Reusables are great too, and you can mix and match.",
          },
          { text: "Cotton wool or fragrance-free wipes" },
          { text: "Barrier cream for nappy rash" },
          {
            text: "A changing mat",
            note: "On the floor is genuinely the safest spot — a changing table is a nice-to-have, not a need.",
          },
          {
            text: "About six vests and six sleepsuits",
            note: "Sleepsuits are perfectly good daywear. Nobody is judging a newborn's outfit repetition, least of all the newborn.",
          },
          { text: "A cardigan or two, and a hat for outdoors" },
          {
            text: "A snowsuit or pramsuit for winter babies",
            note: "Take padded suits and coats off before strapping baby into the car seat — thick layers stop the harness working properly.",
          },
        ],
      },
      {
        heading: "Out and about",
        items: [
          {
            text: "A correctly fitted rear-facing car seat",
            note: "A legal requirement for car travel from the very first journey. New, or second-hand only from someone you trust — never one that's been in an accident.",
          },
          {
            text: "A pram, or a sling or carrier — or both",
            note: "Both are widely available second-hand. For slings, keep baby's face visible, close enough to kiss, and their chin off their chest.",
          },
          {
            text: "A changing bag",
            note: "Any bag with pockets is a changing bag if you believe in it.",
          },
          { text: "Rain cover and sun shade for the pram" },
          { text: "A blanket for outings" },
        ],
      },
      {
        heading: "Paperwork and admin (the unglamorous essentials)",
        items: [
          {
            text: "Register the birth",
            note: "Within 42 days in England, Wales and Northern Ireland; 21 days in Scotland. You'll need the birth certificate for almost everything that follows.",
          },
          { text: "Register your baby with your GP surgery", note: "Don't wait for the first sniffle." },
          {
            text: "Claim child benefit",
            note: "Worth doing even if a high income means you'd repay some — it protects National Insurance credits.",
          },
          {
            text: "Keep the red book (or digital ePR) somewhere findable",
            note: "It goes to every midwife, health visitor and GP appointment.",
          },
          { text: "Note your baby's NHS number", note: "It arrives by letter and is handy for appointments." },
        ],
      },
      {
        heading: "Things you probably don't need yet",
        items: [
          { text: "Shoes", note: "They cannot walk. They know this. The shops know this too, and sell the shoes anyway." },
          { text: "A wipe warmer", note: "Room-temperature wipes have never harmed anyone's prospects." },
          { text: "A nappy bin with branded cartridges", note: "An ordinary bin, emptied often, does the same job for free." },
          { text: "A baby bath", note: "The kitchen sink or a washing-up bowl works beautifully for a newborn." },
          { text: "A changing table", note: "The floor is free, and nobody has ever rolled off it." },
          { text: "Special baby towels", note: "Any soft, clean towel is a baby towel." },
          {
            text: "Elaborate cot bedding sets",
            note: "Bumpers, pillows, quilts and matching soft toys look lovely in the catalogue and have no place in a safe cot — see the sleep section above.",
          },
          { text: "Most newborn-size clothing hauls", note: "Some babies skip newborn size entirely. Buy a little, then top up once you've met them." },
        ],
      },
    ],
    sources: [
      {
        title: "What you will need for your baby",
        org: "NHS",
        url: "https://www.nhs.uk/baby/caring-for-a-newborn/what-you-will-need-for-your-baby/",
        region: "UK",
      },
      {
        title: "Keeping a clear cot",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/keeping-a-clear-cot/",
        region: "UK",
      },
      {
        title: "Reduce the risk of sudden infant death syndrome (SIDS)",
        org: "NHS",
        url: "https://www.nhs.uk/baby/caring-for-a-newborn/reduce-the-risk-of-sudden-infant-death-syndrome/",
        region: "UK",
      },
      {
        title: "Register a birth",
        org: "GOV.UK",
        url: "https://www.gov.uk/register-birth",
        region: "UK",
      },
    ],
  },
  {
    id: "travelling-with-baby",
    title: "Travelling with a baby",
    description:
      "From the first day trip to the first holiday abroad: documents, feeding on the move, safe sleep away from home, and what goes in the first-aid kit.",
    intro: [
      "Travelling with a baby is entirely doable — it's just that spontaneity now requires planning. The good news: babies are surprisingly portable, don't complain about the itinerary, and travel free or nearly free on most transport.",
      "The trick is that the kit matters less than a handful of safety basics: the same safer-sleep rules apply on holiday as at home, sun protection is non-negotiable, and the car seat rules travel with you. Get those right and everything else is just logistics and snacks.",
      "Start with a day trip or a night away before attempting anything with a boarding pass. It's a gentle dress rehearsal, and you'll find out what you actually use versus what you heroically carried around all day.",
    ],
    sections: [
      {
        heading: "The day-trip bag (your training ground)",
        items: [
          { text: "More nappies than seems reasonable, plus wipes and bags", note: "A rough rule: one nappy per hour out, then add two." },
          { text: "A portable changing mat", note: "Or a folded muslin over whatever surface fate provides." },
          { text: "A full change of clothes for the baby", note: "And a spare top for you. Experienced parents pack the spare top first." },
          { text: "Feeding kit for however you feed", note: "See the feeding section below." },
          { text: "Muslins, a blanket, and one small toy" },
          { text: "Snacks and water for the grown-ups", note: "A hungry parent is a logistical hazard." },
        ],
      },
      {
        heading: "Documents for going further afield",
        items: [
          {
            text: "A passport for your baby",
            note: "Babies need their own passport — apply well ahead, as it can take several weeks. Helpfully, under-ones are allowed to have their eyes closed in the photo.",
          },
          {
            text: "GHIC or EHIC cards for travel in Europe",
            note: "Free to get, and your baby needs their own.",
          },
          { text: "Travel insurance that covers the baby", note: "Usually free to add to a family policy — but do actually add them." },
          {
            text: "A vaccine check-in with your GP or practice nurse",
            note: "Well before you go: routine jabs up to date, plus anything extra for your destination.",
          },
          {
            text: "Your airline's infant rules, read in advance",
            note: "Minimum ages (often around two weeks, sometimes with a doctor's letter for very new babies), baggage allowances for prams and car seats — they vary more than you'd expect.",
          },
        ],
      },
      {
        heading: "Feeding on the move",
        items: [
          {
            text: "If breastfeeding: nowhere is off limits",
            note: "You're legally protected feeding your baby anywhere in the UK, and it's welcomed on planes — no kit required, which is the ultimate packing hack.",
          },
          {
            text: "If formula feeding: ready-to-feed cartons",
            note: "Pricier per feed but gloriously simple when travelling — no powder, no faff, no hot water hunt.",
          },
          {
            text: "Baby milk and food are exempt from the 100ml hand-luggage rule",
            note: "Carry what you need for the journey; expect it to be screened separately at security.",
          },
          { text: "Sterilising bags or cold-water tablets for travel", note: "Light, cheap, and work in any hotel sink." },
          { text: "Bibs, muslins and a sealable bag for the aftermath" },
          {
            text: "Feed (or offer a dummy) during take-off and landing",
            note: "Sucking helps tiny ears cope with the pressure change.",
          },
        ],
      },
      {
        heading: "Sleep away from home",
        items: [
          {
            text: "A travel cot with a firm, flat mattress — or check what's provided",
            note: "The safer-sleep rules come on holiday too: baby on their back, in a clear cot, same room as you. Ring ahead to check the cot the hotel provides is sound.",
          },
          { text: "Familiar sheets and their usual sleeping bag", note: "Home smells are surprisingly persuasive at bedtime." },
          {
            text: "Something for blackout",
            note: "A travel blackout blind, or the time-honoured towel over the curtain rail.",
          },
          {
            text: "Don't let the car seat become the bed",
            note: "Car seats are for travel, not routine sleep. When you arrive, move a sleeping baby to a flat surface — yes, even though it risks waking them. We know. We're sorry.",
          },
          { text: "Keep the routine loose", note: "Holiday naps happen in prams and slings, and that's fine. Aim for familiar, not identical." },
        ],
      },
      {
        heading: "Cars and planes",
        items: [
          {
            text: "A correctly fitted rear-facing car seat",
            note: "UK law requires a proper child seat until 12 years or 135cm, and babies stay rear-facing until at least 15 months in i-Size seats. Never put a rear-facing seat in front of an active airbag.",
          },
          {
            text: "Check the car seat situation at your destination",
            note: "Hiring a car abroad? Book the seat ahead or bring your own — taxis and transfers often have nothing suitable.",
          },
          {
            text: "On long drives, stop every couple of hours",
            note: "A feed, a change and a stretch out of the seat — long unbroken stints in a car seat aren't good for little ones.",
          },
          { text: "Never leave your baby alone in the car", note: "Not even for two minutes; cars heat up frighteningly fast." },
          {
            text: "On planes: book the bassinet row early if you'd like one",
            note: "Under-twos usually fly on your lap with an infant seatbelt; some airlines let you buy a seat and use an approved car seat instead.",
          },
          { text: "A full change of clothes in hand luggage — for baby and for you", note: "Turbulence and nappies are old friends." },
        ],
      },
      {
        heading: "First aid, sun and heat",
        items: [
          {
            text: "Infant paracetamol or ibuprofen suspension",
            note: "Age-appropriate, with the dosing syringe — check the pack for your baby's age and never exceed the stated dose.",
          },
          { text: "A digital thermometer" },
          { text: "Oral rehydration sachets", note: "Ask your pharmacist which are suitable for babies." },
          { text: "Plasters, barrier cream, saline drops, and any regular medicines" },
          {
            text: "Keep babies under six months out of direct sunlight entirely",
            note: "NHS advice is firm on this — shade, cover, and a wide-brimmed hat are their sunscreen.",
          },
          {
            text: "For babies over six months: SPF 30+ with 4-star UVA, hat, shade in the middle of the day",
            note: "Reapply often, and keep them out of the sun between 11am and 3pm.",
          },
          { text: "In the heat: extra feeds and a cool room for sleep", note: "Babies can't tell you they're thirsty, but they will tell you loudly about everything else." },
        ],
      },
    ],
    sources: [
      {
        title: "Get a child passport",
        org: "GOV.UK",
        url: "https://www.gov.uk/get-a-child-passport",
        region: "UK",
      },
      {
        title: "Child car seats: the law",
        org: "GOV.UK",
        url: "https://www.gov.uk/child-car-seats-the-rules",
        region: "UK",
      },
      {
        title: "Safer sleep on holiday",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/travel-and-weather/safer-sleep-on-holiday/",
        region: "UK",
      },
      {
        title: "Sunscreen and sun safety",
        org: "NHS",
        url: "https://www.nhs.uk/live-well/seasonal-health/sunscreen-and-sun-safety/",
        region: "UK",
      },
    ],
  },
  {
    id: "school-readiness",
    title: "Starting school: getting ready for reception",
    description:
      "The skills that genuinely help a four-year-old settle into school — and a reassuring list of the things schools absolutely do not expect.",
    intro: [
      "Let's start with the most important thing: your child does not need to read, write or recite times tables before starting school. Teaching those things is literally the school's job, and reception teachers are very good at it. What actually helps is the everyday stuff — coats, toilets, taking turns, and saying how they feel.",
      "The Starting Reception guidance, developed by a coalition of early years organisations including Coram PACEY, frames readiness around four friendly ideas: growing independence, building relationships, physical development and healthy routines. Every one of them is built through ordinary family life, not flashcards.",
      "And a gentle truth for the grown-ups: no four-year-old arrives with all of this mastered. These are things to practise together over the summer, not a pass-or-fail exam. Schools expect wobbles — they've seen thousands of them.",
    ],
    sections: [
      {
        heading: "Looking after themselves",
        items: [
          {
            text: "Using the toilet independently",
            note: "Including wiping, flushing and washing hands. Accidents still happen in reception and schools are entirely unfazed by them.",
          },
          {
            text: "Putting on their own coat and having a go at the zip",
            note: "Have a go being the operative phrase. Zips are hard; effort counts.",
          },
          {
            text: "Getting shoes on — roughly the right feet",
            note: "Velcro shoes are a gift to reception teachers and parents alike. Save the laces lesson for later years.",
          },
          {
            text: "Opening everything in their own lunchbox",
            note: "Do a full dress rehearsal with the actual lunchbox: yoghurt tubes, wrappers, that impregnable cheese. Adjust the menu accordingly.",
          },
          { text: "Using a knife and fork, more or less" },
          { text: "Blowing their nose and covering coughs", note: "Aspirationally, at least." },
        ],
      },
      {
        heading: "Feelings and friends",
        items: [
          {
            text: "Saying how they feel in simple words",
            note: "Early years teachers rate this above any academic skill. 'I'm sad' or 'I need help' will carry them further than knowing the alphabet.",
          },
          { text: "Taking turns and sharing", note: "Sometimes. With support. Perfection not required — this is a lifelong project." },
          {
            text: "Separating from you with support",
            note: "Practise short, happy goodbyes — a stay with grandparents, a friend's house, a settling-in session. Leaving confidently is a skill like any other.",
          },
          { text: "Asking an adult for help" },
          { text: "Following simple instructions", note: "Two steps is plenty: 'Coat on, then line up.'" },
          { text: "Playing alongside and with other children" },
        ],
      },
      {
        heading: "Practical prep (the boring-but-useful bit)",
        items: [
          {
            text: "Uniform your child can manage alone",
            note: "Elasticated waists and velcro shoes beat smart buttons every time. They will be changing for PE in a room with 29 other four-year-olds.",
          },
          {
            text: "Name labels on absolutely everything",
            note: "Both shoes, the water bottle, every jumper. School jumpers migrate like wildebeest; labels are how they find their way home.",
          },
          { text: "A book bag and water bottle they recognise as theirs" },
          { text: "Practise the school run", note: "Walk or drive the route a few times so the first morning holds no surprises." },
          { text: "Go to the settling-in sessions if offered" },
          { text: "Arrange a playdate with a future classmate if you can", note: "One familiar face in the playground works wonders. This one's optional — friendships form fast regardless." },
        ],
      },
      {
        heading: "Routines that help",
        items: [
          { text: "Edge bedtime earlier a few weeks before term", note: "School is astonishingly tiring — the first half-term runs on early nights." },
          { text: "Do a few morning dry-runs", note: "Dressed, fed and out by school time. Discover the bottlenecks now, while the stakes are toast-based." },
          { text: "Build a breakfast habit", note: "Whatever they'll reliably eat. Fed is best here too." },
          {
            text: "Talk about school warmly and honestly",
            note: "Excitement is great; relentless hype can backfire. 'Some bits will be new and your teacher will help' is honest and calming.",
          },
          { text: "Share books together every day", note: "For the love of stories, not for phonics. Being read to is the best pre-reading there is." },
        ],
      },
      {
        heading: "What schools do NOT expect",
        items: [
          { text: "Reading or writing", note: "Genuinely not. Recognising their own name is a bonus, not a requirement." },
          { text: "Counting to 100, or indeed to 20" },
          { text: "A perfect pencil grip", note: "Playdough, threading and climbing build those hands better than worksheets." },
          { text: "Sitting still for long stretches", note: "Reception is built around play and movement, because teachers know exactly what four-year-olds are." },
          { text: "Tying shoelaces", note: "See: velcro, humanity's finest invention." },
          { text: "Dry nights", note: "Night-time dryness comes much later for many children and has nothing to do with school readiness." },
          {
            text: "A child who never cries at drop-off",
            note: "Or a parent who doesn't. Teachers have seen everything; most tears (theirs and yours) stop within minutes of the door closing.",
          },
        ],
      },
    ],
    sources: [
      {
        title: "Starting Reception: helping your child get ready for school",
        org: "Starting Reception (early years coalition)",
        url: "https://startingreception.co.uk/",
        region: "UK",
      },
      {
        title: "Being school-ready",
        org: "Coram PACEY",
        url: "https://www.corampacey.org.uk/being-school-ready/",
        region: "UK",
      },
    ],
  },
];
