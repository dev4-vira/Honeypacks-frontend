import React from 'react';
import { PlusIcon } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/currency';
import { ProductArt } from '../product/ProductArt';

interface CartRecommendationsProps {
  products: Product[];
  title?: string;
  layout?: 'row' | 'grid';
}

export function CartRecommendations({ products, title = 'You may also like', layout = 'row' }: CartRecommendationsProps) {
  const { addItem } = useCart();
  if (products.length === 0) return null;

  return (
    <section aria-label={title}>
      <h3 className="font-display text-sm font-semibold uppercase tracking-[0.08em]">{title}</h3>
      <ul className={layout === 'row' ? 'no-scrollbar -mx-5 mt-3 flex gap-3 overflow-x-auto px-5 pb-1' : 'mt-3 grid grid-cols-2 gap-3'}>
        {products.map((product) => {
          const image = product.images[0];
          return (
            <li key={product.id} className={`flex flex-col rounded-md border border-hp-line bg-white p-2.5 ${layout === 'row' ? 'w-[148px] shrink-0' : ''}`}>
              <div className="aspect-square overflow-hidden rounded">
                <ProductArt variant={image.art} packLabel={image.packLabel} showTag={false} label={image.label} />
              </div>
              <p className="mt-2 line-clamp-2 text-xs font-semibold leading-snug">{product.name}</p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-xs font-semibold">{formatPrice(product.price)}</span>
                <button
                  type="button"
                  onClick={() => addItem(product.id, 'one-time')}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-hp-yellow text-hp-black transition-colors duration-150 hover:bg-hp-yellow-hover"
                  aria-label={`Add ${product.name} to cart`}>
                  
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </li>);

        })}
      </ul>
    </section>);

}