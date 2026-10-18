import { Product, PurchaseMode } from '../types/product';

export function hasSubscription(product: Product): boolean {
  return typeof product.subscriptionPrice === 'number';
}

export function getUnitPrice(product: Product, mode: PurchaseMode): number {
  if (mode === 'subscription' && typeof product.subscriptionPrice === 'number') {
    return product.subscriptionPrice;
  }
  return product.price;
}

export function getSavingsPercent(fullPrice: number, discountedPrice: number): number {
  if (fullPrice <= 0) return 0;
  return Math.round((1 - discountedPrice / fullPrice) * 100);
}

export function getDefaultMode(product: Product): PurchaseMode {
  return hasSubscription(product) ? 'subscription' : 'one-time';
}