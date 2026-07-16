import { describe, it, expect } from 'vitest';
import {
  isPlausibleEmail,
  mapButtondownResponse,
  isAllowedOrigin,
  subscribeMessage,
  SUBSCRIBE_STATES,
} from './newsletter';

describe('isPlausibleEmail', () => {
  it('accepts ordinary addresses', () => {
    expect(isPlausibleEmail('parent@example.com')).toBe(true);
    expect(isPlausibleEmail('first.last+tag@sub.domain.co.uk')).toBe(true);
    expect(isPlausibleEmail('  padded@example.org  ')).toBe(true); // trims
  });

  it('rejects the clearly broken', () => {
    expect(isPlausibleEmail('')).toBe(false);
    expect(isPlausibleEmail('no-at-sign.com')).toBe(false);
    expect(isPlausibleEmail('two@@example.com')).toBe(false);
    expect(isPlausibleEmail('a@b@c.com')).toBe(false);
    expect(isPlausibleEmail('@example.com')).toBe(false); // empty local part
    expect(isPlausibleEmail('spaces in@example.com')).toBe(false);
    expect(isPlausibleEmail('nodot@example')).toBe(false);
    expect(isPlausibleEmail('dot@.example.com')).toBe(false);
    expect(isPlausibleEmail('dot@example.com.')).toBe(false);
    expect(isPlausibleEmail('dots@exa..mple.com')).toBe(false);
    expect(isPlausibleEmail(`${'a'.repeat(65)}@example.com`)).toBe(false); // local >64
    expect(isPlausibleEmail(`a@${'b'.repeat(250)}.com`)).toBe(false); // >254 total
  });
});

describe('mapButtondownResponse', () => {
  it('treats 2xx as confirmation sent', () => {
    expect(mapButtondownResponse(201, { id: 'abc' })).toBe('confirm-sent');
    expect(mapButtondownResponse(200, {})).toBe('confirm-sent');
  });

  it('recognises an existing subscriber from the error code', () => {
    expect(mapButtondownResponse(400, { code: 'subscriber_already_exists' })).toBe(
      'already-subscribed'
    );
    expect(mapButtondownResponse(400, { code: 'email_already_exists' })).toBe(
      'already-subscribed'
    );
    expect(
      mapButtondownResponse(409, { detail: 'That email address already exists.' })
    ).toBe('already-subscribed');
  });

  it('treats other 400s as a bad address', () => {
    expect(mapButtondownResponse(400, { code: 'email_invalid' })).toBe('invalid-email');
    expect(mapButtondownResponse(400, { code: 'subscriber_blocked' })).toBe('invalid-email');
    expect(mapButtondownResponse(400, 'not even json')).toBe('invalid-email');
  });

  it('maps auth failures to not-configured (bad or missing key)', () => {
    expect(mapButtondownResponse(401, { detail: 'Invalid token.' })).toBe('not-configured');
    expect(mapButtondownResponse(403, {})).toBe('not-configured');
  });

  it('maps 429 to rate-limited and anything else to error', () => {
    expect(mapButtondownResponse(429, {})).toBe('rate-limited');
    expect(mapButtondownResponse(500, {})).toBe('error');
    expect(mapButtondownResponse(302, {})).toBe('error');
  });
});

describe('isAllowedOrigin', () => {
  it('allows matching origins and header-less requests', () => {
    expect(isAllowedOrigin('https://yourkids.com', 'yourkids.com')).toBe(true);
    expect(isAllowedOrigin(undefined, 'yourkids.com')).toBe(true); // curl etc.
    expect(isAllowedOrigin('https://preview.vercel.app', undefined)).toBe(true);
  });

  it('rejects cross-site and malformed origins', () => {
    expect(isAllowedOrigin('https://evil.example', 'yourkids.com')).toBe(false);
    expect(isAllowedOrigin('not a url', 'yourkids.com')).toBe(false);
  });
});

describe('subscribeMessage', () => {
  it('has warm, non-empty wording for every state', () => {
    for (const state of SUBSCRIBE_STATES) {
      const message = subscribeMessage(state);
      expect(message.length).toBeGreaterThan(20);
      expect(message).not.toMatch(/API|HTTP|\b\d{3}\b/); // no jargon or status codes
    }
  });
});
