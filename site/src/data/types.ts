/**
 * Shared types for the Baby & Toddler guide data.
 *
 * All ages are expressed in completed weeks since birth so the client-side
 * "which page is right for my child" logic has one unambiguous unit.
 * Week 1 of life = 0 completed weeks; a baby who is "3 months" is ~13 weeks.
 */

export type FeedingMode = 'breast' | 'breast-expressed' | 'breast-formula' | 'formula';

export const FEEDING_MODE_LABELS: Record<FeedingMode, string> = {
  breast: 'Breastfeeding',
  'breast-expressed': 'Breast + expressed',
  'breast-formula': 'Breast + formula',
  formula: 'Formula',
};

export interface Source {
  title: string;
  org: string; // 'NHS', 'AAP', 'WHO', 'Lullaby Trust', …
  url: string;
  region: 'UK' | 'US' | 'Australia' | 'Global';
}

export interface ContentSection {
  heading: string;
  paragraphs: string[];
}

/** One baby stage — a week (weeks 1–12) or a month (3–12 months). */
export interface BabyStage {
  id: string; // 'week-1' … 'week-12', '3-months' … '12-months'
  label: string; // 'Week 1', 'Around 3 months'
  title: string; // warm headline for the stage
  ageWeeksFrom: number; // inclusive, completed weeks
  ageWeeksTo: number; // inclusive
  summary: string;
  expect: ContentSection[]; // what to expect (development, sleep, you…)
  feedingNotes: Partial<Record<FeedingMode, string[]>>; // stage-specific tips per mode
  dontWorry: string[]; // normal things that can look alarming
  watchFor: string[]; // observable signs worth a call to GP/health visitor/paediatrician
  sources: Source[];
}

export interface FeedingStage {
  range: string; // 'The first few days', 'Weeks 2–6', …
  tips: string[];
}

export interface Troubleshooting {
  problem: string;
  help: string[];
}

export interface FeedingGuide {
  mode: FeedingMode;
  label: string;
  intro: string[];
  stages: FeedingStage[];
  troubleshooting: Troubleshooting[];
  sources: Source[];
}

export interface HealthTopic {
  id: string;
  title: string;
  summary: string;
  sections: ContentSection[];
  /** Signs that need medical help now (rendered prominently but calmly). */
  urgent?: string[];
  sources: Source[];
}

export interface ToddlerGame {
  name: string;
  how: string; // one or two sentences
  parentEnergy: 'low' | 'medium';
}

export interface ToddlerStage {
  id: string; // '12-15-months', …, '30-36-months'
  label: string; // '12–15 months'
  title: string;
  ageWeeksFrom: number;
  ageWeeksTo: number;
  summary: string;
  expect: ContentSection[];
  encourage: ContentSection[]; // how to help and encourage them
  games: ToddlerGame[];
  dontWorry: string[];
  watchFor: string[];
  sources: Source[];
}

export interface GuideDoc {
  id: string; // 'positive-parenting', 'baby-and-toddler', 'easy-games', 'independent-play'
  title: string;
  summary: string;
  sections: ContentSection[];
  sources: Source[];
}
