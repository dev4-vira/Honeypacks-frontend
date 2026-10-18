import { ProductFilters, SortOption } from '../types/catalog';

export const sortOptions: {value: SortOption;label: string;}[] = [
{ value: 'popularity', label: 'Sort by popularity' },
{ value: 'rating', label: 'Sort by rating' },
{ value: 'newest', label: 'Sort by newest' },
{ value: 'oldest', label: 'Sort by oldest' },
{ value: 'name-asc', label: 'Sort by name: A–Z' },
{ value: 'name-desc', label: 'Sort by name: Z–A' }];


export const defaultFilters: ProductFilters = {
  onSale: false,
  minPrice: '',
  maxPrice: '',
  inStock: false,
  outOfStock: false,
  sort: 'popularity'
};