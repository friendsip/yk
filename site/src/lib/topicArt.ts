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
  health: photo('#5b7a5e', '#e8efe9', '/illustrations/health.png'),

  // House with sun: home and everyday life
  'family-life': photo('#e07856', '#fbeae3', '/illustrations/family-life.png'),

  // Open book with sprouting idea: learning
  education: photo('#7da8c3', '#e9f1f6', '/illustrations/education.png'),

  // Umbrella over small shape: protection without fear
  safety: photo('#c17f2e', '#fdf3e4', '/illustrations/safety.png'),

  // Kite climbing into sunshine: the good-news strand
  'good-news': photo('#e8b84b', '#fdf6e3', '/illustrations/good-news.png'),

  // Infinity loop (neurodiversity symbol) with stars
  'special-needs': photo('#6b5b8a', '#f0ecf5', '/illustrations/special-needs.png'),
};

// Paper boat on a wave — the brand motif, used when no topic art matches
export const defaultArt: TopicArt = photo('#e8b84b', '#fdf6e3', '/illustrations/default.png');

// Section identities: articles=sage, curated=amber, editorial=plum, topics=sky.
// (Games will take coral when the section ships.)
export const sectionArt: Record<string, TopicArt> = {
  // Stacked pages with a leaf bookmark
  articles: photo('#5b7a5e', '#e8efe9', '/illustrations/articles.png'),

  // Compass pointing outwards: hand-picked links
  curated: photo('#c17f2e', '#fdf3e4', '/illustrations/curated.png'),

  // Speech bubble with a quill stroke: the editor's voice
  editorial: photo('#6b5b8a', '#f0ecf5', '/illustrations/editorial.png'),

  // Scattered shapes: many topics
  topics: photo('#7da8c3', '#e9f1f6', '/illustrations/topics.png'),
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
