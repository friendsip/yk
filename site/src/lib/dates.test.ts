import { describe, it, expect } from 'vitest';
import {
  parseLocalDate,
  addDaysLocal,
  addMonths,
  todayLocalISO,
  formatICSDate,
  daysSince,
  completedWeeks,
  ageMonths,
  ageString,
  ageHeadline,
  ageBreakdown,
  formatAge,
  hashStr,
} from './dates';

describe('parseLocalDate', () => {
  it('parses a valid date at local midnight', () => {
    const d = parseLocalDate('2026-06-15')!;
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(5); // June
    expect(d.getDate()).toBe(15);
    expect(d.getHours()).toBe(0);
  });
  it('rejects malformed input', () => {
    expect(parseLocalDate('2026-6-15')).toBeNull();
    expect(parseLocalDate('nonsense')).toBeNull();
    expect(parseLocalDate('')).toBeNull();
  });
});

describe('addDaysLocal', () => {
  it('adds days across a month boundary (calendar-correct)', () => {
    const d = addDaysLocal(parseLocalDate('2026-06-15')!, 56); // 8 weeks
    expect([d.getFullYear(), d.getMonth() + 1, d.getDate()]).toEqual([2026, 8, 10]);
  });
  it('is DST-immune (always lands on local midnight of the target day)', () => {
    // Across the UK spring-forward (29 Mar 2026)
    const d = addDaysLocal(parseLocalDate('2026-03-15')!, 30);
    expect([d.getMonth() + 1, d.getDate()]).toEqual([4, 14]);
    expect(d.getHours()).toBe(0);
  });
});

describe('addMonths', () => {
  it('clamps to the end of shorter months', () => {
    const d = addMonths(parseLocalDate('2026-01-31')!, 1);
    expect(d.getMonth()).toBe(1); // February, not March
    expect(d.getDate()).toBe(28);
  });
  it('adds whole months normally', () => {
    const d = addMonths(parseLocalDate('2026-05-15')!, 9);
    expect([d.getFullYear(), d.getMonth() + 1, d.getDate()]).toEqual([2027, 2, 15]);
  });
});

describe('todayLocalISO', () => {
  it('formats the injected local date', () => {
    expect(todayLocalISO(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05');
  });
});

describe('formatICSDate', () => {
  it('serialises from local components as YYYYMMDD', () => {
    expect(formatICSDate(new Date(2026, 7, 10))).toBe('20260810');
    expect(formatICSDate(new Date(2026, 0, 1))).toBe('20260101');
  });
});

describe('daysSince / completedWeeks', () => {
  const now = new Date(2026, 7, 10, 12, 0); // 10 Aug 2026, midday
  it('counts completed days', () => {
    expect(daysSince('2026-08-10', now)).toBe(0);
    expect(daysSince('2026-08-03', now)).toBe(7);
  });
  it('returns null for future or invalid', () => {
    expect(daysSince('2026-08-11', now)).toBeNull();
    expect(daysSince('bad', now)).toBeNull();
  });
  it('counts completed weeks', () => {
    expect(completedWeeks('2026-06-15', now)).toBe(8); // 56 days
  });
});

describe('ageMonths (day-of-month aware)', () => {
  it('does not advance a month before the day-of-month is reached', () => {
    // Born on the 15th; "now" is the 14th two months later → still 1 month
    expect(ageMonths('2026-01-15', new Date(2026, 2, 14))).toBe(1);
    // On the 15th → 2 months
    expect(ageMonths('2026-01-15', new Date(2026, 2, 15))).toBe(2);
  });
});

describe('friendly age strings', () => {
  it('ageString covers the ranges', () => {
    expect(ageString(0)).toBe('brand new today');
    expect(ageString(1)).toBe('1 day old');
    expect(ageString(56)).toBe('8 weeks old');
    expect(ageHeadline(0)).toBe('Born today — congratulations!');
    expect(ageHeadline(56)).toBe('8 weeks old');
  });
  it('ageBreakdown lists units', () => {
    expect(ageBreakdown(56)).toContain('56 days');
    expect(ageBreakdown(56)).toContain('8 weeks exactly');
  });
  it('formatAge works in completed weeks', () => {
    expect(formatAge(0)).toBe('less than a week old');
    expect(formatAge(8)).toBe('8 weeks old');
    expect(formatAge(20)).toContain('months');
    expect(formatAge(130)).toContain('year'); // ~30 months → years
  });
});

describe('hashStr', () => {
  it('is deterministic and differs by input', () => {
    expect(hashStr('a')).toBe(hashStr('a'));
    expect(hashStr('a')).not.toBe(hashStr('b'));
    expect(hashStr('x')).toBeGreaterThanOrEqual(0);
  });
});
