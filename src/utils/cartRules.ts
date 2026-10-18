import { CartLine, CartTotals, DetailedCartLine, GiftProgress } from '../types/cart';

export const SHIPPING_PROTECTION_FEE = 2.56;

/** Mock rule: 2 units of the main product unlock a free shaker (observed in audit C16). */
export const GIFT_RULE = {
  triggerProductId: 'black-thai-honey-10-pack',
  requiredQuantity: 2,
  giftProductId: 'shaker-white'
};

export function getGiftProgress(lines: CartLine[]): GiftProgress {
  const current = lines.
  filter((line) => line.productId === GIFT_RULE.triggerProductId).
  reduce((sum, line) => sum + line.quantity, 0);
  return {
    unlocked: current >= GIFT_RULE.requiredQuantity,
    current,
    required: GIFT_RULE.requiredQuantity,
    remaining: Math.max(0, GIFT_RULE.requiredQuantity - current),
    triggerProductId: GIFT_RULE.triggerProductId,
    giftProductId: GIFT_RULE.giftProductId
  };
}

export function calculateCartTotals(lines: DetailedCartLine[], shippingProtection: boolean): CartTotals {
  const subtotal = round(lines.reduce((sum, line) => sum + line.lineTotal, 0));
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const protectionFee = shippingProtection && itemCount > 0 ? SHIPPING_PROTECTION_FEE : 0;
  return { itemCount, subtotal, protectionFee, total: round(subtotal + protectionFee) };
}

export function makeLineId(productId: string, mode: string): string {
  return `${productId}:${mode}`;
}

export function round(value: number): number {
  return Math.round(value * 100) / 100;
}