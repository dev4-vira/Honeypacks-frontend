export type ProductCategory = 'honey' | 'pro-max' | 'beast-mode' | 'bundle' | 'accessory';

/** Which product detail layout a product uses. */
export type ProductTemplate = 'standard' | 'three-column' | 'accessory';

export type ProductArtVariant =
'honey-box' |
'honey-pack' |
'honey-sachet' |
'box-back' |
'pro-max' |
'pro-max-unit' |
'pro-max-duo' |
'beast-mode' |
'bundle' |
'shaker-white' |
'shaker-black';

export type PurchaseMode = 'subscription' | 'one-time';

export type Availability = 'in-stock' | 'out-of-stock';

export interface ProductImage {
  id: string;
  art: ProductArtVariant;
  label: string;
  /** Overrides the pack label printed on the placeholder packaging. */
  packLabel?: string;
}

export interface ProductDetailSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  /** Content that must be confirmed against the approved label / business copy. */
  needsConfirmation?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  template: ProductTemplate;
  images: ProductImage[];
  /** One-time purchase price. */
  price: number;
  compareAtPrice?: number;
  subscriptionPrice?: number;
  subscriptionInterval?: string;
  subscriptionPerks?: string[];
  availability: Availability;
  onSale: boolean;
  rating: number;
  reviewCount: number;
  popularity: number;
  createdAt: string;
  badge?: string;
  packSize: string;
  highlights: string[];
  details: ProductDetailSection[];
}