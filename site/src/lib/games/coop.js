import { $, $$, setScreen, shuffle, confettiBurst, startTimer, timerHTML, starMeterHTML, installPrimaryKey } from './common';
import { FIND_PROMPTS, STORY_OPENER, STORY_ENDER, STORY_CARDS, ACTION_CARDS } from './data';

/* Co-operative games for mixed ages — everyone on the same team */

/* ================= menu ================= */
function coopMenu() {
  setScreen(`
    <div class="stage-grid">
      <button class="stage-card" data-go="find" style="--card-accent: var(--app-teal)">
        <span class="stage-card__emoji">🔍</span>
        <span class="stage-card__label">Find It Together</span>
        <span class="stage-card__title">A treasure hunt around the room. Some finds are for the little ones, some for the bigger kids — fill the star meter as a team.</span>
        <span class="stage-card__go">Up and about &middot; 5–10 min &rarr;</span>
      </button>
      <button class="stage-card" data-go="story" style="--card-accent: var(--app-rose)">
        <span class="stage-card__emoji">📖</span>
        <span class="stage-card__label">Story Circle</span>
        <span class="stage-card__title">Picture cards appear one by one, and the group builds one big story together. Little ones name the picture; bigger ones spin the tale.</span>
        <span class="stage-card__go">Sitting down &middot; 10 min &rarr;</span>
      </button>
      <button class="stage-card" data-go="copycat" style="--card-accent: var(--app-sunshine)">
        <span class="stage-card__emoji">🐵</span>
        <span class="stage-card__label">Copy Cat Crew</span>
        <span class="stage-card__title">Watch a chain of silly actions, then do the whole chain together from memory. Every round it grows by one!</span>
        <span class="stage-card__go">Wiggly &middot; 5–10 min &rarr;</span>
      </button>
    </div>
    <p class="tool-note">No winners and losers between the children — the whole team wins together. Grown-ups are allowed (encouraged) to join in.</p>
  `);
  $$('[data-go]').forEach(b => b.addEventListener('click', () => {
    ({ find: findSetup, story: storySetup, copycat: copycatIntro })[b.dataset.go]();
  }));
}

function coopBack() {
  return '<p class="tool-note" style="text-align:center"><a href="#" id="back-menu">&larr; All co-operative games</a></p>';
}
function bindCoopBack() {
  $('#back-menu').addEventListener('click', (e) => { e.preventDefault(); coopMenu(); });
}

const WHO_PILL = {
  all: '<span class="stage-kicker stage-kicker--teal">Everyone hunt! 🏃</span>',
  little: '<span class="stage-kicker stage-kicker--rose">One for the little ones 🐣</span>',
  big: '<span class="stage-kicker">One for the bigger kids 🧢</span>',
};

/* ================= Find It Together ================= */
function findSetup() {
  let finds = 10;
  let mins = 0;
  setScreen(`
    <div class="play-head" style="padding-top:0">
      <span class="stage-kicker stage-kicker--teal">🔍 Find It Together</span>
      <p class="play-head__sub">One find at a time appears on screen. Hunt as a team — bring it back (or point at it) and tap <strong>Found it!</strong> to earn a star. Fill the whole meter and you all win.</p>
    </div>
    <p class="tool-note" style="text-align:center;margin:0 0 .3rem">How many finds?</p>
    <div class="chip-row" id="find-chips">
      ${[8, 10, 12].map(n => `<button class="feed-mode-chip ${n === finds ? 'is-active' : ''}" data-n="${n}">${n} stars</button>`).join('')}
    </div>
    <p class="tool-note" style="text-align:center;margin:0 0 .3rem">Race the clock?</p>
    <div class="chip-row" id="time-chips">
      <button class="feed-mode-chip is-active" data-m="0">No timer</button>
      <button class="feed-mode-chip" data-m="3">3 minutes</button>
      <button class="feed-mode-chip" data-m="5">5 minutes</button>
    </div>
    <div class="game-actions">
      <button class="app-btn app-btn--teal js-primary" id="start">Start the hunt!</button>
    </div>
    ${coopBack()}
  `);
  bindCoopBack();
  $$('#find-chips [data-n]').forEach(c => c.addEventListener('click', () => {
    finds = +c.dataset.n;
    $$('#find-chips .feed-mode-chip').forEach(x => x.classList.toggle('is-active', x === c));
  }));
  $$('#time-chips [data-m]').forEach(c => c.addEventListener('click', () => {
    mins = +c.dataset.m;
    $$('#time-chips .feed-mode-chip').forEach(x => x.classList.toggle('is-active', x === c));
  }));
  $('#start').addEventListener('click', () => findPlay(finds, mins));
}

