import { $, $$, installPrimaryKey } from './common';
import { BUZZ_RULES, ODD_ONE_OUT, CHAIN_CATEGORIES, QUIZ_PACKS, FIND_PROMPTS, STORY_OPENER, STORY_ENDER, STORY_CARDS, ACTION_CARDS } from './data';

/* Printable game cards — the same games, on paper */

function howtoCard(title, lines) {
  return `
    <div class="print-card print-card--howto">
      <span class="print-card__set">How to play</span>
      <span class="print-card__word">${title}</span>
      <span class="print-card__sub">${lines}</span>
    </div>`;
}

const SETS = [
  {
    id: 'odd', label: '🕵️ Odd One Out', on: true,
    render() {
      return `
        <section class="print-sheet" data-set="odd">
          <h2>🕵️ Odd One Out</h2>
          <p class="print-sheet__sub">One card per round. Read the four things out (or show the card) — which one doesn't belong? The answer is upside down at the bottom.</p>
          <div class="print-grid">
            ${howtoCard('Odd One Out', 'Show or read a card. Everyone points or shouts. Turn the card around for our answer — but if the group spots a different pattern that works, that counts too!')}
            ${ODD_ONE_OUT.map(p => `
              <div class="print-card">
                <span class="print-card__set">Odd one out &middot; ${p.level === 'easy' ? 'little ones' : 'bigger kids'}</span>
                <span class="print-card__big">${p.items.map(i => i.t).join(' ')}</span>
                ${p.items.some(i => i.w) ? `<span class="print-card__sub">${p.items.map(i => i.w).filter(Boolean).join(' &middot; ')}</span>` : ''}
                <span class="print-card__answer">${p.why}</span>
              </div>`).join('')}
          </div>
        </section>`;
    },
  },
  {
    id: 'buzz', label: '🐝 Buzz!', on: true,
    render() {
      return `
        <section class="print-sheet" data-set="buzz">
          <h2>🐝 Buzz! rule cards</h2>
          <p class="print-sheet__sub">Pick a rule card and count around the circle from 1. On a buzz number, say BUZZ instead. Wrong number? Back to 1 — can you reach the target together?</p>
          <div class="print-grid">
            ${howtoCard('Buzz!', 'Sit in a circle and count up from 1, one person per number. If your number matches the rule on the card, say BUZZ! instead of the number. A slip-up sends the count back to 1. Reach the target and everyone wins.')}
            ${BUZZ_RULES.map(r => `
              <div class="print-card">
                <span class="print-card__set">Buzz! &middot; ${r.level}</span>
                <span class="print-card__big">🐝</span>
                <span class="print-card__word">${r.name}</span>
                <span class="print-card__sub">${r.desc}<br>Count to <strong>${r.target}</strong> together.</span>
              </div>`).join('')}
          </div>
        </section>`;
    },
  },
  {
    id: 'chain', label: '⚡ Chain Reaction', on: true,
    render() {
      return `
        <section class="print-sheet" data-set="chain">
          <h2>⚡ Chain Reaction category cards</h2>
          <p class="print-sheet__sub">Shuffle, draw a card, and go around the circle naming things that fit — no repeats! Count on fingers, or see how far around the circle you get.</p>
          <div class="print-grid">
            ${howtoCard('Chain Reaction', 'Draw a category card. Go around the circle — each person names something that fits. No repeats! Count the answers on fingers; next round, try to beat your best.')}
            ${CHAIN_CATEGORIES.map(c => `
              <div class="print-card">
                <span class="print-card__set">Chain reaction</span>
                <span class="print-card__big">${c.e}</span>
                <span class="print-card__word">${c.name}</span>
              </div>`).join('')}
          </div>
        </section>`;
    },
  },
  {
    id: 'quiz', label: '❓ Quiz packs', on: true,
    render() {
      return `
        <section class="print-sheet" data-set="quiz">
          <h2>❓ Quiz pack sheets</h2>
          <p class="print-sheet__sub">One sheet of questions and one of answers per pack. The quiz-master keeps the answers — fold them out of sight!</p>
          ${QUIZ_PACKS.map(p => `
            <div class="print-duo">
              <div class="print-list">
                <h3>${p.emoji} ${p.name} — questions <small>(${p.ages})</small></h3>
                <ol>${p.questions.map(q => `<li>${q.q}</li>`).join('')}</ol>
              </div>
              <div class="print-list">
                <h3>🤫 ${p.name} — answers (quiz-master only)</h3>
                <ol>${p.questions.map(q => `<li>${q.a}${q.fun ? ` <em>— ${q.fun}</em>` : ''}</li>`).join('')}</ol>
              </div>
            </div>`).join('')}
        </section>`;
    },
  },
  {
    id: 'find', label: '🔍 Find It Together', on: true,
    render() {
      const who = { all: 'Everyone hunt!', little: 'Little ones lead', big: 'Bigger kids lead' };
      return `
        <section class="print-sheet" data-set="find">
          <h2>🔍 Find It Together cards</h2>
          <p class="print-sheet__sub">Shuffle the cards face-down. Turn one over, hunt as a team, bring the find back to the pile. Ten cards found together = everyone wins.</p>
          <div class="print-grid">
            ${howtoCard('Find It Together', 'Deal a card face-up. The whole team hunts for the thing — cards marked for little ones or bigger kids tell you who leads that find. Ten found cards and the team wins!')}
            ${FIND_PROMPTS.map(p => `
              <div class="print-card">
                <span class="print-card__set">Find it &middot; ${who[p.who]}</span>
                <span class="print-card__big">${p.e}</span>
                <span class="print-card__word" style="font-size:.85rem">${p.text}</span>
              </div>`).join('')}
          </div>
        </section>`;
    },
  },
  {
    id: 'story', label: '📖 Story Circle', on: true,
    render() {
      return `
        <section class="print-sheet" data-set="story">
          <h2>📖 Story Circle cards</h2>
          <p class="print-sheet__sub">Shuffle the picture cards. Start with "Once upon a time…", deal a card to each storyteller in turn, and finish with "The End". Then tell the whole story back from the pictures!</p>
          <div class="print-grid">
            ${howtoCard('Story Circle', 'Put the "Once upon a time" card first and "The End" card last. Deal 5–12 picture cards between them, one per storyteller in turn. Little ones name the picture; bigger ones spin the tale.')}
            <div class="print-card">
              <span class="print-card__set">Story circle &middot; start</span>
              <span class="print-card__big">${STORY_OPENER.e}</span>
              <span class="print-card__word" style="font-size:.85rem">${STORY_OPENER.text}</span>
            </div>
            ${STORY_CARDS.map(c => `
              <div class="print-card">
                <span class="print-card__set">Story circle</span>
                <span class="print-card__big">${c.e}</span>
                <span class="print-card__word" style="font-size:.85rem">${c.text}</span>
              </div>`).join('')}
            <div class="print-card">
              <span class="print-card__set">Story circle &middot; finish</span>
              <span class="print-card__big">${STORY_ENDER.e}</span>
              <span class="print-card__word" style="font-size:.85rem">${STORY_ENDER.text}</span>
            </div>
          </div>
        </section>`;
    },
  },
  {
    id: 'copycat', label: '🐵 Copy Cat Crew', on: true,
    render() {
      return `
        <section class="print-sheet" data-set="copycat">
          <h2>🐵 Copy Cat Crew action cards</h2>
          <p class="print-sheet__sub">Turn cards over one at a time to build a growing chain of actions. Do the whole chain from memory, together — reach 8 cards and the crew wins!</p>
          <div class="print-grid">
            ${howtoCard('Copy Cat Crew', 'Shuffle and place face-down. Turn over one card, everyone does it. Turn a second — do both in order. Keep growing the chain from memory. Muddle up? Peek, laugh, retry. Eight in a row wins!')}
            ${ACTION_CARDS.map(c => `
              <div class="print-card">
                <span class="print-card__set">Copy cat crew</span>
                <span class="print-card__big">${c.e}</span>
                <span class="print-card__word" style="font-size:.85rem">${c.text}</span>
              </div>`).join('')}
          </div>
        </section>`;
    },
  },
];

function renderChips() {
  $('#set-chips').innerHTML = SETS.map(s =>
    `<button class="feed-mode-chip ${s.on ? 'is-active' : ''}" data-id="${s.id}">${s.label}</button>`).join('');
  $$('#set-chips [data-id]').forEach(chip => chip.addEventListener('click', () => {
    const set = SETS.find(s => s.id === chip.dataset.id);
    set.on = !set.on;
    renderChips();
    renderSheets();
  }));
}

function renderSheets() {
  const active = SETS.filter(s => s.on);
  $('#sheets').innerHTML = active.length
    ? active.map(s => s.render()).join('')
    : '<p class="tool-note" style="text-align:center">Nothing selected — tap a set above to add it.</p>';
  // each set after the first starts on a fresh printed page
  $$('#sheets .print-sheet').forEach((sheet, i) => {
    if (i > 0) sheet.classList.add('print-sheet--break');
  });
}

$('#print-btn').addEventListener('click', () => window.print());
renderChips();
export function initPrint() {
  installPrimaryKey();
  $('#print-btn').addEventListener('click', () => window.print());
  renderChips();
  renderSheets();
}
