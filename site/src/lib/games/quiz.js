import { $, $$, setScreen, confettiBurst, installPrimaryKey } from './common';
import { QUIZ_PACKS } from './data';

/* Quiz packs — pick a pack, pick your teams, play a round */

const TEAM_DEFS = [
  { name: 'Team Fox', emoji: '🦊', colour: 'var(--app-coral)' },
  { name: 'Team Dolphin', emoji: '🐬', colour: 'var(--app-sky)' },
  { name: 'Team Unicorn', emoji: '🦄', colour: 'var(--app-lavender)' },
  { name: 'Team Bee', emoji: '🐝', colour: 'var(--app-sunshine)' },
];

function packPicker() {
  setScreen(`
    <div class="stage-grid">
      ${QUIZ_PACKS.map((p, i) => `
        <button class="stage-card" data-pack="${i}" style="--card-accent: var(--app-${p.accent})">
          <span class="stage-card__emoji">${p.emoji}</span>
          <span class="stage-card__label">${p.name}</span>
          <span class="stage-card__title">${p.blurb}</span>
          <span class="stage-card__go">${p.ages} &middot; ${p.questions.length} questions &rarr;</span>
        </button>`).join('')}
    </div>
    <p class="tool-note">Tip for mixed ages: let little ones answer first, and give bigger kids the "did you know" fact to read out.</p>
  `);
  $$('[data-pack]').forEach(b => b.addEventListener('click', () => teamPicker(QUIZ_PACKS[+b.dataset.pack])));
}

function teamPicker(pack) {
  setScreen(`
    <div class="play-head" style="padding-top:0">
      <span class="stage-kicker">${pack.emoji} ${pack.name}</span>
      <p class="play-head__sub">How many teams? (Playing with one team is lovely too — everyone works together to beat the pack.)</p>
    </div>
    <div class="wizard-choices">
      <button class="wizard-choice" data-teams="1">All together 🤝 <small>One team — count your points as a group</small></button>
      <button class="wizard-choice" data-teams="2">Two teams <small>🦊 Team Fox vs 🐬 Team Dolphin</small></button>
      <button class="wizard-choice" data-teams="3">Three teams <small>🦊 vs 🐬 vs 🦄 Team Unicorn</small></button>
      <button class="wizard-choice" data-teams="4">Four teams <small>🦊 vs 🐬 vs 🦄 vs 🐝 Team Bee</small></button>
    </div>
    <p class="tool-note" style="text-align:center"><a href="#" id="back-packs">&larr; Choose a different pack</a></p>
  `);
  $('#back-packs').addEventListener('click', (e) => { e.preventDefault(); packPicker(); });
  $$('[data-teams]').forEach(b => b.addEventListener('click', () => {
    const n = +b.dataset.teams;
    const teams = TEAM_DEFS.slice(0, n).map(t => ({ ...t, score: 0 }));
    quizPlay(pack, teams);
  }));
}

function quizPlay(pack, teams) {
  const state = { i: 0, revealed: false };
  const solo = teams.length === 1;

  function teamRow(interactive) {
    return `
      <div class="team-row">
        ${teams.map((t, ti) => `
          <button class="team-chip" data-team="${ti}" style="--team:${t.colour}" ${interactive ? '' : 'disabled'}>
            ${t.emoji} ${solo ? 'Us!' : t.name.replace('Team ', '')}
            <span class="team-chip__score">${t.score}</span>
          </button>`).join('')}
      </div>`;
  }

  function render() {
    const item = pack.questions[state.i];
    setScreen(`
      <div class="hud">
        <span class="hud-chip">${pack.emoji} <strong>${pack.name}</strong></span>
        <span class="hud-chip">Question <strong>${state.i + 1}</strong> of ${pack.questions.length}</span>
      </div>
      ${teamRow(false)}
      <div class="bigcard" style="--card-accent: var(--app-lavender); min-height:200px">
        <div class="bigcard__kicker">Question ${state.i + 1}</div>
        <div class="bigcard__word" style="font-size:clamp(1.4rem,6vw,1.9rem)">${item.q}</div>
        ${state.revealed ? '' : '<div class="bigcard__hint">Read it out loud — answers at the ready!</div>'}
      </div>
      ${state.revealed ? `
        <div class="answer-panel">
          <div class="answer-panel__big">${item.a}</div>
          ${item.fun ? `<div class="answer-panel__sub">✨ ${item.fun}</div>` : ''}
        </div>
        <p class="tool-note" style="text-align:center;margin:.2rem 0 .4rem">
          ${solo ? 'Did the group get it? Tap your team for a point:' : 'Tap the team that got it first:'}
        </p>
        ${teamRow(true)}
        <div class="game-actions">
          <button class="app-btn app-btn--ghost js-primary" id="no-point">${solo ? 'Not this time — next question' : 'Nobody got it — next question'}</button>
        </div>` : `
        <div class="game-actions">
          <button class="app-btn js-primary" id="reveal">Show the answer</button>
        </div>`}
    `);
    if (state.revealed) {
      $$('.team-chip[data-team]:not([disabled])').forEach(chip =>
        chip.addEventListener('click', () => {
          teams[+chip.dataset.team].score += 1;
          advance();
        }));
      $('#no-point').addEventListener('click', advance);
    } else {
      $('#reveal').addEventListener('click', () => { state.revealed = true; render(); });
    }
  }

  function advance() {
    state.i += 1;
    state.revealed = false;
    if (state.i >= pack.questions.length) return quizEnd();
    render();
  }

  function quizEnd() {
    confettiBurst();
    const top = Math.max(...teams.map(t => t.score));
    const winners = teams.filter(t => t.score === top);
    let headline;
    let sub;
    if (solo) {
      headline = `${teams[0].score} out of ${pack.questions.length}!`;
      sub = teams[0].score >= 8 ? 'Quiz champions — take a bow!'
        : teams[0].score >= 5 ? 'A splendid team effort!'
        : 'A tricky pack — another go?';
    } else if (winners.length === teams.length) {
      headline = 'It’s a draw!';
      sub = `Everyone finished on ${top} point${top === 1 ? '' : 's'}. Perfectly matched.`;
    } else if (winners.length > 1) {
      headline = winners.map(w => w.emoji).join(' ') + ' share the win!';
      sub = winners.map(w => w.name).join(' and ') + ` tied on ${top} points.`;
    } else {
      headline = `${winners[0].emoji} ${winners[0].name} wins!`;
      sub = `With ${top} point${top === 1 ? '' : 's'}. Well played, everyone.`;
    }
    setScreen(`
      <div class="bigcard bigcard--win">
        <div class="bigcard__emoji">🏆</div>
        <div class="bigcard__word">${headline}</div>
        <div class="bigcard__sub">${sub}</div>
      </div>
      ${solo ? '' : `
        <div class="team-row">
          ${teams.slice().sort((a, b) => b.score - a.score).map(t => `
            <span class="team-chip" style="--team:${t.colour}" disabled>
              ${t.emoji} ${t.name.replace('Team ', '')} <span class="team-chip__score">${t.score}</span>
            </span>`).join('')}
        </div>`}
      <div class="game-actions">
        <button class="app-btn js-primary" id="another">Play another pack</button>
        <button class="app-btn app-btn--ghost" id="rematch">Rematch — same pack</button>
      </div>
    `);
    $('#another').addEventListener('click', packPicker);
    $('#rematch').addEventListener('click', () => {
      teams.forEach(t => { t.score = 0; });
      quizPlay(pack, teams);
    });
  }

  render();
}

export function initQuiz() {
  installPrimaryKey();
  packPicker();
}
