/**
 * Pure logic for the /admin GitHub OAuth bridge (api/auth.ts + api/callback.ts).
 * The flow is the standard Decap/Sveltia one: popup → GitHub authorize →
 * /api/callback exchanges the code → redirect to /admin/oauth.html with the
 * outcome in the URL fragment (never a query string — fragments don't reach
 * server logs), where a static script completes the postMessage handshake.
 */

const CSRF_COOKIE = 'yk-admin-csrf';

/** A single-use CSRF state token (hex, no dashes — cookie/URL safe). */
export function randomState(): string {
  return crypto.randomUUID().replace(/-/g, '');
}

export function buildAuthorizeUrl(clientId: string, state: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'repo,user',
    state,
  });
  return `https://github.com/login/oauth/authorize?${params}`;
}

/** Set-Cookie value holding the CSRF state for ten minutes. */
export function csrfCookie(state: string): string {
  return `${CSRF_COOKIE}=${state}; HttpOnly; Path=/api; Max-Age=600; SameSite=Lax; Secure`;
}

/** Set-Cookie value that clears the CSRF cookie. */
export function clearCsrfCookie(): string {
  return `${CSRF_COOKIE}=deleted; HttpOnly; Path=/api; Max-Age=0; SameSite=Lax; Secure`;
}

/** Read the CSRF state back out of a Cookie request header. */
export function readCsrfCookie(cookieHeader: string | undefined): string | null {
  const match = (cookieHeader ?? '').match(
    new RegExp(`(?:^|;\\s*)${CSRF_COOKIE}=([0-9a-f]{32})(?:;|$)`)
  );
  return match ? match[1] : null;
}

/** Where /api/callback sends the popup — outcome in the fragment. */
export function callbackRedirect(outcome: { token?: string; error?: string }): string {
  const params = new URLSearchParams({ provider: 'github' });
  if (outcome.token) params.set('token', outcome.token);
  else params.set('error', outcome.error || 'Sign-in failed');
  return `/admin/oauth.html#${params}`;
}
