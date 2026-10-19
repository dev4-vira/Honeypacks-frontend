export type ProductId =
  | 'honey'
  | 'pro-max'
  | 'beast'
  | 'maxx'
  | 'sea-moss'
  | 'pregame'
  | 'hair'
  | 'ignite'
  | 'shaker-black'
  | 'shaker-white';
export type PurchaseMode = 'one-time' | 'subscription';
export type Product = {
  id: ProductId;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  details: string[];
  image: string;
  gallery: string[];
  price: number;
  listPrice?: number;
  subscription?: number;
  defaultMode: PurchaseMode;
  units?: number;
  unit?: string;
  format: string;
  kind: 'honey' | 'supplement' | 'accessory';
  badge?: string;
  stock: boolean;
  popularity: number;
  rating: number;
  reviewCount: number | null;
  added: number;
};
export const assets = {
  logoBlack: '/assets/storefront/logo-black.png',
  logo: '/assets/logo.png',
  hero: '/assets/hero.jpeg',
  honey: '/assets/honey-10-pack.png',
  sachets: '/assets/sachets.png',
  facts: '/assets/supplement-facts.png',
  proMax: '/assets/pro-max.jpeg',
  beast: '/assets/beast-mode.png',
  shaker: '/assets/shaker.jpeg',
  detail: '/assets/storefront/honey-detail.png',
  lifestyle: '/assets/storefront/honey-lifestyle.jpeg',
  faq: '/assets/storefront/faq-bg.png',
  underline: '/assets/storefront/underline.png',
  popup: '/assets/storefront/popup-bg.png',
  subscription: '/assets/storefront/subscription-photo.jpg',
};
const base = {
  defaultMode: 'one-time' as const,
  stock: true,
  reviewCount: null,
};
export const catalog: readonly Product[] = [
  {
    ...base,
    id: 'honey',
    slug: 'black-thai-honey-10-pack',
    name: 'Black Thai Honey 10 Pack',
    shortName: 'Honey 10 Pack',
    description:
      'Black Thai Honey in ten individually sealed sachets, presented in the original black-and-gold box.',
    details: [
      '10 sachets per box',
      'Honey-based supplement',
      'Original ingredient label included in the gallery',
    ],
    reviewCount: 86784,
    image: assets.honey,
    gallery: [
      assets.honey,
      assets.facts,
      assets.sachets,
      assets.detail,
      assets.lifestyle,
    ],
    price: 6500,
    listPrice: 7500,
    subscription: 5000,
    defaultMode: 'subscription',
    units: 10,
    unit: 'sachet',
    format: '10 individual packs (1 box) of Black Thai Honey',
    kind: 'honey',
    badge: 'BEST SELLER',
    popularity: 100,
    rating: 4.9,
    added: 1,
  },
  {
    ...base,
    id: 'pro-max',
    slug: 'black-thai-honey-pro-max',
    name: 'Black Thai Honey Pro Max – Box Of 5',
    shortName: 'Pro Max',
    description:
      'The Pro Max format contains five resealable Black Thai Honey pouches in a single box.',
    details: [
      'Five resealable units',
      'Black Thai Honey Pro Max packaging',
      'Serving information is product-specific; do not substitute the 10 Pack label',
    ],
    reviewCount: 86784,
    image: assets.proMax,
    gallery: [
      assets.proMax,
      '/assets/storefront/pro-max-box.png',
      '/assets/storefront/pro-max-pouch.png',
    ],
    price: 6500,
    subscription: 5000,
    defaultMode: 'subscription',
    units: 5,
    unit: 'pouch',
    format: '5 resealable pouches in one box',
    kind: 'honey',
    badge: 'NEW',
    popularity: 95,
    rating: 4.9,
    added: 10,
  },
  {
    ...base,
    id: 'beast',
    slug: 'beast-mode',
    name: 'Beast Mode By Black Thai Labs',
    shortName: 'Beast Mode',
    description:
      'Beast Mode by Black Thai Labs is a capsule supplement sold in the bottle shown in the audit.',
    details: [
      '120 capsules',
      '60 servings as shown in C29',
      'One-time purchase or recurring delivery every four weeks',
    ],
    reviewCount: 2340,
    image: assets.beast,
    gallery: [assets.beast],
    price: 6000,
    listPrice: 7500,
    subscription: 4800,
    format: '120 capsules · 60 servings',
    kind: 'supplement',
    badge: 'DAILY T-SUPPORT',
    popularity: 90,
    rating: 4.8,
    added: 3,
  },
  {
    ...base,
    id: 'maxx',
    slug: 'maxx-nut',
    name: 'Maxx Nut By Black Thai Labs',
    shortName: 'Maxx Nut',
    description:
      'Maxx Nut is part of the Black Thai Labs supplement collection shown in the archived store.',
    details: [
      'Original product imagery',
      'Product-specific label shown in the gallery',
      'Approved complete usage instructions pending',
    ],
    image: '/assets/storefront/maxx-nut.jpg',
    gallery: [
      '/assets/storefront/maxx-nut.jpg',
      '/assets/storefront/maxx-gallery.webp',
    ],
    price: 6500,
    listPrice: 7000,
    format: 'Black Thai Labs supplement',
    kind: 'supplement',
    popularity: 80,
    rating: 0,
    added: 8,
  },
  {
    ...base,
    id: 'sea-moss',
    slug: 'sea-moss-shilajit',
    name: 'Sea Moss + Shilajit',
    shortName: 'Sea Moss + Shilajit',
    description:
      'Sea Moss + Shilajit is a Black Thai Labs supplement listed among the store’s complementary products.',
    details: [
      'Original bottle and label',
      'One-time demo purchase',
      'Complete product-specific facts pending',
    ],
    image: '/assets/storefront/sea-moss.webp',
    gallery: ['/assets/storefront/sea-moss.webp'],
    price: 5000,
    listPrice: 6500,
    format: 'Black Thai Labs supplement',
    kind: 'supplement',
    popularity: 70,
    rating: 0,
    added: 5,
  },
  {
    ...base,
    id: 'pregame',
    slug: 'pregame-gummies',
    name: 'Pregame Gummies – 30 Count',
    shortName: 'Pregame Gummies',
    description:
      'Pregame Gummies come in the 30-count bottle displayed in the archived catalog and cart recommendations.',
    details: [
      '30 gummies',
      'Original Black Thai Labs packaging',
      'One-time demo purchase',
    ],
    image: '/assets/storefront/pregame.webp',
    gallery: ['/assets/storefront/pregame.webp'],
    price: 4000,
    listPrice: 5000,
    format: '30 gummies',
    kind: 'supplement',
    popularity: 65,
    rating: 0,
    added: 6,
  },
  {
    ...base,
    id: 'hair',
    slug: 'hair-plus',
    name: 'Hair Plus',
    shortName: 'Hair Plus',
    description:
      'Hair Plus is a supplement from the same HoneyPacks catalog. The original bottle is reproduced here.',
    details: [
      'Original product photograph',
      'One-time demo purchase',
      'Approved ingredient and usage copy pending',
    ],
    image: '/assets/storefront/hair-plus.webp',
    gallery: ['/assets/storefront/hair-plus.webp'],
    price: 6500,
    listPrice: 8000,
    format: 'Black Thai Labs supplement',
    kind: 'supplement',
    popularity: 50,
    rating: 0,
    added: 4,
  },
  {
    ...base,
    id: 'ignite',
    slug: 'ignite-gummies',
    name: 'Ignite Gummies',
    shortName: 'Ignite Gummies',
    description:
      'Ignite Gummies is part of the Black Thai Labs catalog, shown in its original product packaging.',
    details: [
      'Gummy format',
      'One-time demo purchase',
      'Approved serving information pending',
    ],
    image: '/assets/storefront/ignite.jpeg',
    gallery: ['/assets/storefront/ignite.jpeg'],
    price: 4000,
    format: 'Black Thai Labs gummies',
    kind: 'supplement',
    popularity: 55,
    rating: 0,
    added: 9,
  },
  {
    ...base,
    id: 'shaker-black',
    slug: 'shaker-black',
    name: 'Black Thai Honey Shaker – Black',
    shortName: 'Shaker – Black',
    description:
      'A black HoneyPacks shaker accessory, sold separately from supplements.',
    details: [
      'Black finish',
      'One shaker per purchase',
      'No subscription or supplement ingredients',
    ],
    image: '/assets/storefront/shaker-black.webp',
    gallery: ['/assets/storefront/shaker-black.webp'],
    price: 1999,
    listPrice: 2500,
    format: 'Black shaker',
    kind: 'accessory',
    popularity: 30,
    rating: 0,
    added: 2,
  },
  {
    ...base,
    id: 'shaker-white',
    slug: 'shaker-white',
    name: 'Black Thai Honey Shaker – White',
    shortName: 'Shaker – White',
    description:
      'The white Black Thai Honey shaker shown in C31. A standalone accessory with a flip-top lid and branded finish.',
    details: [
      'White finish',
      'One shaker per purchase',
      'No recurring delivery',
      'Capacity and care specifications require confirmation',
    ],
    reviewCount: 0,
    image: assets.shaker,
    gallery: [assets.shaker],
    price: 1199,
    format: 'White shaker',
    kind: 'accessory',
    popularity: 25,
    rating: 0,
    added: 7,
  },
];
export const ingredients = [
  ['Raw Organic Honey', '14,500 mg'],
  ['Beet Root Extract', '2,000 mg'],
  ['L-Citrulline', '2,000 mg'],
  ['L-Glutamine', '1,000 mg'],
  ['Shilajit', '300 mg'],
  ['Maca Extract', '100 mg'],
  ['Black Ginger Extract', '100 mg'],
  ['Cynomorium Songaricum Extract', '100 mg'],
  ['Vitamin C', '90 mg'],
  ['Ginseng Extract', '50 mg'],
];
export const archivedReviews = [
  {
    name: 'Nathan G.',
    location: 'Los Angeles, California',
    title: 'Skeptical at First. Convinced After One Try.',
    text: 'I’m actually going to say this stuff is pretty good. I was skeptical, but after trying it, I was very surprised by the results. 100% genuine,…',
    source: 'C14, checkout, October 15, 2026 (visible excerpt)',
  },
  {
    name: 'Zac M',
    location: 'Los Angeles, California',
    title: 'The Only One That Actually Works',
    text: 'Only thing on the market that really works! This honey cranks it up seriously. The other junk is trash.',
    source: 'C14, checkout, October 15, 2026',
  },
];
export const disclaimer =
  'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Results may vary.';
