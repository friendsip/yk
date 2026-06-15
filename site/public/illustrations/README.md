# Topic & section illustrations

Drop commissioned raster artwork (PNG / JPG / WebP) here, then wire each file up
in `site/src/lib/topicArt.ts` by switching that entry from `art(...)` to
`photo(...)`. Nothing else needs to change — every card, topic page, and article
header picks the new image up automatically.

## How to add one

1. Save the file in this folder, e.g. `health.png`.
2. Open `site/src/lib/topicArt.ts` and find the matching entry. Change:

   ```ts
   health: art('#5b7a5e', '#e8efe9', `<path .../>`),
   ```

   to:

   ```ts
   health: photo('#5b7a5e', '#e8efe9', '/illustrations/health.png'),
   ```

   Keep the two colours (accent + tint) — they still drive borders and
   backgrounds around the image.
3. Run `npm run build` (or `npm run dev`) to see it. You can migrate one slot at
   a time; un-migrated slots keep their placeholder SVG.

## The slots, and the filename each expects

**Topic illustrations** (shown on cards/pages tagged with that topic):

| Entry          | Suggested file            |
|----------------|---------------------------|
| `health`       | `health.png`              |
| `family-life`  | `family-life.png`         |
| `education`    | `education.png`           |
| `safety`       | `safety.png`              |
| `good-news`    | `good-news.png`           |
| `special-needs`| `special-needs.png`       |

**Section heroes** (the tinted band on each index page):

| Entry      | Suggested file     |
|------------|--------------------|
| `articles` | `articles.png`     |
| `curated`  | `curated.png`      |
| `editorial`| `editorial.png`    |
| `topics`   | `topics.png`       |

**Brand fallback** (the paper boat, used when no topic matches): `defaultArt`
in the same file → `default.png`.

## Art spec

- **Aspect ratio ~3:2** (matches the placeholder SVGs' `120 × 80` viewBox) so
  nothing letterboxes awkwardly. Roughly **600 × 400 px** or larger keeps it
  crisp on retina screens. It renders at up to 180 px wide.
- **Transparent background** (PNG/WebP) is best — the accent tint shows through
  around the artwork, matching how the SVGs sit now.
- House style only (Site Bible §13): warm flat-colour illustration, palette
  sage / amber / plum + coral / sky / sunshine on warm off-white. **No stock
  photos, no photorealistic AI images of children** — illustrations are
  decorative and must never carry information that isn't also in the text.

The full commissioning list (≈25 pieces, priority-ordered) is in
`docs/illustration-brief.md`.
