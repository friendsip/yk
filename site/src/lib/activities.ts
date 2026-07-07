/**
 * Activity-wheel selection logic — pure and testable.
 *
 * Extracted from the wheel page so the daily-pick determinism and
 * non-repeating respin behaviour can be unit-tested. The daily seed uses a
 * LOCAL date so "today's idea" flips at local midnight (matching the header),
 * not at UTC midnight.
 */

import { hashStr, todayLocalISO } from './dates';

export interface Activity {
  id: string;
  title: string;
  how: string[];
  setting: 'inside' | 'outside' | 'either';
  category: string;
  materials: string;
  parentEnergy: string;
  safetyNote?: string;
}

export const ACTIVITY_BANDS = ['toddler', 'preschool', 'early-school', 'tween', 'teen'] as const;
export type ActivityBand = (typeof ACTIVITY_BANDS)[number];

export function isActivityBand(v: string | null | undefined): v is ActivityBand {
  return !!v && (ACTIVITY_BANDS as readonly string[]).includes(v);
}

/** Map a birth date to an age band (used to pre-select from the app profile). */
export function bandForBirthdate(iso: string, now: Date = new Date()): ActivityBand | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const birth = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (Number.isNaN(birth.getTime())) return null;
  const years = (now.getTime() - birth.getTime()) / (365.25 * 86_400_000);
  if (years < 0) return null;
  if (years < 3) return 'toddler';
  if (years < 5) return 'preschool';
  if (years < 8) return 'early-school';
  if (years < 13) return 'tween';
  return 'teen';
}

/** Filter a pool by setting ('either' keeps everything). */
export function filterBySetting(pool: Activity[], setting: string): Activity[] {
  if (setting === 'either') return pool;
  return pool.filter((a) => a.setting === setting || a.setting === 'either');
}

/** The deterministic "today's idea" for a band/setting (same all local day). */
export function todayPick(
  pool: Activity[],
  band: string,
  setting: string,
  now: Date = new Date()
): Activity | null {
  if (!pool.length) return null;
  return pool[hashStr(`${todayLocalISO(now)}|${band}|${setting}`) % pool.length];
}

/**
 * Choose the next pick, avoiding `seen` ids until the pool is exhausted.
 * `rand` is injectable for tests. Mutates `seen` (adds the returned id).
 * Returns null on an empty pool.
 */
export function nextPick(
  pool: Activity[],
  seen: Set<string>,
  rand: () => number = Math.random
): Activity | null {
  if (!pool.length) return null;
  const fresh = pool.filter((a) => !seen.has(a.id));
  const from = fresh.length ? fresh : pool;
  if (!fresh.length) seen.clear();
  const pick = from[Math.floor(rand() * from.length)];
  seen.add(pick.id);
  return pick;
}
