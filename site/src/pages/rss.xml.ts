import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

const typeRoutes: Record<string, string> = {
  evergreen: '/articles/',
  curated: '/curated/',
  editorial: '/editorial/',
};

export async function GET(context: APIContext) {
  const content = await getCollection('content');
  const sorted = content.sort(
    (a, b) => b.data.first_published.valueOf() - a.data.first_published.valueOf()
  );

  return rss({
    title: 'YourKids',
    description:
      'Carefully curated articles, guides, and links for parents — grounded in real sources, updated weekly.',
    site: context.site!,
    items: sorted.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.first_published,
      link: (typeRoutes[item.data.type] || '/articles/') + item.slug,
      categories: item.data.tags,
    })),
    customData: '<language>en-gb</language>',
  });
}
