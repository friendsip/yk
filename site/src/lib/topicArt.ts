/**
 * Topic → illustration & accent colour map.
 *
 * Engine-published content gets art automatically: cards and topic pages look
 * up the first tag here and fall back to `defaultArt`. Each slot is a
 * commissioned raster illustration (600×400, 3:2) in `site/public/illustrations/`,
 * wired up with `photo()`. The full-res masters live in
 * `site/public/illustrations/larger/` for future use (section headers, blog
 * heroes). `art()` (inline flat SVG) is kept as a fallback for any future slot
 * that doesn't yet have commissioned artwork.
 */

export interface TopicArt {
  /** Accent colour for borders, badges, and hero bands */
  accent: string;
  /** Soft tint of the accent for backgrounds */
  tint: string;
  /**
   * Decorative illustration markup, rendered via `set:html`. Either an inline
   * `<svg>` (a placeholder, built with `art()`) or an `<img>` pointing at a
   * raster file in /public (commissioned artwork, built with `photo()`).
   * Always decorative — paired with aria-hidden / empty alt.
   */
  markup: string;
}

/** In-house flat SVG placeholder. `inner` is the SVG's inner markup. */
export const art = (accent: string, tint: string, inner: string): TopicArt => ({
  accent,
  tint,
  markup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" fill="none">${inner}</svg>`,
});

/**
 * Commissioned raster illustration (PNG/JPG/WebP). Drop the file in
 * `site/public/illustrations/`, then point a topic/section entry at it with
 * `photo(accent, tint, '/illustrations/<file>')`. No other changes needed —
 * every card and page picks it up automatically.
 */
export const photo = (accent: string, tint: string, src: string): TopicArt => ({
  accent,
  tint,
  markup: `<img src="${src}" alt="" loading="lazy" decoding="async" />`,
});

export const topicArt: Record<string, TopicArt> = {
  // Growing heart-leaf: care and wellbeing
  health: photo('#D96A47', '#FCE8DF', '/illustrations/health.png'),

  // House with sun: home and everyday life
  'family-life': photo('#3A9E8F', '#E2F0EC', '/illustrations/family-life.png'),

  // Open book with sprouting idea: learning
  education: photo('#8A7A5C', '#F3E9D8', '/illustrations/education.png'),

  // Umbrella over small shape: protection without fear
  safety: photo('#8F4A32', '#FCE8DF', '/illustrations/safety.png'),

  // Kite climbing into sunshine: the good-news strand
  'good-news': photo('#2E7A6D', '#E2F0EC', '/illustrations/good-news.png'),

  // Infinity loop (neurodiversity symbol) with stars
  'special-needs': photo('#6E5C36', '#F3E9D8', '/illustrations/special-needs.png'),
};

// Paper boat on a wave — the brand motif, used when no topic art matches
export const defaultArt: TopicArt = photo('#8A7A5C', '#F3E9D8', '/illustrations/default.png');

