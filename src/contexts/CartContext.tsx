import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartLine, CartTotals, DetailedCartLine, GiftProgress } from '../types/cart';
import { Product, PurchaseMode } from '../types/product';
import { catalogService } from '../utils/catalogService';
import { calculateCartTotals, getGiftProgress, makeLineId, round } from '../utils/cartRules';
import { getUnitPrice } from '../utils/pricing';

interface CartContextValue {
  lines: DetailedCartLine[];
  gift: GiftProgress;
  giftProduct: Product | undefined;
  totals: CartTotals;
  shippingProtection: boolean;
  isOpen: boolean;
  addItem: (productId: string, mode: PurchaseMode, quantity?: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  setShippingProtection: (value: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: {children: React.ReactNode;}) {
  const [rawLines, setRawLines] = useLocalStorage<CartLine[]>('hp-cart-lines', []);
  const [shippingProtection, setShippingProtection] = useLocalStorage<boolean>('hp-cart-protection', false);
  const [isOpen, setIsOpen] = useState(false);

  const lines = useMemo<DetailedCartLine[]>(
    () =>
    rawLines.flatMap((line) => {
      const product = catalogService.getById(line.productId);
      if (!product) return [];
      const unitPrice = getUnitPrice(product, line.mode);
      return [{ ...line, product, unitPrice, lineTotal: round(unitPrice * line.quantity) }];
    }),
    [rawLines]
  );

  const gift = useMemo(() => getGiftProgress(rawLines), [rawLines]);
  const giftProduct = gift.unlocked ? catalogService.getById(gift.giftProductId) : undefined;
  const totals = useMemo(() => calculateCartTotals(lines, shippingProtection), [lines, shippingProtection]);

  const addItem = useCallback(
    (productId: string, mode: PurchaseMode, quantity = 1) => {
      const id = makeLineId(productId, mode);
      setRawLines((prev) => {
        const existing = prev.find((l) => l.id === id);
        if (existing) {
          return prev.map((l) => l.id === id ? { ...l, quantity: Math.min(99, l.quantity + quantity) } : l);
        }
        return [...prev, { id, productId, mode, quantity }];
      });
      setIsOpen(true);
    },
    [setRawLines]
  );

  const updateQuantity = useCallback(
    (lineId: string, quantity: number) => {
      setRawLines((prev) =>
      quantity <= 0 ? prev.filter((l) => l.id !== lineId) : prev.map((l) => l.id === lineId ? { ...l, quantity: Math.min(99, quantity) } : l)
      );
    },
    [setRawLines]
  );

  const removeItem = useCallback((lineId: string) => setRawLines((prev) => prev.filter((l) => l.id !== lineId)), [setRawLines]);

  const value: CartContextValue = {
    lines,
    gift,
    giftProduct,
    totals,
    shippingProtection,
    isOpen,
    addItem,
    updateQuantity,
    removeItem,
    setShippingProtection,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}