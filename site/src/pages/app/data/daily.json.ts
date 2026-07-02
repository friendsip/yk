/** Daily rotating content pools for the app, served as static JSON. */

import { affirmations, funFacts, dailyHints } from '../../../data/app/daily';

export async function GET() {
  return new Response(JSON.stringify({ affirmations, funFacts, dailyHints }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
