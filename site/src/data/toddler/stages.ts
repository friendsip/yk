/**
 * Toddler stage-by-stage guide, 12–36 months.
 *
 * Ages are completed weeks since birth (see types.ts). Milestone ages and
 * referral thresholds checked against CDC "Learn the Signs. Act Early."
 * (2022 revision), NHS, AAP/HealthyChildren.org, Raising Children Network,
 * Zero to Three, Speech and Language UK and ASHA — see sources per stage.
 * Milestones are ranges, not deadlines.
 */

import type { ToddlerStage } from "../types";

export const toddlerStages: ToddlerStage[] = [
  {
    id: "12-15-months",
    label: "12–15 months",
    title: "Hello, toddler: cruising, pointing and almost-words",
    ageWeeksFrom: 52,
    ageWeeksTo: 64,
    summary:
      "Your baby is officially a toddler — even if they're not toddling yet. This stage is all about pulling up, cruising, pointing at everything, and the very first almost-words.",
    expect: [
      {
        heading: "Moving: from cruising to (maybe) first steps",
        paragraphs: [
          "Most children this age are pulling up to stand and cruising along the furniture. Some take their first wobbly independent steps now; plenty of others wait several more months.",
          "First steps anywhere from around 9 to 18 months are within the normal range, so try not to compare notes at playgroup too anxiously. By 15 months, many toddlers can take a few steps on their own — arms up, legs wide, sitting down with a bump.",
          "Falling over constantly is not a problem to fix. It's how walking is learned, and nappies make surprisingly good crash padding.",
        ],
      },
      {
        heading: "Talking and understanding",
        paragraphs: [
          "You might hear \"mama\" or \"dada\" used to mean you, plus one or two almost-words — \"ba\" for ball counts. What they understand is far ahead of what they can say: they'll pause at \"no\", look at familiar things you name, and follow simple requests when you add a gesture.",
          "Pointing is the big news. Around now toddlers start pointing to ask for things or to get your help, and this shared looking-together is the engine that drives language.",
          "When they point and you name what they're pointing at, you're teaching vocabulary in exactly the way small brains like it.",
        ],
      },
      {
        heading: "Feelings and being with you",
        paragraphs: [
          "Separation anxiety is often strong at this age — crying when you leave the room, wariness of people they don't see often. The NHS notes it's common from around 6 months to 3 years, and it's actually a sign of how well they're attached to you.",
          "You'll also see lovely social moments: waving bye-bye, clapping when excited, holding up a toy just to show you. Showing you things is their first way of saying \"look at this — isn't it great?\"",
        ],
      },
      {
        heading: "Eating and sleep",
        paragraphs: [
          "Toddlers this age are moving onto chopped-up family food, feeding themselves with their fingers and practising with an open cup (expect spillage — it's a skill, not a mess). In the UK, whole cows' milk can be a main drink from 12 months.",
          "Growth slows after the first birthday, so appetite often visibly dips. A toddler who is active, gaining weight and generally well is getting enough, even when a meal is three peas and a breadstick.",
          "Many toddlers still nap twice a day and start squeezing towards one longer nap somewhere in the months ahead. Night waking is still very common in the second year — you're not doing anything wrong.",
        ],
      },
    ],
    encourage: [
      {
        heading: "Talk back and forth (serve and return)",
        paragraphs: [
          "Notice what they're looking or pointing at, and name it — \"Bus! A big red bus.\" Short, simple sentences beat long explanations at this age.",
          "Narrate ordinary life while you do it: getting dressed, making tea, unpacking shopping. To your toddler, you are the most interesting thing in the world, and everyday chat is exactly how words go in.",
          "Songs with actions — pat-a-cake, row-the-boat — are language lessons dressed up as fun.",
        ],
      },
      {
        heading: "Give them room to move",
        paragraphs: [
          "Barefoot cruising time on a safe floor does more for walking than anything you can buy. A sturdy push-along trolley or box to shove around the room is a happy bonus.",
          "Resist the urge to rescue every wobble. Staying close and cheering the attempt teaches them that trying is the point.",
        ],
      },
      {
        heading: "Let them try it themselves (a bit)",
        paragraphs: [
          "Finger foods they can manage, a spoon to wave even if most of it misses, a cup they hold with your hands nearby. Doing it themselves is slower and messier — and it's how competence grows.",
          "Where you can, offer one small choice: \"banana or toast?\" Tiny decisions feel wonderful when you're one.",
        ],
      },
    ],
    games: [
      {
        name: "Tower up, knock down",
        how: "Stack blocks or cups into a tower and let them demolish it, over and over. You can play this entire game without leaving the sofa cushion you're slumped on.",
        parentEnergy: "low",
      },
      {
        name: "Where's it gone?",
        how: "Hide a toy under a cup or blanket while they watch, then ask \"where's it gone?\" and let them find it. Finding hidden things is a real cognitive milestone dressed as a game.",
        parentEnergy: "low",
      },
      {
        name: "Point-and-name safari",
        how: "Sit by the window or with a chunky picture book and name whatever they point at. Follow their interest rather than steering it — that's the whole trick.",
        parentEnergy: "low",
      },
      {
        name: "Pots-and-spoons band",
        how: "Hand over a saucepan and a wooden spoon on the kitchen floor while you sit with your cup of tea. Loud, yes, but it buys you ten minutes and they adore it.",
        parentEnergy: "low",
      },
      {
        name: "Roll it back",
        how: "Sit on the floor legs apart and roll a ball between you. It's their first taste of taking turns, and you barely have to move.",
        parentEnergy: "low",
      },
      {
        name: "Cushion mountain",
        how: "Pile sofa cushions on the floor and let them clamber over while you spot them. Climbing practice with a soft landing.",
        parentEnergy: "medium",
      },
    ],
    dontWorry: [
      "Not walking yet — first steps anywhere up to around 18 months are within the normal range, and later walkers catch up just fine.",
      "Hardly any clear words — at this age understanding matters more than speaking, and \"ba\" for ball absolutely counts.",
      "Clingier than ever — separation anxiety is a sign of a strong bond, not of spoiling, and it fades as they learn you always come back.",
      "Eating much less than before — growth slows after the first year, so a smaller appetite is expected.",
      "Still waking at night — very common in the second year, and not a reflection on your parenting.",
      "Falling over dozens of times a day — that's simply what learning to walk looks like.",
    ],
    watchFor: [
      "Not able to bear weight on their legs or pull up to stand by around 12–15 months — mention it to your health visitor or GP (or your doctor at the 12- or 15-month checkup in the US).",
      "No gestures at all — no waving, reaching up or pointing — by around 15 months is worth a conversation.",
      "Doesn't seem to respond to their name or to familiar words — ask about a hearing check, which is often the first simple step.",
      "Doesn't look at you, share smiles or show you things — you know your child best, and it's always OK to ask.",
      "Loses words or skills they used to have, at any age — always worth discussing promptly with your doctor or health visitor.",
    ],
    sources: [
      {
        title: "Important milestones: your baby by one year",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/1-year.html",
        region: "US",
      },
      {
        title: "Important milestones: your child by 15 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/15-months.html",
        region: "US",
      },
      {
        title: "First words: 1 to 2 years (Best Start in Life)",
        org: "NHS",
        url: "https://www.nhs.uk/best-start-in-life/toddler/learning-to-talk/first-words-and-little-sentences-1-to-2-years/",
        region: "UK",
      },
      {
        title: "Separation anxiety",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/behaviour/separation-anxiety/",
        region: "UK",
      },
      {
        title: "Toddler development at 12–15 months",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/toddlers/development/development-tracker-1-3-years/12-15-months",
        region: "Australia",
      },
    ],
  },
  {
    id: "15-18-months",
    label: "15–18 months",
    title: "Off they go: steadier steps and words on the way",
    ageWeeksFrom: 65,
    ageWeeksTo: 77,
    summary:
      "Walking usually clicks into place in this window, words start trickling in, and your toddler discovers both independence and how much they hate you leaving the room — often in the same hour.",
    expect: [
      {
        heading: "Moving: finding their feet",
        paragraphs: [
          "Somewhere in these months most toddlers go from tentative steps to proper walking — by 18 months the majority walk without holding on to anyone or anything. Then they immediately raise the stakes: climbing onto the sofa, carrying toys around, stooping to inspect crumbs.",
          "Hands are busy too. Expect scribbling with a chunky crayon, feeding themselves with fingers, first attempts with a spoon and drinking from an open cup with only moderate flooding.",
        ],
      },
      {
        heading: "Talking and understanding",
        paragraphs: [
          "Words tend to arrive in a slow trickle before the flood. By around 18 months, many toddlers are trying to say three or more words besides \"mama\" and \"dada\", and understanding is racing ahead — they can follow a simple instruction like \"give it to me\" without you pointing.",
          "Look out for a lovely change in pointing: not just pointing to ask for things, but pointing to show you something interesting. That sharing-for-its-own-sake is a really encouraging sign of social development.",
          "Speech and Language UK notes toddlers this age often learn one or two new words a week — the pace picks up dramatically later, so a modest word count now is nothing to panic about.",
        ],
      },
      {
        heading: "Feelings and behaviour",
        paragraphs: [
          "Separation anxiety often peaks at around 18 months — clinging at nursery drop-off, protesting when you so much as visit the loo alone. It usually starts to settle over the months after, as they learn from experience that you come back.",
          "The first tantrums often appear around 18 months too. Wanting things they can't have or say, plus a brain that can't yet hit the brakes, equals meltdown — it's development, not defiance.",
          "On the sweeter side: your toddler will shadow you and copy your chores, sweeping and wiping alongside you. Copying you is both play and their favourite way of learning.",
        ],
      },
      {
        heading: "Eating and sleep",
        paragraphs: [
          "Fussiness about food often begins to show around now, and it's a normal phase rather than a verdict on your cooking. Keep offering variety without pressure — it can take many relaxed offers before a new food is accepted.",
          "Many toddlers drop to one nap somewhere around this age, usually a longer early-afternoon sleep. The transition weeks can be scratchy — an earlier bedtime helps bridge the gap.",
        ],
      },
    ],
    encourage: [
      {
        heading: "Respond to their pointing, add a word",
        paragraphs: [
          "When they point, name it and add one small detail: \"Dog! A woofy dog.\" You're answering the exact question their brain just asked.",
          "Keep sharing books — even just looking at a few pages together counts. Naming pictures, doing the animal noises and letting them turn pages all build language.",
        ],
      },
      {
        heading: "Give them little jobs",
        paragraphs: [
          "Toddlers this age love to help: fetching their shoes, putting a sock in the wash basket, holding the (unbreakable) things. It's slower than doing it yourself, but it feeds their independence and their vocabulary at once.",
          "Let them help dress themselves — an arm pushed through a sleeve is genuine teamwork at 17 months.",
        ],
      },
      {
        heading: "Keep goodbyes short and warm",
        paragraphs: [
          "At peak separation-anxiety age, long lingering farewells tend to make things harder. A consistent, cheerful routine — hug, same goodbye phrase, go — helps them learn that partings are safe and you always return.",
          "If drop-offs are tearful, take heart: most children settle quickly once you've gone, and you can always ask the staff how long it really lasts.",
        ],
      },
    ],
    games: [
      {
        name: "Fetch the teddy",
        how: "From your armchair, send them on missions: \"Can you bring me teddy? Now your cup!\" It practises understanding instructions and uses up toddler energy while you use none.",
        parentEnergy: "low",
      },
      {
        name: "Chores theatre",
        how: "Give them a cloth or small brush while you tidy up, and narrate as you both \"work\". They were going to copy you anyway — this way it counts as playing together.",
        parentEnergy: "low",
      },
      {
        name: "Body-part bingo",
        how: "Ask \"where's your nose?\" and cheer when they find it, then work through toes, ears and tummy. Songs like Heads, Shoulders, Knees and Toes do the job with a tune.",
        parentEnergy: "low",
      },
      {
        name: "Scribble side by side",
        how: "Tape scrap paper to the floor or high chair tray and share some chunky crayons. You draw a cat badly; they add abstract flair.",
        parentEnergy: "low",
      },
      {
        name: "Teddy's tea party",
        how: "Give teddy a pretend drink from a cup, then hand it over and watch them copy. This is pretend play just beginning — one of the loveliest milestones to witness.",
        parentEnergy: "low",
      },
      {
        name: "Stair mountaineering",
        how: "Supervised stair-climbing practice with you right behind them. More effort for you, but stairs fascinate this age group and practice makes them safer.",
        parentEnergy: "medium",
      },
    ],
    dontWorry: [
      "Not walking at 15 or 16 months — plenty of perfectly typical children start close to 18 months.",
      "A word count you can tally on one hand — the talking explosion for most children comes later, and understanding is the better guide right now.",
      "Sobbing at drop-off — around 18 months is the recognised peak for separation anxiety, and it usually eases from here.",
      "First proper tantrums — they typically start around 18 months and are a normal stage of development, not a sign of bad behaviour or bad parenting.",
      "Living on the same four foods — fussy phases are extremely common; keep calmly offering variety alongside the favourites.",
      "No interest in playing with other children — playing alongside rather than with others is exactly right for this age.",
    ],
    watchFor: [
      "Not walking by 18 months — bring it up with your health visitor or GP (UK) or your doctor at the 18-month checkup (US); it often turns out fine, but it's the standard point to check.",
      "No single words besides \"mama\" or \"dada\" by around 18 months — worth discussing, and a hearing check is often the useful first step.",
      "Not pointing to show you things, or not following your point, by around 18 months.",
      "Doesn't follow simple one-step instructions or doesn't seem to understand familiar words.",
      "Rarely looks to share a smile or check in with you from across the room — mention it; the 18-month checkup in the US includes a development and autism screening questionnaire for exactly these conversations.",
      "Loses words or skills they used to have, at any age — always worth a prompt conversation with your doctor or health visitor.",
    ],
    sources: [
      {
        title: "Important milestones: your child by 18 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/18-months.html",
        region: "US",
      },
      {
        title: "Ages and stages: 12–18 months",
        org: "Speech and Language UK",
        url: "https://speechandlanguage.org.uk/help-for-families/ages-and-stages/12-18-months/",
        region: "UK",
      },
      {
        title: "Toddler development at 15–18 months",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/toddlers/development/development-tracker-1-3-years/15-18-months",
        region: "Australia",
      },
      {
        title: "Temper tantrums",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/behaviour/temper-tantrums/",
        region: "UK",
      },
      {
        title: "Separation anxiety",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/behaviour/separation-anxiety/",
        region: "UK",
      },
    ],
  },
  {
    id: "18-24-months",
    label: "18–24 months",
    title: "Running, climbing and the great word explosion",
    ageWeeksFrom: 78,
    ageWeeksTo: 103,
    summary:
      "Words often take off spectacularly in this stretch, walking becomes running and climbing, and the tantrum era arrives in earnest. It's exhilarating and exhausting — frequently before breakfast.",
    expect: [
      {
        heading: "Moving: running and climbing everything",
        paragraphs: [
          "Walking turns into a stiff-legged run, and climbing becomes a life mission — sofa, stairs, you. By around 2, most toddlers can run, kick a ball and walk up a few stairs with a hand or rail.",
          "This is the age of supervising with your heart in your mouth. Making the environment safe to explore beats constant \"no\" — for their learning and your vocal cords.",
        ],
      },
      {
        heading: "Talking: the naming explosion",
        paragraphs: [
          "Many toddlers go from a handful of words to dozens in what feels like weeks — Raising Children notes anywhere from about 20 to 100 words by 18 months, with new ones arriving almost daily after that. Around the second birthday, most start putting two words together: \"more milk\", \"daddy gone\".",
          "Understanding grows even faster — by 2 they typically understand around 200 words and simple questions like \"where's your shoe?\".",
          "Don't expect clarity: families usually understand about half of what their toddler says at this stage, and strangers understand less. You are the official interpreter, and that's completely normal.",
        ],
      },
      {
        heading: "Feelings: why toddler brains melt down",
        paragraphs: [
          "Here's the tantrum arc in plain English: your toddler now has big desires and big feelings, but the part of the brain that manages impulses and puts on the brakes is barely built — Zero to Three notes real impulse control doesn't come in until around 3½ to 4. When feelings outrun words, the system overloads. That's a tantrum.",
          "They genuinely can't calm themselves down yet, so they borrow your calm — this is co-regulation. Staying nearby, keeping your voice low, using few words and offering comfort once the storm passes teaches their brain, rep by rep, how calming down works.",
          "Around other children, expect parallel play — happily alongside, not really with. Sharing is a skill for later; guarding their snacks like treasure is standard for now.",
        ],
      },
      {
        heading: "Eating and sleep",
        paragraphs: [
          "Fussy eating often peaks around 2 — the NHS notes up to a third of 2-year-olds could be described as fussy eaters. If your toddler is active, growing and well, they're getting enough, even on a diet that appears to be 90% toast.",
          "Most toddlers are on one nap now, and 1–2 year olds need roughly 11–14 hours of sleep in 24, naps included. Night waking still happens for many — frustrating, common, and not a failure of anyone involved.",
        ],
      },
    ],
    encourage: [
      {
        heading: "Add a word to theirs",
        paragraphs: [
          "When they say \"dog\", answer \"big dog!\" — repeating their word and adding one more is a simple, well-evidenced way to grow sentences. Speech therapists call it expansion; toddlers call it a conversation.",
          "Keep narrating everyday life and reading together most days, even five minutes. Naming things in books when they point is word-learning gold.",
        ],
      },
      {
        heading: "Ride the tantrum with them",
        paragraphs: [
          "Head some off at the pass: tantrums thrive on hunger, tiredness and abrupt transitions, so snacks, naps and a \"two more minutes, then home\" warning genuinely help.",
          "Mid-tantrum, less is more. Stay close, stay calm (or act it — that counts), keep them safe, and skip the reasoning until the storm passes. Afterwards, reconnect with a cuddle and a simple name for the feeling: \"You were so cross.\"",
          "Try to hold the line on whatever sparked it — giving in teaches that tantrums work. And if you handle one badly, welcome to the club; the next one is along shortly for another go.",
        ],
      },
      {
        heading: "Let them try, offer small choices",
        paragraphs: [
          "\"Me do it\" energy is rocket fuel — let them try the spoon, the shoes, the sock, and budget the extra minutes where you can. Competence and confidence are built exactly here.",
          "Offer two acceptable choices — \"red cup or blue cup?\" — so they get a taste of control inside limits you've set. It defuses a surprising number of battles.",
        ],
      },
    ],
    games: [
      {
        name: "Bubble stomp",
        how: "Blow bubbles from your chair and let them chase and stomp. Maximum toddler output for minimum parental input — the dream ratio.",
        parentEnergy: "low",
      },
      {
        name: "Sofa-cushion obstacle course",
        how: "Line up cushions to climb over and gaps to step across while you referee from the sofa. Rearrange occasionally to look involved.",
        parentEnergy: "low",
      },
      {
        name: "Animal noises quiz",
        how: "Make a moo, a woof, a meow and let them name the animal or find it in a book — then swap roles. Excellent from a horizontal position.",
        parentEnergy: "low",
      },
      {
        name: "Sock sorting",
        how: "Tip out the odd-sock basket and hunt for pairs together — big socks, little socks, daddy's socks. Matching and naming, disguised as helping.",
        parentEnergy: "low",
      },
      {
        name: "Where's teddy hiding?",
        how: "Hide teddy somewhere easy — behind a cushion, under the table — and hunt together with dramatic suspense. Hiding it while they watch is, at this age, still a great game.",
        parentEnergy: "low",
      },
      {
        name: "Kick and chase",
        how: "A soft ball, a hallway or patch of garden, and some enthusiastic kicking practice. This one does require you upright, but it's mercifully brief.",
        parentEnergy: "medium",
      },
    ],
    dontWorry: [
      "A word count that seems behind a friend's child — vocabulary at this age ranges enormously, from about 20 words to well over 100 at 18 months.",
      "Strangers understanding little of what they say — families catching about half is right on track for this stage.",
      "Tantrums, even spectacular public ones — they're a sign of a normally developing brain that can't yet manage big feelings, not of bad parenting.",
      "Playing next to other children rather than with them — parallel play is exactly what this age is supposed to look like.",
      "A beige, repetitive diet — up to a third of 2-year-olds are fussy eaters, and an active, growing, generally well toddler is getting enough.",
      "Deep attachment to a dummy, blanket or bear — comfort objects are normal and genuinely help little ones manage big days.",
      "Still waking at night — extremely common well into toddlerhood.",
    ],
    watchFor: [
      "No clear single words by around 18 months — talk to your health visitor or GP, and ask about a hearing check as a first step.",
      "Fewer than about 25 words, or no two-word combinations like \"more milk\", by around the second birthday — worth discussing (in many UK areas you can also self-refer to children's speech and language therapy).",
      "Not walking by 18 months, or persistent walking only on tiptoes — have it checked.",
      "Not pointing to show you interesting things, or not bringing objects over to share — mention it to your doctor or health visitor.",
      "Doesn't follow simple instructions or seem to understand familiar words and names.",
      "In the US, the 18- and 24-month well-child visits include development and autism screening questionnaires — an ideal moment to raise anything on this list.",
      "Loses words or skills they once had, at any age — always worth discussing promptly.",
    ],
    sources: [
      {
        title: "Important milestones: your child by two years",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/2-years.html",
        region: "US",
      },
      {
        title: "Ages and stages: 18–24 months",
        org: "Speech and Language UK",
        url: "https://speechandlanguage.org.uk/help-for-families/ages-and-stages/18-24-months/",
        region: "UK",
      },
      {
        title: "Toddler development at 18–24 months",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/toddlers/development/development-tracker-1-3-years/18-24-months",
        region: "Australia",
      },
      {
        title: "Toddler tantrums 101: why they happen and what you can do",
        org: "Zero to Three",
        url: "https://www.zerotothree.org/resource/toddler-tantrums-101-why-they-happen-and-what-you-can-do/",
        region: "US",
      },
      {
        title: "Fussy eaters",
        org: "NHS",
        url: "https://www.nhs.uk/baby/weaning-and-feeding/fussy-eaters/",
        region: "UK",
      },
      {
        title: "Sleep and young children",
        org: "NHS",
        url: "https://www.nhs.uk/baby/health/sleep-and-young-children/",
        region: "UK",
      },
    ],
  },
  {
    id: "24-30-months",
    label: "2 to 2½ years",
    title: "Little sentences, big feelings",
    ageWeeksFrom: 104,
    ageWeeksTo: 129,
    summary:
      "Two-word phrases stretch into little sentences, pretend play blooms into whole storylines, and questions about potties and big beds appear on the horizon — with no need to rush either.",
    expect: [
      {
        heading: "Talking: sentences under construction",
        paragraphs: [
          "By around 2½, most toddlers say roughly 50 words or more and combine them with action words — \"doggie run\", \"me do it\" — along with \"I\", \"me\" and \"we\". They'll name things in books when you point and ask \"what's this?\".",
          "Understanding is well ahead: typically at least 300 words by this stage, including longer instructions like \"put daddy's cup on the table\".",
          "Clarity is still a work in progress. Speech is getting clearer but often isn't understandable to people who don't know your child — familiar adults understand far more than strangers do, and that's expected.",
        ],
      },
      {
        heading: "Moving and doing",
        paragraphs: [
          "Expect confident running, jumping with both feet off the ground, and hands that can twist doorknobs and unscrew lids — adjust your cupboard security accordingly.",
          "Self-care skills are sprouting: taking off loose clothes, eating with a spoon well, helping enthusiastically (if approximately) with dressing.",
        ],
      },
      {
        heading: "Playing and feeling",
        paragraphs: [
          "Pretend play blooms now — feeding a doll, cooking invisible dinners, putting teddy to bed. It looks like sweetness (it is), and it's also serious cognitive work.",
          "Around other children you'll see playing alongside, with occasional real moments of playing together. \"Look at me!\" becomes a catchphrase — showing off to you is how they bank confidence.",
          "Tantrums continue, because impulse control is still years from finished. Your calm presence remains the main tool; nobody has invented a better one.",
        ],
      },
      {
        heading: "Everyday life: potty, bed and the UK review",
        paragraphs: [
          "Toilet training comes into view somewhere between 18 months and 3 years, and around 2 to 2½ is a common time to start. Helpful signs include staying dry for an hour or two, noticing when they're doing a wee or poo, and being able to sit on a potty and get up again — though experts differ on how much to wait for \"readiness\" versus gently preparing early, so trust your read of your own child.",
          "Still in a cot? No hurry — most children move to a bed between 2 and 3, and staying longer is fine if they're happy and not climbing out.",
          "In the UK, you'll be offered a health visitor review between 2 and 2½, usually with an ASQ-3 questionnaire covering movement, speech, behaviour and more — a relaxed chance to raise anything. In the US, the 24- and 30-month well-child visits cover the same ground.",
        ],
      },
    ],
    encourage: [
      {
        heading: "Stretch their sentences",
        paragraphs: [
          "Echo their two words back as three or four: \"Daddy gone\" becomes \"Yes — daddy's gone to work.\" Then pause; toddlers need a surprising amount of time to assemble a reply, and the wait is where the practice happens.",
          "Keep reading together daily if you can, and let them \"read\" to you — naming pictures, finishing familiar lines, turning pages. Repetition of the same beloved book is a feature, not a bug.",
        ],
      },
      {
        heading: "Feed the pretending",
        paragraphs: [
          "Join the tea party, eat the invisible cake, be the patient when the doctor calls. Five minutes of joining their pretend world beats an hour of directing it.",
          "The props are gloriously cheap: cardboard boxes, an old phone, a saucepan, your scarf. Narrating their game from the sofa — \"oh no, is teddy poorly?\" — counts as playing.",
        ],
      },
      {
        heading: "Potty-wise, follow their lead — gently",
        paragraphs: [
          "Long before any training, let them watch, talk about wees and poos without drama, and get familiar with sitting on a potty. Low-key preparation does a lot of the work.",
          "When you do start, pick a calm patch — not house moves, new baby weeks or nursery starts — and expect accidents as part of learning. If it turns into a battle, backing off for a few weeks is a strategy, not a defeat.",
        ],
      },
    ],
    games: [
      {
        name: "Kitchen-floor picnic",
        how: "Plastic plates, pretend food, and every teddy invited. You sit, sip imaginary tea, and occasionally declare it delicious.",
        parentEnergy: "low",
      },
      {
        name: "Jump the islands",
        how: "Lay cushions on the floor as islands and have them jump from one to the next while you narrate the shark-infested carpet from the sofa.",
        parentEnergy: "low",
      },
      {
        name: "What's missing?",
        how: "Line up three familiar objects, hide one under a tea towel while they cover their eyes, and ask which has vanished. Memory practice with theatrical gasps.",
        parentEnergy: "low",
      },
      {
        name: "Colour hunt",
        how: "From your chair: \"Can you find me something red?\" They tear round the room; you approve the findings. Repeat by colour until your tea is finished.",
        parentEnergy: "low",
      },
      {
        name: "Copy me",
        how: "Clap-clap-stomp, then hands on head — simple patterns for them to copy, then swap and copy theirs. Sneaky practice at watching, waiting and turn-taking.",
        parentEnergy: "low",
      },
      {
        name: "Dance and freeze",
        how: "Put on a song and everybody dances until you pause the music — then freeze like statues. Requires you to dance, hence the honest energy rating.",
        parentEnergy: "medium",
      },
    ],
    dontWorry: [
      "Bumpy, repeated words — \"I-I-I want\" — around 2½; ideas often outpace mouths at this age and these stammering bursts commonly pass (seek advice if it continues more than a few months or upsets them).",
      "No interest in the potty at 2 — plenty of children get there closer to 3, and training when they're genuinely ready usually goes faster.",
      "Strangers understanding only some of their speech — being your child's interpreter is completely typical at this stage.",
      "Still in a cot at 2½ — there's no deadline; most children move between 2 and 3, and later is fine if everyone's happy.",
      "Tantrums that haven't magically stopped at 2 — self-control is still under construction until well past 3.",
      "Eating less than you'd expect — toddler growth is slower now and appetites follow; watch the week, not the meal.",
    ],
    watchFor: [
      "Not putting two words together by around 2 to 2½ — talk to your health visitor, GP or doctor, and ask about a hearing check.",
      "Fewer than about 50 words by around 2½ — the 2 to 2½ year review (UK) is a natural moment, but don't wait for it if you're wondering now.",
      "Doesn't follow simple instructions or understand simple questions.",
      "No pretend play at all by around 2½ — worth mentioning, alongside how they play and connect with you.",
      "Not running, or very unsteady with frequent falls compared with other children the same age.",
      "Loses words or skills they once had, at any age — always worth a prompt conversation.",
    ],
    sources: [
      {
        title: "Important milestones: your child by 30 months",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/30-months.html",
        region: "US",
      },
      {
        title: "Ages and stages: 2–3 years",
        org: "Speech and Language UK",
        url: "https://speechandlanguage.org.uk/help-for-families/ages-and-stages/2-3-years/",
        region: "UK",
      },
      {
        title: "Your baby's health and development reviews",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/height-weight-and-reviews/baby-reviews/",
        region: "UK",
      },
      {
        title: "Potty training",
        org: "ERIC, The Children's Bowel & Bladder Charity",
        url: "https://eric.org.uk/potty-training/",
        region: "UK",
      },
      {
        title: "Moving your child from cot to bed",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/toddlers/sleep/where-your-child-sleeps/cot-to-bed",
        region: "Australia",
      },
      {
        title: "Communication milestones: 2 to 3 years",
        org: "ASHA",
        url: "https://www.asha.org/public/developmental-milestones/communication-milestones-2-to-3-years/",
        region: "US",
      },
    ],
  },
  {
    id: "30-36-months",
    label: "2½ to 3 years",
    title: "Why? Why? Why? Your toddler becomes a talker",
    ageWeeksFrom: 130,
    ageWeeksTo: 160,
    summary:
      "Real back-and-forth conversations, an avalanche of questions and imagination in full bloom. By 3, the wobbly walker of eighteen months ago is a small person with opinions — and you built that together.",
    expect: [
      {
        heading: "Talking: proper conversations",
        paragraphs: [
          "By 3, most children can hold a little conversation with at least two back-and-forth exchanges, ask \"who\", \"what\", \"where\" and \"why\" questions, and say their own first name. The why-phase is famous for a reason — brace yourself, kindly.",
          "Speech is much clearer too: by 3, most children talk well enough for people outside the family to understand most of the time. Grammar flourishes are appearing — plurals, \"-ing\" words — with charming mistakes like \"runned\" that actually show the rules going in.",
        ],
      },
      {
        heading: "Moving and doing",
        paragraphs: [
          "Expect confident running, jumping, climbing and stair skills, plus finer work: drawing a circle after you show them, threading big beads, using a fork and pulling on some clothes themselves.",
          "Independence surges — \"I do it MYSELF\" — and building in a few extra minutes for self-done shoes is cheaper than the argument.",
        ],
      },
      {
        heading: "Feelings and friends",
        paragraphs: [
          "Around 3, children start noticing other children and joining in their play — the first real step beyond playing alongside. Genuine turn-taking begins too, with plenty of support and the occasional scuffle over a digger.",
          "Separations get easier: by 3 most children can settle within about ten minutes of a drop-off. Tantrums generally begin to ease after 3 as words catch up with feelings — gradually, not overnight.",
          "Imagination is in full bloom: elaborate pretend storylines, magical thinking and sometimes an imaginary friend. All healthy, all normal.",
        ],
      },
      {
        heading: "Everyday life: potty, sleep and food",
        paragraphs: [
          "Many children crack daytime potty training somewhere around now, and being in nappies at 2½ is still entirely normal. Night-time dryness usually comes months or even years after daytime — nappies at night are fine for a good while yet.",
          "Sleep needs edge down towards 10–13 hours in 24. Some children start resisting the nap; plenty still need it well past 3 — a quiet-time compromise keeps everyone sane either way.",
          "Selective eating often persists through the preschool years. Keep meals low-pressure and keep quietly offering variety — you're playing a long game, and you're playing it fine.",
        ],
      },
    ],
    encourage: [
      {
        heading: "Answer the whys (as much as you can bear)",
        paragraphs: [
          "Short, honest answers are plenty — and turning it around with \"what do you think?\" buys thinking practice and a moment's peace.",
          "\"I don't know — shall we find out?\" is a genuinely great answer. It models curiosity and honesty at the same time.",
        ],
      },
      {
        heading: "Practise taking turns, gently",
        paragraphs: [
          "Simple turn-based games — rolling a ball, posting shapes, very short card games — build the waiting muscle that friendships will need. Narrate it: \"my turn… now your turn.\"",
          "Expect sharing on request to be hard; it is, at this age. Praise the attempts and keep the turns short.",
        ],
      },
      {
        heading: "Talk about feelings outside the storm",
        paragraphs: [
          "Name feelings in books and daily life — \"he looks sad\", \"you're frustrated the tower fell\" — while everyone's calm. Words stored in peacetime are the ones available mid-wobble.",
          "Keep routines and gentle warnings before transitions; they're still doing quiet heavy lifting for behaviour at this age.",
        ],
      },
    ],
    games: [
      {
        name: "Restaurant",
        how: "They're the chef; you order from the sofa. The invisible spaghetti is always excellent, and the waiting staff enjoy warm reviews.",
        parentEnergy: "low",
      },
      {
        name: "What happens next?",
        how: "Reading a favourite book, pause before the page turn and ask \"what happens next?\". Prediction, memory and storytelling, all from a horizontal position.",
        parentEnergy: "low",
      },
      {
        name: "Sock basketball",
        how: "Rolled-up socks, a washing basket, and turns to throw. Move the basket further away as their aim improves and your tea cools.",
        parentEnergy: "low",
      },
      {
        name: "Guess the animal",
        how: "Describe an animal in two or three clues — \"it's big and grey with a long nose\" — and let them guess, then swap. Their clues will be surreal; treasure them.",
        parentEnergy: "low",
      },
      {
        name: "Toddler Simon Says",
        how: "Simple instructions — touch your nose, jump, sit down — with everyone winning and no one out. Listening practice disguised as silliness.",
        parentEnergy: "low",
      },
      {
        name: "Puddle-jumping expedition",
        how: "Wellies on, out to find the muddiest puddles in the neighbourhood. The one entry here that genuinely requires a coat and your full participation — and it's worth it.",
        parentEnergy: "medium",
      },
    ],
    dontWorry: [
      "Repeating sounds and words around 2½ to 3 — many children go through a stammering phase as language surges, and most stop stammering as they grow (do seek advice early if it lasts more than a few months or distresses them — early support helps).",
      "An imaginary friend or tall tales — pretend worlds are a healthy sign of imagination, not fibbing.",
      "Still having tantrums at 3 — they tend to get better after 3, gradually rather than all at once.",
      "Not dry at night — night-time dryness often arrives long after daytime, and night nappies are completely fine for now.",
      "Refusing to share — sharing on request is genuinely difficult at this age; turn-taking is only just beginning.",
      "Still fussy at meals — selective eating commonly runs through the preschool years in perfectly healthy children.",
      "Napping, or refusing to nap — both are within normal at this age.",
    ],
    watchFor: [
      "Not putting two or three words together, or speech that even family struggle to understand, by around 3 — ask your health visitor or GP, or self-refer to local speech and language therapy where available (UK); in the US, raise it at the 3-year well-child visit or sooner.",
      "Doesn't ask questions or try little back-and-forth exchanges by around 3.",
      "No pretend play, and little interest in or awareness of other children, by around 3 — worth a conversation.",
      "Very unsteady on their feet, frequent falls, or unable to manage stairs by 3.",
      "Inconsolable for a very long time at every separation, well beyond the first weeks of a new setting.",
      "A stammer accompanied by distress, or lasting more than a few months — ask for a speech and language referral early; support works well at this age.",
      "Loses words or skills they once had, at any age — always worth discussing promptly with your doctor or health visitor.",
    ],
    sources: [
      {
        title: "Important milestones: your child by three years",
        org: "CDC",
        url: "https://www.cdc.gov/act-early/milestones/3-years.html",
        region: "US",
      },
      {
        title: "Communication milestones: 2 to 3 years",
        org: "ASHA",
        url: "https://www.asha.org/public/developmental-milestones/communication-milestones-2-to-3-years/",
        region: "US",
      },
      {
        title: "Stammering",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/stammering/",
        region: "UK",
      },
      {
        title: "Toddler development at 2–3 years",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/toddlers/development/development-tracker-1-3-years/2-3-years",
        region: "Australia",
      },
      {
        title: "Top tips for surviving tantrums",
        org: "AAP / HealthyChildren.org",
        url: "https://www.healthychildren.org/English/family-life/family-dynamics/communication-discipline/Pages/Temper-Tantrums.aspx",
        region: "US",
      },
      {
        title: "Sleep and young children",
        org: "NHS",
        url: "https://www.nhs.uk/baby/health/sleep-and-young-children/",
        region: "UK",
      },
    ],
  },
];
