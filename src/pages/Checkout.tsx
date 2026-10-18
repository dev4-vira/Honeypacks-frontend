import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, InfoIcon, ShoppingBagIcon } from 'lucide-react';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { Logo } from '../components/layout/Logo';
import { DemoNoticeModal } from '../components/shared/DemoNoticeModal';
import { useCart } from '../contexts/CartContext';
import { useCheckout } from '../hooks/useCheckout';
import { formatPrice } from '../utils/currency';
import { primaryButtonClass } from '../utils/formStyles';

export function Checkout() {
  const { lines, giftProduct, totals: cartTotals } = useCart();
  const checkout = useCheckout(cartTotals.subtotal, cartTotals.protectionFee);
  const [expressMethod, setExpressMethod] = useState<string | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const summary =
  <OrderSummary
    lines={lines}
    giftProduct={giftProduct}
    totals={checkout.totals}
    promo={checkout.promo}
    promoError={checkout.promoError}
    onApplyPromo={checkout.applyPromo}
    onRemovePromo={checkout.removePromo}
    onClearPromoError={checkout.clearPromoError} />;



  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <header className="border-b border-hp-line">
        <div className="mx-auto flex h-[72px] max-w-[1100px] items-center justify-between px-4 md:px-6">
          <Logo tone="dark" />
          <Link to="/products" className="rounded p-2 text-hp-black hover:text-hp-gold" aria-label="Back to shop">
            <ShoppingBagIcon className="h-6 w-6" />
          </Link>
        </div>
      </header>
      <div className="bg-hp-black px-4 py-2 text-center text-xs font-medium text-white">
        <InfoIcon className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px text-hp-yellow" aria-hidden="true" />
        Prototype checkout — no payments are processed and no orders are created.
      </div>

      {lines.length === 0 ?
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide">Your cart is empty</h1>
          <p className="mt-2 text-neutral-600">Add a product to your cart to continue to checkout.</p>
          <Link to="/products" className={`${primaryButtonClass} mt-6`}>
            View Products
          </Link>
        </main> :

      <main className="flex-1">
          <div className="border-b border-hp-line bg-hp-mist lg:hidden">
            <button
            type="button"
            onClick={() => setSummaryOpen((v) => !v)}
            aria-expanded={summaryOpen}
            className="mx-auto flex w-full max-w-[600px] items-center justify-between px-4 py-4 text-sm">
            
              <span className="flex items-center gap-1.5 font-medium">
                {summaryOpen ? 'Hide' : 'Show'} order summary
                <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${summaryOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </span>
              <span className="text-lg font-bold tabular-nums">{formatPrice(checkout.totals.total)}</span>
            </button>
            <AnimatePresence initial={false}>
              {summaryOpen &&
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden">
              
                  <div className="mx-auto max-w-[600px] px-4 pb-6">{summary}</div>
                </motion.div>
            }
            </AnimatePresence>
          </div>

          <div className="lg:grid lg:min-h-full lg:grid-cols-2">
            <div className="px-4 py-8 md:px-6 lg:flex lg:justify-end lg:border-r lg:border-hp-line lg:py-10 lg:pr-12">
              <div className="mx-auto w-full max-w-[600px] lg:mx-0 lg:max-w-[540px]">
                <h1 className="sr-only">Checkout</h1>
                <CheckoutForm
                form={checkout.form}
                errors={checkout.errors}
                onEmailChange={checkout.setEmail}
                onMarketingChange={checkout.setMarketingOptIn}
                onAddressChange={checkout.updateAddress}
                onShippingMethodChange={checkout.setShippingMethod}
                onBillingSameChange={checkout.setBillingSame}
                onExpressSelect={setExpressMethod}
                onSubmit={checkout.submit} />
              
              </div>
            </div>
            <aside aria-label="Order summary" className="hidden bg-hp-mist lg:block">
              <div className="sticky top-0 max-w-[480px] px-12 py-10">{summary}</div>
            </aside>
          </div>
        </main>
      }

      <DemoNoticeModal
        open={checkout.noticeOpen}
        onClose={() => checkout.setNoticeOpen(false)}
        title="Prototype checkout"
        message={`Your details passed validation. Total would be ${formatPrice(checkout.totals.total)}. This is a demo — no payment was processed and no order was placed.`} />
      
      <DemoNoticeModal
        open={expressMethod !== null}
        onClose={() => setExpressMethod(null)}
        title={`${expressMethod ?? ''} unavailable`}
        message="Express payment buttons are visual placeholders in this prototype and are not connected to any payment provider." />
      
    </div>);

}