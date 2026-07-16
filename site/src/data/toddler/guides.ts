/**
 * Cross-cutting toddler guides for the Baby & Toddler guide app:
 * positive parenting, life with a baby and a toddler, easy games for
 * tired parents, and encouraging independent play.
 *
 * Sources verified July 2026. Editorial voice: warm, practical, zero
 * judgement — see the Site Bible.
 */

import type { GuideDoc } from "../types";

export const toddlerGuides: GuideDoc[] = [
  {
    id: "positive-parenting",
    title: "Positive parenting with a toddler",
    summary:
      "Warmth and boundaries together — what positive parenting actually means with a one- or two-year-old, why toddlers melt down, and what helps. Including what to do when you lose your temper, because everyone does.",
    sections: [
      {
        heading: "What positive parenting actually means",
        paragraphs: [
          "Positive parenting sometimes gets mistaken for never saying no. It's really the opposite: plenty of warmth, and calm, consistent boundaries — both at once.",
          "The idea is that toddlers behave better, and feel safer, when the adults around them are kind and predictable. You can hold a limit (\"we're not throwing food\") and stay gentle while you hold it.",
          "This isn't just a nice theory. Structured programmes built on these ideas, like Triple P and the Incredible Years, have decent research evidence behind them — parents who use this approach tend to report fewer battles and feel better about their own parenting.",
        ],
      },
      {
        heading: "Why toddler brains melt down",
        paragraphs: [
          "The part of the brain that handles impulse control — the brakes, essentially — is one of the last bits to develop. Child development specialists at Zero to Three note that most children can't reliably stop themselves acting on an urge until around three and a half to four.",
          "So a toddler mid-meltdown isn't being manipulative. They genuinely can't calm themselves down yet — they borrow calm from you. Researchers call this co-regulation: your steady voice and presence are what their nervous system uses to settle.",
          "This is why staying calm isn't just polite advice. It's the actual mechanism by which the tantrum ends.",
        ],
      },
      {
        heading: "Staying calm in a tantrum — and what to do after",
        paragraphs: [
          "During a tantrum, less is more. Make sure they're safe, stay close, and keep your voice low and your words few. The NHS advice is blunt on one point: shouting back doesn't end a tantrum, and giving in teaches them that tantrums work.",
          "You don't have to fix the feeling. Naming it helps — \"you really wanted the red cup\" — even if the answer is still no. You're allowed to just sit nearby and wait it out.",
          "Afterwards, reconnect. A cuddle, a quiet moment, back to normal life. There's no need for a debrief or a lecture — toddlers live in the present, and the reconnection is the lesson.",
        ],
      },
      {
        heading: "Praise that actually works",
        paragraphs: [
          "Specific, descriptive praise lands better than generic cheering. \"You put both shoes on yourself\" tells a toddler exactly what they did well; \"good girl\" tells them very little.",
          "Parenting bodies like Australia's Raising Children Network suggest describing what you saw: \"you gave the brick to your sister — that was kind.\" It sounds slightly odd at first. It becomes natural quickly.",
          "The other half is balance: try to notice the good stuff more often than you correct. Toddlers repeat whatever gets attention, so aim the spotlight at the behaviour you want more of.",
        ],
      },
      {
        heading: "Small choices, big difference",
        paragraphs: [
          "Toddlers are desperate for control and have almost none. Offering two small choices — \"red cup or blue cup?\", \"teeth first or pyjamas first?\" — gives them a sliver of power over their day.",
          "The trick is that both options are ones you're happy with. It isn't a negotiation; it's a choice inside a boundary.",
          "Keep it to two options. A toddler offered five choices is a toddler about to have a very bad time.",
        ],
      },
      {
        heading: "Routines are a kindness",
        paragraphs: [
          "A predictable rhythm — meals, naps, bath, stories — isn't rigidity, it's reassurance. When a toddler knows what comes next, there's less to fight about.",
          "Transitions are the hard bit, so signpost them: \"two more slides, then we're going home.\" Warnings won't prevent every protest, but they genuinely reduce them.",
          "And routines quietly help you too. Fewer decisions, fewer negotiations, more autopilot on the hard days.",
        ],
      },
      {
        heading: "Biting and hitting",
        paragraphs: [
          "Biting and hitting are common toddler behaviours, not signs of a bad child or bad parenting. They usually happen when big feelings outrun small vocabulary.",
          "Respond calmly and briefly: \"no biting — biting hurts.\" Then give most of your attention to the child who was hurt, so biting doesn't become a reliable way to get the spotlight.",
          "Consistency matters more than intensity. The same short, calm response every time works better than an occasional big reaction — and this phase does pass as language grows.",
        ],
      },
      {
        heading: "When you lose your temper — repair",
        paragraphs: [
          "You will shout at some point. Every parent does, and one hard moment doesn't undo a thousand warm ones.",
          "What matters is repair. Once you're calm, get down to their level and keep it simple: \"I shouted. I'm sorry. I love you.\" Toddlers understand an apology far earlier than you'd think, and it teaches them that relationships survive rupture.",
          "Be as kind to yourself as you're trying to be to them. Parenting on no sleep is genuinely hard, and self-compassion isn't indulgence — calmer parents are made, partly, by forgiving themselves.",
        ],
      },
    ],
    sources: [
      {
        title: "Temper tantrums",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/behaviour/temper-tantrums/",
        region: "UK",
      },
      {
        title: "How to cope with toddler tantrums",
        org: "NSPCC",
        url: "https://www.nspcc.org.uk/keeping-children-safe/support-for-parents/cope-with-tantrums/",
        region: "UK",
      },
      {
        title: "Toddler tantrums 101: why they happen and what you can do",
        org: "Zero to Three",
        url: "https://www.zerotothree.org/resource/toddler-tantrums-101-why-they-happen-and-what-you-can-do/",
        region: "US",
      },
      {
        title: "Your calm is their calm: co-regulation strategies for infants and toddlers",
        org: "Zero to Three",
        url: "https://www.zerotothree.org/resource/your-calm-is-their-calm-co-regulation-strategies-for-infants-and-toddlers/",
        region: "US",
      },
      {
        title: "Praise for kids and teens: why, how and when to use it",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/toddlers/connecting-communicating/connecting/praise",
        region: "Australia",
      },
      {
        title:
          "The Triple P-Positive Parenting Program: systematic review and meta-analysis (Sanders et al., 2014)",
        org: "Clinical Psychology Review (PubMed)",
        url: "https://pubmed.ncbi.nlm.nih.gov/24842549/",
        region: "Global",
      },
    ],
  },
  {
    id: "baby-and-toddler",
    title: "Having a baby and a toddler",
    summary:
      "Expecting a second child while your first is still tiny? Here's what helps: preparing your toddler, the first meeting, surviving feeds and double crying, and looking after yourself in the chaos.",
    sections: [
      {
        heading: "Before the baby arrives",
        paragraphs: [
          "Tell your toddler in simple, concrete terms, and don't expect much reaction — \"there's a baby in mummy's tummy\" is fairly abstract when you're two. Picture books about new babies help make it real.",
          "Looking at photos of your toddler as a baby works well too: it shows them what newborns are actually like (mostly sleeping, crying and milk) and reminds them they had all this care first.",
          "If you can, avoid piling other big changes — a new bed, potty training, starting nursery — into the months right around the birth. One upheaval at a time is plenty.",
        ],
      },
      {
        heading: "The first meeting",
        paragraphs: [
          "If it's practical, try not to be holding the baby when your toddler first walks in — free arms for the big sibling first, then introduce the baby together. Some families have the baby \"bring\" a small present, which is silly and works surprisingly well.",
          "Let your toddler set the pace. Some want to stroke the baby immediately; some ignore the whole situation. Both are fine.",
          "Keep the moment low-key. There will be years of relationship ahead; the first five minutes don't decide it.",
        ],
      },
      {
        heading: "Keeping your toddler feeling secure",
        paragraphs: [
          "Expect some regression — a potty-trained toddler having accidents, more clinginess, baby talk, worse sleep. Parenting services like Australia's Pregnancy, Birth and Baby describe this as normal and temporary: it's your toddler's way of saying \"I'm still little, don't forget me.\"",
          "The most helpful response is warmth rather than pressure. Meet the babyish behaviour gently, keep their routines as steady as you can, and the skills come back on their own.",
          "Praise the moments they're gentle or helpful with the baby — big-sibling pride is a much stronger motivator than big-sibling lectures.",
        ],
      },
      {
        heading: "Feeding the baby with a toddler awake",
        paragraphs: [
          "Feeds are long and frequent, and your toddler knows you're pinned to the sofa. A \"feeding basket\" helps: a small box of special toys and books that only comes out during feeds, so it stays interesting.",
          "Audiobooks and story podcasts are brilliant here, and if the telly does a shift too, that's fine — this is survival season, not a curriculum.",
          "Do a quick toddler check before you sit down: snack, drink, wee, activity within reach. Some toddlers just want to sit against you with a book while you feed, which is rather lovely when it happens.",
        ],
      },
      {
        heading: "When both cry at once",
        paragraphs: [
          "It will happen, probably today. The standard advice from health services is reassuring: a baby who is fed and safe can cry in a cot or pram for a few minutes without harm.",
          "So make the baby safe, then deal with whichever need is quickest to meet — often that's the toddler, whose distress is usually about you, not about anything broken.",
          "You can also narrate it: \"the baby's crying, I'm helping you first, then the baby.\" Triage isn't neglect. It's just maths with two small people and one of you.",
        ],
      },
      {
        heading: "Safety with a toddler and a newborn",
        paragraphs: [
          "One firm rule: never leave a toddler alone with the baby, even for a moment. Toddlers are loving but not careful — official guidance notes they may try to share food with a newborn or rock a pram hard enough to tip it.",
          "Let your toddler touch and cuddle the baby freely when you're right there. Supervised affection is how the bond builds; the rule is about your presence, not about keeping them apart.",
          "Small logistics help: change nappies on the floor rather than a raised table when your toddler's about, and park the pram where little hands can't rock it.",
        ],
      },
      {
        heading: "Five minutes of one-on-one",
        paragraphs: [
          "You can't give your toddler the attention they had before, and that's okay. What helps most is small, protected doses: five or ten minutes a day of just you and them, fully present.",
          "Give it a name — \"our special time\" — and let them choose the game. Naming it means your toddler can hold onto it and look forward to it.",
          "Little rituals count double now: the same song at bedtime, a secret handshake, their spot on your lap during the baby's nap. Predictable small things say \"you're still mine\" better than grand gestures.",
        ],
      },
      {
        heading: "Looking after you",
        paragraphs: [
          "Two under three is genuinely one of the harder seasons of parenting. If it feels relentless, that's an accurate reading of the situation, not a failure of attitude.",
          "Accept every offer of help, and make requests specific — \"could you take the toddler to the park at ten\" gets better results than \"let us know if you need anything.\" Lower the bar everywhere else: fed, safe and loved is the whole job right now.",
          "And if you feel persistently low, hopeless or unable to enjoy anything, talk to your GP or health visitor (in the UK) or your doctor or child health nurse elsewhere. Low mood after a baby is common and treatable, and asking is the strong move.",
        ],
      },
    ],
    sources: [
      {
        title: "Preparing your other children for a new baby",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/toddlers/family-life/new-baby-in-the-family/new-baby-preparing-children",
        region: "Australia",
      },
      {
        title: "Helping your toddler or preschooler adjust to a new baby",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/toddlers/family-life/new-baby-in-the-family/new-baby-toddlers-preschoolers",
        region: "Australia",
      },
      {
        title: "Preparing your older child for a new baby",
        org: "AAP (HealthyChildren.org)",
        url: "https://www.healthychildren.org/English/ages-stages/prenatal/Pages/Preparing-Your-Family-for-a-New-Baby.aspx",
        region: "US",
      },
      {
        title: "Toddler and the new baby",
        org: "Pregnancy, Birth and Baby",
        url: "https://www.pregnancybirthbaby.org.au/toddler-and-the-new-baby",
        region: "Australia",
      },
      {
        title: "Soothing a crying baby",
        org: "NHS",
        url: "https://www.nhs.uk/baby/caring-for-a-newborn/soothing-a-crying-baby/",
        region: "UK",
      },
      {
        title: "Adjusting to life with a new baby: 15 practical tips",
        org: "NCT",
        url: "https://www.nct.org.uk/information/life-parent/support-change/adjusting-life-new-baby-15-practical-tips",
        region: "UK",
      },
    ],
  },
  {
    id: "easy-games",
    title: "Easy games for tired parents",
    summary:
      "Genuinely low-energy games for days when you're running on four hours' sleep — sorted by where you can play them, including a section where you mostly lie down. All of it still counts as quality time.",
    image: {
      src: "/images/toddler-easy-games.jpg",
      alt: "A tired parent rests her chin in her hand at the table in front of a laptop while two children clamber over the sofa behind her",
      width: 1600,
      height: 1066,
      credit: "Photo by Ketut Subiyanto",
    },
    sections: [
      {
        heading: "The rules of tired-parent play",
        paragraphs: [
          "Good news: toddlers don't need elaborate activities. Ten minutes of you genuinely joining in beats an hour of Pinterest-grade crafting, and repetition they love costs you nothing extra.",
          "Rough age fits are marked inline — 12–18 months, 18 months–2 years, 2–3 years — but they're loose. Your toddler will tell you what's working by playing it forty times.",
          "Two safety constants throughout: anything small enough to fit through a cardboard tube is a choking risk for under-threes, and any water play means you within arm's reach the whole time.",
        ],
      },
      {
        heading: "Sofa games",
        paragraphs: [
          "Doctors and patients (2–3y): you are the patient. The patient must lie very still on the sofa with their eyes closed while the doctor applies seventeen plasters. Recovery is slow.",
          "Sleeping lions (18m–3y): everyone lies down and the last one to move wins. Toddlers are terrible at it, which means you get to lie down again almost immediately.",
          "Body-part naming (12–18m): \"where's YOUR nose? where's MY nose?\" — endlessly funny to a one-year-old, performable while horizontal. Add a teddy for the advanced version.",
        ],
      },
      {
        heading: "Kitchen-floor games",
        paragraphs: [
          "Pots-and-spoons drumming (12–18m): saucepans, wooden spoon, done. Loud but you get to sit on the floor drinking tea while conducting.",
          "Pouring station (18m–3y): dry pasta or rice, a couple of cups and a tray to catch the mess. Absorbing for surprisingly long — just stay close with under-twos, since dry pasta is a choking risk if snacked on.",
          "Washing-up-bowl water play (18m–3y): towel down, a few centimetres of water, cups and a whisk. Stay within arm's reach for all water play — bowls included — and drain it when you're done.",
        ],
      },
      {
        heading: "Cardboard box games",
        paragraphs: [
          "A big box is a car, a boat, a house and a hat, in that order, in one afternoon. Sit them in it, push it ten centimetres, accept applause (12m+).",
          "Cut a slot in the lid and you've got a posting box (12–18m): posting balls, big blocks or chunky animals in and tipping them out is a complete game. Keep posted items too big to swallow — the cardboard-tube test again.",
          "For 2–3s, hand over crayons and let them decorate the box, then cut a door and a window. You supervise from the sofa in a consultancy role.",
        ],
      },
      {
        heading: "Garden and doorstep games",
        paragraphs: [
          "Bubbles from a chair (12m+): you sit, you blow, they chase and pop. The effort asymmetry is the whole point.",
          "Chalk (18m–3y): scribbling on the doorstep, or draw circles and play \"jump in the circle\". Rain cleans up after you.",
          "Run there and back (2–3y): \"run to the fence and back!\" You are the finish line, and the finish line's job is to sit still and cheer. A watering can and a patch of plants also buys you a quiet ten minutes.",
        ],
      },
      {
        heading: "Quiet-time games",
        paragraphs: [
          "Torch games (2–3y): curtains closed, torch on — chase the light spot, shine it on things to name, make hand shadows. Weirdly magical, almost zero effort.",
          "Sticker dots (18m–3y): a sheet of dot stickers, stuck on paper, on their knees, on your nose. Peeling them is fine motor practice; you mostly just donate your face.",
          "Posting and threading (12–18m): dropping large pom-poms or chunky blocks through a kitchen-roll tube into a bowl, over and over. Keep everything bigger than the tube-test size and stay close at this age.",
        ],
      },
      {
        heading: "Games where you mostly lie down",
        paragraphs: [
          "The mountain (18m–3y): you lie on the floor; you are now terrain. They climb over you. Keep an arm free to steady the descent.",
          "The car wash / the patient / the buried parent: you lie down and they brush you with a dry sponge, treat your injuries, or bury you under every cushion in the house. All legitimate games, all horizontal.",
          "None of this is lazy parenting, for what it's worth. You're present, you're responsive, they're leading the play — that's exactly what the child-development people recommend. The lying down is just efficient.",
        ],
      },
    ],
    sources: [
      {
        title: "Baby and toddler play ideas",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/play-and-learning/baby-and-toddler-play-ideas/",
        region: "UK",
      },
      {
        title: "Toddler play: ideas, games and activities",
        org: "Raising Children Network",
        url: "https://raisingchildren.net.au/toddlers/play-learning/getting-play-started/toddlers-at-play",
        region: "Australia",
      },
      {
        title: "Playing is how toddlers learn",
        org: "AAP (HealthyChildren.org)",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/fitness/Pages/Playing-is-How-Toddlers-Learn.aspx",
        region: "US",
      },
      {
        title: "The power of play: how fun and games help children thrive",
        org: "AAP (HealthyChildren.org)",
        url: "https://www.healthychildren.org/English/family-life/power-of-play/Pages/the-power-of-play-how-fun-and-games-help-children-thrive.aspx",
        region: "US",
      },
      {
        title: "Baby and toddler safety",
        org: "NHS",
        url: "https://www.nhs.uk/baby/first-aid-and-safety/safety/baby-and-toddler-safety/",
        region: "UK",
      },
    ],
  },
  {
    id: "independent-play",
    title: "Encouraging independent play",
    summary:
      "Independent play is good for your toddler — not just a break for you (though it's that too, guilt-free). What's realistic at each age, how to build it gently, and an honest word about screens.",
    sections: [
      {
        heading: "Good for them, not just for you",
        paragraphs: [
          "Let's clear this up first: a toddler playing happily on their own is not being neglected. Self-directed play is where toddlers practise concentration, imagination and the small triumph of working something out alone.",
          "Child development organisations actively encourage it — Zero to Three and the AAP both treat unstructured, child-led play as some of the most valuable time in a toddler's day.",
          "So the ten minutes it buys you for a cup of tea isn't a guilty by-product. It's two good things happening at once.",
        ],
      },
      {
        heading: "What's realistic — minutes, not hours",
        paragraphs: [
          "Honest expectations save a lot of frustration. Around age two, sustained attention runs to roughly five or six minutes; by three, perhaps eight; by four, ten or so — Zero to Three's figures, and other estimates land in the same range.",
          "Truly solo play often starts even shorter: a few minutes for a young toddler is a genuine achievement, not a failure. A deeply absorbing toy can stretch it well past the averages; a tired or hungry day shrinks it to zero.",
          "It also varies hugely between children and between Tuesdays. Build from where your toddler actually is, not from something you saw online.",
        ],
      },
      {
        heading: "Build a yes space",
        paragraphs: [
          "Independent play needs a space where the answer to everything is yes — fully toddler-proofed, so nothing in reach needs a \"don't touch\".",
          "It might be a gated corner of the living room, a playpen while they're small, or a whole childproofed room. If you have to hover and intervene, neither of you can relax.",
          "Keep it boringly safe and modestly stocked. The point isn't a beautiful playroom; it's a patch of the world they can run without you.",
        ],
      },
      {
        heading: "Play alongside first, then step back",
        paragraphs: [
          "Independent play grows out of connected play, not instead of it. Ten or fifteen minutes of proper together-play first fills the tank; a toddler who's had your full attention finds it much easier to let you drift off.",
          "Then step back gradually: playing together, then sitting nearby with your own quiet task — folding washing is the classic — then pottering at the edge of the room.",
          "Staying visible matters. Toddlers play best in orbit around a parked parent; it's the sneaking off that tends to end the game.",
        ],
      },
      {
        heading: "Don't interrupt the magic",
        paragraphs: [
          "When your toddler is deep in play, the most helpful thing you can do is nothing. Every \"what colour is that?\" resets their concentration, and concentration is exactly the muscle they're building.",
          "An occasional quiet bit of narration — \"you stacked all of those\" — signals you're present without taking over. Save the questions and the cheering for afterwards.",
          "A decent rule: be available, not entertaining. If they look up and find your face, that's usually all they were checking.",
        ],
      },
      {
        heading: "Fewer toys out, better play",
        paragraphs: [
          "There's a rather satisfying study on this: researchers gave toddlers either four toys or sixteen (Dauch and colleagues, 2018). With four, they played with each toy roughly twice as long, and in more varied and creative ways.",
          "It's one small study, so we'd hold it lightly — but it matches what most parents observe. A floor covered in toys overwhelms; a small shelf invites.",
          "The practical version is toy rotation: most toys in a cupboard, a handful out, swap them every week or two. Old toys come back like new ones, free. Open-ended things — blocks, boxes, animals, cups, a scarf — earn their spot best.",
        ],
      },
      {
        heading: "When it all falls apart",
        paragraphs: [
          "Illness, a new sibling, holidays, teeth — any disruption can knock independent play flat, and a toddler who played alone happily last month may now be glued to your shin.",
          "That's not a lost skill, just a temporarily raised need for you. Meet the clinginess rather than fighting it; pushing independence on an insecure toddler tends to backfire.",
          "When things settle, restart small: reconnect first, two minutes nearby, build back up. It returns faster the second time.",
        ],
      },
      {
        heading: "Screens, honestly",
        paragraphs: [
          "No shame here: most families use screens, and a calm episode of something slow while you make dinner is a tool, not a failure. Worth knowing what the big health bodies actually say, though.",
          "The WHO's 2019 guidance is the strictest: no sedentary screen time recommended before age two, and under an hour a day at ages two to four. The AAP (the American paediatricians' body) has long advised little beyond video calls before 18 months; its updated guidance now leans less on stopwatch limits and more on quality, watching together, and screens not crowding out play and sleep.",
          "A fair practical reading: less is better under two, calm and slow beats loud and frantic, alongside you beats alone, and keep screens out of the bedtime hour. If real life sometimes needs Bluey to hold the fort — that's real life, and you're in extremely good company.",
        ],
      },
    ],
    sources: [
      {
        title: "I is for independent play",
        org: "Zero to Three",
        url: "https://www.zerotothree.org/resource/i-is-for-independent-play/",
        region: "US",
      },
      {
        title: "Encouraging independent play for toddlers and preschoolers",
        org: "PBS KIDS for Parents",
        url: "https://www.pbs.org/parents/thrive/encouraging-independent-play-for-toddlers-and-preschoolers",
        region: "US",
      },
      {
        title:
          "The influence of the number of toys in the environment on toddlers' play (Dauch et al., 2018)",
        org: "Infant Behavior and Development (PubMed)",
        url: "https://pubmed.ncbi.nlm.nih.gov/29190457/",
        region: "Global",
      },
      {
        title: "Helping kids thrive in a digital world: AAP policy explained",
        org: "AAP (HealthyChildren.org)",
        url: "https://www.healthychildren.org/English/family-life/Media/Pages/helping-kids-thrive-in-a-digital-world-AAP-policy-explained.aspx",
        region: "US",
      },
      {
        title:
          "Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age",
        org: "WHO",
        url: "https://www.who.int/publications/i/item/9789241550536",
        region: "Global",
      },
      {
        title: "Baby and toddler play ideas",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/play-and-learning/baby-and-toddler-play-ideas/",
        region: "UK",
      },
    ],
  },
];
