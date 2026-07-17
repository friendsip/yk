import { $, $$, setScreen, shuffle, pickOne, confettiBurst, startTimer, timerHTML, loadBest, saveBest, installPrimaryKey } from './common';
import { BUZZ_RULES, ODD_ONE_OUT, CHAIN_CATEGORIES, MAKE_LEVELS } from './data';

/* Circle-time word and number games */

/* ================= menu ================= */
function showMenu() {
  setScreen(`
    <div class="stage-grid">
      <button class="stage-card" data-go="buzz" style="--card-accent: var(--app-sunshine)">
        <span class="stage-card__emoji">🐝</span>
        <span class="stage-card__label">Buzz!</span>
        <span class="stage-card__title">Count around the circle — but some numbers are secretly BUZZ numbers. Say the wrong one and the count starts again!</span>
        <span class="stage-card__go">Numbers &middot; 5–10 min &rarr;</span>
      </button>
      <button class="stage-card" data-go="odd" style="--card-accent: var(--app-teal)">
        <span class="stage-card__emoji">🕵️</span>
        <span class="stage-card__label">Odd One Out</span>
        <span class="stage-card__title">Four things appear — but one doesn't belong. Point, shout, or vote — then see why.</span>
        <span class="stage-card__go">Words &middot; 5–10 min &rarr;</span>
      </button>
      <button class="stage-card" data-go="chain" style="--card-accent: var(--app-coral)">
        <span class="stage-card__emoji">⚡</span>
        <span class="stage-card__label">Chain Reaction</span>
        <span class="stage-card__title">A category appears — go around the circle shouting things that fit before the timer runs out. No repeats!</span>
        <span class="stage-card__go">Words &middot; 2 min a round &rarr;</span>
      </button>
      <button class="stage-card" data-go="make" style="--card-accent: var(--app-lavender)">
        <span class="stage-card__emoji">🧮</span>
        <span class="stage-card__label">Make the Number</span>
        <span class="stage-card__title">One number, lots of ways to make it. Adds, take-aways, fingers, doubles — how many can the group find?</span>
        <span class="stage-card__go">Numbers &middot; 5–10 min &rarr;</span>
      </button>
    </div>
    <p class="tool-note">One person holds the screen and taps; everyone else answers out loud. Little ones can answer with fingers and pointing.</p>
  `);
  $$('[data-go]').forEach(b => b.addEventListener('click', () => {
    ({ buzz: buzzSetup, odd: oddSetup, chain: chainSetup, make: makeSetup })[b.dataset.go]();
  }));
}

function backLink() {
  return '<p class="tool-note" style="text-align:center"><a href="#" id="back-menu">&larr; All circle-time games</a></p>';
}
function bindBack() {
  $('#back-menu').addEventListener('click', (e) => { e.preventDefault(); showMenu(); });
}

/* ================= Buzz! ================= */
function buzzSetup() {
  setScreen(`
    <div class="play-head" style="padding-top:0">
      <span class="stage-kicker">🐝 Buzz!</span>
      <p class="play-head__sub">Go around the circle counting up from 1. If your number is a <strong>buzz number</strong>, say <strong>BUZZ!</strong> instead. Tap the card to check each answer — get all the way to the target together!</p>
    </div>
    <div class="wizard-choices">
      ${BUZZ_RULES.map((r, i) => `
        <button class="wizard-choice" data-rule="${i}">
          ${r.name}
          <small>${r.desc} &middot; ${r.level} &middot; count to ${r.target}</small>
        </button>`).join('')}
    </div>
    ${backLink()}
  `);
  bindBack();
  $$('[data-rule]').forEach(b => b.addEventListener('click', () => buzzPlay(BUZZ_RULES[+b.dataset.rule])));
}

