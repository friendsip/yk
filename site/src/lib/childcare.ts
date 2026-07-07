/**
 * UK childcare entitlement dates & cost estimation — pure and testable.
 *
 * Extracted verbatim from the tool page (the maths was verified correct in the
 * 4 July review) with two fixes it flagged:
 *   - the age band now respects day-of-month (was a month too early);
 *   - the gross-price fallback can no longer resolve to £0 when a survey cell
 *     is null (derives from the marginal hourly rate instead).
 */

import { addMonths, ageMonths } from './dates';

export interface Scheme {
  id: string;
  nation: string;
  name: string;
  summary: string[];
  eligibility: string[];
  ageFromMonths: number | null;
  termAfter: boolean;
  hoursPerWeek: number | null;
  weeksPerYear: number | null;
  applyNotes: string[];
  requiresWork?: boolean;
}

export interface RegionCost {
  region: string;
  sufficiencyNote?: string | null;
  [key: string]: string | number | null | undefined;
}

export interface Entitlement {
  scheme: Scheme;
  start: Date | null; // null = not age-based / already applies
  started: boolean;
  label: string;
}

export interface CostEstimate {
  ok: boolean;
  grossWeekly: number;
  englandFtBasis: boolean; // survey FT price already nets off 30 funded hours
  surveyFullTimeWeekly: number | null;
  nowNetWeekly: number;
  nowFundedHours: number;
  future: {
    start: Date;
    netWeekly: number;
    schemeName: string;
    fundedHours: number;
    weeksPerYear: number;
  } | null;
  sufficiencyNote: string | null;
  childminderAgeTwo: boolean;
}

const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const requiresWork = (s: Scheme) => s.requiresWork === true;

/** English funded-hours terms start 1 September, 1 January and 1 April. */
export function termStartAfter(date: Date): Date {
  const y = date.getFullYear();
  const boundaries = [new Date(y, 0, 1), new Date(y, 3, 1), new Date(y, 8, 1), new Date(y + 1, 0, 1)];
  for (const b of boundaries) if (b > date) return b;
  return boundaries[3];
}

/** Schemes the family could get, each with its start date and a friendly label. */
export function computeEntitlements(
  schemes: Scheme[],
  birth: Date,
  nation: string,
  working: boolean,
  now: Date = new Date()
): Entitlement[] {
  const relevant = schemes.filter(
    (s) => (s.nation === nation || s.nation === 'uk-wide') && (!requiresWork(s) || working)
  );
  return relevant.map((scheme) => {
    if (scheme.ageFromMonths === null) {
      return { scheme, start: null, started: true, label: 'Available now (if eligible)' };
    }
    const qualifying = addMonths(birth, scheme.ageFromMonths);
    const start = scheme.termAfter ? termStartAfter(qualifying) : qualifying;
    const started = start.getTime() <= now.getTime();
    const label = started ? `Already available (since ${fmtDate(start)})` : `Starts ${fmtDate(start)}`;
    return { scheme, start, started, label };
  });
}

function costKey(provider: string, ageBand: 'under2' | 'two'): string {
  if (provider === 'childminder') return 'childminderUnder2';
  return ageBand === 'under2' ? 'nurseryUnder2' : 'nurseryTwo';
}

export interface CostInput {
  row: RegionCost;
  birthIso: string;
  nation: string;
  provider: 'nursery' | 'childminder';
  wantHours: 25 | 50;
  working: boolean;
  tfc: boolean;
  entitlements: Entitlement[];
  now?: Date;
}

/** Estimate the weekly cost now and at the next entitlement change. */
export function estimateCost(input: CostInput): CostEstimate {
  const { row, birthIso, nation, provider, wantHours, working, tfc, entitlements } = input;
  const now = input.now ?? new Date();

  const months = ageMonths(birthIso, now) ?? 0; // day-of-month aware (fix)
  const ageBand: 'under2' | 'two' = months < 24 ? 'under2' : 'two';
  const base = costKey(provider, ageBand);
  const partTime = row[`${base}PartTime`] as number | null;
  const fullTime = row[`${base}FullTime`] as number | null;

  if (partTime == null && fullTime == null) {
    return {
      ok: false,
      grossWeekly: 0,
      englandFtBasis: false,
      surveyFullTimeWeekly: null,
      nowNetWeekly: 0,
      nowFundedHours: 0,
      future: null,
      sufficiencyNote: (row.sufficiencyNote as string) ?? null,
      childminderAgeTwo: ageBand === 'two' && provider === 'childminder',
    };
  }

  // Survey basis differs by nation: England full-time figures already net off
  // the 30 funded hours; part-time (and all Scotland/Wales) are full price.
  const isEnglandFT = nation === 'england' && wantHours === 50;
  const hourly = partTime != null ? partTime / 25 : (fullTime as number) / 50;

  let gross: number;
  if (isEnglandFT && fullTime != null && partTime != null) {
    gross = fullTime + 30 * (38 / 52) * hourly; // add the funded hours' value back
  } else {
    const exact = wantHours === 50 ? fullTime : partTime;
    gross = exact ?? hourly * wantHours; // fix: never 0 — derive from hourly
  }

  const stretched = (s: Scheme) => (s.hoursPerWeek! * (s.weeksPerYear ?? 38)) / 52;
  const applyTfc = (cost: number) =>
    tfc && working ? cost - Math.min(cost * 0.2, 2000 / 52) : cost;

  const estimate = (fundedScheme: Scheme | null): { net: number; funded: number } => {
    if (isEnglandFT && fundedScheme?.hoursPerWeek === 30 && fullTime != null) {
      return { net: applyTfc(fullTime), funded: 30 };
    }
    const funded = fundedScheme ? Math.min(stretched(fundedScheme), wantHours) : 0;
    const cost = Math.max(0, gross - funded * hourly);
    return { net: applyTfc(cost), funded: fundedScheme?.hoursPerWeek ?? 0 };
  };

  const withHours = entitlements.filter((e) => e.scheme.hoursPerWeek);
  const nowEnt =
    withHours
      .filter((e) => e.started)
      .sort((a, b) => b.scheme.hoursPerWeek! - a.scheme.hoursPerWeek!)[0] ?? null;
  const nowHours = nowEnt?.scheme.hoursPerWeek ?? 0;
  const nextEnt =
    withHours
      .filter((e) => e.start && !e.started && e.scheme.hoursPerWeek! > nowHours)
      .sort((a, b) => a.start!.getTime() - b.start!.getTime())[0] ?? null;

  const nowEst = estimate(nowEnt?.scheme ?? null);
  const future = nextEnt
    ? {
        start: nextEnt.start!,
        ...(() => {
          const e = estimate(nextEnt.scheme);
          return { netWeekly: e.net, fundedHours: e.funded };
        })(),
        schemeName: nextEnt.scheme.name,
        weeksPerYear: nextEnt.scheme.weeksPerYear ?? 38,
      }
    : null;

  return {
    ok: true,
    grossWeekly: gross,
    englandFtBasis: isEnglandFT && fullTime != null && partTime != null,
    surveyFullTimeWeekly: fullTime,
    nowNetWeekly: nowEst.net,
    nowFundedHours: nowEst.funded,
    future,
    sufficiencyNote: (row.sufficiencyNote as string) ?? null,
    childminderAgeTwo: ageBand === 'two' && provider === 'childminder',
  };
}
