/* YourKids games — tiny shared helpers (ported from the ykgames prototype;
   ESM-ified and wired into lib/storage for the yk-* localStorage rules). */

import { loadStored, saveStored, gamesBestKey } from '../storage';

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* Swap the contents of the #screen element and replay the entry animation
   (`.screen` in app.css). */
export function setScreen(html) {
  const el = $('#screen');
  el.classList.remove('screen');
  el.innerHTML = html;
  void el.offsetWidth;
  el.classList.add('screen');
  window.scrollTo({ top: 0 });
  return el;
}

/* Celebration confetti. Self-contained (.game-confetti in games.css) so it
   doesn't depend on the PWA's own confetti rules. */
export function confettiBurst(count = 60) {
  const colours = ['#ff7a59', '#9d7bd8', '#35b8a4', '#ffc247', '#f26d9d', '#6fb5e8'];
  const host = document.createElement('div');
  host.className = 'game-confetti';
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + '%';
    s.style.background = pickOne(colours);
    s.style.animationDelay = Math.random() * 0.9 + 's';
    s.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    host.appendChild(s);
  }
  document.body.appendChild(host);
  setTimeout(() => host.remove(), 4200);
}

/* Countdown timer bound to a .timer element containing .timer__fill and
   .timer__num. `total` sets the bar's full-width scale (defaults to
   `seconds`) so a timer can be re-bound to fresh DOM mid-countdown without
   the bar jumping back to full. Returns { stop() }. */
export function startTimer(el, seconds, onDone, total) {
  total = total || seconds;
  const fill = $('.timer__fill', el);
  const num = $('.timer__num', el);
  const t0 = performance.now();
  let raf = null;
  let stopped = false;
  function frame(t) {
    if (stopped || !el.isConnected) return;
    const left = Math.max(0, seconds - (t - t0) / 1000);
    fill.style.width = (left / total) * 100 + '%';
    num.textContent = formatTime(left);
    el.classList.toggle('is-low', left <= 10);
    if (left <= 0) {
      onDone && onDone();
    } else {
      raf = requestAnimationFrame(frame);
    }
  }
  raf = requestAnimationFrame(frame);
  return { stop() { stopped = true; if (raf) cancelAnimationFrame(raf); } };
}

export function formatTime(secs) {
  const s = Math.ceil(secs);
  if (s < 100) return String(s);
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

export function timerHTML() {
  return '<div class="timer"><div class="timer__track"><div class="timer__fill"></div></div><div class="timer__num"></div></div>';
}

export function starMeterHTML(filled, total) {
  let out = '<div class="star-meter" aria-label="' + filled + ' of ' + total + ' stars">';
  for (let i = 0; i < total; i++) {
    out += '<span class="' + (i < filled ? '' : 'is-empty') + '">⭐</span>';
  }
  return out + '</div>';
}

/* Best scores stay on this device only (privacy §3a). */
export function loadBest(key) {
  try { return JSON.parse(loadStored(gamesBestKey(key))) || {}; }
  catch (e) { return {}; }
}
export function saveBest(key, value) {
  saveStored(gamesBestKey(key), JSON.stringify(value));
}

/* Space or Enter presses the main button — handy on a classroom laptop.
   Called once by each game page's init. */
let keysInstalled = false;
export function installPrimaryKey() {
  if (keysInstalled) return;
  keysInstalled = true;
  document.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.target.closest('button, input, select, a, textarea')) {
      const b = $('.js-primary');
      if (b) { e.preventDefault(); b.click(); }
    }
  });
}
