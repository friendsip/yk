/**
 * Backwards-compatible barrel for the guide pages.
 *
 * The storage helpers moved to `storage.ts` and the date maths to `dates.ts`
 * (both unit-tested). This file re-exports them so existing imports keep
 * working, and keeps the guide-only stage lookup.
 */

export {
  BABY_BIRTH_KEY,
  TODDLER_BIRTH_KEY,
  FEEDING_MODE_KEY,
  saveStored,
  loadStored,
  clearStored,
} from './storage';

export { completedWeeks, formatAge, todayLocalISO } from './dates';

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
