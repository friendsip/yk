/* YourKids games — shared game content.
   Everything lives on the device; nothing is sent anywhere. */

/* ---------- Circle time: Buzz! counting rules ---------- */
export const BUZZ_RULES = [
  { id: 'tens',  name: 'Numbers ending in 0', desc: 'Say BUZZ instead of 10, 20, 30…', level: 'Little ones', target: 30, test: n => n % 10 === 0 },
  { id: 'even',  name: 'Even numbers', desc: 'Say BUZZ instead of 2, 4, 6, 8…', level: 'Little ones', target: 20, test: n => n % 2 === 0 },
  { id: 'five',  name: 'The 5 times table', desc: 'Say BUZZ instead of 5, 10, 15…', level: 'Everyone', target: 30, test: n => n % 5 === 0 },
  { id: 'three', name: 'The 3 times table', desc: 'Say BUZZ instead of 3, 6, 9…', level: 'Bigger kids', target: 30, test: n => n % 3 === 0 },
  { id: 'four',  name: 'The 4 times table', desc: 'Say BUZZ instead of 4, 8, 12…', level: 'Bigger kids', target: 40, test: n => n % 4 === 0 },
  { id: 'seven', name: 'Sevens (the classic)', desc: 'BUZZ on the 7 times table AND any number with a 7 in it.', level: 'Tricky!', target: 50, test: n => n % 7 === 0 || String(n).includes('7') },
];

