import React from 'react';
import { DetailedCartLine } from '../../types/cart';
import { CheckoutTotals, PromoCode } from '../../types/checkout';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/currency';
import { ProductArt } from '../product/ProductArt';
import { PromoCodeInput } from './PromoCodeInput';

interface OrderSummaryProps {
  lines: DetailedCartLine[];
  giftProduct?: Product;
  totals: CheckoutTotals;
  promo: PromoCode | null;
  promoError: string;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
  onClearPromoError: () => void;
}

export function OrderSummary({ lines, giftProduct, totals, promo, promoError, onApplyPromo, onRemovePromo, onClearPromoError }: OrderSummaryProps) {
  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {lines.map((line) =>
        <SummaryLine
          key={line.id}
          product={line.product}
          quantity={line.quantity}
          subtitle={line.mode === 'subscription' ? `Subscription · ${line.product.subscriptionInterval}` : 'One-time purchase'}
          price={formatPrice(line.lineTotal)} />

        )}
        {giftProduct && <SummaryLine product={giftProduct} quantity={1} subtitle="Free gift" price="FREE" />}
      </ul>

      <PromoCodeInput applied={promo} error={promoError} onApply={onApplyPromo} onRemove={onRemovePromo} onClearError={onClearPromoError} />

      <dl className="space-y-2 text-sm">
        <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
        {totals.discount > 0 && promo && <Row label={`Discount (${promo.code})`} value={`−${formatPrice(totals.discount)}`} accent />}
        {totals.protectionFee > 0 && <Row label="Shipping protection" value={formatPrice(totals.protectionFee)} />}
        <Row label="Shipping" value={formatPrice(totals.shipping)} />
        <div className="flex items-baseline justify-between border-t border-hp-line pt-3">
          <dt className="text-base font-semibold">Total</dt>
          <dd className="flex items-baseline gap-2">
            <span className="text-xs text-neutral-500">USD</span>
            <span className="text-2xl font-bold tabular-nums">{formatPrice(totals.total)}</span>
          </dd>
        </div>
      </dl>
    </div>);

}

function SummaryLine({ product, quantity, subtitle, price }: {product: Product;quantity: number;subtitle: string;price: string;}) {
  const image = product.images[0];
  return (
    <li className="flex items-center gap-4">
      <div className="relative h-16 w-16 shrink-0">
        <div className="h-full w-full overflow-hidden rounded-md border border-hp-line">
          <ProductArt variant={image.art} packLabel={image.packLabel} showTag={false} label={image.label} />
        </div>
        <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-neutral-600 px-1 text-[11px] font-semibold text-white">{quantity}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-snug">{product.name}</p>
        <p className="text-xs text-neutral-500">{subtitle}</p>
      </div>
      <p className={`text-sm font-medium tabular-nums ${price === 'FREE' ? 'text-hp-green' : ''}`}>{price}</p>
    </li>);

}

function Row({ label, value, accent = false }: {label: string;value: string;accent?: boolean;}) {
  return (
    <div className="flex justify-between">
      <dt className="text-neutral-600">{label}</dt>
      <dd className={`tabular-nums ${accent ? 'font-medium text-hp-green' : ''}`}>{value}</dd>
    </div>);

}