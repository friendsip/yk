/**
 * Newsletter signup logic, shared by the homepage form and the
 * /api/subscribe Vercel function. Pure functions only — the I/O lives in
 * site/api/subscribe.ts and the homepage script.
 *
 * Provider: Buttondown (https://docs.buttondown.com). Double opt-in is
 * Buttondown's default for API-created subscribers: they are created as
 * `unactivated`, receive a confirmation email, and only join the list once
 * they click the link in it.
 */

export type SubscribeState =
  | 'confirm-sent' // subscriber created; confirmation email on its way
  | 'already-subscribed' // Buttondown already has this address
  | 'invalid-email' // the address failed validation (ours or Buttondown's)
  | 'not-configured' // no BUTTONDOWN_API_KEY yet, or no /api in dev/preview
  | 'rate-limited' // Buttondown returned 429
  | 'error'; // network failure or an unexpected response

export const SUBSCRIBE_STATES: SubscribeState[] = [
  'confirm-sent',
  'already-subscribed',
  'invalid-email',
  'not-configured',
  'rate-limited',
  'error',
];

/**
 * A cheap shape check before spending an API call. Deliberately permissive —
 * the browser's `type="email"` and Buttondown's own validation are the real
 * gates; this only catches the clearly-broken.
 */
export function isPlausibleEmail(raw: string): boolean {
  const email = raw.trim();
  if (email.length < 6 || email.length > 254 || /\s/.test(email)) return false;
  const at = email.indexOf('@');
  if (at < 1 || at !== email.lastIndexOf('@')) return false;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (local.length > 64) return false;
  if (!domain.includes('.')) return false;
  if (domain.startsWith('.') || domain.endsWith('.') || domain.includes('..')) return false;
  return true;
}

/**
 * Map a Buttondown API response (status + parsed JSON body) to an outcome.
 * Matches on substrings of the error `code` (e.g. `subscriber_already_exists`,
 * `email_invalid`) rather than exact strings, so wording drift upstream
 * doesn't break us. 401/403 mean a missing or revoked key — the reader sees
 * the soft "signups open soon" message while the real cause goes to the logs.
 */
export function mapButtondownResponse(status: number, body: unknown): SubscribeState {
  if (status === 200 || status === 201 || status === 202) return 'confirm-sent';
  const detail =
    typeof body === 'object' && body !== null
      ? `${(body as Record<string, unknown>).code ?? ''} ${(body as Record<string, unknown>).detail ?? ''}`
      : '';
  if (status === 400 || status === 409) {
    if (/alread|exist|duplicate/i.test(detail)) return 'already-subscribed';
    return 'invalid-email';
  }
  if (status === 401 || status === 403) return 'not-configured';
  if (status === 429) return 'rate-limited';
  return 'error';
}

/**
 * Same-origin check for the endpoint. Browsers send an Origin header on
 * POSTs; when present it must match the host serving the function. Requests
 * without one (curl and friends) are allowed — this is spam friction, not
 * authentication; double opt-in is the actual consent gate.
 */
export function isAllowedOrigin(origin: string | undefined, host: string | undefined): boolean {
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** The reader-facing message for each outcome — warm, honest, no jargon. */
export function subscribeMessage(state: SubscribeState): string {
  switch (state) {
    case 'confirm-sent':
      return "Lovely — one last step: we've sent you a confirmation email. Click the link inside and you're on the list. 💛";
    case 'already-subscribed':
      return "You're already on the list — thank you! If you haven't seen a confirmation email, it's worth a peek in your spam folder.";
    case 'invalid-email':
      return 'Hmm — that email address doesn’t look quite right. Mind checking it and trying again?';
    case 'not-configured':
      return 'Nearly there — the first weekly email is being prepared, and signups open with it very soon. Thank you for wanting in! 💛';
    case 'rate-limited':
      return 'We’re getting a lovely rush of sign-ups just now — please try again in a few minutes.';
    case 'error':
      return 'Sorry — something went wrong at our end and we couldn’t sign you up. Please try again in a moment.';
  }
}