/* ---------- Circle time: Odd One Out ---------- */
/* items: [{ t: big text/emoji, w: word (may be '') }], odd: index, why: reveal text */
export const ODD_ONE_OUT = [
  { level: 'easy', items: [{t:'🐶',w:'Dog'},{t:'🐱',w:'Cat'},{t:'🐰',w:'Rabbit'},{t:'🥕',w:'Carrot'}], odd: 3, why: 'A carrot is a vegetable — the others are animals.' },
  { level: 'easy', items: [{t:'🍎',w:'Apple'},{t:'🍌',w:'Banana'},{t:'🚗',w:'Car'},{t:'🍇',w:'Grapes'}], odd: 2, why: 'You can eat the others — please don’t eat the car.' },
  { level: 'easy', items: [{t:'🔴',w:'Red'},{t:'🐟',w:'Fish'},{t:'🔵',w:'Blue'},{t:'🟢',w:'Green'}], odd: 1, why: 'Red, blue and green are colours — a fish is not.' },
  { level: 'easy', items: [{t:'✈️',w:'Aeroplane'},{t:'🐦',w:'Bird'},{t:'🐘',w:'Elephant'},{t:'🦋',w:'Butterfly'}], odd: 2, why: 'Elephants can’t fly — the others all can.' },
  { level: 'easy', items: [{t:'🧦',w:'Sock'},{t:'🧤',w:'Glove'},{t:'👟',w:'Shoe'},{t:'🥾',w:'Boot'}], odd: 1, why: 'A glove goes on your hand — the others go on your feet.' },
  { level: 'easy', items: [{t:'🍦',w:'Ice cream'},{t:'❄️',w:'Snow'},{t:'☀️',w:'Sun'},{t:'🧊',w:'Ice'}], odd: 2, why: 'The sun is hot — the others are cold.' },
  { level: 'easy', items: [{t:'🚗',w:'Car'},{t:'🚤',w:'Boat'},{t:'🚌',w:'Bus'},{t:'🚲',w:'Bicycle'}], odd: 1, why: 'A boat travels on water — the others travel on roads.' },
  { level: 'easy', items: [{t:'🐄',w:'Cow'},{t:'🐖',w:'Pig'},{t:'🦁',w:'Lion'},{t:'🐑',w:'Sheep'}], odd: 2, why: 'A lion is a wild animal — the others live on farms.' },
  { level: 'easy', items: [{t:'🌙',w:'Moon'},{t:'🌳',w:'Tree'},{t:'⭐',w:'Star'},{t:'☀️',w:'Sun'}], odd: 1, why: 'You see the others up in the sky — trees grow from the ground.' },
  { level: 'easy', items: [{t:'🍰',w:'Cake'},{t:'🍪',w:'Biscuit'},{t:'🥦',w:'Broccoli'},{t:'🍭',w:'Lolly'}], odd: 2, why: 'Broccoli is a vegetable — the others are sweet treats.' },
  { level: 'easy', items: [{t:'👂',w:'Ear'},{t:'👀',w:'Eyes'},{t:'🧢',w:'Cap'},{t:'👃',w:'Nose'}], odd: 2, why: 'A cap is something you wear — the others are parts of your body.' },
  { level: 'easy', items: [{t:'🥄',w:'Spoon'},{t:'🍴',w:'Fork'},{t:'📖',w:'Book'},{t:'🔪',w:'Knife'}], odd: 2, why: 'You read a book — you eat with the others.' },
  { level: 'easy', items: [{t:'☔',w:'Umbrella'},{t:'🧥',w:'Raincoat'},{t:'🩳',w:'Shorts'},{t:'🥾',w:'Wellies'}], odd: 2, why: 'Shorts are for sunny days — the others keep the rain off.' },
  { level: 'easy', items: [{t:'🌷',w:'Tulip'},{t:'🌹',w:'Rose'},{t:'🌻',w:'Sunflower'},{t:'🍄',w:'Mushroom'}], odd: 3, why: 'A mushroom isn’t a flower — the others are.' },
  { level: 'easy', items: [{t:'🎹',w:'Piano'},{t:'📺',w:'Television'},{t:'🥁',w:'Drum'},{t:'🎸',w:'Guitar'}], odd: 1, why: 'You can’t play music ON a television — the others are instruments.' },
  { level: 'easy', items: [{t:'🚒',w:'Fire engine'},{t:'🚓',w:'Police car'},{t:'🚕',w:'Taxi'},{t:'🚑',w:'Ambulance'}], odd: 2, why: 'A taxi isn’t an emergency vehicle — the others rush to help.' },
  { level: 'tricky', items: [{t:'🔺',w:'Triangle'},{t:'🟥',w:'Square'},{t:'🔵',w:'Circle'},{t:'▬',w:'Rectangle'}], odd: 2, why: 'A circle has no corners or straight sides — the others do.' },
  { level: 'tricky', items: [{t:'2',w:''},{t:'4',w:''},{t:'7',w:''},{t:'6',w:''}], odd: 2, why: '7 is an odd number — the others are even.' },
  { level: 'tricky', items: [{t:'🐬',w:'Dolphin'},{t:'🐫',w:'Camel'},{t:'🦈',w:'Shark'},{t:'🐙',w:'Octopus'}], odd: 1, why: 'A camel lives in the desert — the others live in the sea.' },
  { level: 'tricky', items: [{t:'🍓',w:'Strawberry'},{t:'🍅',w:'Tomato'},{t:'🍋',w:'Lemon'},{t:'🍒',w:'Cherry'}], odd: 2, why: 'A lemon is yellow — the others are red.' },
  { level: 'tricky', items: [{t:'A',w:''},{t:'E',w:''},{t:'T',w:''},{t:'I',w:''}], odd: 2, why: 'A, E and I are vowels — T is a consonant.' },
  { level: 'tricky', items: [{t:'10',w:''},{t:'20',w:''},{t:'35',w:''},{t:'30',w:''}], odd: 2, why: '10, 20 and 30 are counting in tens — 35 isn’t.' },
  { level: 'tricky', items: [{t:'🐸',w:'Frog'},{t:'🦘',w:'Kangaroo'},{t:'🐢',w:'Tortoise'},{t:'🐇',w:'Rabbit'}], odd: 2, why: 'The others are famous jumpers — tortoises take it slow.' },
  { level: 'tricky', items: [{t:'3',w:''},{t:'6',w:''},{t:'11',w:''},{t:'9',w:''}], odd: 2, why: '3, 6 and 9 are in the 3 times table — 11 isn’t.' },
];

/* ---------- Circle time: Chain Reaction categories ---------- */
export const CHAIN_CATEGORIES = [
  { e: '🐾', name: 'Animals' },
  { e: '🍎', name: 'Things to eat' },
  { e: '🧸', name: 'Toys and games' },
  { e: '🎨', name: 'Colours' },
  { e: '🚗', name: 'Ways to travel' },
  { e: '👕', name: 'Things you can wear' },
  { e: '🏠', name: 'Things in the kitchen' },
  { e: '🌳', name: 'Things in the garden' },
  { e: '📚', name: 'Story and film characters' },
  { e: '⚽', name: 'Sports and games' },
  { e: '🐜', name: 'Minibeasts and bugs' },
  { e: '🎵', name: 'Songs you know' },
  { e: '😊', name: 'Things that make you happy' },
  { e: '🔊', name: 'Things that make a noise' },
];

