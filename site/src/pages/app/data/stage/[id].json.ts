/**
 * Per-stage JSON for the app: the full guide entry plus prev/next ids, so the
 * client only ever downloads the stage it needs.
 */

import type { APIContext } from 'astro';
import { babyWeeks } from '../../../../data/baby/weeks';
import { babyMonths } from '../../../../data/baby/months';
import { toddlerStages } from '../../../../data/toddler/stages';

const all = [
  ...[...babyWeeks, ...babyMonths].map((e) => ({ ...e, kind: 'baby' as const })),
  ...toddlerStages.map((e) => ({ ...e, kind: 'toddler' as const })),
];

export function getStaticPaths() {
  return all.map((entry) => ({ params: { id: entry.id } }));
}

export async function GET({ params }: APIContext) {
  const i = all.findIndex((e) => e.id === params.id);
  const entry = all[i];
  const payload = {
    ...entry,
    prevId: all[i - 1]?.id ?? null,
    nextId: all[i + 1]?.id ?? null,
  };
  return new Response(JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  });
}
