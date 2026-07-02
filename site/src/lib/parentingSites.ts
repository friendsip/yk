/**
 * Trusted parenting sites — a hand-curated directory of organisations and
 * websites we'd point a friend to. Editorial, not engine-generated: edit this
 * file to add or remove an entry. Each is a whole site worth bookmarking, as
 * opposed to the single pages in our Curated Links section.
 *
 * House rules (Site Bible §5, §6): Tier 1–2 sources only; label the country a
 * site's guidance applies to; describe honestly, never oversell.
 */

export type SiteCategory =
  | 'health'
  | 'mental-health'
  | 'special-needs'
  | 'online-safety'
  | 'support';

export interface ParentingSite {
  name: string;
  url: string;
  /** Shown on the "Visit …" link */
  domain: string;
  /** A short, honest review — two or three sentences */
  review: string;
  category: SiteCategory;
  /** Country/region the site is rooted in: UK, US, Australia, Global */
  region: string;
  /** Topic tags drive the card artwork */
  tags: string[];
}

export const siteCategoryNames: Record<SiteCategory, string> = {
  health: 'Health & development',
  'mental-health': 'Mental health & wellbeing',
  'special-needs': 'Special educational needs & disability',
  'online-safety': 'Online safety',
  support: 'Family support & charities',
};

export const siteCategoryOrder: SiteCategory[] = [
  'health',
  'mental-health',
  'special-needs',
  'online-safety',
  'support',
];

