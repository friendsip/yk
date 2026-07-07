import { defineCollection, z } from 'astro:content';

const content = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    type: z.enum(['evergreen', 'curated', 'editorial']),
    section: z.enum(['parenting']).default('parenting'),
    tags: z.array(z.string()).default([]),
    sources: z.array(z.string()).optional(),
    first_published: z.coerce.date(),
    last_updated: z.coerce.date().optional(),
    external_url: z.string().url().optional(),
    /** Optional per-article artwork; cards fall back to topic art when absent */
    image: z.string().optional(),
    /** Alt text for the image — required in spirit whenever image is set */
    image_alt: z.string().optional(),
    /** Attribution for Unsplash (or other credited) photos. Required by the
     *  Unsplash API Guidelines wherever the photo appears. */
    image_credit_name: z.string().optional(),
    image_credit_url: z.string().url().optional(),
    image_source_url: z.string().url().optional(),
    /** Pin to the homepage indefinitely; overrides the 60-day recency window */
    featured: z.boolean().optional().default(false),
  }),
});

// Recommended toys, books, gear, apps, and family services. Evergreen picks.
// Structurally separate from editorial content (Site Bible §12). Each entry is
// a small YAML file in src/content/recommendations/.
const recommendations = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    /** Plain-English "why we like it" — honest, never salesy */
    summary: z.string(),
    category: z.enum(['book', 'toy', 'gear', 'app', 'finance']).default('toy'),
    /** Topic tags drive the card artwork and let us cross-link from articles */
    tags: z.array(z.string()).default([]),
    age_range: z.string().optional(),
    /** Amazon (or other) affiliate URL. Omitted until the associate tag exists —
     *  cards render without an outbound link rather than a fake one. */
    affiliate_url: z.string().url().optional(),
    retailer: z.string().default('Amazon'),
    first_published: z.coerce.date(),
    last_updated: z.coerce.date().optional(),
  }),
});

// Time-sensitive deals on big-ticket kit (buggies, car seats, cots, monitors).
// Prices MUST be dated (price_checked) — deals go stale fast and our credibility
// rides on accuracy (Site Bible §12 / revitalization plan Phase 6).
const deals = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['pushchair', 'car-seat', 'cot', 'monitor', 'other']).default('other'),
    /** Free text so we can write "£199" / "$249" without locale assumptions */
    price: z.string().optional(),
    /** The pre-deal price, for an honest comparison */
    rrp: z.string().optional(),
    /** Required: the date we last verified the price. Deals without this don't publish. */
    price_checked: z.coerce.date(),
    retailer: z.string().default('Amazon'),
    affiliate_url: z.string().url().optional(),
    first_published: z.coerce.date(),
    /** Optional sell-by date; expired deals are hidden automatically */
    expires: z.coerce.date().optional(),
  }),
});

export const collections = { content, recommendations, deals };
