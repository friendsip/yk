/**
 * Topic → illustration & accent colour map.
 *
 * Engine-published content gets art automatically: cards and topic pages look
 * up the first tag here and fall back to `defaultArt`. Illustrations are
 * in-house flat SVGs in the house style (warm, organic, palette-locked) —
 * placeholders to be swapped 1:1 for commissioned artwork without touching
 * any component.
 */

export interface TopicArt {
  /** Accent colour for borders, badges, and hero bands */
  accent: string;
  /** Soft tint of the accent for backgrounds */
  tint: string;
  /** Inline SVG illustration (decorative — always paired with aria-hidden) */
  svg: string;
}

const art = (accent: string, tint: string, inner: string): TopicArt => ({
  accent,
  tint,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" fill="none">${inner}</svg>`,
});

export const topicArt: Record<string, TopicArt> = {
  // Growing heart-leaf: care and wellbeing
  health: art(
    '#5b7a5e',
    '#e8efe9',
    `<path d="M60 66 C60 46 38 44 38 30 C38 20 48 16 54 22 C57 25 60 30 60 30 C60 30 63 25 66 22 C72 16 82 20 82 30 C82 44 60 46 60 66 Z" fill="#5b7a5e"/>
     <path d="M60 66 C60 52 60 44 60 34" stroke="#e8efe9" stroke-width="2.5" stroke-linecap="round"/>
     <circle cx="30" cy="58" r="4" fill="#e8b84b"/>
     <circle cx="92" cy="52" r="3" fill="#e07856"/>`
  ),

  // House with sun: home and everyday life
  'family-life': art(
    '#e07856',
    '#fbeae3',
    `<circle cx="92" cy="20" r="9" fill="#e8b84b"/>
     <path d="M30 42 L56 22 L82 42 Z" fill="#e07856"/>
     <rect x="38" y="42" width="36" height="24" rx="2" fill="#c17f2e"/>
     <rect x="52" y="50" width="9" height="16" rx="1.5" fill="#faf9f6"/>
     <path d="M18 66 Q30 62 42 66 T66 66 T90 66 T104 66" stroke="#5b7a5e" stroke-width="3" stroke-linecap="round"/>`
  ),

  // Open book with sprouting idea: learning
  education: art(
    '#7da8c3',
    '#e9f1f6',
    `<path d="M28 56 C38 50 50 50 60 56 L60 28 C50 22 38 22 28 28 Z" fill="#7da8c3"/>
     <path d="M92 56 C82 50 70 50 60 56 L60 28 C70 22 82 22 92 28 Z" fill="#a7c4d6"/>
     <line x1="60" y1="28" x2="60" y2="56" stroke="#faf9f6" stroke-width="2"/>
     <circle cx="60" cy="16" r="5" fill="#e8b84b"/>
     <path d="M60 21 L60 26" stroke="#c17f2e" stroke-width="2.5" stroke-linecap="round"/>`
  ),

  // Umbrella over small shape: protection without fear
  safety: art(
    '#c17f2e',
    '#fdf3e4',
    `<path d="M30 38 C30 22 90 22 90 38 C80 32 70 32 60 38 C50 32 40 32 30 38 Z" fill="#c17f2e"/>
     <line x1="60" y1="36" x2="60" y2="60" stroke="#8a5a1e" stroke-width="3" stroke-linecap="round"/>
     <path d="M60 60 C60 66 52 66 52 60" stroke="#8a5a1e" stroke-width="3" stroke-linecap="round" fill="none"/>
     <circle cx="78" cy="56" r="7" fill="#e07856"/>
     <circle cx="42" cy="58" r="5" fill="#5b7a5e"/>`
  ),

  // Infinity loop (neurodiversity symbol) with stars
  'special-needs': art(
    '#6b5b8a',
    '#f0ecf5',
    `<path d="M36 40 C36 30 50 30 60 40 C70 50 84 50 84 40 C84 30 70 30 60 40 C50 50 36 50 36 40 Z" stroke="#6b5b8a" stroke-width="5" stroke-linecap="round" fill="none"/>
     <circle cx="30" cy="22" r="3.5" fill="#e8b84b"/>
     <circle cx="90" cy="60" r="4" fill="#7da8c3"/>
     <circle cx="94" cy="20" r="2.5" fill="#e07856"/>`
  ),
};