/* ---------- Circle time: Make the Number levels ---------- */
export const MAKE_LEVELS = [
  { id: 'little', name: 'Little numbers (5–10)', min: 5, max: 10, hint: 'Try fingers, adds, or things in the room!' },
  { id: 'middle', name: 'Middling numbers (11–20)', min: 11, max: 20, hint: 'Adds, take-aways, doubles — anything counts!' },
  { id: 'big', name: 'Big numbers (21–50)', min: 21, max: 50, hint: 'Adds, take-aways, times tables — how many ways?' },
];

/* ---------- Quiz packs ---------- */
export const QUIZ_PACKS = [
  {
    id: 'animals', emoji: '🦁', name: 'Amazing Animals', ages: 'Ages 4–8', accent: 'coral',
    blurb: 'Legs, roars, babies and beasts.',
    questions: [
      { q: 'What sound does a cow make?', a: 'Moo!', fun: 'Cows really do make best friends in their herd.' },
      { q: 'What is a baby dog called?', a: 'A puppy', fun: 'A group of puppies is called a litter.' },
      { q: 'Which big grey animal has a trunk?', a: 'An elephant', fun: 'A trunk has no bones in it — it’s all muscle!' },
      { q: 'What do bees make that we can eat?', a: 'Honey', fun: 'Bees do a waggle dance to tell each other where the flowers are.' },
      { q: 'Which animal is the tallest in the whole world?', a: 'The giraffe', fun: 'A giraffe’s neck has the same number of bones as yours — seven!' },
      { q: 'How many legs does a spider have?', a: 'Eight', fun: 'Insects only have six — that’s one way to tell them apart.' },
      { q: 'What does a caterpillar turn into?', a: 'A butterfly (or a moth)', fun: 'It transforms inside a case called a chrysalis.' },
      { q: 'How many arms does an octopus have?', a: 'Eight', fun: 'Octopuses have three hearts, too!' },
      { q: 'Which bird is the biggest in the world — but cannot fly?', a: 'The ostrich', fun: 'An ostrich egg is the biggest egg in the world.' },
      { q: 'Which animal is called the king of the jungle?', a: 'The lion', fun: 'A lion’s roar can be heard up to 8 kilometres away.' },
    ],
  },
  {
    id: 'space', emoji: '🚀', name: 'Space & Our World', ages: 'Ages 5–9', accent: 'lavender',
    blurb: 'Planets, moons and the big blue sea.',
    questions: [
      { q: 'Which planet do we live on?', a: 'Earth', fun: 'It’s the only planet we know of with living things.' },
      { q: 'What lights up the sky at night and seems to change shape?', a: 'The Moon', fun: 'The shapes are called phases.' },
      { q: 'Is the Sun a planet or a star?', a: 'A star', fun: 'It’s the closest star to us — the next one is much, much further.' },
      { q: 'What do we call a person who travels into space?', a: 'An astronaut', fun: 'It comes from Greek words meaning “star sailor”.' },
      { q: 'Which planet is known as the Red Planet?', a: 'Mars', fun: 'It looks red because it’s covered in rusty red dust.' },
      { q: 'How many planets are in our solar system?', a: 'Eight', fun: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.' },
      { q: 'Which is the biggest planet of all?', a: 'Jupiter', fun: 'More than a thousand Earths could fit inside it.' },
      { q: 'Which planet is closest to the Sun?', a: 'Mercury', fun: 'A year on Mercury lasts only 88 days.' },
      { q: 'What covers more of the Earth — land or sea?', a: 'Sea', fun: 'About seven-tenths of our planet is ocean.' },
      { q: 'What do we call it when the Moon moves in front of the Sun?', a: 'A solar eclipse', fun: 'For a few minutes, day turns almost to night.' },
    ],
  },
  {
    id: 'words', emoji: '📚', name: 'Words & Stories', ages: 'Ages 4–8', accent: 'rose',
    blurb: 'Letters, rhymes and fairy tales.',
    questions: [
      { q: 'Which word rhymes with “cat” — dog or hat?', a: 'Hat', fun: 'Can you think of one more? (Bat! Mat! Sat!)' },
      { q: 'What is the first letter of the alphabet?', a: 'A', fun: 'And the last one is Z!' },
      { q: 'What is the opposite of “hot”?', a: 'Cold', fun: 'Opposites like these are called antonyms.' },
      { q: 'Who huffed and puffed and blew the house down?', a: 'The Big Bad Wolf', fun: 'The house of bricks was too strong for him.' },
      { q: 'What is the opposite of “big”?', a: 'Small (or little)', fun: '' },
      { q: 'Which girl went into the three bears’ house?', a: 'Goldilocks', fun: 'The little bear’s porridge was just right.' },
      { q: 'Who lost a glass slipper at the ball?', a: 'Cinderella', fun: 'It fitted perfectly, of course.' },
      { q: 'How many letters are in the alphabet?', a: '26', fun: 'Five are vowels: A, E, I, O and U.' },
      { q: 'What do we call a person who writes books?', a: 'An author', fun: 'The person who draws the pictures is the illustrator.' },
      { q: 'What do we call a word that means the same as another word?', a: 'A synonym', fun: 'Like “big” and “huge”.' },
    ],
  },
  {
    id: 'numbers', emoji: '🔢', name: 'Number Fun', ages: 'Ages 4–8', accent: 'teal',
    blurb: 'Quick sums and counting puzzles.',
    questions: [
      { q: 'What is 2 + 2?', a: '4', fun: '' },
      { q: 'How many fingers are on two hands?', a: '10', fun: '' },
      { q: 'What number comes after 9?', a: '10', fun: '' },
      { q: 'How many sides does a triangle have?', a: '3', fun: '“Tri” means three — like a tricycle’s three wheels.' },
      { q: 'How many days are in a week?', a: '7', fun: 'Can you say them all in order?' },
      { q: 'What is 10 take away 4?', a: '6', fun: '' },
      { q: 'What is double 6?', a: '12', fun: '' },
      { q: 'What is half of 10?', a: '5', fun: '' },
      { q: 'How many minutes are in an hour?', a: '60', fun: 'And 60 seconds in a minute.' },
      { q: 'How many months are in a year?', a: '12', fun: 'Which month is your birthday in?' },
    ],
  },
  {
    id: 'body', emoji: '🫀', name: 'My Amazing Body', ages: 'Ages 4–8', accent: 'sunshine',
    blurb: 'Bones, senses and you.',
    questions: [
      { q: 'What part of your body do you smell with?', a: 'Your nose', fun: '' },
      { q: 'What do you hear with?', a: 'Your ears', fun: 'Your ears also help you balance!' },
      { q: 'How many toes are on two feet?', a: '10', fun: '' },
      { q: 'What grows on top of your head?', a: 'Hair', fun: '' },
      { q: 'Which part of your body helps you taste?', a: 'Your tongue', fun: '' },
      { q: 'What should you do to your teeth twice a day?', a: 'Brush them', fun: 'For about two minutes each time.' },
      { q: 'What pumps blood all around your body?', a: 'Your heart', fun: 'Make a fist — your heart is about that size.' },
      { q: 'What are the hard parts inside your body called?', a: 'Bones', fun: 'Grown-ups have 206 — babies are born with around 300!' },
      { q: 'Whereabouts is your elbow?', a: 'In the middle of your arm', fun: 'Try licking it. (You can’t!)' },
      { q: 'How many senses do we usually talk about?', a: 'Five', fun: 'Seeing, hearing, smelling, tasting and touching.' },
    ],
  },
  {
    id: 'mixed', emoji: '🎈', name: 'The Mixed Bag', ages: 'All ages', accent: 'sky',
    blurb: 'A bit of everything, for everyone.',
    questions: [
      { q: 'How many wheels does a bicycle have?', a: 'Two', fun: '“Bi” means two — that’s where the name comes from.' },
      { q: 'What do we call frozen water?', a: 'Ice', fun: '' },
      { q: 'What is a baby cat called?', a: 'A kitten', fun: '' },
      { q: 'Which meal do we eat in the morning?', a: 'Breakfast', fun: 'It means “breaking” the night’s “fast”.' },
      { q: 'Which season comes after winter?', a: 'Spring', fun: '' },
      { q: 'Which is faster — a snail or a rabbit?', a: 'A rabbit', fun: 'A garden snail would take days to cross a football pitch.' },
      { q: 'What colour do you get when you mix blue and yellow?', a: 'Green', fun: '' },
      { q: 'How many colours are in a rainbow?', a: 'Seven', fun: 'Red, orange, yellow, green, blue, indigo, violet.' },
      { q: 'Name two things a plant needs to grow.', a: 'Light and water', fun: 'Soil and air help lots too.' },
      { q: 'What do you say when someone gives you a present?', a: 'Thank you!', fun: '' },
    ],
  },
];

/* ---------- Co-op: Find It Together prompts ---------- */
/* who: all | little | big  (who leads the hunt) */
export const FIND_PROMPTS = [
  { e: '🔴', text: 'Find something red', who: 'all' },
  { e: '🔵', text: 'Find something blue', who: 'all' },
  { e: '🟡', text: 'Find something yellow', who: 'all' },
  { e: '🟢', text: 'Find something green', who: 'all' },
  { e: '⚪', text: 'Find something round', who: 'all' },
  { e: '🐻', text: 'Find something soft', who: 'little' },
  { e: '🧱', text: 'Find something hard', who: 'little' },
  { e: '🐜', text: 'Find something tiny', who: 'little' },
  { e: '🧸', text: 'Find a toy', who: 'little' },
  { e: '📕', text: 'Find a book', who: 'little' },
  { e: '🔊', text: 'Find something that makes a noise', who: 'all' },
  { e: '🧢', text: 'Find something you can wear', who: 'all' },
  { e: '✨', text: 'Find something shiny', who: 'all' },
  { e: '🦓', text: 'Find something stripy', who: 'all' },
  { e: '👯', text: 'Find two things that match', who: 'all' },
  { e: '🌸', text: 'Find something that smells nice', who: 'all' },
  { e: '🅱️', text: 'Find something that starts with B', who: 'big' },
  { e: '🅾️', text: 'Find something that starts with S', who: 'big' },
  { e: '✏️', text: 'Find something with words on it', who: 'big' },
  { e: '🔲', text: 'Find something with more than four corners', who: 'big' },
  { e: '🔋', text: 'Find something that uses batteries or plugs in', who: 'big' },
  { e: '👟', text: 'Find something heavier than a shoe', who: 'big' },
  { e: '💪', text: 'Find something as long as your arm', who: 'big' },
  { e: '🕰️', text: 'Find something older than you', who: 'big' },
];

/* ---------- Co-op: Story Circle cards ---------- */
export const STORY_OPENER = { e: '📖', text: 'Once upon a time…' };
export const STORY_ENDER = { e: '🌟', text: '…and they all lived happily ever after. The End!' };
export const STORY_CARDS = [
  { e: '🐉', text: 'a friendly dragon' },
  { e: '🗝️', text: 'a tiny golden key' },
  { e: '🌧️', text: 'a very rainy day' },
  { e: '🚀', text: 'a rocket' },
  { e: '🏰', text: 'a castle' },
  { e: '🐈', text: 'a cheeky cat' },
  { e: '🎂', text: 'a birthday cake' },
  { e: '🌈', text: 'a rainbow' },
  { e: '👑', text: 'a lost crown' },
  { e: '🧙', text: 'a wizard' },
  { e: '🐢', text: 'a very slow tortoise' },
  { e: '🌲', text: 'a dark, dark forest' },
  { e: '🎈', text: 'a red balloon' },
  { e: '🚂', text: 'a little train' },
  { e: '🦖', text: 'a dinosaur' },
  { e: '🧺', text: 'a picnic' },
  { e: '⭐', text: 'a wishing star' },
  { e: '👢', text: 'a pair of magic boots' },
  { e: '🐳', text: 'an enormous whale' },
  { e: '🏝️', text: 'a desert island' },
  { e: '📦', text: 'a mysterious box' },
  { e: '🍪', text: 'the very last biscuit' },
  { e: '🦉', text: 'a wise old owl' },
  { e: '⛈️', text: 'a thunderstorm' },
  { e: '🎪', text: 'a circus' },
  { e: '🧜', text: 'a mermaid' },
  { e: '🌋', text: 'a rumbling volcano' },
  { e: '🐜', text: 'a very determined ant' },
  { e: '🎁', text: 'a surprise present' },
  { e: '🧀', text: 'a piece of cheese' },
];

/* ---------- Co-op: Copy Cat Crew actions ---------- */
export const ACTION_CARDS = [
  { e: '👏', text: 'Clap three times' },
  { e: '🦘', text: 'Hop like a kangaroo' },
  { e: '🌀', text: 'Turn around once' },
  { e: '🦁', text: 'Roar like a lion' },
  { e: '🐍', text: 'Wiggle like a snake' },
  { e: '🦶', text: 'Stomp your feet' },
  { e: '😜', text: 'Make a silly face' },
  { e: '🙌', text: 'Hands in the air' },
  { e: '👃', text: 'Touch your nose' },
  { e: '🐸', text: 'Jump like a frog' },
  { e: '💪', text: 'Show your muscles' },
  { e: '🦅', text: 'Flap your wings' },
];
