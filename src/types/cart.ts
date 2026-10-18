import { Product, PurchaseMode } from './product';

export interface CartLine {
  id: string;
  productId: string;
  mode: PurchaseMode;
  quantity: number;
}

export interface DetailedCartLine extends CartLine {
  product: Product;
  unitPrice: number;
  lineTotal: number;
}

export interface GiftProgress {
  unlocked: boolean;
  current: number;
  required: number;
  remaining: number;
  triggerProductId: string;
  giftProductId: string;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  protectionFee: number;
  total: number;
}