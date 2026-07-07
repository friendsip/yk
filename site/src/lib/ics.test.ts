import { describe, it, expect } from 'vitest';
import { vaccinationDueDate, buildVaccinationICS, icsEscape, type VaxEvent } from './ics';

const events: VaxEvent[] = [
  { id: '8-weeks', ageLabel: '8 weeks', dueOffsetDays: 56, vaccines: ['6-in-1', 'MenB'] },
  { id: '12-weeks', ageLabel: '12 weeks', dueOffsetDays: 84, vaccines: ['6-in-1'] },
];

describe('vaccinationDueDate', () => {
  it('computes the correct calendar day (regression: not a day early)', () => {
    // 8 weeks from a summer (BST) birth. The old toISOString() approach
    // reported 9 Aug; the correct answer is 10 Aug.
    const due = vaccinationDueDate('2026-06-15', 56)!;
    expect([due.getFullYear(), due.getMonth() + 1, due.getDate()]).toEqual([2026, 8, 10]);
  });
  it('returns null for an invalid date', () => {
    expect(vaccinationDueDate('', 56)).toBeNull();
  });
});

describe('buildVaccinationICS', () => {
  const ics = buildVaccinationICS(events, '2026-06-15', '20260101T000000Z');

  it('writes the correct DTSTART (the day shown on screen, not a day early)', () => {
    expect(ics).toContain('DTSTART;VALUE=DATE:20260810');
    expect(ics).toContain('DTSTART;VALUE=DATE:20260907'); // 12 weeks
    expect(ics).not.toContain('20260809'); // the old off-by-one value
  });

  it('produces one VEVENT per event, wrapped in a VCALENDAR', () => {
    expect(ics.startsWith('BEGIN:VCALENDAR')).toBe(true);
    expect(ics.trimEnd().endsWith('END:VCALENDAR')).toBe(true);
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(2);
    expect(ics).toContain('SUMMARY:Baby vaccinations due (8 weeks)');
  });

  it('skips everything for an invalid birth date', () => {
    const empty = buildVaccinationICS(events, 'bad');
    expect(empty.match(/BEGIN:VEVENT/g)).toBeNull();
  });
});

describe('icsEscape', () => {
  it('escapes commas, semicolons, backslashes and newlines', () => {
    expect(icsEscape('a,b;c\\d\ne')).toBe('a\\,b\\;c\\\\d\\ne');
  });
});
