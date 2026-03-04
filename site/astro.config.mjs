import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  content: {
    collections: {
      articles: {
        schema: ({ z }) => z.object({
          title: z.string(),
          summary: z.string(),
          sources: z.array(z.string()).optional(),
          publishedDate: z.coerce.date(),
        }),
      },
    },
  },
});
