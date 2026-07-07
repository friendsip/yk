import { describe, it, expect } from 'vitest';
import {
  filterBySetting,
  todayPick,
  nextPick,
  bandForBirthdate,
  isActivityBand,
  type Activity,
} from './activities';

const mk = (id: string, setting: Activity['setting']): Activity => ({
  id,
  title: id,
  how: ['do it'],
  setting,
  category: 'get-moving',
  materials: 'nothing',
  parentEnergy: 'low',
});

const pool: Activity[] = [
  mk('a', 'inside'),
  mk('b', 'outside'),
  mk('c', 'either'),
  mk('d', 'inside'),
];

describe('filterBySetting', () => {
  it('keeps everything for "either"', () => {
    expect(filterBySetting(pool, 'either')).toHaveLength(4);
  });
  it('keeps matching + "either" for a specific setting', () => {
    const inside = filterBySetting(pool, 'inside').map((a) => a.id);
    expect(inside).toEqual(['a', 'c', 'd']);
    const outside = filterBySetting(pool, 'outside').map((a) => a.id);
    expect(outside).toEqual(['b', 'c']);
  });
});

describe('todayPick', () => {
  it('is deterministic for a given local day / band / setting', () => {
    const now = new Date(2026, 6, 5, 9, 0);
    const p1 = todayPick(pool, 'toddler', 'either', now);
    const p2 = todayPick(pool, 'toddler', 'either', new Date(2026, 6, 5, 22, 0));
    expect(p1!.id).toBe(p2!.id); // same local day
  });
  it('can differ across days', () => {
    const ids = new Set(
      Array.from({ length: 20 }, (_, i) => todayPick(pool, 'toddler', 'either', new Date(2026, 6, 1 + i))!.id)
    );
    expect(ids.size).toBeGreaterThan(1);
  });
  it('returns null on an empty pool', () => {
    expect(todayPick([], 'toddler', 'either')).toBeNull();
  });
});

describe('nextPick', () => {
  it('does not repeat until the pool is exhausted, then resets', () => {
    const seen = new Set<string>();
    let seq = 0;
    const rand = () => (seq++ % pool.length) / pool.length; // walk the pool deterministically
    const picks = [nextPick(pool, seen, rand), nextPick(pool, seen, rand), nextPick(pool, seen, rand), nextPick(pool, seen, rand)];
    expect(new Set(picks.map((p) => p!.id)).size).toBe(4); // all distinct
    // pool exhausted → next pick resets and returns something again
    const after = nextPick(pool, seen, rand);
    expect(after).not.toBeNull();
  });
  it('returns null on an empty pool', () => {
    expect(nextPick([], new Set())).toBeNull();
  });
});

describe('bandForBirthdate', () => {
  const now = new Date(2026, 6, 5);
  it('maps ages to bands', () => {
    expect(bandForBirthdate('2025-01-05', now)).toBe('toddler'); // ~1.5y
    expect(bandForBirthdate('2022-01-05', now)).toBe('preschool'); // ~4.5y
    expect(bandForBirthdate('2020-01-05', now)).toBe('early-school'); // ~6.5y
    expect(bandForBirthdate('2016-01-05', now)).toBe('tween'); // ~10.5y
    expect(bandForBirthdate('2011-01-05', now)).toBe('teen'); // ~15y
  });
  it('rejects malformed / future dates', () => {
    expect(bandForBirthdate('bad', now)).toBeNull();
    expect(bandForBirthdate('2027-01-05', now)).toBeNull();
  });
});

describe('isActivityBand', () => {
  it('validates band ids', () => {
    expect(isActivityBand('tween')).toBe(true);
    expect(isActivityBand('grownup')).toBe(false);
    expect(isActivityBand(null)).toBe(false);
  });
});
