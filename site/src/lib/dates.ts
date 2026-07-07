/**
 * Timezone-safe date & age maths for the tools and apps.
 *
 * All of this used to be inlined (and duplicated) across the .astro pages,
 * which caused two classes of bug the 4 July review found:
 *   - `.max` on date inputs and the daily-rotation seed were computed in UTC,
 *     so a parent in NZ couldn't pick "today" and "today's idea" flipped at
 *     the wrong local time.
 *   - the ICS export serialised due dates with toISOString() (UTC), landing
 *     every calendar event a day early for UTC+ (e.g. UK summer) births.
 *
 * The fix is to do all calendar work in LOCAL time via date components, which
 * is also DST-immune. These are pure functions (inject `now` for tests).
 */

/** Parse a YYYY-MM-DD string at LOCAL midnight, or null if malformed. */
export function parseLocalDate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const [, y, mo, d] = m;
  const date = new Date(Number(y), Number(mo) - 1, Number(d));
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Add whole days to a date, returning LOCAL midnight of the target day (DST-safe). */
export function addDaysLocal(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/** Add months, clamping to the end of shorter months (e.g. 31 Jan + 1mo = 28 Feb). */
export function addMonths(date: Date, months: number): Date {
  const r = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = r.getDate();
  r.setMonth(r.getMonth() + months);
  if (r.getDate() < day) r.setDate(0);
  return r;
}

/** Today's date as a LOCAL YYYY-MM-DD (correct max for a date input worldwide). */
export function todayLocalISO(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Format a Date as an ICS all-day value (YYYYMMDD) from LOCAL components. */
export function formatICSDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

/** Completed days since an ISO birth date; null if invalid or future. */
export function daysSince(iso: string, now: Date = new Date()): number | null {
  const birth = parseLocalDate(iso);
  if (!birth) return null;
  const ms = now.getTime() - birth.getTime();
  if (ms < 0) return null;
  return Math.floor(ms / 86_400_000);
}

/** Completed weeks since an ISO birth date; null if invalid or future. */
export function completedWeeks(iso: string, now: Date = new Date()): number | null {
  const days = daysSince(iso, now);
  return days === null ? null : Math.floor(days / 7);
}

/** Whole months between an ISO birth date and now, day-of-month aware. */
export function ageMonths(iso: string, now: Date = new Date()): number | null {
  const birth = parseLocalDate(iso);
  if (!birth) return null;
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) months -= 1; // not yet reached the day-of-month
  return Math.max(0, months);
}

/** Friendly headline age: "6 weeks old", "7 months old", "2 years and 3 months old". */
export function ageString(days: number): string {
  if (days < 0) return '';
  if (days === 0) return 'brand new today';
  if (days < 14) return `${days} day${days === 1 ? '' : 's'} old`;
  const weeks = Math.floor(days / 7);
  if (weeks < 13) {
    const rem = days % 7;
    return rem ? `${weeks} weeks and ${rem} day${rem === 1 ? '' : 's'} old` : `${weeks} weeks old`;
  }
  const months = Math.floor(days / 30.44);
  if (months < 24) {
    const remWeeks = Math.floor((days - months * 30.44) / 7);
    return remWeeks
      ? `${months} months and ${remWeeks} week${remWeeks === 1 ? '' : 's'} old`
      : `${months} months old`;
  }
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  return remMonths
    ? `${years} years and ${remMonths} month${remMonths === 1 ? '' : 's'} old`
    : `${years} year${years === 1 ? '' : 's'} old`;
}

/** Short age headline for the baby-age tool. */
export function ageHeadline(days: number): string {
  if (days === 0) return 'Born today — congratulations!';
  const weeks = Math.floor(days / 7);
  if (days < 14) return `${days} day${days === 1 ? '' : 's'} old`;
  if (weeks < 13) return `${weeks} week${weeks === 1 ? '' : 's'} old`;
  const months = Math.floor(days / 30.44);
  if (months < 24) return `${months} month${months === 1 ? '' : 's'} old`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} and ${months % 12} month${months % 12 === 1 ? '' : 's'} old`;
}

/** Multi-unit age breakdown for the baby-age tool. */
export function ageBreakdown(days: number): string {
  const weeks = Math.floor(days / 7);
  const remDays = days % 7;
  const months = Math.floor(days / 30.44);
  const parts = [
    `${days.toLocaleString('en-GB')} days`,
    remDays ? `${weeks} weeks and ${remDays} day${remDays === 1 ? '' : 's'}` : `${weeks} weeks exactly`,
  ];
  if (months >= 1) parts.push(`about ${months} month${months === 1 ? '' : 's'}`);
  if (months >= 24) parts.push(`${Math.floor(months / 12)} years and ${months % 12} months`);
  return parts.join(' · ');
}

/** Friendly age for the guides, in completed weeks. */
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

/** Deterministic 32-bit hash of a string (for daily-rotation seeds). */
export function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
