# Recommendations, Deals & Trusted Sites — how to add entries

Three structurally-separate sections, grouped under the **Recommended** dropdown
in the nav (Site Bible §12: never advertising disguised as editorial; recommend
what's genuinely good, not what pays).

## A trusted site (whole websites worth bookmarking) → `/sites`

These are *not* affiliate links — they're editorial recommendations of whole
organisations/websites (NHS, Raising Children Network, NSPCC, etc.), as distinct
from the single pages in Curated Links. The directory is a hand-maintained data
module, not a content collection: edit **`site/src/lib/parentingSites.ts`** and
add an object to the `parentingSites` array:

```ts
{
  name: 'Organisation name',
  url: 'https://example.org/',
  domain: 'example.org',          // shown on the "Visit …" link
  review: 'Two or three honest sentences — what it is, who it suits.',
  category: 'health',             // health | mental-health | special-needs | online-safety | support
  region: 'UK',                   // UK | US | Australia | Global — label the jurisdiction (Site Bible §5)
  tags: ['health'],               // drives the card artwork
}
```

Keep to Tier 1–2 sources (Site Bible §6) and label the country each site's
guidance applies to.

---

## A recommendation (toys, books, gear, apps, family services) → `/recommended`

Add a YAML file in **this folder** (`src/content/recommendations/`):

```yaml
title: "Product name — maker"
summary: >
  Plain-English, honest "why we like it". Say what it's good for and, where
  relevant, what it isn't. Never salesy.
category: book        # book | toy | gear | app | finance
tags:
  - health            # topic tag(s) — drives the card artwork
age_range: "Roughly 3–6"   # optional
affiliate_url: "https://www.amazon.co.uk/dp/XXXX?tag=YOURTAG-21"  # optional — omit until you have the Associate tag
retailer: Amazon
first_published: 2026-06-18
```

Leave `affiliate_url` out until you've signed up for Amazon Associates — the card
renders a quiet "Link coming soon" instead of a fake link, and the affiliate
disclosure only appears once at least one real link exists.

## A deal (big-ticket kit) → `/deals`

Add a YAML file in **`src/content/deals/`**:

```yaml
title: "Pushchair model — maker"
summary: "Why this is a deal we'd genuinely consider."
category: pushchair   # pushchair | car-seat | cot | monitor | other
price: "£199"
rrp: "£279"           # optional was-price
price_checked: 2026-06-18   # REQUIRED — the day you verified the price
retailer: Amazon
affiliate_url: "https://..."   # optional, as above
first_published: 2026-06-18
expires: 2026-06-30   # optional — expired deals hide automatically
```

**`price_checked` is required** — deals go stale fast and our credibility rides
on accuracy. Re-check prices before re-sharing, and update the date. Expired
deals (past `expires`) drop off the page on the next build automatically.

## Before going live with real affiliate links

1. Sign up for Amazon Associates (UK and/or US).
2. Add a **privacy-policy page** covering affiliate cookies (shared with the
   newsletter work) — affiliate networks set third-party cookies, which must be
   disclosed under GDPR.
3. Add the tagged `affiliate_url`s. The disclosure component appears
   automatically once a page carries a live link.
