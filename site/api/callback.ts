/**
 * GET /api/callback — GitHub returns here after /api/auth. Validates the
 * CSRF state, exchanges the code for an access token, and redirects the
 * popup to /admin/oauth.html with the outcome in the URL FRAGMENT (fragments
 * never reach server logs); a static script there completes the CMS
 * postMessage handshake. Register this exact URL as the OAuth App callback:
 * https://www.yourkids.com/api/callback
 */
// NOTE: the .js extension is load-bearing — this package is ESM and Vercel
// runs functions on native Node ESM (see api/subscribe.ts).
import {
  readCsrfCookie,
  clearCsrfCookie,
  callbackRedirect,
} from '../src/lib/adminAuth.js';

interface ApiRequest {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
  headers: Record<string, string | string[] | undefined>;
}
interface ApiResponse {
  setHeader(name: string, value: string): void;
  redirect(status: number, url: string): void;
  status(code: number): { json(payload: unknown): void };
}

function param(req: ApiRequest, name: string): string {
  const value = req.query?.[name];
  return typeof value === 'string' ? value : '';
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Set-Cookie', clearCsrfCookie());

  const fail = (error: string) => res.redirect(302, callbackRedirect({ error }));

  const code = param(req, 'code');
  const state = param(req, 'state');
  const cookieHeader = req.headers['cookie'];
  const expected = readCsrfCookie(typeof cookieHeader === 'string' ? cookieHeader : undefined);

  if (!code) return fail(param(req, 'error_description') || 'GitHub returned no code');
  if (!expected || state !== expected) return fail('Sign-in session expired — please try again');

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) return fail('Admin sign-in is not configured yet');

  try {
    const upstream = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
      signal: AbortSignal.timeout(10_000),
    });
    const payload = (await upstream.json().catch(() => ({}))) as {
      access_token?: string;
      error_description?: string;
    };
    if (!payload.access_token) {
      console.error('github token exchange failed:', upstream.status, payload.error_description);
      return fail(payload.error_description || 'GitHub did not issue a token');
    }
    return res.redirect(302, callbackRedirect({ token: payload.access_token }));
  } catch (err) {
    console.error('github token exchange unreachable:', err);
    return fail('Could not reach GitHub — please try again');
  }
}
