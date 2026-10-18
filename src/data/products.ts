import { Product, ProductDetailSection } from '../types/product';

/*
 * Local mock catalog — 10 products, mirroring the count observed in the Oct 15, 2026 audit.
 * Prices for the 10 Pack, Pro Max, Beast Mode and Shaker White are the audit's reference prices.
 * Secondary pack sizes / bundles and their prices are MOCK values pending catalog confirmation.
 * Shape is designed to map 1:1 onto a future Django REST `/api/products/` response.
 */

const honeyHowToUse: ProductDetailSection = {
  title: 'How to Use',
  paragraphs: [
  'Tear open one pack and enjoy it straight from the pack, or stir it into a warm drink.',
  'Use no more than one pack within 24 hours. For adults 18+ only.'],

  needsConfirmation: true
};

const honeyIngredients: ProductDetailSection = {
  title: 'Ingredients / Supplement Facts',
  paragraphs: [
  'Ingredient list and supplement facts panel are pending confirmation against the approved product label.'],

  bullets: ['Natural honey', 'Ginseng root extract', 'Maca root', 'Tongkat Ali root extract'],
  needsConfirmation: true
};

const shippingReturns: ProductDetailSection = {
  title: 'Shipping and Returns',
  paragraphs: [
  'Orders ship from the United States within 1–2 business days in discreet packaging.',
  'New, unopened products may be returned within 30 days of delivery. See our Returns & Refund Policy for details.']

};

const shakerDetails: ProductDetailSection[] = [
{
  title: 'Product Details',
  paragraphs: ['A leak-resistant shaker bottle with a snap-lock lid and measurement markings on the side.'],
  bullets: ['Capacity: 20 oz (pending confirmation)', 'BPA-free plastic', 'Snap-lock flip cap', 'Hand wash recommended'],
  needsConfirmation: true
},
shippingReturns];


const honeySubscriptionPerks = [
'Free shaker with your first delivery',
'Delivered every 4 weeks',
'Skip, pause or cancel anytime'];