function findPlay(finds, mins) {
  const pool = shuffle(FIND_PROMPTS);
  const state = { stars: 0, i: 0 };
  const deadline = mins ? performance.now() + mins * 60 * 1000 : null;
  let timer = null;

  function currentPrompt() {
    return pool[state.i % pool.length];
  }

  function render() {
    const p = currentPrompt();
    setScreen(`
      ${starMeterHTML(state.stars, finds)}
      ${mins ? timerHTML() : ''}
      <div class="bigcard" style="--card-accent: var(--app-teal)">
        ${WHO_PILL[p.who]}
        <div class="bigcard__emoji">${p.e}</div>
        <div class="bigcard__word" style="font-size:clamp(1.5rem,7vw,2.2rem)">${p.text}</div>
      </div>
      <div class="game-actions game-actions--row">
        <button class="app-btn app-btn--ghost" id="skip">Skip this one</button>
        <button class="app-btn app-btn--teal js-primary" id="found">Found it! ⭐</button>
      </div>
      ${coopBack()}
    `);
    bindCoopBack();
    if (deadline) {
      if (timer) timer.stop();
      const remaining = Math.max(0, (deadline - performance.now()) / 1000);
      timer = startTimer($('.timer'), remaining, findEnd, mins * 60);
    }
    $('#found').addEventListener('click', () => {
      state.stars += 1;
      state.i += 1;
      if (state.stars >= finds) return findEnd();
      render();
    });
    $('#skip').addEventListener('click', () => {
      state.i += 1;
      render();
    });
  }

  function findEnd() {
    if (timer) timer.stop();
    const won = state.stars >= finds;
    if (won) confettiBurst();
    setScreen(`
      ${starMeterHTML(state.stars, finds)}
      <div class="bigcard bigcard--win">
        <div class="bigcard__emoji">${won ? '🏆' : '⏰'}</div>
        <div class="bigcard__word">${won ? 'You found them all!' : 'Time’s up!'}</div>
        <div class="bigcard__sub">${won
          ? `All ${finds} stars, found as a team. Champion hunters, every one of you.`
          : `You found ${state.stars} of ${finds} — a brilliant team effort. One more hunt?`}</div>
      </div>
      <div class="game-actions">
        <button class="app-btn app-btn--teal js-primary" id="again">Hunt again</button>
      </div>
      ${coopBack()}
    `);
    bindCoopBack();
    $('#again').addEventListener('click', findSetup);
  }

  render();
}

/* ================= Story Circle ================= */
function storySetup() {
  setScreen(`
    <div class="play-head" style="padding-top:0">
      <span class="stage-kicker stage-kicker--rose">📖 Story Circle</span>
      <p class="play-head__sub">Cards appear one at a time. Go around the circle: whoever's turn it is adds the next bit of the story using the card. Little ones can just say what they see — bigger ones can add a twist!</p>
    </div>
    <div class="wizard-choices">
      <button class="wizard-choice" data-len="5">A short story <small>5 cards &middot; about 5 minutes</small></button>
      <button class="wizard-choice" data-len="8">A proper tale <small>8 cards &middot; about 10 minutes</small></button>
      <button class="wizard-choice" data-len="12">An epic saga <small>12 cards &middot; for committed storytellers</small></button>
    </div>
    ${coopBack()}
  `);
  bindCoopBack();
  $$('[data-len]').forEach(b => b.addEventListener('click', () => storyPlay(+b.dataset.len)));
}

