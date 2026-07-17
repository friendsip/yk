import { describe, it, expect } from 'vitest';
import {
  randomState,
  buildAuthorizeUrl,
  csrfCookie,
  clearCsrfCookie,
  readCsrfCookie,
  callbackRedirect,
} from './adminAuth';

describe('admin OAuth helpers', () => {
  it('generates 32-hex CSRF states that round-trip through the cookie', () => {
    const state = randomState();
    expect(state).toMatch(/^[0-9a-f]{32}$/);
    expect(readCsrfCookie(csrfCookie(state))).toBe(state);
    expect(readCsrfCookie(`other=1; ${csrfCookie(state).split(';')[0]}; more=2`)).toBe(state);
  });

  it('rejects missing or mangled cookies', () => {
    expect(readCsrfCookie(undefined)).toBeNull();
    expect(readCsrfCookie('')).toBeNull();
    expect(readCsrfCookie('yk-admin-csrf=short')).toBeNull();
    expect(readCsrfCookie('yk-admin-csrf=' + 'z'.repeat(32))).toBeNull();
    expect(readCsrfCookie(clearCsrfCookie())).toBeNull(); // "deleted" is not a state
  });

  it('builds the GitHub authorize URL with repo scope and state', () => {
    const url = new URL(buildAuthorizeUrl('client123', 'abc'.padEnd(32, '0')));
    expect(url.origin + url.pathname).toBe('https://github.com/login/oauth/authorize');
    expect(url.searchParams.get('client_id')).toBe('client123');
    expect(url.searchParams.get('scope')).toBe('repo,user');
    expect(url.searchParams.get('state')).toHaveLength(32);
  });

  it('sends outcomes to the static handshake page in the fragment', () => {
    expect(callbackRedirect({ token: 'tok_1' })).toBe(
      '/admin/oauth.html#provider=github&token=tok_1'
    );
    expect(callbackRedirect({ error: 'nope' })).toBe(
      '/admin/oauth.html#provider=github&error=nope'
    );
    expect(callbackRedirect({})).toContain('error=Sign-in+failed');
  });
});
