import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/product';
import { AddToCartButton } from './AddToCartButton';
import { ProductArt } from './ProductArt';
import { ProductPrice } from './ProductPrice';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const image = product.images[0];
  const inStock = product.availability === 'in-stock';

  return (
    <article className="group flex h-full flex-col">
      <Link to={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden rounded-md" aria-label={product.name}>
        <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.03]">
          <ProductArt variant={image.art} packLabel={image.packLabel} label={image.label} />
        </div>
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.onSale && <span className="rounded-sm bg-hp-green px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Sale</span>}
          {product.badge && <span className="rounded-sm bg-hp-black px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-hp-gold-light">{product.badge}</span>}
        </div>
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} size={13} />
          <span className="text-xs text-neutral-500">({product.reviewCount.toLocaleString()})</span>
        </div>
        <h3 className="mt-1.5 font-display text-lg font-semibold uppercase leading-snug tracking-wide">
          <Link to={`/products/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className={`mt-1 flex items-center gap-1.5 text-xs font-medium ${inStock ? 'text-hp-green' : 'text-hp-red'}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${inStock ? 'bg-hp-green' : 'bg-hp-red'}`} aria-hidden="true" />
          {inStock ? 'In stock' : 'Out of stock'}
        </p>
        <div className="mt-2">
          <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
        </div>
        <div className="mt-auto pt-4">
          <AddToCartButton onAdd={() => addItem(product.id, 'one-time')} disabled={!inStock} className="w-full" size="sm" />
        </div>
      </div>
    </article>);

}