function storyPlay(len) {
  const cards = [STORY_OPENER, ...shuffle(STORY_CARDS).slice(0, len), STORY_ENDER];
  const state = { i: 0 };

  function strip() {
    return `
      <div class="story-strip">
        ${cards.slice(0, state.i + 1).map((c, idx) =>
          `<span class="${idx === state.i ? 'is-now' : ''}">${c.e}</span>`).join('')}
      </div>`;
  }

  function render() {
    const card = cards[state.i];
    const isFirst = state.i === 0;
    const isLast = state.i === cards.length - 1;
    setScreen(`
      <div class="hud">
        <span class="hud-chip">Card <strong>${state.i + 1}</strong> of ${cards.length}</span>
      </div>
      <div class="bigcard bigcard--story" style="--card-accent: var(--app-rose)">
        <div class="bigcard__emoji" style="font-size:5rem">${card.e}</div>
        <div class="bigcard__word" style="font-size:clamp(1.5rem,7vw,2.2rem)">${card.text}</div>
        <div class="bigcard__hint">${isFirst ? 'The storyteller-in-chief begins…'
          : isLast ? 'Bring the story home — everyone says "The End!" together'
          : 'Next storyteller: work this into the tale!'}</div>
      </div>
      ${strip()}
      <div class="game-actions">
        <button class="app-btn js-primary" id="next">${isLast ? 'The End! 🌟' : 'Deal the next card'}</button>
      </div>
      ${coopBack()}
    `);
    bindCoopBack();
    $('#next').addEventListener('click', () => {
      if (isLast) return storyEnd();
      state.i += 1;
      render();
    });
  }

  function storyEnd() {
    confettiBurst();
    setScreen(`
      <div class="bigcard bigcard--win">
        <div class="bigcard__emoji">📖✨</div>
        <div class="bigcard__word">What a story!</div>
        <div class="bigcard__sub">Here's your whole tale in pictures. Can the group tell it back, start to finish? Littlest storyteller goes first!</div>
      </div>
      <div class="story-strip" style="font-size:1.8rem">
        ${cards.map(c => `<span>${c.e}</span>`).join('')}
      </div>
      <div class="game-actions">
        <button class="app-btn js-primary" id="again">Tell a new story</button>
      </div>
      ${coopBack()}
    `);
    bindCoopBack();
    $('#again').addEventListener('click', storySetup);
  }

  render();
}

/* ================= Copy Cat Crew ================= */
function copycatIntro() {
  setScreen(`
    <div class="play-head" style="padding-top:0">
      <span class="stage-kicker">🐵 Copy Cat Crew</span>
      <p class="play-head__sub">Actions appear one at a time — act each one out as you watch. Then do the <strong>whole chain from memory</strong>, together, in order. Get it right and the chain grows. Reach a chain of 8 and the crew wins!</p>
    </div>
    <div class="stage-section">
      <h2>How the crew helps each other</h2>
      <ul>
        <li>Little ones copy the moves — that's their whole job, and it matters.</li>
        <li>Bigger kids remember the order and call out what's next.</li>
        <li>Muddle it up? No problem — watch the same chain again and retry.</li>
      </ul>
    </div>
    <div class="game-actions">
      <button class="app-btn js-primary" id="start">Start the chain!</button>
    </div>
    ${coopBack()}
  `);
  bindCoopBack();
  $('#start').addEventListener('click', () => copycatRound([], shuffle(ACTION_CARDS)));
}

const COPYCAT_GOAL = 8;

function copycatRound(chain, deck) {
  chain = chain.concat([deck[chain.length % deck.length]]);
  copycatWatch(chain, deck, 0);
}

