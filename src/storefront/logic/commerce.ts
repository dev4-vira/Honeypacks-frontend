import type { Product, ProductId, PurchaseMode } from '../data/catalog.ts';
import { productRepository } from '../services/productRepository.ts';

export type CartLine = {
  product: ProductId;
  mode: PurchaseMode;
  quantity: number;
};
export type Shipping = 'ground' | 'express';
export type StoreCart = {
  lines: CartLine[];
  protection: boolean;
  shipping: Shipping;
};
export const emptyCart = (): StoreCart => ({
  lines: [],
  protection: false,
  shipping: 'ground',
});
export const rules = {
  freeShipping: 7500,
  ground: 500,
  express: 1167,
  protection: 256,
  giftBoxes: 2,
  giftSachets: 3,
} as const;
export const demoCoupons: readonly { code: string; percent: number }[] = [];
export const money = (cents: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    cents / 100,
  );
export const quantity = (value: number) =>
  Math.min(20, Math.max(1, Math.trunc(Number.isFinite(value) ? value : 1)));
// ponytail: a demo line is limited to 20 units; production must use inventory limits.
export const unitPrice = (product: Product, mode: PurchaseMode) =>
  mode === 'subscription' && product.subscription !== undefined
    ? product.subscription
    : product.price;
export function addLine(cart: StoreCart, incoming: CartLine): StoreCart {
  const product = productRepository.get(incoming.product);
  const mode = product.subscription !== undefined ? incoming.mode : 'one-time';
  const match = cart.lines.find(
    (line) => line.product === incoming.product && line.mode === mode,
  );
  return {
    ...cart,
    lines: match
      ? cart.lines.map((line) =>
          line === match
            ? { ...line, quantity: quantity(line.quantity + incoming.quantity) }
            : line,
        )
      : [
          ...cart.lines,
          { ...incoming, mode, quantity: quantity(incoming.quantity) },
        ],
  };
}
export function quote(cart: StoreCart, couponCode = '') {
  const items = cart.lines.reduce(
    (sum, line) =>
      sum +
      unitPrice(productRepository.get(line.product), line.mode) * line.quantity,
    0,
  );
  const coupon = demoCoupons.find(
    (item) => item.code === couponCode.trim().toUpperCase(),
  );
  const discount = coupon ? Math.round((items * coupon.percent) / 100) : 0;
  const subtotal = items - discount;
  const protection =
    cart.lines.length && cart.protection ? rules.protection : 0;
  const shipping =
    cart.lines.length === 0
      ? 0
      : cart.shipping === 'express'
        ? rules.express
        : subtotal >= rules.freeShipping
          ? 0
          : rules.ground;
  const honeyBoxes = cart.lines
    .filter((line) => line.product === 'honey')
    .reduce((sum, line) => sum + line.quantity, 0);
  const recurring = cart.lines.filter((line) => line.mode === 'subscription');
  const nextItems = recurring.reduce(
    (sum, line) =>
      sum +
      unitPrice(productRepository.get(line.product), line.mode) * line.quantity,
    0,
  );
  const nextShipping = !recurring.length
    ? 0
    : cart.shipping === 'express'
      ? rules.express
      : nextItems >= rules.freeShipping
        ? 0
        : rules.ground;
  return {
    items,
    discount,
    protection,
    subtotal: subtotal + protection,
    shipping,
    tax: 0,
    total: subtotal + protection + shipping,
    giftSachets: honeyBoxes >= rules.giftBoxes ? rules.giftSachets : 0,
    honeyBoxes,
    freeShippingRemaining: Math.max(0, rules.freeShipping - subtotal),
    nextItems,
    nextShipping,
    nextTotal: nextItems + nextShipping,
  };
}

export function restoreCart(raw: string | null): StoreCart {
  try {
    const saved: unknown = JSON.parse(raw ?? 'null');
    if (
      !saved ||
      typeof saved !== 'object' ||
      !('version' in saved) ||
      saved.version !== 1 ||
      !('lines' in saved) ||
      !Array.isArray(saved.lines)
    )
      return emptyCart();
    let result = emptyCart();
    for (const value of saved.lines.slice(0, 20)) {
      if (!value || typeof value !== 'object') continue;
      const product = productRepository
        .list()
        .find((item) => item.id === value.product);
      if (
        !product ||
        !['one-time', 'subscription'].includes(value.mode) ||
        typeof value.quantity !== 'number' ||
        !Number.isFinite(value.quantity) ||
        value.quantity < 1
      )
        continue;
      result = addLine(result, {
        product: product.id,
        mode: value.mode,
        quantity: quantity(value.quantity),
      });
    }
    return {
      ...result,
      protection: 'protection' in saved && saved.protection === true,
      shipping:
        'shipping' in saved && saved.shipping === 'express'
          ? 'express'
          : 'ground',
    };
  } catch {
    return emptyCart();
  }
}
export const serializeCart = (cart: StoreCart) =>
  JSON.stringify({
    version: 1,
    lines: cart.lines,
    protection: cart.protection,
    shipping: cart.shipping,
  });

export type CatalogFilters = {
  sale: boolean;
  stock: 'all' | 'in' | 'out';
  price: 'all' | 'under25' | '25to50' | 'over50';
  sort: string;
};
export const initialFilters: CatalogFilters = {
  sale: false,
  stock: 'all',
  price: 'all',
  sort: 'default',
};
export function filterProducts(
  products: readonly Product[],
  filters: CatalogFilters,
) {
  const result = products.filter(
    (p) =>
      (!filters.sale || (p.listPrice ?? p.price) > p.price) &&
      (filters.stock === 'all' ||
        (filters.stock === 'in' ? p.stock : !p.stock)) &&
      (filters.price === 'all' ||
        (filters.price === 'under25'
          ? p.price < 2500
          : filters.price === '25to50'
            ? p.price >= 2500 && p.price <= 5000
            : p.price > 5000)),
  );
  if (filters.sort === 'az')
    result.sort((a, b) => a.name.localeCompare(b.name));
  if (filters.sort === 'za')
    result.sort((a, b) => b.name.localeCompare(a.name));
  if (filters.sort === 'popular')
    result.sort((a, b) => b.popularity - a.popularity);
  if (filters.sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  if (filters.sort === 'newest') result.sort((a, b) => b.added - a.added);
  if (filters.sort === 'oldest') result.sort((a, b) => a.added - b.added);
  if (filters.sort === 'price-low') result.sort((a, b) => a.price - b.price);
  if (filters.sort === 'price-high') result.sort((a, b) => b.price - a.price);
  return result;
}
