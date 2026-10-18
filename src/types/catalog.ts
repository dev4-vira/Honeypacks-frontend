export type SortOption = 'popularity' | 'rating' | 'newest' | 'oldest' | 'name-asc' | 'name-desc';

export interface ProductFilters {
  onSale: boolean;
  minPrice: string;
  maxPrice: string;
  inStock: boolean;
  outOfStock: boolean;
  sort: SortOption;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  to: string;
}

export interface PolicySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  needsConfirmation?: boolean;
}