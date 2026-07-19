import { describe, it, expect } from 'vitest';
import { sectionPath, aliasRoutes, type RedirectableEntry } from './redirects';

describe('sectionPath', () => {
  it('maps each type to its section', () => {
    expect(sectionPath('evergreen', 'a')).toBe('/articles/a/');
    expect(sectionPath('editorial', 'b')).toBe('/editorial/b/');
    expect(sectionPath('curated', 'c')).toBe('/curated/c/');
  });
});

describe('aliasRoutes', () => {
  const entries: RedirectableEntry[] = [
    { slug: 'cooking-together', type: 'evergreen', redirect_from: ['cooking-with-kids-what-its-really-good-for'] },
    { slug: 'outdoor-play', type: 'evergreen', redirect_from: [] },
    { slug: 'weekly-thoughts', type: 'editorial', redirect_from: ['old-editorial-name'] },
  ];

  it('emits an alias for every old slug, targeting the current section', () => {
    const routes = aliasRoutes(entries, new Set(['cooking-together', 'outdoor-play']));
    expect(routes).toContainEqual({
      slug: 'cooking-with-kids-what-its-really-good-for',
      redirectTo: '/articles/cooking-together/',
    });
    // cross-section: an editorial entry's old slug still redirects to /editorial/
    expect(routes).toContainEqual({
      slug: 'old-editorial-name',
      redirectTo: '/editorial/weekly-thoughts/',
    });
  });

  it('never emits an alias that clashes with a live slug in the section', () => {
    const clashing: RedirectableEntry[] = [
      { slug: 'new-name', type: 'evergreen', redirect_from: ['taken-slug'] },
    ];
    const routes = aliasRoutes(clashing, new Set(['new-name', 'taken-slug']));
    expect(routes).toEqual([]);
  });

  it('dedupes contested old slugs deterministically and skips empties', () => {
    const contested: RedirectableEntry[] = [
      { slug: 'b-entry', type: 'evergreen', redirect_from: ['shared-old', ''] },
      { slug: 'a-entry', type: 'curated', redirect_from: ['shared-old'] },
    ];
    const routes = aliasRoutes(contested, new Set());
    expect(routes).toEqual([
      { slug: 'shared-old', redirectTo: '/curated/a-entry/' }, // a-entry sorts first
    ]);
  });

  it('handles entries without a redirect_from field', () => {
    expect(aliasRoutes([{ slug: 'x', type: 'evergreen' }], new Set())).toEqual([]);
  });
});