function copycatWatch(chain, deck, step) {
  const action = chain[step];
  const isLast = step === chain.length - 1;
  setScreen(`
    <div class="hud">
      <span class="hud-chip">Chain length: <strong>${chain.length}</strong> of ${COPYCAT_GOAL}</span>
      <span class="hud-chip">Watch: <strong>${step + 1}</strong> of ${chain.length}</span>
    </div>
    <div class="bigcard" style="--card-accent: var(--app-sunshine)">
      <div class="bigcard__kicker">${step === 0 ? 'The chain starts with…' : 'and then…'}</div>
      <div class="bigcard__emoji" style="font-size:5rem">${action.e}</div>
      <div class="bigcard__word" style="font-size:clamp(1.5rem,7vw,2.2rem)">${action.text}</div>
      <div class="bigcard__hint">Act it out as you watch — it helps it stick!</div>
    </div>
    <div class="game-actions">
      <button class="app-btn js-primary" id="next">${isLast ? 'Now do the whole chain! 🐵' : 'What’s next?'}</button>
    </div>
  `);
  $('#next').addEventListener('click', () => {
    if (isLast) return copycatTry(chain, deck);
    copycatWatch(chain, deck, step + 1);
  });
}

function copycatTry(chain, deck) {
  setScreen(`
    <div class="hud">
      <span class="hud-chip">Chain length: <strong>${chain.length}</strong> of ${COPYCAT_GOAL}</span>
    </div>
    <div class="bigcard" style="--card-accent: var(--app-sunshine)">
      <div class="bigcard__emoji">🐵</div>
      <div class="bigcard__word">Your turn, crew!</div>
      <div class="bigcard__sub">Do all ${chain.length} action${chain.length === 1 ? '' : 's'} together, in order — from memory. Bigger kids: call out what comes next!</div>
    </div>
    <div class="game-actions game-actions--row">
      <button class="app-btn app-btn--ghost" id="replay">Watch it again</button>
      <button class="app-btn app-btn--teal js-primary" id="done">We did it! 🎉</button>
    </div>
    ${coopBack()}
  `);
  bindCoopBack();
  $('#replay').addEventListener('click', () => copycatWatch(chain, deck, 0));
  $('#done').addEventListener('click', () => {
    if (chain.length >= COPYCAT_GOAL) return copycatWin(chain);
    copycatGrow(chain, deck);
  });
}

function copycatGrow(chain, deck) {
  setScreen(`
    <div class="bigcard bigcard--win">
      <div class="bigcard__emoji">🔗</div>
      <div class="bigcard__word">The chain grows!</div>
      <div class="bigcard__sub">${chain.length} down, ${COPYCAT_GOAL - chain.length} to go. Here comes one more…</div>
    </div>
    <div class="story-strip" style="font-size:1.8rem">
      ${chain.map(c => `<span>${c.e}</span>`).join('')}<span>➕</span>
    </div>
    <div class="game-actions">
      <button class="app-btn js-primary" id="next">Add the next action</button>
    </div>
  `);
  $('#next').addEventListener('click', () => copycatRound(chain, deck));
}

function copycatWin(chain) {
  confettiBurst(90);
  setScreen(`
    <div class="bigcard bigcard--win">
      <div class="bigcard__emoji">🐵🏆</div>
      <div class="bigcard__word">Champion copy cats!</div>
      <div class="bigcard__sub">You remembered all ${chain.length} actions in a row — together. Here's your winning chain one last time:</div>
    </div>
    <div class="story-strip" style="font-size:1.8rem">
      ${chain.map(c => `<span>${c.e}</span>`).join('')}
    </div>
    <div class="game-actions">
      <button class="app-btn js-primary" id="again">Play again</button>
    </div>
    ${coopBack()}
  `);
  bindCoopBack();
  $('#again').addEventListener('click', copycatIntro);
}

export function initCoop() {
  installPrimaryKey();
  coopMenu();
}
