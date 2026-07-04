/** Per-band activity JSON for the "What can we do today?" wheel. */

import type { APIContext } from 'astro';
import { toddlerActivities } from '../../../../data/activities/toddler';
import { preschoolActivities } from '../../../../data/activities/preschool';
import { earlySchoolActivities } from '../../../../data/activities/early-school';
import { tweenActivities } from '../../../../data/activities/tween';
import { teenActivities } from '../../../../data/activities/teen';

const BAND_DATA: Record<string, unknown> = {
  toddler: toddlerActivities,
  preschool: preschoolActivities,
  'early-school': earlySchoolActivities,
  tween: tweenActivities,
  teen: teenActivities,
};

export function getStaticPaths() {
  return Object.keys(BAND_DATA).map((band) => ({ params: { band } }));
}

export async function GET({ params }: APIContext) {
  return new Response(JSON.stringify(BAND_DATA[params.band!]), {
    headers: { 'Content-Type': 'application/json' },
  });
}
