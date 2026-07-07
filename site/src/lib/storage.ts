/**
 * localStorage keys and safe accessors — the on-device store for the tools
 * and apps. Nothing here is ever sent off the device (see /privacy).
 *
 * Consolidated here so the ~half-dozen pages that touch storage stop
 * hardcoding key strings and re-declaring the try/catch wrappers.
 */

// Guides & tools
export const BABY_BIRTH_KEY = 'yk-baby-birthdate';
export const TODDLER_BIRTH_KEY = 'yk-toddler-birthdate';
export const FEEDING_MODE_KEY = 'yk-feeding-mode';

// Activity wheel
export const ACTIVITY_BAND_KEY = 'yk-activity-band';
export const ACTIVITY_SETTING_KEY = 'yk-activity-setting';

// Baby & Toddler app
export const APP_PARENT_KEY = 'yk-app-parent';
export const APP_CHILDREN_KEY = 'yk-app-children';
export const APP_ACTIVE_KEY = 'yk-app-active';

export function saveStored(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private browsing / quota — callers must tolerate a failed write */
  }
}

export function loadStored(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function clearStored(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/** First stored value among the given keys (e.g. baby then toddler DOB). */
export function loadFirst(...keys: string[]): string | null {
  for (const key of keys) {
    const v = loadStored(key);
    if (v) return v;
  }
  return null;
}
