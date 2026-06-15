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
    /** Pin to the homepage indefinitely; overrides the 60-day recency window */
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { content };
