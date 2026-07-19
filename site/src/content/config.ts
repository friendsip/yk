import { defineCollection, z } from 'astro:content';

// The /admin CMS writes blank optional fields as empty strings ('') rather
// than omitting them. Treat empty as absent so an untouched optional field
// can never fail .url()/date validation and break the build.
const emptyAsAbsent = (value: unknown) =>
  value === '' || value === null ? undefined : value;
const optionalUrl = () => z.preprocess(emptyAsAbsent, z.string().url().optional());
const optionalDate = () => z.preprocess(emptyAsAbsent, z.coerce.date().optional());
const optionalString = () => z.preprocess(emptyAsAbsent, z.string().optional());

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
    last_updated: optionalDate(),
    external_url: optionalUrl(),
    /** Optional per-article artwork; cards fall back to topic art when absent */
    image: optionalString(),
    /** Alt text for the image — required in spirit whenever image is set */
    image_alt: optionalString(),
    /** Attribution for Unsplash (or other credited) photos. Required by the
     *  Unsplash API Guidelines wherever the photo appears. */
    image_credit_name: optionalString(),
    image_credit_url: optionalUrl(),
    image_source_url: optionalUrl(),
    /** Pin to the homepage indefinitely; overrides the 60-day recency window */
    featured: z.boolean().optional().default(false),
    /** Old slugs this entry used to live at. Each one gets a tiny redirect
     *  page pointing here, so renaming a file never breaks old links.
     *  When renaming: add the previous filename (without .md) to this list. */
    redirect_from: z.array(z.string()).default([]),
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
    age_range: optionalString(),
    /** Amazon (or other) affiliate URL. Omitted until the associate tag exists —
     *  cards render without an outbound link rather than a fake one. */
    affiliate_url: optionalUrl(),
    retailer: z.string().default('Amazon'),
    first_published: z.coerce.date(),
    last_updated: optionalDate(),
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
    price: optionalString(),
    /** The pre-deal price, for an honest comparison */
    rrp: optionalString(),
    /** Required: the date we last verified the price. Deals without this don't publish. */
    price_checked: z.coerce.date(),
    retailer: z.string().default('Amazon'),
    affiliate_url: optionalUrl(),
    first_published: z.coerce.date(),
    /** Optional sell-by date; expired deals are hidden automatically */
    expires: optionalDate(),
  }),
});

export const collections = { content, recommendations, deals };
