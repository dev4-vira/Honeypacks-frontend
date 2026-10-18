import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LockIcon, ShoppingBagIcon, XIcon } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { cartRecommendationIds } from '../../data/products';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { catalogService } from '../../utils/catalogService';
import { formatPrice } from '../../utils/currency';
import { darkButtonClass, primaryButtonClass } from '../../utils/formStyles';
import { ProductArt } from '../product/ProductArt';
import { CartItem } from './CartItem';
import { CartRecommendations } from './CartRecommendations';
import { GiftProgressBar } from './GiftProgressBar';
import { ShippingProtectionToggle } from './ShippingProtectionToggle';

export function CartDrawer() {
  const { lines, gift, giftProduct, totals, shippingProtection, setShippingProtection, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  const inCart = new Set(lines.map((l) => l.productId));
  const recommendations = catalogService.getByIds(cartRecommendationIds).filter((p) => !inCart.has(p.id));
  const trigger = catalogService.getById(gift.triggerProductId);
  const giftInfo = catalogService.getById(gift.giftProductId);
  const empty = lines.length === 0;

  return (
    <AnimatePresence>
      {isOpen &&
      <>
          <motion.div className="fixed inset-0 z-50 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={closeCart} />
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[440px] flex-col bg-white shadow-2xl"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-hp-line px-5">
              <h2 className="font-display text-xl font-bold uppercase tracking-wide">
                Your Cart {!empty && <span className="text-neutral-500">({totals.itemCount})</span>}
              </h2>
              <button type="button" onClick={closeCart} className="-mr-2 rounded p-2 hover:bg-hp-mist" aria-label="Close cart">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {empty ?
          <div className="flex flex-1 flex-col overflow-y-auto px-5 py-10">
                <div className="text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-hp-mist">
                    <ShoppingBagIcon className="h-7 w-7 text-neutral-500" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-display text-2xl font-bold uppercase tracking-wide">Your cart is empty</p>
                  <p className="mt-1 text-sm text-neutral-600">Looks like you haven&apos;t added anything yet.</p>
                  <Link to="/products" onClick={closeCart} className={`${darkButtonClass} mt-6 w-full`}>
                    View Products
                  </Link>
                </div>
                <div className="mt-10">
                  <CartRecommendations products={catalogService.getByIds(cartRecommendationIds)} title="Popular right now" layout="grid" />
                </div>
              </div> :

          <>
                {trigger && giftInfo && <GiftProgressBar gift={gift} triggerName={trigger.name} giftName={giftInfo.name} />}
                <div className="flex-1 overflow-y-auto px-5">
                  <ul className="divide-y divide-hp-line">
                    {lines.map((line) =>
                <CartItem
                  key={line.id}
                  line={line}
                  onQuantityChange={(q) => updateQuantity(line.id, q)}
                  onRemove={() => removeItem(line.id)}
                  onNavigate={closeCart} />

                )}
                    {giftProduct &&
                <li className="flex gap-4 py-5">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md">
                          <ProductArt variant={giftProduct.images[0].art} showTag={false} label={giftProduct.name} />
                        </div>
                        <div className="flex flex-1 items-start justify-between gap-3">
                          <div>
                            <p className="font-display text-[15px] font-semibold uppercase tracking-wide">{giftProduct.name}</p>
                            <p className="mt-0.5 text-xs text-neutral-600">Free gift · Qty 1</p>
                          </div>
                          <p className="font-semibold text-hp-green">FREE</p>
                        </div>
                      </li>
                }
                  </ul>
                  <div className="border-t border-hp-line py-5">
                    <CartRecommendations products={recommendations.slice(0, 3)} />
                  </div>
                </div>
                <div className="shrink-0 space-y-3 border-t border-hp-line bg-white px-5 pb-5 pt-4">
                  <ShippingProtectionToggle checked={shippingProtection} onChange={setShippingProtection} />
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-neutral-600">Subtotal</dt>
                      <dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd>
                    </div>
                    {shippingProtection &&
                <div className="flex justify-between">
                        <dt className="text-neutral-600">Shipping protection</dt>
                        <dd className="tabular-nums">{formatPrice(totals.protectionFee)}</dd>
                      </div>
                }
                    <div className="flex justify-between border-t border-hp-line pt-2 text-base font-bold">
                      <dt>Total</dt>
                      <dd className="tabular-nums">{formatPrice(totals.total)}</dd>
                    </div>
                  </dl>
                  <p className="text-xs text-neutral-500">Shipping and discounts calculated at checkout.</p>
                  <button
                type="button"
                onClick={() => {
                  closeCart();
                  navigate('/checkout');
                }}
                className={`${primaryButtonClass} w-full !text-base`}>
                
                    <LockIcon className="h-4 w-4" aria-hidden="true" />
                    Secure Checkout
                  </button>
                  <button type="button" onClick={closeCart} className="w-full py-1 text-center text-sm font-medium text-neutral-600 underline-offset-2 hover:text-hp-black hover:underline">
                    Continue Shopping
                  </button>
                </div>
              </>
          }
          </motion.aside>
        </>
      }
    </AnimatePresence>);

}