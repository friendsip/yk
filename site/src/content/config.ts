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
  }),
});

export const collections = { content };
