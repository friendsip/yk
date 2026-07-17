/* Completes the CMS OAuth popup handshake (Decap/Sveltia protocol).
   /api/callback redirects here with the outcome in the URL FRAGMENT so the
   token never appears in a server log, and no inline script is needed
   (CSP: script-src 'self').

   Handshake: popup announces "authorizing:github" to the opener; the CMS
   replies with the same string; the popup then delivers
   "authorization:github:success:{json}" (or :error:) to the CMS origin. */
(() => {
  const params = new URLSearchParams(location.hash.slice(1));
  const provider = params.get('provider') || 'github';
  const token = params.get('token');
  const error = params.get('error');

  // Scrub the token from the address bar/history straight away
  history.replaceState(null, '', location.pathname);

  const payload = token
    ? `authorization:${provider}:success:${JSON.stringify({ provider, token })}`
    : `authorization:${provider}:error:${JSON.stringify({ provider, error: error || 'Sign-in failed' })}`;

  window.addEventListener('message', (event) => {
    if (event.data === `authorizing:${provider}`) {
      window.opener?.postMessage(payload, event.origin);
    }
  });
  window.opener?.postMessage(`authorizing:${provider}`, '*');
})();