// Paper boat on a wave — the brand motif, used when no topic art matches
export const defaultArt: TopicArt = art(
  '#e8b84b',
  '#fdf6e3',
  `<circle cx="94" cy="18" r="8" fill="#e8b84b"/>
   <path d="M58 16 L58 40 L76 40 Z" fill="#e07856"/>
   <path d="M58 20 L58 40 L44 40 Z" fill="#c17f2e"/>
   <path d="M34 44 L86 44 L76 56 L44 56 Z" fill="#5b7a5e"/>
   <path d="M22 62 Q32 58 42 62 T62 62 T82 62 T100 62" stroke="#7da8c3" stroke-width="3.5" stroke-linecap="round"/>`
);

// Section identities: articles=sage, curated=amber, editorial=plum, topics=sky.
// (Games will take coral when the section ships.)
export const sectionArt: Record<string, TopicArt> = {
  // Stacked pages with a leaf bookmark
  articles: art(
    '#5b7a5e',
    '#e8efe9',
    `<rect x="34" y="22" width="44" height="40" rx="3" fill="#e8efe9" stroke="#5b7a5e" stroke-width="2.5"/>
     <rect x="42" y="16" width="44" height="40" rx="3" fill="#faf9f6" stroke="#5b7a5e" stroke-width="2.5"/>
     <line x1="50" y1="28" x2="78" y2="28" stroke="#5b7a5e" stroke-width="2.5" stroke-linecap="round"/>
     <line x1="50" y1="36" x2="78" y2="36" stroke="#a8bfaa" stroke-width="2.5" stroke-linecap="round"/>
     <line x1="50" y1="44" x2="68" y2="44" stroke="#a8bfaa" stroke-width="2.5" stroke-linecap="round"/>
     <path d="M86 12 C94 14 94 24 86 28 C78 24 78 14 86 12 Z" fill="#e8b84b"/>`
  ),

  // Compass pointing outwards: hand-picked links
  curated: art(
    '#c17f2e',
    '#fdf3e4',
    `<circle cx="60" cy="40" r="24" fill="#fdf3e4" stroke="#c17f2e" stroke-width="3"/>
     <path d="M60 24 L66 40 L60 56 L54 40 Z" fill="#c17f2e"/>
     <circle cx="60" cy="40" r="4" fill="#faf9f6"/>
     <circle cx="94" cy="20" r="4" fill="#e07856"/>
     <circle cx="26" cy="60" r="3" fill="#5b7a5e"/>`
  ),

  // Speech bubble with a quill stroke: the editor's voice
  editorial: art(
    '#6b5b8a',
    '#f0ecf5',
    `<path d="M30 22 H90 a6 6 0 0 1 6 6 V48 a6 6 0 0 1 -6 6 H56 L42 66 L44 54 H30 a6 6 0 0 1 -6 -6 V28 a6 6 0 0 1 6 -6 Z" fill="#f0ecf5" stroke="#6b5b8a" stroke-width="3"/>
     <line x1="38" y1="34" x2="82" y2="34" stroke="#6b5b8a" stroke-width="2.5" stroke-linecap="round"/>
     <line x1="38" y1="42" x2="70" y2="42" stroke="#b3a8c9" stroke-width="2.5" stroke-linecap="round"/>
     <circle cx="96" cy="62" r="4" fill="#e8b84b"/>`
  ),

  // Scattered shapes: many topics
  topics: art(
    '#7da8c3',
    '#e9f1f6',
    `<circle cx="36" cy="30" r="11" fill="#7da8c3"/>
     <rect x="58" y="20" width="22" height="22" rx="5" fill="#e8b84b"/>
     <path d="M100 20 L110 40 L90 40 Z" fill="#e07856"/>
     <rect x="26" y="50" width="22" height="14" rx="7" fill="#5b7a5e"/>
     <circle cx="72" cy="58" r="8" fill="#6b5b8a"/>
     <path d="M94 52 L104 62 M104 52 L94 62" stroke="#c17f2e" stroke-width="3.5" stroke-linecap="round"/>`
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