function buzzPlay(rule) {
  const state = { n: 0, bestRun: 0, revealed: false };

  function render() {
    const next = state.n + 1;
    const isBuzz = rule.test(next);
    setScreen(`
      <div class="hud">
        <span class="hud-chip">Rule: <strong>${rule.name}</strong></span>
        <span class="hud-chip">Target: <strong>${rule.target}</strong></span>
        <span class="hud-chip">Best run: <strong>${state.bestRun}</strong></span>
      </div>
      ${state.revealed ? `
        <div class="bigcard ${isBuzz ? 'bigcard--buzz' : ''}" style="--card-accent: var(--app-sunshine)">
          ${isBuzz
            ? `<div class="bigcard__emoji">🐝</div>
               <div class="bigcard__word">BUZZ!</div>
               <div class="bigcard__sub">…instead of ${next}</div>`
            : `<div class="bigcard__giant">${next}</div>
               <div class="bigcard__sub">Just a normal number — say it loud!</div>`}
        </div>
        <div class="game-actions game-actions--row">
          <button class="app-btn app-btn--teal js-primary" id="got-it">We got it! ✓</button>
          <button class="app-btn app-btn--ghost" id="oops">Oops — back to 1</button>
        </div>` : `
        <div class="bigcard bigcard--tap" id="reveal" style="--card-accent: var(--app-sunshine)">
          <div class="bigcard__kicker">${state.n === 0 ? 'Start counting from 1' : 'Last number: ' + state.n}</div>
          <div class="bigcard__giant">?</div>
          <div class="bigcard__sub">What comes next — the number, or <strong>BUZZ</strong>?</div>
          <div class="bigcard__hint">Say it out loud, then tap to check</div>
        </div>
        <button class="app-btn js-primary" id="reveal-btn">Tap to check</button>`}
      ${backLink()}
    `);
    bindBack();
    if (state.revealed) {
      $('#got-it').addEventListener('click', () => {
        state.n += 1;
        state.bestRun = Math.max(state.bestRun, state.n);
        state.revealed = false;
        if (state.n >= rule.target) return buzzWin();
        render();
      });
      $('#oops').addEventListener('click', () => {
        state.n = 0;
        state.revealed = false;
        render();
      });
    } else {
      const go = () => { state.revealed = true; render(); };
      $('#reveal').addEventListener('click', go);
      $('#reveal-btn').addEventListener('click', go);
    }
  }

  function buzzWin() {
    confettiBurst();
    setScreen(`
      <div class="bigcard bigcard--win">
        <div class="bigcard__emoji">🎉</div>
        <div class="bigcard__word">You did it!</div>
        <div class="bigcard__sub">You counted all the way to <strong>${rule.target}</strong> together, dodging every buzz number. Give yourselves a round of applause!</div>
      </div>
      <div class="game-actions">
        <button class="app-btn js-primary" id="again">Play again</button>
        <button class="app-btn app-btn--ghost" id="rules">Try a different rule</button>
      </div>
      ${backLink()}
    `);
    bindBack();
    $('#again').addEventListener('click', () => buzzPlay(rule));
    $('#rules').addEventListener('click', buzzSetup);
  }

  render();
}

/* ================= Odd One Out ================= */
function oddSetup() {
  setScreen(`
    <div class="play-head" style="padding-top:0">
      <span class="stage-kicker stage-kicker--teal">🕵️ Odd One Out</span>
      <p class="play-head__sub">Four things appear. Talk it over, point, or shout — which one doesn't belong? Then tap to see our answer. If the group spotted a <em>different</em> pattern that works, that counts too!</p>
    </div>
    <div class="wizard-choices">
      <button class="wizard-choice" data-level="easy">Little ones <small>Colours, animals and everyday things &middot; ages 3–5</small></button>
      <button class="wizard-choice" data-level="tricky">Bigger kids <small>Shapes, numbers and letters &middot; ages 6–9</small></button>
      <button class="wizard-choice" data-level="mix">Everyone together <small>A mix — start easy, get trickier</small></button>
    </div>
    ${backLink()}
  `);
  bindBack();
  $$('[data-level]').forEach(b => b.addEventListener('click', () => oddPlay(b.dataset.level)));
}

