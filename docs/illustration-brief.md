# Illustration Brief — yourkids.com

A commissioning list for the site's artwork. Every piece below currently exists
as an in-house placeholder SVG (in `site/src/lib/topicArt.ts`, `site/src/components/Logo.astro`,
and the page files), so the site works today — commissioned art replaces
placeholders one-for-one with no code changes beyond pasting in new SVG markup.

## Style

- **Feel:** warm, hand-drawn, kind. Flat colour, organic shapes, no outlines or
  thin-line iconography. Should feel like a gentle picture book, not a tech site.
- **Palette (strict):** sage `#5b7a5e`, amber `#c17f2e`, plum `#6b5b8a`,
  coral `#e07856`, sky `#7da8c3`, sunshine `#e8b84b`, on warm off-white `#faf9f6`.
  Light tints of each are fine.
- **Brand motif:** a paper boat on a wave. It can recur subtly across pieces.
- **Hard rules:** no photorealism; no depictions of identifiable real children;
  nothing that idealises one family structure or parenting style; illustrations
  are decorative and must never carry meaning that isn't also in nearby text.
- **Format:** SVG strongly preferred (the site inlines them and they must scale
  from ~60px to full-width). Topic/section pieces use a roughly 3:2 landscape
  frame (current placeholders are 120×80 viewBox). Keep file size small —
  these are inlined into every page that uses them.

## Priority 1 — Brand (needed first; everything else hangs off it)

| # | Piece | Used in | Notes |
|---|-------|---------|-------|
| 1 | Logomark | Nav, footer, favicon | Paper boat (or a better idea in the same spirit). Must read clearly at 16px. |
| 2 | Homepage hero | Homepage | The flagship piece, ~280×200 frame. Current placeholder: boat on waves with sun and clouds. Should feel hopeful and calm. |
| 3 | Default OG / social image | Link previews everywhere | 1200×630. Wordmark + tagline + hero art. Source SVG at `site/src/assets/og-default.svg`. |
| 4 | 404 illustration | Error page | Gently humorous — current placeholder is a capsized paper boat. Warm, not bleak. |
| 5 | Fallback motif | Any content without a matching topic | Small boat-on-wave vignette (the "default art"). |

## Priority 2 — Topics (one per topic tag; shown on cards, topic pages, article headers)

| # | Topic | Accent | Current placeholder concept (open to better ideas) |
|---|-------|--------|------------------------------------------------------|
| 6 | Health | sage | Heart growing like a leaf |
| 7 | Family life | coral | House with sun and a winding path |
| 8 | Education | sky | Open book with an idea sprouting from it |
| 9 | Safety | amber | Umbrella sheltering small shapes — protection without fear |
| 10 | Special needs | plum | Infinity loop (neurodiversity symbol — deliberately **not** a puzzle piece) with stars |

New topics will appear as the site grows (likely next: sleep, food & mealtimes,
behaviour, screens & tech, play). Quoting for a follow-on batch of ~5 in the
same style would be useful.

## Priority 3 — Sections (index-page headers)

| # | Section | Accent | Current placeholder concept |
|---|---------|--------|------------------------------|
| 11 | Articles | sage | Stacked pages with a leaf bookmark |
| 12 | Curated links | amber | Compass |
| 13 | Editorials | plum | Speech bubble with writing |
| 14 | Topics | sky | Scattered playful shapes |

## Priority 4 — Coming soon (Phases 2–5 of the development plan; brief now, deliver later)

| # | Piece | Used in | Notes |
|---|-------|---------|-------|
| 15 | Games section identity | Nav badge, games index hero | Coral accent. Playful but calm — board-game/family feel, not arcade. |
| 16–20 | Game covers ×5 | Game cards and gate screens | Memory Match, Word Sprout, Bedtime Story Spinner, Kitchen Maths Market, Family Quiz Night. Each needs a card cover (3:2) reusing its game's internal art. |
| 21 | Newsletter / welcome email header | Signup confirmation, weekly digest | Horizontal banner, works in email clients (PNG export too). |
| 22 | "Unlock" / membership moment | Games gate success state | Small celebratory piece — boat with a raised flag, confetti-ish but gentle. |
| 23 | Empty states ×2 | "Nothing here yet" on lists and search | Quiet, friendly waiting imagery. |
| 24 | Story Spinner wheel faces | In-game | ~18 small spot illustrations (6 characters, 6 places, 6 problems) — the largest single batch; can be quoted separately. |
| 25 | Memory Match card backs | In-game | One repeating pattern tile using the brand motif. |

## Summary for quoting

- **Now:** 14 pieces (brand 5 + topics 5 + sections 4).
- **Later, same style:** ~11 pieces plus the ~18 spinner spots and a pattern tile.
- Deliverables: layered source files + optimised SVGs; PNG exports for the OG
  image and email header. Licence: full ownership/buy-out preferred (content is
  republished and remixed across the site, emails, and games).
