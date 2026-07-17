/**
 * GET /api/auth — starts the /admin GitHub sign-in (Decap/Sveltia protocol).
 * Sets a CSRF cookie and bounces the popup to GitHub's authorize page;
 * GitHub returns to /api/callback (the OAuth App's callback URL).
 *
 * Config: GITHUB_OAUTH_CLIENT_ID (+ _SECRET, used by callback.ts) in the
 * Vercel project env. Without them the popup lands on a friendly error.
 */
// NOTE: the .js extension is load-bearing — this package is ESM and Vercel
// runs functions on native Node ESM (see api/subscribe.ts).
import {
  randomState,
  buildAuthorizeUrl,
  csrfCookie,
  callbackRedirect,
} from '../src/lib/adminAuth.js';

interface ApiRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
}
interface ApiResponse {
  setHeader(name: string, value: string): void;
  redirect(status: number, url: string): void;
  status(code: number): { json(payload: unknown): void };
}

export default function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return res.redirect(302, callbackRedirect({ error: 'Admin sign-in is not configured yet' }));
  }

  const state = randomState();
  res.setHeader('Set-Cookie', csrfCookie(state));
  res.redirect(302, buildAuthorizeUrl(clientId, state));
}
