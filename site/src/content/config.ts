import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    sources: z.array(z.string()).optional(),
    publishedDate: z.coerce.date(),
  }),
});

export const collections = { articles };
