import { ProductFilters } from '../types/catalog';
import { Product } from '../types/product';

export function applyProductFilters(list: Product[], filters: ProductFilters): Product[] {
  const min = parseFloat(filters.minPrice);
  const max = parseFloat(filters.maxPrice);

  const filtered = list.filter((product) => {
    if (filters.onSale && !product.onSale) return false;
    if (!Number.isNaN(min) && product.price < min) return false;
    if (!Number.isNaN(max) && product.price > max) return false;
    if (filters.inStock !== filters.outOfStock) {
      if (filters.inStock && product.availability !== 'in-stock') return false;
      if (filters.outOfStock && product.availability !== 'out-of-stock') return false;
    }
    return true;
  });

  return [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case 'rating':
        return b.rating - a.rating || b.reviewCount - a.reviewCount;
      case 'newest':
        return b.createdAt.localeCompare(a.createdAt);
      case 'oldest':
        return a.createdAt.localeCompare(b.createdAt);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return b.popularity - a.popularity;
    }
  });
}

export function countActiveFilters(filters: ProductFilters): number {
  let count = 0;
  if (filters.onSale) count += 1;
  if (filters.minPrice || filters.maxPrice) count += 1;
  if (filters.inStock) count += 1;
  if (filters.outOfStock) count += 1;
  if (filters.sort !== 'popularity') count += 1;
  return count;
}