/**
 * "What can we do today?" activity generator — shared types.
 *
 * Activities are grouped into five age-band files (toddler.ts, preschool.ts,
 * early-school.ts, tween.ts, teen.ts). The wheel's twelve segments are the
 * categories below; keep every band spread across as many categories as the
 * age sensibly allows.
 */

export type ActivitySetting = 'inside' | 'outside' | 'either';

export type ActivityCategory =
  | 'get-moving' //   running-about games, dancing, obstacle courses
  | 'make-believe' // pretend play, dressing up, role play, drama
  | 'messy' //        gloriously messy play — paint, mud, water, goo
  | 'crafty' //       arts & crafts, making things, making books
  | 'music' //        songs to sing, songs to make up, instruments, rhythm
  | 'words' //        word games, storytelling, rhymes, writing
  | 'games-quizzes' //board/card games, quizzes, competitions, challenges
  | 'science' //      safe experiments and "whoa!" moments
  | 'kitchen' //      cooking, baking, food fun
  | 'outdoors' //     nature, exploring, gardens, weather
  | 'sporty' //       sports and skills, solo or together
  | 'snap'; //        photos, video-making, little films

export const CATEGORY_META: Record<ActivityCategory, { label: string; emoji: string }> = {
  'get-moving': { label: 'Get moving', emoji: '🏃' },
  'make-believe': { label: 'Make-believe', emoji: '🎭' },
  messy: { label: 'Messy play', emoji: '🎨' },
  crafty: { label: 'Crafty', emoji: '✂️' },
  music: { label: 'Music & songs', emoji: '🎵' },
  words: { label: 'Words & stories', emoji: '📚' },
  'games-quizzes': { label: 'Games & quizzes', emoji: '🎲' },
  science: { label: 'Science', emoji: '🔬' },
  kitchen: { label: 'Kitchen', emoji: '🍪' },
  outdoors: { label: 'Outdoors', emoji: '🌳' },
  sporty: { label: 'Sporty', emoji: '⚽' },
  snap: { label: 'Photos & films', emoji: '📸' },
};

export interface Activity {
  /** kebab-case, unique within its band file */
  id: string;
  /** Fun, specific title — "Sock-pair Olympics", not "Sorting game" */
  title: string;
  /** 1–3 short, warm steps. Enough to start playing, never a lecture. */
  how: string[];
  setting: ActivitySetting;
  category: ActivityCategory;
  /** What you need — biased hard towards "nothing" or household stuff */
  materials: string;
  /** How much the grown-up has to do */
  parentEnergy: 'low' | 'medium' | 'high';
  /** Only where genuinely needed (choking, water, heat, roads, online) */
  safetyNote?: string;
}

export interface ActivityBand {
  id: 'toddler' | 'preschool' | 'early-school' | 'tween' | 'teen';
  label: string;
  ageLabel: string;
}

export const BANDS: ActivityBand[] = [
  { id: 'toddler', label: 'Toddler', ageLabel: '1–3' },
  { id: 'preschool', label: 'Preschool', ageLabel: '3–5' },
  { id: 'early-school', label: 'Big kid', ageLabel: '5–8' },
  { id: 'tween', label: 'Tween', ageLabel: '8–12' },
  { id: 'teen', label: 'Teen', ageLabel: '13–16' },
];
