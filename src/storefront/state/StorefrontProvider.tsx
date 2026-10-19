import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ProductId, PurchaseMode } from '../data/catalog';
import {
  addLine,
  emptyCart,
  quantity,
  restoreCart,
  serializeCart,
} from '../logic/commerce';
import type { StoreCart, Shipping } from '../logic/commerce';

const storageKey = 'honeypacks-storefront-v1';
type Store = {
  cart: StoreCart;
  cartOpen: boolean;
  resetVersion: number;
  cartCount: number;
  openCart: () => void;
  closeCart: () => void;
  add: (product: ProductId, mode?: PurchaseMode, count?: number) => void;
  update: (index: number, count: number) => void;
  remove: (index: number) => void;
  setProtection: (value: boolean) => void;
  setShipping: (value: Shipping) => void;
};
const Context = createContext<Store | null>(null);
export function StorefrontProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState(() => {
    try {
      return restoreCart(localStorage.getItem(storageKey));
    } catch {
      return emptyCart();
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [resetVersion, setResetVersion] = useState(0);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, serializeCart(cart));
    } catch {
      /* In-memory demo when browser storage is unavailable. */
    }
  }, [cart]);
  useEffect(() => {
    const reset = () => {
      setCart(emptyCart());
      setCartOpen(false);
      setResetVersion((value) => value + 1);
    };
    const sync = (event: StorageEvent) => {
      if (event.key === storageKey) setCart(restoreCart(event.newValue));
    };
    window.addEventListener('hp:storefront-reset', reset);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('hp:storefront-reset', reset);
      window.removeEventListener('storage', sync);
    };
  }, []);
  return (
    <Context.Provider
      value={{
        cart,
        cartOpen,
        resetVersion,
        cartCount: cart.lines.reduce((n, l) => n + l.quantity, 0),
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
        add: (product, mode = 'one-time', count = 1) => {
          setCart((previous) =>
            addLine(previous, { product, mode, quantity: count }),
          );
          setCartOpen(true);
        },
        update: (index, count) =>
          setCart((previous) => ({
            ...previous,
            lines: previous.lines.map((line, i) =>
              i === index ? { ...line, quantity: quantity(count) } : line,
            ),
          })),
        remove: (index) =>
          setCart((previous) => ({
            ...previous,
            lines: previous.lines.filter((_, i) => i !== index),
          })),
        setProtection: (protection) =>
          setCart((previous) => ({ ...previous, protection })),
        setShipping: (shipping) =>
          setCart((previous) => ({ ...previous, shipping })),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useStorefront() {
  const store = useContext(Context);
  if (!store) throw new Error('StorefrontProvider is required');
  return store;
}
