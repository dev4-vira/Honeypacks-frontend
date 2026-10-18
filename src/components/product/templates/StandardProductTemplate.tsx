import React from 'react';
import { CheckIcon, LockIcon, RotateCcwIcon, TruckIcon } from 'lucide-react';
import { generalFaqs } from '../../../data/faqs';
import { usePurchaseOptions } from '../../../hooks/usePurchaseOptions';
import { Product } from '../../../types/product';
import { catalogService } from '../../../utils/catalogService';
import { formatPrice } from '../../../utils/currency';
import { FAQAccordion } from '../../shared/FAQAccordion';
import { GuaranteeBanner } from '../../shared/GuaranteeBanner';
import { ReviewSection } from '../../shared/ReviewSection';
import { SectionHeading } from '../../shared/SectionHeading';
import { AddToCartButton } from '../AddToCartButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductAccordion } from '../ProductAccordion';
import { ProductGallery } from '../ProductGallery';
import { ProductMediaSection } from '../ProductMediaSection';
import { ProductPrice } from '../ProductPrice';
import { PurchaseModeSelector } from '../PurchaseModeSelector';
import { QuantitySelector } from '../QuantitySelector';
import { RelatedProducts } from '../RelatedProducts';
import { StarRating } from '../StarRating';

export function StandardProductTemplate({ product }: {product: Product;}) {
  const { mode, setMode, quantity, setQuantity, unitPrice, add } = usePurchaseOptions(product);
  const inStock = product.availability === 'in-stock';
  const compareAt = mode === 'subscription' ? product.price : product.compareAtPrice;

  return (
    <>
      <section className="mx-auto max-w-store px-4 pb-16 pt-6 md:px-8 md:pt-8">
        <Breadcrumbs current={product.name} />
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="lg:sticky lg:top-[96px] lg:self-start">
            <ProductGallery images={product.images} />
          </div>

          <div>
            {product.badge && <span className="inline-block rounded-sm bg-hp-black px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-hp-gold-light">{product.badge}</span>}
            <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide md:text-5xl">{product.name}</h1>
            <a href="#reviews" className="mt-3 inline-flex items-center gap-2 text-sm hover:underline">
              <StarRating rating={product.rating} size={16} />
              <span className="font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-neutral-500">({product.reviewCount.toLocaleString()} reviews)</span>
            </a>
            <div className="mt-4">
              <ProductPrice price={unitPrice} compareAtPrice={compareAt} size="lg" showSavings />
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">{product.description}</p>

            <ul className="mt-5 space-y-2">
              {product.highlights.map((h) =>
              <li key={h} className="flex items-center gap-2.5 text-[15px]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-hp-yellow">
                    <CheckIcon className="h-3 w-3 text-hp-black" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {h}
                </li>
              )}
            </ul>

            <div className="mt-7">
              <PurchaseModeSelector product={product} mode={mode} onChange={setMode} />
            </div>

            <div className="mt-5 flex gap-3">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <AddToCartButton
                onAdd={add}
                disabled={!inStock}
                label={`Add to Cart · ${formatPrice(unitPrice * quantity)}`}
                className="flex-1 !py-0 h-12 !text-base" />
              
            </div>

            <ul className="mt-5 grid grid-cols-3 gap-2 border-y border-hp-line py-4 text-center text-xs text-neutral-700">
              <li className="flex flex-col items-center gap-1.5">
                <TruckIcon className="h-5 w-5 text-hp-gold" aria-hidden="true" />
                Ships in 1–2 days
              </li>
              <li className="flex flex-col items-center gap-1.5">
                <LockIcon className="h-5 w-5 text-hp-gold" aria-hidden="true" />
                Secure checkout
              </li>
              <li className="flex flex-col items-center gap-1.5">
                <RotateCcwIcon className="h-5 w-5 text-hp-gold" aria-hidden="true" />
                30-day returns
              </li>
            </ul>

            <div className="mt-6">
              <ProductAccordion sections={product.details} />
            </div>
          </div>
        </div>
      </section>

      <ProductMediaSection productName={product.name} />

      <div id="reviews" className="mx-auto max-w-store scroll-mt-24 px-4 py-16 md:px-8 md:py-20">
        <ReviewSection reviews={catalogService.getReviews(product.id)} rating={product.rating} reviewCount={product.reviewCount} />
      </div>

      <div className="bg-hp-mist">
        <RelatedProducts products={catalogService.getRelated(product)} />
      </div>

      <section className="mx-auto max-w-3xl px-4 py-16 md:py-20">
        <SectionHeading title="Frequently Asked Questions" className="mb-8" />
        <FAQAccordion items={generalFaqs} />
      </section>

      <GuaranteeBanner />
    </>);

}