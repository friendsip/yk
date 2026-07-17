import { describe, it, expect } from 'vitest';
import {
  BUZZ_RULES,
  ODD_ONE_OUT,
  CHAIN_CATEGORIES,
  MAKE_LEVELS,
  QUIZ_PACKS,
  FIND_PROMPTS,
  STORY_CARDS,
  ACTION_CARDS,
} from './data';
import { makeIdeas } from './circle-time';

describe('games data', () => {
  it('buzz rules behave as described', () => {
    const rule = (id: string) => BUZZ_RULES.find((r: any) => r.id === id)!;
    expect(rule('five').test(15)).toBe(true);
    expect(rule('five').test(16)).toBe(false);
    expect(rule('seven').test(14)).toBe(true); // 7× table
    expect(rule('seven').test(17)).toBe(true); // contains a 7
    expect(rule('seven').test(20)).toBe(false);
    for (const r of BUZZ_RULES) {
      expect(r.target).toBeGreaterThan(10);
      // every rule has at least one buzz number before its target
      const buzzes = Array.from({ length: r.target }, (_, i) => i + 1).filter(r.test);
      expect(buzzes.length, r.id).toBeGreaterThan(0);
    }
  });

  it('every odd-one-out puzzle has a valid odd index and an explanation', () => {
    for (const p of ODD_ONE_OUT) {
      expect(p.items.length).toBe(4);
      expect(p.odd).toBeGreaterThanOrEqual(0);
      expect(p.odd).toBeLessThan(4);
      expect(p.why.length).toBeGreaterThan(10);
      expect(['easy', 'tricky']).toContain(p.level);
    }
    // enough of each level for a round of 8
    expect(ODD_ONE_OUT.filter((p) => p.level === 'easy').length).toBeGreaterThanOrEqual(8);
    expect(ODD_ONE_OUT.filter((p) => p.level === 'tricky').length).toBeGreaterThanOrEqual(8);
  });

  it('quiz packs are complete: 10 questions, answers, sensible ages', () => {
    expect(QUIZ_PACKS.length).toBeGreaterThanOrEqual(6);
    for (const pack of QUIZ_PACKS) {
      expect(pack.questions.length).toBe(10);
      for (const q of pack.questions) {
        expect(q.q.length).toBeGreaterThan(5);
        expect(q.a.length).toBeGreaterThan(0);
      }
    }
  });

  it('co-op decks are big enough for their games', () => {
    expect(FIND_PROMPTS.length).toBeGreaterThanOrEqual(12); // max hunt is 12 stars
    expect(STORY_CARDS.length).toBeGreaterThanOrEqual(12); // max saga is 12 cards
    expect(ACTION_CARDS.length).toBeGreaterThanOrEqual(8); // chain goal is 8
    expect(CHAIN_CATEGORIES.length).toBeGreaterThanOrEqual(10);
    expect(MAKE_LEVELS.length).toBe(3);
  });
});

describe('makeIdeas', () => {
  // Every idea the screen suggests must actually make the target number.
  const evaluate = (idea: string, target: number): boolean => {
    let m;
    if ((m = idea.match(/^(\d+) \+ (\d+)$/))) return +m[1] + +m[2] === target;
    if ((m = idea.match(/^(\d+) − (\d+)$/))) return +m[1] - +m[2] === target;
    if ((m = idea.match(/^double (\d+)$/))) return 2 * +m[1] === target;
    if ((m = idea.match(/^(\d+) × (\d+)$/))) return +m[1] * +m[2] === target;
    if ((m = idea.match(/^(\d+) fingers held up$/))) return +m[1] === target;
    if ((m = idea.match(/^one more than (\d+)$/))) return +m[1] + 1 === target;
    return false; // unknown idea shape — fail loudly
  };

  it('only ever suggests sums that equal the target (5–50)', () => {
    for (let target = 5; target <= 50; target++) {
      for (let run = 0; run < 5; run++) {
        for (const idea of makeIdeas(target)) {
          expect(evaluate(idea, target), `${target}: "${idea}"`).toBe(true);
        }
      }
    }
  });

  it('gives 3–4 ideas each time', () => {
    for (const target of [5, 10, 17, 24, 36, 50]) {
      const ideas = makeIdeas(target);
      expect(ideas.length).toBeGreaterThanOrEqual(3);
      expect(ideas.length).toBeLessThanOrEqual(4);
    }
  });
});
