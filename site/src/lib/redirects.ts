/**
 * Slug-rename safety net. Entries can list `redirect_from` slugs (their old
 * filenames); every section route emits a tiny redirect stub at each old URL
 * pointing to the entry's current home — so renames never 404 old links,
 * whichever section the entry lived in or lives in now.
 */

export interface RedirectableEntry {
  slug: string;
  type: 'evergreen' | 'curated' | 'editorial';
  redirect_from?: string[];
}

/** The live path for an entry, by its current type. */
export function sectionPath(type: RedirectableEntry['type'], slug: string): string {
  const section =
    type === 'evergreen' ? 'articles' : type === 'editorial' ? 'editorial' : 'curated';
  return `/${section}/${slug}/`;
}

/**
 * All alias routes to emit in a section's getStaticPaths: every old slug of
 * every entry (the target is computed from the entry's CURRENT type, so
 * cross-section moves redirect correctly), minus any alias that would clash
 * with a slug that's live in that same section. Deterministic: sorted, and
 * the alphabetically-first entry wins a contested old slug.
 */
export function aliasRoutes(
  entries: RedirectableEntry[],
  liveSlugsInSection: Set<string>
): { slug: string; redirectTo: string }[] {
  const seen = new Set<string>();
  const routes: { slug: string; redirectTo: string }[] = [];
  for (const entry of [...entries].sort((a, b) => a.slug.localeCompare(b.slug))) {
    for (const old of entry.redirect_from ?? []) {
      if (!old || liveSlugsInSection.has(old) || seen.has(old)) continue;
      seen.add(old);
      routes.push({ slug: old, redirectTo: sectionPath(entry.type, entry.slug) });
    }
  }
  return routes;
}