export const products: Product[] = [
{
  id: 'black-thai-honey-10-pack',
  slug: 'black-thai-honey-10-pack',
  name: 'Black Thai Honey 10 Pack',
  tagline: 'The original single-serve honey packs.',
  description:
  'Our signature Black Thai Honey in ten convenient single-serve packs. Rich, dark honey blended with traditional botanicals — easy to carry, easy to enjoy.',
  category: 'honey',
  template: 'standard',
  images: [
  { id: 'bth10-1', art: 'honey-box', label: 'Black Thai Honey 10 Pack box', packLabel: '10 PACK' },
  { id: 'bth10-2', art: 'honey-pack', label: 'Black Thai Honey single-serve packs' },
  { id: 'bth10-3', art: 'honey-sachet', label: 'Single Black Thai Honey pack' },
  { id: 'bth10-4', art: 'box-back', label: 'Back of the 10 Pack box' }],

  price: 65,
  compareAtPrice: 80,
  subscriptionPrice: 50,
  subscriptionInterval: 'every 4 weeks',
  subscriptionPerks: honeySubscriptionPerks,
  availability: 'in-stock',
  onSale: true,
  rating: 4.8,
  reviewCount: 1243,
  popularity: 100,
  createdAt: '2023-03-01',
  badge: 'Best Seller',
  packSize: '10 single-serve packs',
  highlights: ['10 single-serve packs per box', 'Made with natural honey & botanicals', 'Discreet, travel-ready packaging'],
  details: [
  {
    title: 'Description',
    paragraphs: [
    'Black Thai Honey is our flagship product: a dark, rich honey blend packed in individual sachets so you can take it anywhere.',
    'Each box contains ten packs. Choose Subscribe & Save to have a fresh box delivered every 4 weeks.']

  },
  honeyHowToUse,
  honeyIngredients,
  shippingReturns]

},
{
  id: 'black-thai-honey-pro-max',
  slug: 'black-thai-honey-pro-max',
  name: 'Black Thai Honey Pro Max',
  tagline: 'Five resealable units in one box.',
  description:
  'Black Thai Honey Pro Max comes as a box of five resealable units — the same rich honey blend in a format you can open, close and finish on your schedule.',
  category: 'pro-max',
  template: 'standard',
  images: [
  { id: 'pm-1', art: 'pro-max', label: 'Black Thai Honey Pro Max box' },
  { id: 'pm-2', art: 'pro-max-unit', label: 'Pro Max resealable unit' },
  { id: 'pm-3', art: 'box-back', label: 'Back of the Pro Max box' }],

  price: 65,
  compareAtPrice: 79,
  subscriptionPrice: 50,
  subscriptionInterval: 'every 4 weeks',
  subscriptionPerks: honeySubscriptionPerks,
  availability: 'in-stock',
  onSale: true,
  rating: 4.9,
  reviewCount: 512,
  popularity: 92,
  createdAt: '2025-06-10',
  badge: 'New',
  packSize: 'Box of 5 resealable units',
  highlights: ['Box of 5 resealable units', 'Our most concentrated format', 'Reseal and save for later'],
  details: [
  {
    title: 'Description',
    paragraphs: [
    'Pro Max takes the Black Thai Honey formula and puts it into five resealable units per box.',
    'Ideal if you prefer to portion your honey over time instead of finishing a full pack at once.']

  },
  honeyHowToUse,
  honeyIngredients,
  shippingReturns]

},
{
  id: 'beast-mode',
  slug: 'beast-mode',
  name: 'Beast Mode',
  tagline: 'Bold energy blend for high-output days.',
  description:
  'Beast Mode is our high-intensity honey blend built for long days, late nights and big efforts. Single-serve, ready when you are.',
  category: 'beast-mode',
  template: 'three-column',
  images: [
  { id: 'bm-1', art: 'beast-mode', label: 'Beast Mode box' },
  { id: 'bm-2', art: 'box-back', label: 'Back of the Beast Mode box' }],

  price: 60,
  compareAtPrice: 72,
  subscriptionPrice: 48,
  subscriptionInterval: 'every 4 weeks',
  subscriptionPerks: ['Save $12 on every box', 'Delivered every 4 weeks', 'Cancel anytime'],
  availability: 'in-stock',
  onSale: true,
  rating: 4.7,
  reviewCount: 388,
  popularity: 84,
  createdAt: '2024-09-15',
  packSize: '10 single-serve packs',
  highlights: ['Bold, intense flavor profile', 'Single-serve packs', 'Built for high-output days'],
  details: [
  {
    title: 'Description',
    paragraphs: ['Beast Mode is a bolder take on our honey blend, packed in single-serve sachets for on-the-go use.']
  },
  honeyHowToUse,
  honeyIngredients,
  shippingReturns]

},
{
  id: 'shaker-white',
  slug: 'shaker-white',
  name: 'Shaker White',
  tagline: 'The official HoneyPacks shaker.',
  description:
  'Our white HoneyPacks shaker bottle — leak-resistant, easy to clean and sized to go everywhere with you.',
  category: 'accessory',
  template: 'accessory',
  images: [{ id: 'sw-1', art: 'shaker-white', label: 'White HoneyPacks shaker bottle' }],
  price: 11.99,
  availability: 'in-stock',
  onSale: false,
  rating: 4.6,
  reviewCount: 96,
  popularity: 40,
  createdAt: '2023-05-01',
  packSize: '1 shaker',
  highlights: ['Leak-resistant snap lid', 'Measurement markings', 'HoneyPacks logo print'],
  details: shakerDetails
},
{
  id: 'black-thai-honey-3-pack',
  slug: 'black-thai-honey-3-pack',
  name: 'Black Thai Honey 3 Pack',
  tagline: 'Try it before you stock up.',
  description: 'Three single-serve packs of Black Thai Honey — the easiest way to try it for the first time.',
  category: 'honey',
  template: 'standard',
  images: [
  { id: 'bth3-1', art: 'honey-pack', label: 'Black Thai Honey 3 Pack' },
  { id: 'bth3-2', art: 'honey-sachet', label: 'Single Black Thai Honey pack' }],

  price: 24.99,
  availability: 'in-stock',
  onSale: false,
  rating: 4.7,
  reviewCount: 301,
  popularity: 72,
  createdAt: '2023-08-01',
  packSize: '3 single-serve packs',
  highlights: ['3 single-serve packs', 'Perfect first order', 'Ships in discreet packaging'],
  details: [
  { title: 'Description', paragraphs: ['A three-pack trial size of our signature Black Thai Honey.'] },
  honeyHowToUse,
  honeyIngredients,
  shippingReturns]

},
{
  id: 'black-thai-honey-20-pack',
  slug: 'black-thai-honey-20-pack',
  name: 'Black Thai Honey 20 Pack',
  tagline: 'Double the packs, better value.',
  description: 'Twenty single-serve packs of Black Thai Honey for those who already know they love it.',
  category: 'honey',
  template: 'standard',
  images: [
  { id: 'bth20-1', art: 'honey-box', label: 'Black Thai Honey 20 Pack box', packLabel: '20 PACK' },
  { id: 'bth20-2', art: 'honey-pack', label: 'Black Thai Honey single-serve packs' }],

  price: 120,
  compareAtPrice: 160,
  subscriptionPrice: 95,
  subscriptionInterval: 'every 4 weeks',
  subscriptionPerks: honeySubscriptionPerks,
  availability: 'in-stock',
  onSale: true,
  rating: 4.8,
  reviewCount: 455,
  popularity: 88,
  createdAt: '2024-01-10',
  packSize: '20 single-serve packs',
  highlights: ['20 single-serve packs', 'Better per-pack value', 'Discreet packaging'],
  details: [
  { title: 'Description', paragraphs: ['Two boxes worth of Black Thai Honey in a single order.'] },
  honeyHowToUse,
  honeyIngredients,
  shippingReturns]

},
{
  id: 'black-thai-honey-30-pack',
  slug: 'black-thai-honey-30-pack',
  name: 'Black Thai Honey 30 Pack',
  tagline: 'Our best per-pack price.',
  description: 'Thirty single-serve packs of Black Thai Honey — our best value for regular customers.',
  category: 'honey',
  template: 'standard',
  images: [
  { id: 'bth30-1', art: 'honey-box', label: 'Black Thai Honey 30 Pack box', packLabel: '30 PACK' },
  { id: 'bth30-2', art: 'honey-pack', label: 'Black Thai Honey single-serve packs' }],

  price: 170,
  compareAtPrice: 240,
  subscriptionPrice: 135,
  subscriptionInterval: 'every 4 weeks',
  subscriptionPerks: honeySubscriptionPerks,
  availability: 'in-stock',
  onSale: true,
  rating: 4.9,
  reviewCount: 210,
  popularity: 64,
  createdAt: '2024-04-01',
  packSize: '30 single-serve packs',
  highlights: ['30 single-serve packs', 'Best per-pack value', 'Discreet packaging'],
  details: [
  { title: 'Description', paragraphs: ['Three boxes worth of Black Thai Honey, priced for regulars.'] },
  honeyHowToUse,
  honeyIngredients,
  shippingReturns]

},
{
  id: 'pro-max-2-box-bundle',
  slug: 'pro-max-2-box-bundle',
  name: 'Pro Max 2 Box Bundle',
  tagline: 'Two boxes of Pro Max, bundled.',
  description: 'Two boxes of Black Thai Honey Pro Max — ten resealable units in total.',
  category: 'bundle',
  template: 'standard',
  images: [
  { id: 'pm2-1', art: 'pro-max-duo', label: 'Two Black Thai Honey Pro Max boxes' },
  { id: 'pm2-2', art: 'pro-max-unit', label: 'Pro Max resealable unit' }],

  price: 120,
  compareAtPrice: 158,
  subscriptionPrice: 95,
  subscriptionInterval: 'every 4 weeks',
  subscriptionPerks: honeySubscriptionPerks,
  availability: 'in-stock',
  onSale: true,
  rating: 4.8,
  reviewCount: 140,
  popularity: 58,
  createdAt: '2025-08-01',
  packSize: '2 boxes · 10 resealable units',
  highlights: ['2 boxes of Pro Max', '10 resealable units total', 'Bundle pricing'],
  details: [
  { title: 'Description', paragraphs: ['A two-box bundle of Black Thai Honey Pro Max at bundle pricing.'] },
  honeyHowToUse,
  honeyIngredients,
  shippingReturns]

},
{
  id: 'beast-mode-honey-bundle',
  slug: 'beast-mode-honey-bundle',
  name: 'Beast Mode + Black Thai Honey Bundle',
  tagline: 'One box of each, bundled.',
  description: 'A box of Beast Mode and a box of Black Thai Honey 10 Pack, together at bundle pricing.',
  category: 'bundle',
  template: 'standard',
  images: [
  { id: 'bmb-1', art: 'bundle', label: 'Beast Mode and Black Thai Honey boxes' },
  { id: 'bmb-2', art: 'honey-pack', label: 'Black Thai Honey single-serve packs' }],

  price: 110,
  compareAtPrice: 145,
  subscriptionPrice: 88,
  subscriptionInterval: 'every 4 weeks',
  subscriptionPerks: honeySubscriptionPerks,
  availability: 'in-stock',
  onSale: true,
  rating: 4.8,
  reviewCount: 122,
  popularity: 68,
  createdAt: '2025-02-01',
  packSize: '2 boxes · 20 single-serve packs',
  highlights: ['1 box Beast Mode', '1 box Black Thai Honey 10 Pack', 'Bundle pricing'],
  details: [
  { title: 'Description', paragraphs: ['Both of our single-serve formulas in one order.'] },
  honeyHowToUse,
  honeyIngredients,
  shippingReturns]

},
{
  id: 'shaker-black',
  slug: 'shaker-black',
  name: 'Shaker Black',
  tagline: 'The official HoneyPacks shaker, in black.',
  description: 'Our black HoneyPacks shaker bottle with a gold logo print.',
  category: 'accessory',
  template: 'accessory',
  images: [{ id: 'sb-1', art: 'shaker-black', label: 'Black HoneyPacks shaker bottle' }],
  price: 11.99,
  availability: 'in-stock',
  onSale: false,
  rating: 4.5,
  reviewCount: 64,
  popularity: 36,
  createdAt: '2025-03-01',
  packSize: '1 shaker',
  highlights: ['Leak-resistant snap lid', 'Measurement markings', 'Gold logo print'],
  details: shakerDetails
}];


export const bestSellerIds = [
'black-thai-honey-10-pack',
'black-thai-honey-pro-max',
'beast-mode',
'black-thai-honey-20-pack'];


export const cartRecommendationIds = ['shaker-white', 'black-thai-honey-pro-max', 'beast-mode', 'black-thai-honey-3-pack'];