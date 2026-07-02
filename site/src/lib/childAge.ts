/**
 * Client-side helpers for the Baby & Toddler guides.
 *
 * Birth dates are stored ONLY in localStorage on the visitor's device —
 * nothing is ever sent to us (see /privacy). Ages are computed in completed
 * weeks, the same unit the guide data uses (types.ts).
 */

export const BABY_BIRTH_KEY = 'yk-baby-birthdate';
export const TODDLER_BIRTH_KEY = 'yk-toddler-birthdate';
export const FEEDING_MODE_KEY = 'yk-feeding-mode';

export function saveStored(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private browsing — the app still works, it just won't remember */
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

/** Completed weeks since an ISO date (YYYY-MM-DD), or null if invalid/future. */
export function completedWeeks(isoDate: string, now: Date = new Date()): number | null {
  const birth = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return null;
  const ms = now.getTime() - birth.getTime();
  if (ms < 0) return null;
  return Math.floor(ms / (7 * 24 * 60 * 60 * 1000));
}

/** Friendly age string: "2 weeks old", "about 7 months old", "about 2½ years old". */
export function formatAge(weeks: number): string {
  if (weeks < 1) return 'less than a week old';
  if (weeks === 1) return '1 week old';
  if (weeks < 13) return `${weeks} weeks old`;
  const months = Math.floor(weeks / 4.345);
  if (months < 24) return `about ${months} months old`;
  const halfYears = Math.round((months / 12) * 2) / 2;
  const label = Number.isInteger(halfYears) ? `${halfYears}` : `${Math.floor(halfYears)}½`;
  return `about ${label} years old`;
}

export interface StageRange {
  id: string;
  label: string;
  from: number;
  to: number;
}

/** Find the stage covering a given age in completed weeks. */
export function stageForWeeks(stages: StageRange[], weeks: number): StageRange | null {
  return stages.find((s) => weeks >= s.from && weeks <= s.to) ?? null;
}
