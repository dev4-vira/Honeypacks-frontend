import React from 'react';
import { GiftIcon } from 'lucide-react';
import { Product, PurchaseMode } from '../../types/product';
import { formatPrice } from '../../utils/currency';
import { getSavingsPercent } from '../../utils/pricing';

interface PurchaseModeSelectorProps {
  product: Product;
  mode: PurchaseMode;
  onChange: (mode: PurchaseMode) => void;
  tone?: 'light' | 'dark';
}

export function PurchaseModeSelector({ product, mode, onChange, tone = 'light' }: PurchaseModeSelectorProps) {
  if (typeof product.subscriptionPrice !== 'number') return null;
  const savings = getSavingsPercent(product.price, product.subscriptionPrice);
  const dark = tone === 'dark';

  const cardClass = (selected: boolean) =>
  `block cursor-pointer rounded-md border-2 p-4 transition-colors duration-150 ${
  selected ?
  dark ?
  'border-hp-yellow bg-hp-coal' :
  'border-hp-black bg-[#fffbea]' :
  dark ?
  'border-neutral-700 hover:border-neutral-500' :
  'border-hp-line hover:border-neutral-400'}`;


  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">Purchase options</legend>

      <label className={cardClass(mode === 'subscription')}>
        <div className="flex items-start gap-3">
          <input
            type="radio"
            name={`mode-${product.id}`}
            className="mt-1 h-4 w-4 accent-hp-black"
            checked={mode === 'subscription'}
            onChange={() => onChange('subscription')} />
          
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-display text-base font-semibold uppercase tracking-wide">
                Subscribe &amp; Save
                <span className="ml-2 rounded-sm bg-hp-green px-1.5 py-0.5 align-middle font-sans text-[11px] font-bold text-white">{savings}% OFF</span>
              </span>
              <span className="flex items-baseline gap-2">
                <span className="font-display text-xl font-semibold">{formatPrice(product.subscriptionPrice)}</span>
                <span className={`text-sm line-through ${dark ? 'text-neutral-500' : 'text-neutral-400'}`}>{formatPrice(product.price)}</span>
              </span>
            </div>
            <p className={`mt-0.5 text-sm ${dark ? 'text-neutral-400' : 'text-neutral-600'}`}>Delivered {product.subscriptionInterval}</p>
            {mode === 'subscription' && product.subscriptionPerks &&
            <ul className="mt-3 space-y-1.5">
                {product.subscriptionPerks.map((perk, i) =>
              <li key={perk} className="flex items-center gap-2 text-sm">
                    {i === 0 ?
                <GiftIcon className="h-4 w-4 shrink-0 text-hp-gold" aria-hidden="true" /> :

                <span className="ml-1.5 mr-1 h-1.5 w-1.5 shrink-0 rounded-full bg-hp-gold" aria-hidden="true" />
                }
                    <span className={i === 0 ? 'font-semibold' : ''}>{perk}</span>
                  </li>
              )}
              </ul>
            }
          </div>
        </div>
      </label>

      <label className={cardClass(mode === 'one-time')}>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name={`mode-${product.id}`}
            className="h-4 w-4 accent-hp-black"
            checked={mode === 'one-time'}
            onChange={() => onChange('one-time')} />
          
          <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
            <span className="font-display text-base font-semibold uppercase tracking-wide">One-Time Purchase</span>
            <span className="font-display text-xl font-semibold">{formatPrice(product.price)}</span>
          </div>
        </div>
      </label>
    </fieldset>);

}