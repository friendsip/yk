import { describe, it, expect } from 'vitest';
import {
  termStartAfter,
  computeEntitlements,
  estimateCost,
  type Scheme,
  type RegionCost,
} from './childcare';
import { parseLocalDate } from './dates';

const schemes: Scheme[] = [
  {
    id: 'england-30h',
    nation: 'england',
    name: '30 hours (working parents)',
    summary: ['s'],
    eligibility: ['e'],
    ageFromMonths: 9,
    termAfter: true,
    hoursPerWeek: 30,
    weeksPerYear: 38,
    applyNotes: ['a'],
    requiresWork: true,
  },
  {
    id: 'england-15h',
    nation: 'england',
    name: 'Universal 15 hours',
    summary: ['s'],
    eligibility: ['e'],
    ageFromMonths: 36,
    termAfter: true,
    hoursPerWeek: 15,
    weeksPerYear: 38,
    applyNotes: ['a'],
    requiresWork: false,
  },
  {
    id: 'tfc',
    nation: 'uk-wide',
    name: 'Tax-Free Childcare',
    summary: ['s'],
    eligibility: ['e'],
    ageFromMonths: 0,
    termAfter: false,
    hoursPerWeek: null,
    weeksPerYear: null,
    applyNotes: ['a'],
    requiresWork: true,
  },
];

const london: RegionCost = {
  region: 'London',
  nurseryUnder2PartTime: 227.48,
  nurseryUnder2FullTime: 178.25,
  nurseryTwoPartTime: 218.09,
  nurseryTwoFullTime: 176.66,
  childminderUnder2PartTime: 212.74,
  childminderUnder2FullTime: 167.17,
  sufficiencyNote: 'Availability is tight for under-2s in inner boroughs.',
};

describe('termStartAfter', () => {
  it('returns the next English term boundary', () => {
    expect(termStartAfter(parseLocalDate('2026-05-10')!).getMonth()).toBe(8); // September
    expect(termStartAfter(parseLocalDate('2026-02-01')!).getMonth()).toBe(3); // April
    const jan = termStartAfter(parseLocalDate('2026-10-15')!);
    expect([jan.getFullYear(), jan.getMonth()]).toEqual([2027, 0]); // next January
  });
});

describe('computeEntitlements', () => {
  const birth = parseLocalDate('2026-01-15')!;
  it('includes work-tested schemes only when working', () => {
    const working = computeEntitlements(schemes, birth, 'england', true).map((e) => e.scheme.id);
    expect(working).toContain('england-30h');
    expect(working).toContain('tfc');
    const notWorking = computeEntitlements(schemes, birth, 'england', false).map((e) => e.scheme.id);
    expect(notWorking).not.toContain('england-30h');
    expect(notWorking).not.toContain('tfc');
    expect(notWorking).toContain('england-15h');
  });
  it('computes term-after start dates', () => {
    const now = new Date(2026, 6, 5);
    const ent = computeEntitlements(schemes, birth, 'england', true, now).find(
      (e) => e.scheme.id === 'england-30h'
    )!;
    // 9 months old on 15 Oct 2026 → funded from 1 Jan 2027
    expect([ent.start!.getFullYear(), ent.start!.getMonth()]).toEqual([2027, 0]);
    expect(ent.started).toBe(false);
  });
});

describe('estimateCost — England full-time London scenario', () => {
  const birthIso = '2026-01-15';
  const now = new Date(2026, 6, 5); // ~5.7 months old → under-2
  const entitlements = computeEntitlements(schemes, parseLocalDate(birthIso)!, 'england', true, now);
  const est = estimateCost({
    row: london,
    birthIso,
    nation: 'england',
    provider: 'nursery',
    wantHours: 50,
    working: true,
    tfc: true,
    entitlements,
    now,
  });

  it('adds funded-hour value back to the survey full-time figure', () => {
    expect(est.englandFtBasis).toBe(true);
    expect(est.grossWeekly).toBeCloseTo(377.7, 0);
  });
  it('estimates the current net cost with TFC applied and capped', () => {
    // gross 377.7 → 20% would be 75.5, but TFC is capped at 2000/52 ≈ 38.46
    expect(est.nowNetWeekly).toBeCloseTo(339.3, 0);
    expect(est.nowFundedHours).toBe(0);
  });
  it('projects the cost when the 30 funded hours begin', () => {
    expect(est.future).not.toBeNull();
    expect(est.future!.fundedHours).toBe(30);
    expect(est.future!.netWeekly).toBeCloseTo(142.6, 0);
    expect([est.future!.start.getFullYear(), est.future!.start.getMonth()]).toEqual([2027, 0]);
  });
  it('surfaces the availability note', () => {
    expect(est.sufficiencyNote).toContain('under-2s');
  });
});

describe('estimateCost — regression fixes', () => {
  it('never returns £0 when only the full-time survey cell exists (part-time requested)', () => {
    const row: RegionCost = {
      region: 'Testland',
      nurseryUnder2PartTime: null,
      nurseryUnder2FullTime: 300,
      nurseryTwoPartTime: null,
      nurseryTwoFullTime: null,
      childminderUnder2PartTime: null,
      childminderUnder2FullTime: null,
    };
    const est = estimateCost({
      row,
      birthIso: '2026-01-15',
      nation: 'scotland',
      provider: 'nursery',
      wantHours: 25,
      working: false,
      tfc: false,
      entitlements: [],
      now: new Date(2026, 6, 5),
    });
    expect(est.ok).toBe(true);
    expect(est.grossWeekly).toBeCloseTo(150, 5); // 300/50 * 25, not 0
  });

  it('respects day-of-month when choosing the age band', () => {
    // Turns 2 on 15 July 2026. Part-time nursery, England (not the FT basis).
    const base = {
      row: london,
      birthIso: '2024-07-15',
      nation: 'england',
      provider: 'nursery' as const,
      wantHours: 25 as const,
      working: false,
      tfc: false,
      entitlements: [],
    };
    const dayBefore = estimateCost({ ...base, now: new Date(2026, 6, 14) });
    const onBirthday = estimateCost({ ...base, now: new Date(2026, 6, 15) });
    expect(dayBefore.grossWeekly).toBeCloseTo(227.48, 2); // under-2 rate
    expect(onBirthday.grossWeekly).toBeCloseTo(218.09, 2); // age-2 rate
  });

  it('reports ok:false when the region has no price for the combination', () => {
    const bare: RegionCost = {
      region: 'Nowhere',
      nurseryUnder2PartTime: null,
      nurseryUnder2FullTime: null,
      nurseryTwoPartTime: null,
      nurseryTwoFullTime: null,
      childminderUnder2PartTime: null,
      childminderUnder2FullTime: null,
    };
    const est = estimateCost({
      row: bare,
      birthIso: '2026-01-15',
      nation: 'england',
      provider: 'nursery',
      wantHours: 25,
      working: true,
      tfc: true,
      entitlements: [],
      now: new Date(2026, 6, 5),
    });
    expect(est.ok).toBe(false);
  });
});