function oddPlay(level) {
  let pool;
  if (level === 'mix') {
    pool = shuffle(ODD_ONE_OUT.filter(p => p.level === 'easy')).slice(0, 4)
      .concat(shuffle(ODD_ONE_OUT.filter(p => p.level === 'tricky')).slice(0, 4));
  } else {
    pool = shuffle(ODD_ONE_OUT.filter(p => p.level === level)).slice(0, 8);
  }
  const state = { i: 0, revealed: false };

  function render() {
    const puzzle = pool[state.i];
    if (!state.order) {
      state.order = shuffle(puzzle.items.map((item, idx) => ({ item, isOdd: idx === puzzle.odd })));
    }
    setScreen(`
      <div class="hud">
        <span class="hud-chip">Puzzle <strong>${state.i + 1}</strong> of ${pool.length}</span>
      </div>
      <div class="choice-grid">
        ${state.order.map(o => `
          <div class="choice-tile ${state.revealed ? (o.isOdd ? 'is-odd' : 'is-dim') : ''}">
            <span class="choice-tile__big">${o.item.t}</span>
            ${o.item.w ? `<span class="choice-tile__word">${o.item.w}</span>` : ''}
          </div>`).join('')}
      </div>
      ${state.revealed ? `
        <div class="answer-panel">
          <div class="answer-panel__big">It's the ${oddName(state.order)}!</div>
          <div class="answer-panel__sub">${puzzle.why}</div>
          <div class="answer-panel__sub" style="margin-top:.4rem">Did someone spot a different reason that works? Brilliant — that counts too.</div>
        </div>
        <button class="app-btn js-primary" id="next">${state.i + 1 < pool.length ? 'Next puzzle' : 'Finish'}</button>` : `
        <button class="app-btn js-primary" id="reveal">Which one doesn't belong? Tap to reveal</button>`}
      ${backLink()}
    `);
    bindBack();
    if (state.revealed) {
      $('#next').addEventListener('click', () => {
        state.i += 1;
        state.revealed = false;
        state.order = null;
        if (state.i >= pool.length) return oddEnd();
        render();
      });
    } else {
      $('#reveal').addEventListener('click', () => { state.revealed = true; render(); });
    }
  }

  function oddName(order) {
    const odd = order.find(o => o.isOdd).item;
    return odd.w ? odd.w.toLowerCase() : odd.t;
  }

  function oddEnd() {
    confettiBurst();
    setScreen(`
      <div class="bigcard bigcard--win">
        <div class="bigcard__emoji">🕵️🎉</div>
        <div class="bigcard__word">Puzzle masters!</div>
        <div class="bigcard__sub">That's all ${pool.length} puzzles solved. Sharp eyes, everyone.</div>
      </div>
      <div class="game-actions">
        <button class="app-btn js-primary" id="again">Play another round</button>
      </div>
      ${backLink()}
    `);
    bindBack();
    $('#again').addEventListener('click', oddSetup);
  }

  render();
}

/* ================= Chain Reaction ================= */
function chainSetup(seconds = 60) {
  const cat = pickOne(CHAIN_CATEGORIES);
  setScreen(`
    <div class="play-head" style="padding-top:0">
      <span class="stage-kicker stage-kicker--coral">⚡ Chain Reaction</span>
      <p class="play-head__sub">Go around the circle — each person shouts something that fits the category. No repeats! The screen-holder taps <strong>+1</strong> for every good answer. Stuck? Skip to the next person and keep the chain going.</p>
    </div>
    <div class="bigcard" style="--card-accent: var(--app-coral)">
      <div class="bigcard__kicker">Your category</div>
      <div class="bigcard__emoji">${cat.e}</div>
      <div class="bigcard__word">${cat.name}</div>
    </div>
    <div class="chip-row" id="time-chips">
      ${[30, 60, 90].map(s => `<button class="feed-mode-chip ${s === seconds ? 'is-active' : ''}" data-s="${s}">${s} seconds</button>`).join('')}
    </div>
    <div class="game-actions game-actions--row">
      <button class="app-btn app-btn--ghost" id="respin">Different category 🎲</button>
      <button class="app-btn js-primary" id="start">Start the timer!</button>
    </div>
    ${backLink()}
  `);
  bindBack();
  $$('#time-chips [data-s]').forEach(c => c.addEventListener('click', () => {
    seconds = +c.dataset.s;
    $$('#time-chips .feed-mode-chip').forEach(x => x.classList.toggle('is-active', x === c));
  }));
  $('#respin').addEventListener('click', () => chainSetup(seconds));
  $('#start').addEventListener('click', () => chainPlay(cat, seconds));
}

function chainPlay(cat, seconds) {
  let count = 0;
  let timer = null;
  setScreen(`
    <div class="hud">
      <span class="hud-chip">${cat.e} <strong>${cat.name}</strong></span>
    </div>
    ${timerHTML()}
    <div class="bigcard bigcard--tap" id="tap" style="--card-accent: var(--app-coral)">
      <div class="bigcard__giant" id="count">0</div>
      <div class="bigcard__sub">answers so far — <strong>tap for every good one!</strong></div>
    </div>
    <button class="app-btn app-btn--ghost app-btn--small" id="end-early" style="display:block;margin:0 auto">Finish early</button>
  `);
  const finish = () => {
    if (timer) timer.stop();
    chainEnd(cat, seconds, count);
  };
  timer = startTimer($('.timer'), seconds, finish);
  $('#tap').addEventListener('click', () => {
    count += 1;
    $('#count').textContent = count;
  });
  $('#end-early').addEventListener('click', finish);
}

function chainEnd(cat, seconds, count) {
  const best = loadBest('chain');
  const prev = best[cat.name] || 0;
  const isRecord = count > prev;
  if (isRecord) {
    best[cat.name] = count;
    saveBest('chain', best);
    confettiBurst();
  }
  setScreen(`
    <div class="bigcard bigcard--win">
      <div class="bigcard__emoji">${isRecord ? '🏆' : '⚡'}</div>
      <div class="bigcard__word">${count} answer${count === 1 ? '' : 's'}!</div>
      <div class="bigcard__sub">${cat.e} ${cat.name}, in ${seconds} seconds.</div>
      <div class="bigcard__hint">${isRecord
        ? (prev ? `New record for this category — your old best was ${prev}!` : 'That’s your first record for this category!')
        : `Your best for this category is ${prev}. So close — one more go?`}</div>
    </div>
    <div class="game-actions game-actions--row">
      <button class="app-btn app-btn--ghost" id="same">Same category again</button>
      <button class="app-btn js-primary" id="new">New category</button>
    </div>
    ${backLink()}
  `);
  bindBack();
  $('#same').addEventListener('click', () => chainPlay(cat, seconds));
  $('#new').addEventListener('click', () => chainSetup(seconds));
}

/* ================= Make the Number ================= */
function makeSetup() {
  setScreen(`
    <div class="play-head" style="padding-top:0">
      <span class="stage-kicker">🧮 Make the Number</span>
      <p class="play-head__sub">One number appears. Go around the circle finding ways to make it — adds, take-aways, doubles, fingers, "one more than…". Tap <strong>+1</strong> for every way the group finds.</p>
    </div>
    <div class="wizard-choices">
      ${MAKE_LEVELS.map((l, i) => `
        <button class="wizard-choice" data-level="${i}">${l.name}<small>${l.hint}</small></button>`).join('')}
    </div>
    ${backLink()}
  `);
  bindBack();
  $$('[data-level]').forEach(b => b.addEventListener('click', () => makePlay(MAKE_LEVELS[+b.dataset.level])));
}

function makePlay(level) {
  const target = level.min + Math.floor(Math.random() * (level.max - level.min + 1));
  let ways = 0;
  let shown = false;

  function render() {
    setScreen(`
      <div class="hud">
        <span class="hud-chip">Ways found: <strong id="ways">${ways}</strong></span>
      </div>
      <div class="bigcard bigcard--tap" id="tap" style="--card-accent: var(--app-lavender)">
        <div class="bigcard__kicker">Make the number…</div>
        <div class="bigcard__giant">${target}</div>
        <div class="bigcard__sub">${level.hint}</div>
        <div class="bigcard__hint">Tap the card for every way the group finds</div>
      </div>
      ${shown ? `
        <div class="answer-panel">
          <div class="answer-panel__big">A few we thought of 💡</div>
          <div class="answer-panel__sub">${makeIdeas(target).join(' &nbsp;&middot;&nbsp; ')}</div>
        </div>` : ''}
      <div class="game-actions game-actions--row">
        ${shown ? '' : '<button class="app-btn app-btn--ghost" id="ideas">Show some ideas 💡</button>'}
        <button class="app-btn js-primary" id="new">New number</button>
      </div>
      ${backLink()}
    `);
    bindBack();
    $('#tap').addEventListener('click', () => {
      ways += 1;
      $('#ways').textContent = ways;
    });
    if (!shown) $('#ideas').addEventListener('click', () => { shown = true; render(); });
    $('#new').addEventListener('click', () => makePlay(level));
  }

  render();
}

export function makeIdeas(t) {
  const ideas = [];
  const a = Math.max(1, Math.floor(t / 2) - 1);
  ideas.push(`${a} + ${t - a}`);
  const d = 1 + Math.floor(Math.random() * 4);
  ideas.push(`${t + d} − ${d}`);
  if (t % 2 === 0) ideas.push(`double ${t / 2}`);
  if (t > 10) ideas.push(`10 + ${t - 10}`);
  if (t <= 10) ideas.push(`${t} fingers held up`);
  for (const m of [5, 4, 3, 2]) {
    if (t % m === 0 && t / m > 1 && t / m <= 12) { ideas.push(`${m} × ${t / m}`); break; }
  }
  ideas.push(`one more than ${t - 1}`);
  return ideas.slice(0, 4);
}

export function initCircleTime() {
  installPrimaryKey();
  showMenu();
}
