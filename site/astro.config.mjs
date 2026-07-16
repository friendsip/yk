import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yourkids.com',
  integrations: [
    mdx(),
    // Keep the noindex app and the JSON data endpoints out of the sitemap
    // (the app is a personalised shell; its SEO content lives in /baby, /toddler).
    sitemap({ filter: (page) => !page.includes('/app') && !page.includes('/data/') }),
  ],
});
