import React from 'react';
import { TruckIcon } from 'lucide-react';
import { usePurchaseOptions } from '../../../hooks/usePurchaseOptions';
import { Product } from '../../../types/product';
import { catalogService } from '../../../utils/catalogService';
import { ReviewSection } from '../../shared/ReviewSection';
import { AddToCartButton } from '../AddToCartButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductAccordion } from '../ProductAccordion';
import { ProductGallery } from '../ProductGallery';
import { ProductPrice } from '../ProductPrice';
import { QuantitySelector } from '../QuantitySelector';
import { RelatedProducts } from '../RelatedProducts';
import { StarRating } from '../StarRating';

/** Simplified accessory layout — no subscription, no supplement content (audit C31/C38). */
export function AccessoryProductTemplate({ product }: {product: Product;}) {
  const { quantity, setQuantity, add } = usePurchaseOptions(product);
  const inStock = product.availability === 'in-stock';

  return (
    <>
      <section className="mx-auto max-w-store px-4 pb-16 pt-6 md:px-8 md:pt-8">
        <Breadcrumbs current={product.name} />
        <div className="mt-6 grid gap-8 md:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} />
          <div className="md:pt-4">
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">{product.name}</h1>
            <a href="#reviews" className="mt-3 inline-flex items-center gap-2 text-sm hover:underline">
              <StarRating rating={product.rating} size={16} />
              <span className="text-neutral-500">({product.reviewCount} reviews)</span>
            </a>
            <div className="mt-4">
              <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">{product.description}</p>
            <p className={`mt-4 flex items-center gap-1.5 text-sm font-medium ${inStock ? 'text-hp-green' : 'text-hp-red'}`}>
              <span className={`h-2 w-2 rounded-full ${inStock ? 'bg-hp-green' : 'bg-hp-red'}`} aria-hidden="true" />
              {inStock ? 'In stock, ready to ship' : 'Out of stock'}
            </p>
            <div className="mt-6 flex gap-3">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <AddToCartButton onAdd={add} disabled={!inStock} className="h-12 flex-1 !py-0 !text-base" />
            </div>
            <p className="mt-4 flex items-center gap-2 rounded-md bg-hp-mist px-4 py-3 text-sm text-neutral-700">
              <TruckIcon className="h-5 w-5 shrink-0 text-hp-gold" aria-hidden="true" />
              Ships within 1–2 business days from the United States.
            </p>
            <div className="mt-8">
              <ProductAccordion sections={product.details} />
            </div>
          </div>
        </div>
      </section>

      <div id="reviews" className="mx-auto max-w-store scroll-mt-24 border-t border-hp-line px-4 py-16 md:px-8">
        <ReviewSection reviews={catalogService.getReviews(product.id)} rating={product.rating} reviewCount={product.reviewCount} />
      </div>

      <div className="bg-hp-mist">
        <RelatedProducts products={catalogService.getRelated(product)} title="Pair it with" />
      </div>
    </>);

}