// Section identities: articles=sage, curated=amber, editorial=plum, topics=sky.
// (Games will take coral when the section ships.)
export const sectionArt: Record<string, TopicArt> = {
  // Stacked pages with a leaf bookmark
  articles: photo('#3A9E8F', '#E2F0EC', '/illustrations/articles.png'),

  // Compass pointing outwards: hand-picked links
  curated: photo('#B0674C', '#FCE8DF', '/illustrations/curated.png'),

  // Speech bubble with a quill stroke: the editor's voice
  editorial: photo('#2E7A6D', '#E2F0EC', '/illustrations/editorial.png'),

  // Scattered shapes: many topics
  topics: photo('#8A7A5C', '#F3E9D8', '/illustrations/topics.png'),

  // Gift box with a sparkle: hand-picked recommendations (placeholder SVG —
  // swap for /illustrations/section-recommended.png when commissioned)
  recommended: art(
    '#B0674C',
    '#FCE8DF',
    `<rect x="40" y="40" width="40" height="28" rx="2" fill="#e8b84b"/>
     <rect x="40" y="40" width="40" height="10" fill="#c17f2e"/>
     <line x1="60" y1="40" x2="60" y2="68" stroke="#faf9f6" stroke-width="3"/>
     <path d="M60 40 C52 28 44 34 50 40 M60 40 C68 28 76 34 70 40" stroke="#e07856" stroke-width="3" fill="none"/>
     <circle cx="30" cy="26" r="3" fill="#5b7a5e"/>
     <circle cx="92" cy="24" r="3.5" fill="#7da8c3"/>`
  ),

  // Price tag: honest deals (placeholder SVG — swap for
  // /illustrations/section-deals.png when commissioned)
  deals: art(
    '#3A9E8F',
    '#E2F0EC',
    `<rect x="38" y="34" width="46" height="32" rx="5" fill="#7da8c3"/>
     <circle cx="48" cy="44" r="3.5" fill="#faf9f6"/>
     <path d="M58 44 L76 44 M54 52 L76 52 M58 60 L70 60" stroke="#faf9f6" stroke-width="3" stroke-linecap="round"/>
     <circle cx="96" cy="60" r="3.5" fill="#e8b84b"/>`
  ),

  // Crescent moon over a swaddled bundle: the baby guide (placeholder SVG —
  // swap for /illustrations/section-baby.png when commissioned)
  baby: art(
    '#3A9E8F',
    '#E2F0EC',
    `<path d="M74 18 A20 20 0 1 0 92 44 A16 16 0 0 1 74 18 Z" fill="#e8b84b"/>
     <ellipse cx="46" cy="58" rx="20" ry="12" fill="#7da8c3"/>
     <circle cx="46" cy="46" r="9" fill="#f6c9a0"/>
     <path d="M37 44 A9 9 0 0 1 55 44" fill="#7da8c3"/>
     <circle cx="24" cy="24" r="2.5" fill="#6b5b8a"/>
     <circle cx="34" cy="14" r="2" fill="#e07856"/>`
  ),

  // Stacked building blocks and a ball: the toddler guide (placeholder SVG —
  // swap for /illustrations/section-toddler.png when commissioned)
  toddler: art(
    '#D96A47',
    '#FCE8DF',
    `<rect x="34" y="44" width="20" height="20" rx="3" fill="#e07856"/>
     <rect x="56" y="44" width="20" height="20" rx="3" fill="#7da8c3"/>
     <rect x="45" y="23" width="20" height="20" rx="3" fill="#e8b84b"/>
     <circle cx="90" cy="56" r="9" fill="#5b7a5e"/>
     <path d="M81 56 A9 9 0 0 1 99 56" fill="#e8efe9"/>
     <circle cx="26" cy="26" r="3" fill="#6b5b8a"/>`
  ),

  // Dice and counters: games for classrooms and groups (placeholder SVG —
  // swap for /illustrations/section-games.png when commissioned)
  games: art(
    '#D96A47',
    '#FCE8DF',
    `<rect x="36" y="28" width="30" height="30" rx="6" fill="#e07856"/>
     <circle cx="45" cy="37" r="3" fill="#faf9f6"/>
     <circle cx="57" cy="49" r="3" fill="#faf9f6"/>
     <circle cx="51" cy="43" r="3" fill="#faf9f6"/>
     <circle cx="80" cy="52" r="8" fill="#7da8c3"/>
     <circle cx="94" cy="38" r="8" fill="#e8b84b"/>
     <path d="M76 24 l4 8 8 1 -6 6 2 9 -8 -5 -8 5 2 -9 -6 -6 8 -1 z" fill="#5b7a5e" transform="scale(0.55) translate(45 10)"/>
     <circle cx="26" cy="24" r="3" fill="#6b5b8a"/>`
  ),

  // Abacus with a sum: handy tools and calculators (placeholder SVG —
  // swap for /illustrations/section-tools.png when commissioned)
  tools: art(
    '#6E5C36',
    '#F3E9D8',
    `<rect x="30" y="22" width="60" height="40" rx="6" fill="none" stroke="#e8b84b" stroke-width="4"/>
     <line x1="30" y1="36" x2="90" y2="36" stroke="#e8b84b" stroke-width="3"/>
     <line x1="30" y1="50" x2="90" y2="50" stroke="#e8b84b" stroke-width="3"/>
     <circle cx="44" cy="36" r="5" fill="#e07856"/>
     <circle cx="58" cy="36" r="5" fill="#7da8c3"/>
     <circle cx="66" cy="50" r="5" fill="#5b7a5e"/>
     <circle cx="80" cy="50" r="5" fill="#6b5b8a"/>
     <circle cx="98" cy="20" r="3" fill="#e07856"/>`
  ),

  // Globe with a location pin: trusted sites around the web (placeholder SVG —
  // swap for /illustrations/section-sites.png when commissioned)
  sites: art(
    '#2E7A6D',
    '#E2F0EC',
    `<circle cx="54" cy="44" r="22" fill="#f0ecf5" stroke="#6b5b8a" stroke-width="3"/>
     <path d="M32 44 H76 M54 22 C44 30 44 58 54 66 M54 22 C64 30 64 58 54 66" stroke="#6b5b8a" stroke-width="2.5" fill="none"/>
     <path d="M86 30 C94 30 94 42 86 50 C78 42 78 30 86 30 Z" fill="#e07856"/>
     <circle cx="86" cy="38" r="3" fill="#faf9f6"/>`
  ),
};

export function artForTags(tags: string[]): TopicArt {
  for (const tag of tags) {
    if (topicArt[tag]) return topicArt[tag];
  }
  return defaultArt;
}

export function artForTag(tag: string): TopicArt {
  return topicArt[tag] ?? defaultArt;
}
