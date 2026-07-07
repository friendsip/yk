/**
 * Vaccination-planner calendar (.ics) generation — pure and testable.
 *
 * Due dates are computed and serialised in LOCAL time (see dates.ts), fixing
 * the 4 July bug where toISOString() put every event a day early for UTC+
 * (e.g. UK summer-time) births.
 */

import { parseLocalDate, addDaysLocal, formatICSDate } from './dates';

export interface VaxEvent {
  id: string;
  ageLabel: string;
  dueOffsetDays: number;
  vaccines: string[];
}

/** Due date (LOCAL midnight) for an event given an ISO birth date, or null. */
export function vaccinationDueDate(iso: string, offsetDays: number): Date | null {
  const birth = parseLocalDate(iso);
  if (!birth) return null;
  return addDaysLocal(birth, offsetDays);
}

/** Escape a value for an ICS text field. */
export function icsEscape(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/**
 * Build a full VCALENDAR string for a baby's vaccination schedule.
 * `stampUTC` is the DTSTAMP (defaults to now); injectable for tests.
 */
export function buildVaccinationICS(
  events: VaxEvent[],
  iso: string,
  stampUTC: string = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z'
): string {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//yourkids.com//vaccination-planner//EN'];
  for (const event of events) {
    const due = vaccinationDueDate(iso, event.dueOffsetDays);
    if (!due) continue;
    const date = formatICSDate(due);
    lines.push(
      'BEGIN:VEVENT',
      `UID:${event.id}-${date}@yourkids.com`,
      `DTSTAMP:${stampUTC}`,
      `DTSTART;VALUE=DATE:${date}`,
      `SUMMARY:${icsEscape(`Baby vaccinations due (${event.ageLabel})`)}`,
      `DESCRIPTION:${icsEscape(
        `${event.vaccines.join(', ')}. Your GP surgery will send the actual appointment — this is the age these are due from. From yourkids.com/tools/vaccinations`
      )}`,
      'END:VEVENT'
    );
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}
