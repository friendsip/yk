/**
 * Baby health topics for the Baby & Toddler guide.
 *
 * Calm, evidence-based guides to the common health worries of the first year.
 * Guidance verified against NHS, UKHSA, Lullaby Trust, AAP/HealthyChildren,
 * Meningitis Research Foundation and ICON sources, July 2026.
 */

import type { HealthTopic } from "../types";

export const healthTopics: HealthTopic[] = [
  {
    id: "when-to-get-help",
    title: "When to get help — and who to call",
    summary:
      "You know your baby better than anyone, so trust your instincts. Here is how the help is organised, in the UK and the US, so you always know who to call.",
    sections: [
      {
        heading: "Trust your instincts",
        paragraphs: [
          "You see your baby every day, so you are the person most likely to notice when something is off. If your gut says something is wrong, act on it — even if you cannot put it into words.",
          "No doctor, nurse or health visitor will ever mind you getting a baby checked. Being told everything is fine is a good outcome, not a wasted trip.",
          "It also helps to notice what is normal for your baby when they are well — how they feed, cry and sleep — because 'not themselves' is one of the most useful things you can tell a professional.",
        ],
      },
      {
        heading: "Who to call in the UK",
        paragraphs: [
          "For everyday worries — feeding, sleep, rashes, weight, your own wellbeing — your health visitor is there for exactly this, and your GP surgery can offer same-day appointments for babies who seem unwell.",
          "If you are not sure how urgent something is, call NHS 111 (or use 111 online) any time, day or night — they will tell you what to do next and can book urgent appointments. In the first days after birth, your midwife or the maternity unit is the right first call.",
          "For serious injuries or a baby who seems really unwell, go to A&E. If it is life-threatening — breathing trouble, unresponsiveness, a fit — call 999 for an ambulance without hesitating.",
        ],
      },
      {
        heading: "Who to call in the US",
        paragraphs: [
          "Your pediatrician's office is the first port of call for most worries, and most practices have a nurse advice line you can phone out of hours — it is genuinely fine to use it.",
          "Urgent care clinics can help with minor illness and injury when the office is closed, though for young babies many will send you on to an emergency room, so calling the pediatrician first often saves a trip.",
          "For anything life-threatening — trouble breathing, unresponsiveness, a seizure — call 911 or go straight to the ER. If you are unsure whether it is an emergency, 911 dispatchers will help you decide.",
        ],
      },
      {
        heading: "What to have ready when you call",
        paragraphs: [
          "Whoever you call will ask roughly the same things: your baby's age, their temperature and how you took it, how feeding and nappies (diapers) have been, and what is different from normal.",
          "You do not need to have it all perfectly noted down. 'She is 6 weeks old, hot, and has fed much less than usual today' is exactly the kind of information that helps.",
          "If English is not your first language, NHS 111 and 911 can both arrange interpreters — just say the language you need.",
        ],
      },
    ],
    urgent: [
      "Blue, grey, pale or blotchy skin, lips or tongue — call 999 (UK) or 911 (US)",
      "Hard to wake, unusually floppy, or not responding to you — call 999 (UK) or 911 (US)",
      "Struggling to breathe: grunting, long pauses, or the skin sucking in under the ribs — call 999 (UK) or 911 (US)",
      "A rash that does not fade when you press a glass against it — call 999 (UK) or 911 (US)",
      "A fit or seizure, especially their first — call 999 (UK) or 911 (US)",
      "A temperature of 38°C (100.4°F) or higher in a baby under 3 months — call your GP or 111 (UK) or your pediatrician (US) straight away",
      "A weak, high-pitched or continuous cry that is nothing like their usual cry — get urgent advice from 111 (UK) or your pediatrician (US) the same day",
      "Signs of dehydration: far fewer wet nappies than usual or a sunken soft spot on the head — see a doctor the same day",
    ],
    sources: [
      {
        title: "Is your baby or toddler seriously ill?",
        org: "NHS",
        url: "https://www.nhs.uk/baby/health/is-your-baby-or-toddler-seriously-ill/",
        region: "UK",
      },
      {
        title: "When Your Child Needs Emergency Medical Services",
        org: "AAP / HealthyChildren.org",
        url: "https://www.healthychildren.org/English/health-issues/injuries-emergencies/Pages/When-Your-Child-Needs-Emergency-Medical-Services.aspx",
        region: "US",
      },
      {
        title: "Meningitis and sepsis symptoms",
        org: "Meningitis Research Foundation",
        url: "https://www.meningitis.org/about-meningitis/symptoms/",
        region: "UK",
      },
    ],
  },
  {
    id: "fever",
    title: "Fever and high temperatures",
    summary:
      "A fever is a temperature of 38°C (100.4°F) or more, and in older babies it is usually the body doing its job. In a baby under 3 months, though, any fever needs checking straight away.",
    sections: [
      {
        heading: "Taking your baby's temperature",
        paragraphs: [
          "The most reliable way for a baby is a digital thermometer held gently in the armpit. Hold their arm softly against their body until the thermometer beeps.",
          "Ear thermometers can work but are fiddly to place well in small ears, and forehead strips are not accurate enough to rely on. Hot cheeks or a warm forehead alone do not tell you much — it is worth actually measuring.",
          "A normal temperature is around 36.4°C (97.5°F), though it varies a little from baby to baby. Anything from 38°C (100.4°F) counts as a fever.",
        ],
      },
      {
        heading: "The age rules that matter",
        paragraphs: [
          "If your baby is under 3 months old and has a temperature of 38°C or more, contact a doctor straight away — call your GP or 111 in the UK, or your pediatrician in the US, at any hour. Young babies can become unwell quickly and doctors always want to see them.",
          "If your baby is 3 to 6 months old, a temperature of 39°C (102.2°F) or more also needs urgent advice the same day.",
          "This is not about alarming you — most of these babies turn out to have a simple virus. It is simply that at this age a fever needs a professional's eyes, every time.",
        ],
      },
      {
        heading: "What matters more than the number",
        paragraphs: [
          "Once babies are past those early months, how your baby seems matters more than exactly how high the temperature is. A hot baby who is feeding, having wet nappies and giving you the occasional smile is usually coping fine.",
          "Worry less about the thermometer and more about the baby: are they drinking, are they wakeable, do they perk up at all when the fever dips?",
          "A baby who is drowsy, refusing feeds, breathing hard, or just deeply 'not themselves' needs advice even with a modest temperature. And no fever at all does not rule out serious illness in a young baby — trust the whole picture.",
        ],
      },
      {
        heading: "Medicines: what is safe and when",
        paragraphs: [
          "Infant paracetamol — called acetaminophen (Tylenol) in the US — can be given from 2 months old, though for babies aged 2 to 3 months the NHS advises it only if they weigh over 4kg and were born after 37 weeks, and usually no more than 2 doses a day at that age. Always follow the dose on the bottle for your baby's age.",
          "Ibuprofen can be given from 3 months old if your baby weighs more than 5kg (11lb). Do not give paracetamol and ibuprofen at the same time — only alternate them if a doctor or nurse has told you to.",
          "Never give aspirin to a baby or child. And remember medicine is for comfort — if your baby is hot but content, you do not have to treat the number.",
        ],
      },
      {
        heading: "Looking after a feverish baby at home",
        paragraphs: [
          "Offer plenty of feeds — breast milk or formula count as fluids. Dress them in light layers and keep the room comfortable; there is no need to bundle them up or strip them off.",
          "Skip the old advice about cold sponging or fans — cooling the skin does not treat the fever and can make babies shivery and miserable.",
          "Most fevers settle within a few days. If a fever lasts 5 days or more, or your instincts prickle at any point, get them seen.",
        ],
      },
    ],
    urgent: [
      "A temperature of 38°C (100.4°F) or more in a baby under 3 months — call your GP or 111 (UK) or your pediatrician (US) straight away",
      "A temperature of 39°C (102.2°F) or more in a baby aged 3 to 6 months — call your GP or 111 (UK) or your pediatrician (US) straight away",
      "Fever with a rash that does not fade under a glass — call 999 (UK) or 911 (US)",
      "Fever and your baby is floppy, hard to wake or does not respond to you — call 999 (UK) or 911 (US)",
      "A fit or seizure with a fever, especially the first one — call 999 (UK) or 911 (US)",
      "Fever with signs of dehydration, such as far fewer wet nappies or a sunken soft spot — see a doctor the same day",
      "A fever that has lasted 5 days or more — see a doctor the same day",
    ],
    sources: [
      {
        title: "High temperature (fever) in children",
        org: "NHS",
        url: "https://www.nhs.uk/symptoms/fever-in-children/",
        region: "UK",
      },
      {
        title: "Paracetamol for children",
        org: "NHS",
        url: "https://www.nhs.uk/medicines/paracetamol-for-children/",
        region: "UK",
      },
      {
        title: "How and when to give ibuprofen for children",
        org: "NHS",
        url: "https://www.nhs.uk/medicines/ibuprofen-for-children/how-and-when-to-give-ibuprofen-for-children/",
        region: "UK",
      },
      {
        title: "Is your baby or toddler seriously ill?",
        org: "NHS",
        url: "https://www.nhs.uk/baby/health/is-your-baby-or-toddler-seriously-ill/",
        region: "UK",
      },
    ],
  },
  {
    id: "safe-sleep",
    title: "Safe sleep",
    summary:
      "A few simple habits — back to sleep, a clear flat cot, and sharing your room for the first 6 months — greatly reduce the risk of sudden infant death. Here is the current guidance, including honest advice for nights when co-sleeping happens.",
    sections: [
      {
        heading: "The basics that matter most",
        paragraphs: [
          "Put your baby on their back for every sleep, day and night, until they are a year old. Once they can roll both ways by themselves, you do not need to keep repositioning them — just always start them on their back.",
          "Give them their own sleep space — a cot, crib or Moses basket — with a firm, flat, waterproof mattress. Anything that tilts a sleep surface more than a little is not safe, which is why the AAP advises against inclined sleepers entirely.",
          "Keep your baby in the same room as you, for every sleep, for at least the first 6 months. The Lullaby Trust and the AAP agree on this — being nearby lowers the risk of sudden infant death syndrome (SIDS).",
        ],
      },
      {
        heading: "Keep the cot clear",
        paragraphs: [
          "A clear cot is a safe cot: no pillows, duvets, cot bumpers, soft toys, pods, nests or wedges. It can look bare to adult eyes — that is exactly right.",
          "Weighted blankets, weighted sleeping bags and weighted swaddles should never be used for babies. A well-fitted baby sleeping bag, or firmly tucked lightweight blankets no higher than the shoulders, is all the bedding they need.",
          "Place your baby with their feet at the foot of the cot so they cannot wriggle down under any bedding.",
        ],
      },
      {
        heading: "Temperature, smoke and swaddling",
        paragraphs: [
          "Overheating raises the risk of SIDS, so aim for a room around 16–20°C and dress your baby in light layers with nothing on their head indoors. Check their chest or the back of their neck — hands and feet often feel cool and are a poor guide.",
          "Keep your baby's world smoke-free, in pregnancy and after. Smoking is one of the biggest risk factors for SIDS, and it makes any co-sleeping much more dangerous.",
          "If you swaddle, keep it light, below the shoulders, and stop as soon as your baby shows signs of rolling — a swaddled baby who ends up face-down is at serious risk.",
        ],
      },
      {
        heading: "Co-sleeping: the honest version",
        paragraphs: [
          "Many parents end up sharing a bed at some point, planned or not, and you deserve real guidance rather than a lecture. The safest setup is still a cot by your bed — but if your baby may end up in bed with you, plan for it.",
          "Make the bed safer: baby on their back, on a firm mattress, away from pillows and with adult bedding kept well clear — a baby sleeping bag helps give them their own bedding. Make sure they cannot fall out or get wedged, and keep pets and other children out of the bed.",
          "Never co-sleep if you or anyone in the bed has drunk alcohol, taken drugs or medicines that make you drowsy, or smokes — and never sleep with a baby on a sofa or armchair, which is far more dangerous than a bed. If your baby was premature or very small at birth, a separate sleep space is the safer choice. Crucially: if you are exhausted enough to fear falling asleep while feeding, feeding on a prepared bed is safer than a sofa.",
        ],
      },
      {
        heading: "Dummies, feeding and other protective things",
        paragraphs: [
          "A dummy (pacifier in the US) offered at every sleep is associated with a lower risk of SIDS, so if your baby likes one, there is no need to feel guilty about it. If you are breastfeeding, it is sensible to wait until feeding is going well — usually a few weeks in.",
          "Do not force a dummy on a baby who refuses it, and do not pop it back in once they are asleep — it is fine if it falls out.",
          "Breastfeeding, even partially, is also associated with lower SIDS risk — one factor among many, not a judgement on how you feed. No product, sensor or monitor can substitute for these basics, however reassuring the marketing sounds.",
        ],
      },
    ],
    sources: [
      {
        title: "Safer sleep overview",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/safer-sleep-overview/",
        region: "UK",
      },
      {
        title: "Co-sleeping with your baby",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/co-sleeping/",
        region: "UK",
      },
      {
        title: "Room sharing",
        org: "Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/baby-safety/safer-sleep-information/room-sharing/",
        region: "UK",
      },
      {
        title: "How to Keep Your Sleeping Baby Safe: AAP Policy Explained",
        org: "AAP / HealthyChildren.org",
        url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/a-parents-guide-to-safe-sleep.aspx",
        region: "US",
      },
      {
        title: "Sleep-Related Infant Deaths: Updated 2022 Recommendations",
        org: "AAP",
        url: "https://publications.aap.org/pediatrics/article/150/1/e2022057990/188304/Sleep-Related-Infant-Deaths-Updated-2022",
        region: "US",
      },
    ],
  },
  {
    id: "crying-and-colic",
    title: "Crying and colic",
    summary:
      "Healthy babies cry a lot — it builds to a peak around 6 to 8 weeks and eases by 3 to 4 months. Knowing that curve, and having a plan for the hardest moments, genuinely helps.",
    sections: [
      {
        heading: "The normal crying curve",
        paragraphs: [
          "From about 2 weeks old, crying increases week by week, peaks around 6 to 8 weeks, then gradually settles by 3 to 4 months. This pattern shows up in babies everywhere — it is development, not something you are doing wrong.",
          "Some of this crying comes in the evening, resists all soothing, and stops as mysteriously as it started. Health professionals call this the Period of PURPLE Crying: the peak, the unpredictability, the resistance to soothing, the pained-looking face, the long bouts, usually in the evening.",
          "A baby can be entirely healthy and still cry for hours. That is a hard sentence to live with, but it is true — and it passes.",
        ],
      },
      {
        heading: "What colic actually means",
        paragraphs: [
          "Colic is the label used when an otherwise well baby cries a lot for no obvious reason — the NHS working definition is more than 3 hours a day, 3 days a week, for at least a week.",
          "Here is the honest part: nobody fully knows what causes it. Wind, gut immaturity and overstimulation are all theories; none is proven. Anti-colic drops and special teats help some families, but the evidence behind most colic products is thin.",
          "Colic almost always fades by 3 to 4 months. If crying comes with poor weight gain, vomiting, blood in the poo or feeding problems, talk to your GP or pediatrician — occasionally something like cows' milk allergy is at work, and it is worth checking before changing your baby's diet.",
        ],
      },
      {
        heading: "Soothing things worth trying",
        paragraphs: [
          "Holding close or skin-to-skin, gentle motion, a warm bath, sucking (breast, dummy or clean finger), a walk outside, white noise or soft repetitive sound — different babies respond to different things, so it is fine to experiment.",
          "Comforting methods often work better early in a cry than at full volume, and sometimes nothing works at all. That is not a verdict on your parenting.",
          "You cannot spoil a young baby by responding to their cries — comfort freely.",
        ],
      },
      {
        heading: "When it is too much (this matters most)",
        paragraphs: [
          "If the crying is overwhelming you, it is OK to put your baby down safely on their back in the cot and step into another room for a few minutes to breathe. A crying baby alone in a cot is safe; an exhausted parent at breaking point holding them is not.",
          "Never, ever shake a baby — a few seconds of shaking can cause lifelong brain injury. This is the heart of the ICON message: infant crying is normal, comforting can help, it is OK to walk away, never shake a baby.",
          "Hand the baby over when you can — partner, friend, grandparent — and tell someone how you are feeling. Your health visitor or GP (UK) or pediatrician (US) will take 'the crying is breaking me' seriously as a reason to call; it is a common one, and asking for help is a strength.",
        ],
      },
      {
        heading: "When crying might mean illness",
        paragraphs: [
          "Most crying is normal, but a change in the cry can be a signal. A weak, high-pitched or continuous cry that does not sound like your baby is worth urgent advice.",
          "Crying alongside fever, vomiting, refusal to feed, unusual sleepiness or fewer wet nappies is about the illness, not colic — use the fever and when-to-get-help guidance.",
          "And always, if your instincts say this is different, get them checked. No one will mind.",
        ],
      },
    ],
    urgent: [
      "A weak, high-pitched or continuous cry quite unlike their normal cry — get urgent advice from 111 (UK) or your pediatrician (US) the same day",
      "Inconsolable crying and your baby is floppy, hard to wake or not responding — call 999 (UK) or 911 (US)",
      "Crying with a fever and a rash that does not fade under a glass — call 999 (UK) or 911 (US)",
      "Crying with green vomit, blood in the poo, or a swollen or tender tummy — see a doctor the same day",
      "A baby under 3 months crying with a temperature of 38°C or more — call your GP or 111 (UK) or your pediatrician (US) straight away",
      "If you are frightened you might hurt or shake your baby — put them down safely in the cot, leave the room, and call someone: a trusted person, your GP or 111 (UK), or your pediatrician (US)",
    ],
    sources: [
      {
        title: "Colic",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/colic/",
        region: "UK",
      },
      {
        title: "ICON — Babies cry, you can cope",
        org: "ICON",
        url: "https://iconcope.org/",
        region: "UK",
      },
      {
        title: "The Period of PURPLE Crying",
        org: "Seattle Children's",
        url: "https://www.seattlechildrens.org/health-safety/parenting/purple-education-crying/",
        region: "US",
      },
      {
        title: "Is your baby or toddler seriously ill?",
        org: "NHS",
        url: "https://www.nhs.uk/baby/health/is-your-baby-or-toddler-seriously-ill/",
        region: "UK",
      },
    ],
  },
  {
    id: "jaundice",
    title: "Newborn jaundice",
    summary:
      "A yellow tinge to the skin and eyes is one of the most common newborn findings — usually harmless and gone within a fortnight. What matters is the timing: very early or long-lasting jaundice needs a check.",
    sections: [
      {
        heading: "Why it is so common",
        paragraphs: [
          "More than half of newborns get some jaundice. It happens because babies are born with extra red blood cells, and their brand-new liver takes a little while to clear the yellow pigment (bilirubin) left over as those cells break down.",
          "It typically appears around 2 days after birth, is most noticeable around days 3 to 5, and usually fades on its own by about 2 weeks — a little longer in premature babies.",
          "On darker skin the yellow tinge can be harder to spot — the whites of the eyes and the gums are the most reliable places to look.",
        ],
      },
      {
        heading: "When the timing matters",
        paragraphs: [
          "Jaundice in the first 24 hours of life is different: it always needs urgent medical assessment, because it can signal an underlying problem. Contact your midwife or maternity unit (UK) or pediatrician (US) straight away — they will check a bilirubin level quickly.",
          "Jaundice still visible after 2 weeks (or 3 weeks in a premature baby) is called prolonged jaundice. It is usually harmless — often related to breast milk and nothing to change — but it needs a simple blood test to rule out rarer causes, so mention it to your midwife, health visitor or doctor.",
          "In between those windows, jaundice in a baby who is feeding well and alert is generally the ordinary kind. Your midwife or doctor can always measure it if there is any doubt — the check is quick and painless.",
        ],
      },
      {
        heading: "What helps at home",
        paragraphs: [
          "Feeding often is the most helpful thing you can do — milk helps your baby clear bilirubin through their poo and wee. Aim to wake a sleepy jaundiced baby for feeds rather than letting long gaps stretch out.",
          "Putting your baby in direct sunlight is not a treatment and is not recommended — newborn skin burns easily.",
          "Jaundiced babies can be extra sleepy, which can quietly undermine feeding. If your baby is hard to rouse for feeds or feeding is dwindling, get them seen the same day.",
        ],
      },
      {
        heading: "If treatment is needed",
        paragraphs: [
          "If the bilirubin level is high, the usual treatment is phototherapy — your baby lies under a special blue light (or on a light blanket) that helps their body break the pigment down. It is painless and works well, usually within a day or two.",
          "Needing phototherapy does not mean anything went wrong or that anyone missed something — some babies simply need a little help while their liver catches up.",
          "One thing worth knowing: pale, chalky-white poo or persistently dark urine in a jaundiced baby can point to a rare liver problem that does best with early treatment — tell your midwife, health visitor or doctor about it the same day.",
        ],
      },
    ],
    urgent: [
      "Jaundice appearing in the first 24 hours after birth — call your midwife or maternity unit (UK) or your pediatrician (US) straight away",
      "A jaundiced baby who is very sleepy, hard to wake, or feeding much less than usual — see a doctor the same day",
      "Jaundice that is deepening or spreading, or a baby who seems floppy or unwell with it — see a doctor the same day",
      "Pale, chalky-white poo or dark urine in a jaundiced baby — tell your midwife, health visitor or doctor the same day",
      "Jaundice still visible at 2 weeks old (3 weeks if premature) — book a check with your GP or health visitor (UK) or pediatrician (US)",
    ],
    sources: [
      {
        title: "Newborn jaundice",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/jaundice-newborn/",
        region: "UK",
      },
      {
        title: "Newborn jaundice — treatment",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/jaundice-newborn/treatment/",
        region: "UK",
      },
      {
        title: "Prolonged jaundice",
        org: "Cambridge University Hospitals NHS",
        url: "https://www.cuh.nhs.uk/patient-information/prolonged-jaundice/",
        region: "UK",
      },
    ],
  },
  {
    id: "reflux-and-spitting-up",
    title: "Reflux and spitting up",
    summary:
      "Bringing up milk is part of life with a young baby — at least 4 in 10 do it, and most grow out of it by their first birthday. The job is telling everyday spit-up from the few situations that need a doctor.",
    sections: [
      {
        heading: "Spitting up is usually just spitting up",
        paragraphs: [
          "Babies have a short food pipe and a relaxed valve at the top of the stomach, so milk comes back up easily — during feeds, after feeds, sometimes an impressive while after feeds. It usually starts before 8 weeks old and can happen many times a day.",
          "A baby who spits up but is content, gaining weight and feeding happily — the classic 'happy spitter' — does not need any treatment. It is a laundry problem, not a health problem.",
          "It nearly always improves as the muscles mature and your baby spends more time upright, and most babies have stopped by 12 months.",
        ],
      },
      {
        heading: "Silent reflux",
        paragraphs: [
          "Some babies reflux milk up but swallow it back down instead of spitting it out — so-called silent reflux. There is no mess to see, which makes it confusing.",
          "Clues include gulping and grimacing after feeds, coughing or hiccupping a lot, unsettled arching during or after feeds, and hoarse-sounding crying.",
          "Plenty of these behaviours are also just normal baby behaviour, which is honestly why silent reflux is tricky to pin down — if feeds are consistently distressing, talk it through with your health visitor, GP or pediatrician rather than guessing alone.",
        ],
      },
      {
        heading: "Things that genuinely help",
        paragraphs: [
          "Smaller, more frequent feeds put less pressure on a small stomach. Holding your baby upright during and for a while after feeds gives gravity a chance to help, and burping partway through a feed suits some babies.",
          "If you are bottle feeding, check the teat flow is not too fast, and make up formula exactly as directed. Do not switch formulas or restrict your own diet on a hunch — get advice first.",
          "For sleep, keep following safe sleep advice: on their back, on a firm flat mattress. Do not raise or tilt the cot, and do not use sleep positioners or wedges — reflux is not a reason to compromise safe sleep.",
        ],
      },
      {
        heading: "An honest word about treatment",
        paragraphs: [
          "Most refluxy babies need no medicine at all — time is the treatment. When something is tried, doctors usually start with feeding tweaks, then sometimes thickeners or alginates (such as infant Gaviscon).",
          "Acid-suppressing medicines help the small number of babies with true acid-related disease, but the evidence that they help ordinary unsettled, spitty babies is weak, and they are prescribed more often than the evidence supports. It is entirely reasonable to ask your doctor what a medicine is expected to change and when to stop it.",
          "See your GP or pediatrician if home measures have not helped after 2 weeks, if reflux starts for the first time after 6 months, if it continues beyond 1 year, or if your baby is not gaining weight — and any time you are struggling to cope with it.",
        ],
      },
    ],
    urgent: [
      "Green or yellow-green vomit — go to A&E (UK) or the ER (US) now",
      "Repeated forceful, projectile vomiting after feeds, especially around 4 to 6 weeks old and hungry again straight after — see a doctor the same day",
      "Blood in vomit, or vomit that looks like coffee grounds — see a doctor the same day",
      "Signs of dehydration: far fewer wet nappies, a dry mouth, or a sunken soft spot — see a doctor the same day",
      "Vomiting with a fever and your baby is floppy, hard to wake or not responding — call 999 (UK) or 911 (US)",
      "Vomiting with a swollen, tender tummy or crying that will not settle — see a doctor the same day",
    ],
    sources: [
      {
        title: "Reflux in babies",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/reflux-in-babies/",
        region: "UK",
      },
      {
        title: "Pyloric stenosis — information for parents",
        org: "Cambridge University Hospitals NHS",
        url: "https://www.cuh.nhs.uk/patient-information/pyloric-stenosis-information-for-parents/",
        region: "UK",
      },
      {
        title: "Reflux in babies",
        org: "Cleveland Clinic",
        url: "https://my.clevelandclinic.org/health/diseases/reflux-in-babies",
        region: "US",
      },
    ],
  },
  {
    id: "skin-and-rashes",
    title: "Skin and rashes",
    summary:
      "Baby skin produces a remarkable variety of spots, flakes and blotches, and nearly all of them are harmless. The one every parent should know cold is the glass test for a rash that does not fade.",
    sections: [
      {
        heading: "Very normal newborn skin",
        paragraphs: [
          "Baby acne — small red or white pimples on the cheeks and nose — is common in the first weeks and clears by itself; it needs no creams, no scrubbing, nothing. Tiny white spots called milia on the nose and face are equally harmless.",
          "Cradle cap is the greasy, yellowish, scaly patching on the scalp (sometimes eyebrows too). Softening the scales with a little baby oil or an emollient and gently brushing them away helps — but do not pick, and see a pharmacist if it spreads or looks sore.",
          "Dry or peeling skin is standard issue for newborns, especially babies born past their due date. A simple fragrance-free emollient is all it usually needs.",
        ],
      },
      {
        heading: "Nappy rash (diaper rash)",
        paragraphs: [
          "Red, sore skin in the nappy area comes from wee and poo sitting against warm skin. Frequent changes, gentle cleaning with water or fragrance-free wipes, and proper nappy-free kicking time each day are the fixes that matter.",
          "A thin layer of barrier cream at each change protects healing skin — thin is the key word, so the nappy can still do its job.",
          "If the rash is bright red, has satellite spots at its edges, or is not settling after a few days, ask a pharmacist — a thrush (yeast) nappy rash needs an antifungal cream, and a pharmacist can supply one. See a doctor if the skin is broken, blistered or your baby seems unwell.",
        ],
      },
      {
        heading: "Eczema and heat rash",
        paragraphs: [
          "Eczema shows up as dry, itchy, red or darker patches — often in the creases of elbows and knees, or on the face. On brown and black skin the redness can be subtle and the patches may look grey, purplish or darker instead.",
          "Regular emollients, fragrance-free washing and keeping nails short do most of the work; see your GP or pediatrician if it is upsetting sleep or not improving, because prescription creams genuinely help.",
          "Heat rash (prickly heat) is a crop of small raised spots that appears when a baby is hot and fades once they cool down — a nudge to remove a layer rather than a cause for worry.",
        ],
      },
      {
        heading: "The glass test — the one to memorise",
        paragraphs: [
          "If your baby has a rash and seems unwell, press the side of a clear glass firmly against the spots. Most rashes fade (blanch) under the pressure — a rash you can still see clearly through the glass can be a sign of meningitis or sepsis, and that is a 999 (UK) or 911 (US) emergency.",
          "Two important caveats: on darker skin the rash can be harder to see, so check paler areas such as the palms, soles, tummy and eyelids. And early in the illness a meningitis rash can still fade under glass — so a fading rash is not an all-clear.",
          "Do not wait for a rash at all if your baby seems seriously unwell — fever with a baby who is floppy, hard to wake, breathing oddly, or has an unusual high-pitched cry needs emergency help, rash or no rash.",
        ],
      },
    ],
    urgent: [
      "A rash that does not fade when a glass is pressed against it — call 999 (UK) or 911 (US)",
      "A rash with fever and your baby is floppy, unusually sleepy or hard to wake — call 999 (UK) or 911 (US)",
      "Sudden swelling of the lips, tongue or face, or any difficulty breathing alongside a rash — call 999 (UK) or 911 (US)",
      "A baby under 3 months with a rash and a temperature of 38°C or more — call your GP or 111 (UK) or your pediatrician (US) straight away",
      "Skin that is blistering, weeping, spreading fast or looks infected — see a doctor the same day",
    ],
    sources: [
      {
        title: "Rashes in babies and children",
        org: "NHS",
        url: "https://www.nhs.uk/symptoms/rashes-babies-and-children/",
        region: "UK",
      },
      {
        title: "Nappy rash",
        org: "NHS",
        url: "https://www.nhs.uk/baby/caring-for-a-newborn/nappy-rash/",
        region: "UK",
      },
      {
        title: "What is the 'meningitis rash'?",
        org: "Meningitis Research Foundation",
        url: "https://www.meningitis.org/news-and-blogs/what-is-the-meningitis-rash/",
        region: "UK",
      },
      {
        title: "The meningitis glass test",
        org: "Meningitis Now",
        url: "https://www.meningitisnow.org/meningitis-explained/signs-and-symptoms/glass-test/",
        region: "UK",
      },
    ],
  },
  {
    id: "common-illnesses",
    title: "Coughs, colds and other common illnesses",
    summary:
      "Small children catch a lot of viruses — often eight or more a year — and most just need time, fluids and comfort. The main skill is spotting the breathing signs that mean a cold has become something more.",
    sections: [
      {
        heading: "Colds",
        paragraphs: [
          "Snotty noses are a near-permanent feature of the first years, especially once nursery or daycare starts. A cold typically means a blocked nose, sneezing, mild cough and general grumpiness for a week or so.",
          "Babies feed badly with blocked noses, so help there first: saline drops or spray before feeds, a nasal aspirator (snot sucker) if your baby tolerates it, and keeping their head end of things upright while awake and in your arms.",
          "Cough and cold medicines are not suitable for babies — fluids, rest and infant paracetamol or ibuprofen (following the age rules) for discomfort are the honest toolkit.",
        ],
      },
      {
        heading: "Bronchiolitis and RSV",
        paragraphs: [
          "Bronchiolitis is a chest infection of babies, usually caused by RSV, and almost all children get RSV by age 2. It starts like a cold, then brings a cough and sometimes faster or noisier breathing; symptoms are usually worst between days 3 and 5, and the cough can rumble on for up to 3 weeks.",
          "Most babies recover at home. Offer smaller, more frequent feeds, keep them upright in your arms when awake, and keep the air smoke-free.",
          "The watch-point is breathing effort. Look at their bare chest now and then: fast breathing, the skin sucking in under or between the ribs, grunting with each breath out, flaring nostrils, or pauses in breathing all mean they need help urgently — as does taking half feeds or less, or a dry nappy for 12 hours.",
        ],
      },
      {
        heading: "Sticky eyes and conjunctivitis",
        paragraphs: [
          "Sticky eyes without redness are very common in young babies and usually just a slow-to-open tear duct — clean gently with cooled boiled water and cotton wool, wiping once from the nose side outwards, a fresh piece per wipe.",
          "Conjunctivitis proper makes the white of the eye red or pink, often with gritty, gluey discharge. It usually clears by itself; the same gentle cleaning helps, and a pharmacist can advise.",
          "One special case: a baby under 28 days old with a red eye, or lots of pus from the eye, needs to be seen the same day — call your GP or 111 (UK) or your pediatrician (US).",
        ],
      },
      {
        heading: "Oral thrush",
        paragraphs: [
          "Thrush shows up as white patches on the tongue, gums or inside the cheeks that do not wipe away (a milky tongue that wipes clean is just milk). It can make some babies fussy at feeds, though many are untroubled.",
          "It is common, mild and treatable — your GP, health visitor or pharmacist (UK) or pediatrician (US) can recommend an antifungal gel or drops suitable for your baby's age.",
          "If you are breastfeeding, thrush can pass between your baby's mouth and your nipples (watch for new nipple pain or itching), so you may both need treating at once — and keep feeding; there is no need to stop.",
        ],
      },
      {
        heading: "Nursery and childcare: who stays home?",
        paragraphs: [
          "The UK guidance is more relaxed than many parents expect: a child with a mild cold or conjunctivitis who seems well in themselves can go to childcare — there is no exclusion period for either.",
          "The firm rule is for tummy bugs: after diarrhoea or vomiting, children stay home until 48 hours after the last episode. And a child with a fever, or who is clearly unwell, should stay home until they are better.",
          "US daycares set their own policies and are often stricter, so check yours — but the same principles (fever-free and well enough to join in) are the usual core.",
        ],
      },
    ],
    urgent: [
      "Pauses in breathing of more than 10 seconds, or grunting with every breath out — call 999 (UK) or 911 (US)",
      "The skin sucking in under or between the ribs, very fast breathing, or flaring nostrils — call 999 (UK) or 911 (US)",
      "Blue, grey or ashen colour of the lips, tongue or skin — call 999 (UK) or 911 (US)",
      "Your baby is floppy, unusually sleepy or will not stay awake — call 999 (UK) or 911 (US)",
      "Taking half their usual feeds or less over 2 to 3 feeds, or a dry nappy for 12 hours or more — get urgent advice from 111 or your GP (UK) or your pediatrician (US) the same day",
      "A baby under 3 months with a temperature of 38°C or more — call your GP or 111 (UK) or your pediatrician (US) straight away",
      "A baby under 28 days old with a red eye or lots of pus from the eye — see a doctor the same day",
    ],
    sources: [
      {
        title: "Bronchiolitis",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/bronchiolitis/",
        region: "UK",
      },
      {
        title: "Respiratory syncytial virus (RSV)",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/respiratory-syncytial-virus-rsv/",
        region: "UK",
      },
      {
        title: "Is my child too ill for school?",
        org: "NHS",
        url: "https://www.nhs.uk/live-well/is-my-child-too-ill-for-school/",
        region: "UK",
      },
      {
        title: "Public health exclusion periods in children and young people's settings",
        org: "UKHSA / GOV.UK",
        url: "https://www.gov.uk/government/publications/health-protection-in-schools-and-other-childcare-facilities/public-health-exclusion-periods-in-children-and-young-peoples-settings",
        region: "UK",
      },
      {
        title: "Conjunctivitis",
        org: "NHS",
        url: "https://www.nhs.uk/conditions/conjunctivitis/",
        region: "UK",
      },
    ],
  },
  {
    id: "vaccinations",
    title: "Vaccinations",
    summary:
      "Vaccines protect your baby against diseases that used to be common and are now rare precisely because of vaccination. Here is how the schedules work, what is normal afterwards, and where to find your country's up-to-date dates.",
    sections: [
      {
        heading: "Why they matter",
        paragraphs: [
          "The first-year vaccines protect against illnesses — whooping cough, meningitis, measles among them — that are at their most dangerous in babies. Because vaccination has made these diseases rare, it is easy to forget what they did; the vaccines are why we get to forget.",
          "Vaccine safety is monitored continuously, on a scale very few medicines match, and serious side effects are rare. Your questions are welcome ones — health visitors, practice nurses and pediatricians answer them every day and would far rather you asked than worried quietly.",
          "Vaccinating your baby also shelters those who cannot be vaccinated yet — including everyone else's newborns.",
        ],
      },
      {
        heading: "How the schedules work",
        paragraphs: [
          "Rather than reproduce every date here (schedules change — the UK's was updated in July 2025 and again in January 2026), we would point you to the live source. In the UK, vaccinations start at 8 weeks and come in a handful of grouped appointments in the first year; the NHS page linked below always shows the current schedule, and your GP surgery invites you automatically.",
          "In the US, the schedule most pediatricians follow is published by the American Academy of Pediatrics. Worth knowing honestly: the federal (CDC) schedule was substantially changed in 2025–26, and the AAP's 2026 schedule continues to recommend the full set of routine childhood vaccines — so your pediatrician, working from the AAP schedule linked below, is the most helpful guide.",
          "If you have missed appointments — a house move, illness, life — it is never too late to catch up, and nobody will judge you for it. One call to your GP surgery or pediatrician restarts things.",
        ],
      },
      {
        heading: "What is normal after the jabs",
        paragraphs: [
          "A sore or slightly red patch on the leg, extra sleepiness or grizzliness, going off feeds a little, and a mild temperature for a day or two are all normal signs of an immune system doing its homework.",
          "Comfort works: cuddles, feeds, and infant paracetamol if they are miserable with it (following the age rules). Any fever usually settles within 48 hours.",
          "If something feels beyond the ordinary — a fever that keeps climbing, a baby who seems properly unwell rather than grumpy — use the usual fever rules and get advice. Vaccination day does not suspend the under-3-months fever rule, though do mention the jabs when you call.",
        ],
      },
      {
        heading: "The MenB paracetamol note (UK)",
        paragraphs: [
          "The MenB vaccine (given at the 8- and 12-week appointments in the UK) commonly causes fever, so UK guidance is to give infant paracetamol prophylactically: three doses of 2.5ml (60mg), the first at or soon after the appointment, the second 4 to 6 hours later, and the third 4 to 6 hours after that.",
          "This is a deliberate exception to the usual paracetamol rules for young babies — it applies only after MenB vaccination, and your practice nurse will talk you through it. No routine paracetamol is needed after the MenB booster at 1 year.",
          "US readers: this specific advice is a UK programme detail — follow your pediatrician's advice about fever medicine after shots.",
        ],
      },
    ],
    urgent: [
      "Signs of a serious allergic reaction — sudden swelling of the face, lips or tongue, difficulty breathing, or collapse, usually within minutes of the jab — call 999 (UK) or 911 (US)",
      "A baby who is floppy, hard to wake or not responding after vaccination — call 999 (UK) or 911 (US)",
      "An unusual, high-pitched cry that goes on for hours, or a fever that is not settling within 48 hours — get advice from 111 or your GP (UK) or your pediatrician (US) the same day",
      "A rash that does not fade under a glass, at any time — call 999 (UK) or 911 (US)",
    ],
    sources: [
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
        title: "Using paracetamol to prevent and treat fever after MenB vaccination",
        org: "UKHSA / GOV.UK",
        url: "https://www.gov.uk/government/publications/menb-vaccine-and-paracetamol/using-paracetamol-to-prevent-and-treat-fever-after-menb-vaccination",
        region: "UK",
      },
      {
        title: "All About the AAP Recommended Immunization Schedule",
        org: "AAP / HealthyChildren.org",
        url: "https://www.healthychildren.org/English/safety-prevention/immunizations/Pages/Recommended-Immunization-Schedules.aspx",
        region: "US",
      },
      {
        title: "AAP's 2026 immunization schedule keeps routine recommendations intact",
        org: "AAP",
        url: "https://publications.aap.org/aapnews/news/34141/AAP-s-2026-immunization-schedule-keeps-routine",
        region: "US",
      },
    ],
  },
  {
    id: "teething",
    title: "Teething",
    summary:
      "First teeth usually arrive around 6 months, with huge normal variation either side. Teething makes gums sore and babies dribbly and grumpy — but it does not cause true fever, so a hot baby needs the fever rules, not the teething ones.",
    sections: [
      {
        heading: "What teething really looks like",
        paragraphs: [
          "Most babies cut their first tooth around 6 months, but anywhere from a few months old to after their first birthday is normal — a handful of babies are even born with a tooth. Later teeth do not mean anything is wrong.",
          "Real teething signs are local and mild: sore red gums where a tooth is coming, one flushed cheek, lots of dribbling, gnawing on everything in reach, and more grizzliness than usual for a few days.",
          "Some babies sail through with no fuss at all, and you simply spot a tooth one morning.",
        ],
      },
      {
        heading: "The myths worth clearing up",
        paragraphs: [
          "Teething can nudge a baby's temperature up very slightly, but there is no evidence it causes a true fever of 38°C (100.4°F) or more. A hot baby is an ill baby until proven otherwise — follow the fever guidance rather than waiting it out as teething.",
          "The same goes for diarrhoea, vomiting, rashes over the body or a baby who is really unwell: none of these is teething, however neatly the timing lines up with a new tooth.",
          "This matters because teething happens on and off for two years — long enough to accidentally explain away almost anything. When in doubt, treat the symptom on its own merits.",
        ],
      },
      {
        heading: "Safe ways to soothe sore gums",
        paragraphs: [
          "A teething ring chilled in the fridge — never the freezer, which can damage gums — gives them something cold and satisfying to chew. Gently rubbing the gum with a clean finger helps too.",
          "For babies already on solids (from around 6 months), chilled soft foods to gnaw can soothe — always with you right there, sitting with them, because of choking risk.",
          "If your baby is genuinely miserable, infant paracetamol or ibuprofen at the right dose for their age is reasonable (see the fever topic for the age rules). Wiping dribble often and using a barrier of plain emollient helps prevent the classic chin rash.",
        ],
      },
      {
        heading: "What to avoid",
        paragraphs: [
          "Teething necklaces and bracelets — amber or otherwise — are a strangulation and choking risk and are best avoided entirely; never tie a teething ring or a dummy around your baby's neck.",
          "Teething gels are less useful than the packaging suggests: the evidence they help is weak, and in the UK gels with local anaesthetic are pharmacy-only for a reason. US regulators have warned against benzocaine teething products for babies altogether. Homeopathic teething gels, granules and tablets have no evidence behind them, and some imported ones have been found unsafe.",
          "If nothing is touching the misery, it is fine to ask your health visitor, pharmacist or doctor to look — sometimes 'teething' turns out to be an ear infection or something else treatable.",
        ],
      },
    ],
    urgent: [
      "A temperature of 38°C (100.4°F) or more is not teething — follow the fever guidance, and for a baby under 3 months call your GP or 111 (UK) or your pediatrician (US) straight away",
      "Refusing feeds and producing far fewer wet nappies than usual — see a doctor the same day",
      "A baby who seems genuinely unwell, unusually sleepy or inconsolable, whatever their gums are doing — get advice from 111 (UK) or your pediatrician (US) the same day",
    ],
    sources: [
      {
        title: "Tips for helping your teething baby",
        org: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/teething/tips-for-helping-your-teething-baby/",
        region: "UK",
      },
      {
        title: "Teething",
        org: "NHS 111 Wales",
        url: "https://111.wales.nhs.uk/teething/",
        region: "UK",
      },
      {
        title: "Does teething cause fever? Signs and symptoms",
        org: "Cleveland Clinic",
        url: "https://health.clevelandclinic.org/teething-signs-and-symptoms",
        region: "US",
      },
    ],
  },
];
