import React from 'react';
import { formatPrice } from '../../utils/currency';
import { getSavingsPercent } from '../../utils/pricing';

interface ProductPriceProps {
  price: number;
  compareAtPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  showSavings?: boolean;
  tone?: 'light' | 'dark';
}

const sizes = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl'
};

export function ProductPrice({ price, compareAtPrice, size = 'md', showSavings = false, tone = 'light' }: ProductPriceProps) {
  const compare = compareAtPrice ?? 0;
  const onSale = compare > price;
  return (
    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
      <span className={`font-display font-semibold ${sizes[size]} ${onSale ? 'text-hp-red' : tone === 'dark' ? 'text-white' : 'text-hp-black'}`}>
        {formatPrice(price)}
      </span>
      {onSale &&
      <span className={`text-sm line-through ${tone === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
          <span className="sr-only">Regular price </span>
          {formatPrice(compare)}
        </span>
      }
      {onSale && showSavings &&
      <span className="rounded-sm bg-hp-green px-2 py-0.5 text-xs font-bold uppercase text-white">
          Save {getSavingsPercent(compare, price)}%
        </span>
      }
    </div>);

}