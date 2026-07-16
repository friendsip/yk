/**
 * POST /api/subscribe — newsletter signup.
 *
 * Vercel deploys any file under `api/` at the project root as a serverless
 * function alongside the static Astro build (Astro itself never sees this
 * directory). The function creates a Buttondown subscriber; Buttondown then
 * sends the double-opt-in confirmation email, so nobody joins the list
 * without clicking it.
 *
 * Config: set BUTTONDOWN_API_KEY in the Vercel project's environment
 * variables. Without it — and under `astro dev`/`preview`, where this route
 * doesn't exist at all — the homepage form falls back to its honest
 * "signups open very soon" message.
 */
import {
  isPlausibleEmail,
  isAllowedOrigin,
  mapButtondownResponse,
  subscribeMessage,
} from '../src/lib/newsletter';
import type { SubscribeState } from '../src/lib/newsletter';

// Minimal structural types for Vercel's Node (req, res) handler, instead of
// depending on @vercel/node. Vercel parses JSON and form bodies into
// req.body and adds the status/json/send helpers.
interface ApiRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}
interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(payload: unknown): void;
  send(payload: string): void;
}

const HTTP_STATUS: Record<SubscribeState, number> = {
  'confirm-sent': 200,
  'already-subscribed': 200,
  'invalid-email': 400,
  'not-configured': 503,
  'rate-limited': 429,
  error: 502,
};

function field(body: unknown, name: string): string {
  if (typeof body === 'object' && body !== null) {
    const value = (body as Record<string, unknown>)[name];
    if (typeof value === 'string') return value;
  }
  return '';
}

function header(req: ApiRequest, name: string): string {
  const value = req.headers[name];
  return typeof value === 'string' ? value : '';
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Cache-Control', 'no-store');

  // The homepage script sends JSON; a browser with JavaScript off posts the
  // form directly and gets a small readable page instead of raw JSON.
  const isFormPost = header(req, 'content-type').includes('form-urlencoded');
  const send = (state: SubscribeState) => {
    res.status(HTTP_STATUS[state]);
    if (isFormPost) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.send(
        '<!doctype html><html lang="en"><meta charset="utf-8">' +
          '<meta name="viewport" content="width=device-width, initial-scale=1">' +
          '<title>YourKids newsletter</title>' +
          '<body style="font-family: system-ui, sans-serif; line-height: 1.6; max-width: 32rem; margin: 4rem auto; padding: 0 1rem;">' +
          `<p>${subscribeMessage(state)}</p>` +
          '<p><a href="/">Back to yourkids.com</a></p>'
      );
    } else {
      res.json({ state });
    }
  };

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ state: 'error' });
  }

  if (!isAllowedOrigin(header(req, 'origin') || undefined, header(req, 'host') || undefined)) {
    return res.status(403).json({ state: 'error' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  // Honeypot: people never see this field, so anything in it is a bot.
  // Pretend success so they move on.
  if (field(body, 'website')) return send('confirm-sent');

  const email = field(body, 'email').trim();
  if (!isPlausibleEmail(email)) return send('invalid-email');

  const key = process.env.BUTTONDOWN_API_KEY;
  if (!key) return send('not-configured');

  try {
    const upstream = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Token ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email, tags: ['site-signup'] }),
      signal: AbortSignal.timeout(10_000),
    });
    const payload: unknown = await upstream.json().catch(() => ({}));
    const state = mapButtondownResponse(upstream.status, payload);
    if (state === 'error' || state === 'not-configured') {
      // The real cause goes to the Vercel function logs, never to the reader.
      console.error(
        'buttondown subscribe failed:',
        upstream.status,
        JSON.stringify(payload).slice(0, 500)
      );
    }
    return send(state);
  } catch (err) {
    console.error('buttondown unreachable:', err);
    return send('error');
  }
}