export const parentingSites: ParentingSite[] = [
  // ── Health & development ──
  {
    name: 'NHS',
    url: 'https://www.nhs.uk/conditions/baby/',
    domain: 'nhs.uk',
    review:
      "The UK's National Health Service. Free, dependable health information covering pregnancy, child health, common conditions and vaccinations — including the Start for Life programme for the early years. If you read one source for UK health questions, make it this one.",
    category: 'health',
    region: 'UK',
    tags: ['health'],
  },
  {
    name: 'Raising Children Network',
    url: 'https://raisingchildren.net.au/',
    domain: 'raisingchildren.net.au',
    review:
      "Australia's government-funded parenting site, and one of the most comprehensive anywhere. Evidence-based articles organised by your child's age, from newborn to teenager, with a calm and practical tone that travels well beyond Australia.",
    category: 'health',
    region: 'Australia',
    tags: ['family-life'],
  },
  {
    name: 'HealthyChildren.org',
    url: 'https://www.healthychildren.org/',
    domain: 'healthychildren.org',
    review:
      'The parent-facing site of the American Academy of Pediatrics. Paediatrician-backed guidance on health, development, safety and behaviour — the natural first stop for US families, and a useful second opinion for everyone else.',
    category: 'health',
    region: 'US',
    tags: ['health'],
  },
  {
    name: 'UNICEF Parenting',
    url: 'https://www.unicef.org/parenting',
    domain: 'unicef.org/parenting',
    review:
      'Practical, warm parenting advice from UNICEF, written to work across very different countries and circumstances. Particularly strong on the early years and on the often-forgotten subject of looking after yourself as a parent.',
    category: 'health',
    region: 'Global',
    tags: ['family-life'],
  },
  {
    name: 'World Health Organization',
    url: 'https://www.who.int/health-topics/child-health',
    domain: 'who.int',
    review:
      'The global public-health authority. Less day-to-day parenting, more the underlying evidence and guidance on child health, nutrition and development worldwide — handy when you want to know what the international consensus actually is.',
    category: 'health',
    region: 'Global',
    tags: ['health'],
  },

  // ── Mental health & wellbeing ──
  {
    name: 'YoungMinds',
    url: 'https://www.youngminds.org.uk/',
    domain: 'youngminds.org.uk',
    review:
      "The UK's leading charity for children and young people's mental health. Clear, reassuring guidance for parents on everything from anxiety to self-harm, plus a free Parents Helpline when you need to talk to someone.",
    category: 'mental-health',
    region: 'UK',
    tags: ['health'],
  },
  {
    name: 'Anna Freud',
    url: 'https://www.annafreud.org/parents-and-carers/',
    domain: 'annafreud.org',
    review:
      "A children's mental health charity with a serious research base. Its resources for families and schools — especially around anxiety and supporting a struggling child — are thoughtful and free of jargon.",
    category: 'mental-health',
    region: 'UK',
    tags: ['health'],
  },
  {
    name: 'Child Mind Institute',
    url: 'https://childmind.org/',
    domain: 'childmind.org',
    review:
      'A US non-profit focused on children\'s mental health and learning disorders. Its parent guides on anxiety, ADHD and behaviour are among the most thorough and readable anywhere online.',
    category: 'mental-health',
    region: 'US',
    tags: ['health'],
  },

  // ── Special educational needs & disability ──
  {
    name: 'IPSEA',
    url: 'https://www.ipsea.org.uk/',
    domain: 'ipsea.org.uk',
    review:
      'The Independent Provider of Special Education Advice. Free, legally-grounded advice for families navigating the SEND system in England — genuinely invaluable when things become formal and you need to know your rights.',
    category: 'special-needs',
    region: 'UK',
    tags: ['special-needs'],
  },
  {
    name: 'Contact',
    url: 'https://contact.org.uk/',
    domain: 'contact.org.uk',
    review:
      'A UK charity for families with disabled children, covering everything from diagnosis and benefits to the daily practicalities, with a helpline and a network of local groups. A good place to start when a diagnosis is new.',
    category: 'special-needs',
    region: 'UK',
    tags: ['special-needs'],
  },
  {
    name: 'Sibs',
    url: 'https://www.sibs.org.uk/',
    domain: 'sibs.org.uk',
    review:
      'The only UK charity for the brothers and sisters of disabled children and adults — a group whose needs are easy to overlook. Practical support for siblings themselves and for the parents trying to share themselves around.',
    category: 'special-needs',
    region: 'UK',
    tags: ['special-needs'],
  },
  {
    name: 'Mencap',
    url: 'https://www.mencap.org.uk/',
    domain: 'mencap.org.uk',
    review:
      'A long-established UK charity supporting people with a learning disability and their families, with clear information on rights, education and the support that should be available.',
    category: 'special-needs',
    region: 'UK',
    tags: ['special-needs'],
  },

  // ── Online safety ──
  {
    name: 'Internet Matters',
    url: 'https://www.internetmatters.org/',
    domain: 'internetmatters.org',
    review:
      "A not-for-profit dedicated to children's online safety. Age-by-age guides, app reviews and step-by-step setup walkthroughs that make the digital world feel manageable rather than frightening.",
    category: 'online-safety',
    region: 'UK',
    tags: ['safety'],
  },
  {
    name: 'NSPCC',
    url: 'https://www.nspcc.org.uk/keeping-children-safe/',
    domain: 'nspcc.org.uk',
    review:
      "The UK's leading child protection charity. Trusted advice on keeping children safe both online and off, plus Childline — the free, confidential service for children and young people themselves.",
    category: 'online-safety',
    region: 'UK',
    tags: ['safety'],
  },

  // ── Family support & charities ──
  {
    name: 'Family Lives',
    url: 'https://www.familylives.org.uk/',
    domain: 'familylives.org.uk',
    review:
      'A UK charity offering parenting and family support, including a confidential helpline, for everything from toddler tantrums to teenage troubles. Non-judgemental help for the hard days.',
    category: 'support',
    region: 'UK',
    tags: ['family-life'],
  },
  {
    name: "Winston's Wish",
    url: 'https://www.winstonswish.org/',
    domain: 'winstonswish.org',
    review:
      "The UK's first childhood bereavement charity. Compassionate, practical help for children grieving a death — and, just as importantly, for the adults trying to support them through it.",
    category: 'support',
    region: 'UK',
    tags: ['family-life'],
  },
  {
    name: 'Zero to Three',
    url: 'https://www.zerotothree.org/',
    domain: 'zerotothree.org',
    review:
      'A US non-profit focused entirely on the first three years. Excellent, developmentally-grounded material on early brain development, sleep and behaviour for the stage when everything feels new.',
    category: 'support',
    region: 'US',
    tags: ['family-life'],
  },
];
