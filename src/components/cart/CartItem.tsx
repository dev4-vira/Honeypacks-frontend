import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2Icon } from 'lucide-react';
import { DetailedCartLine } from '../../types/cart';
import { formatPrice } from '../../utils/currency';
import { ProductArt } from '../product/ProductArt';
import { QuantitySelector } from '../product/QuantitySelector';

interface CartItemProps {
  line: DetailedCartLine;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  onNavigate: () => void;
}

export function CartItem({ line, onQuantityChange, onRemove, onNavigate }: CartItemProps) {
  const image = line.product.images[0];
  return (
    <li className="flex gap-4 py-5">
      <Link to={`/products/${line.product.slug}`} onClick={onNavigate} className="h-20 w-20 shrink-0 overflow-hidden rounded-md">
        <ProductArt variant={image.art} packLabel={image.packLabel} showTag={false} label={image.label} />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/products/${line.product.slug}`} onClick={onNavigate} className="font-display text-[15px] font-semibold uppercase leading-snug tracking-wide hover:underline">
              {line.product.name}
            </Link>
            <p className="mt-0.5 text-xs text-neutral-600">
              {line.mode === 'subscription' ? `Subscription · Delivered ${line.product.subscriptionInterval}` : 'One-time purchase'}
            </p>
            <p className="mt-0.5 text-xs text-neutral-500">{formatPrice(line.unitPrice)} each</p>
          </div>
          <p className="shrink-0 font-semibold tabular-nums">{formatPrice(line.lineTotal)}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <QuantitySelector value={line.quantity} onChange={onQuantityChange} size="sm" label={`Quantity for ${line.product.name}`} />
          <button type="button" onClick={onRemove} className="flex items-center gap-1 rounded p-1 text-xs text-neutral-500 hover:text-hp-red" aria-label={`Remove ${line.product.name}`}>
            <Trash2Icon className="h-4 w-4" aria-hidden="true" />
            Remove
          </button>
        </div>
      </div>
    </li>);

}