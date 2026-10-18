import React from 'react';
import { FlameIcon, PackageIcon, ZapIcon } from 'lucide-react';
import { usePurchaseOptions } from '../../../hooks/usePurchaseOptions';
import { Product } from '../../../types/product';
import { catalogService } from '../../../utils/catalogService';
import { formatPrice } from '../../../utils/currency';
import { GuaranteeBanner } from '../../shared/GuaranteeBanner';
import { ReviewSection } from '../../shared/ReviewSection';
import { AddToCartButton } from '../AddToCartButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductAccordion } from '../ProductAccordion';
import { ProductGallery } from '../ProductGallery';
import { PurchaseModeSelector } from '../PurchaseModeSelector';
import { QuantitySelector } from '../QuantitySelector';
import { RelatedProducts } from '../RelatedProducts';
import { StarRating } from '../StarRating';

const benefitIcons = [FlameIcon, ZapIcon, PackageIcon];

/** Beast Mode layout: marketing copy · product image · purchase box (audit C29/C30). */
export function ThreeColumnProductTemplate({ product }: {product: Product;}) {
  const { mode, setMode, quantity, setQuantity, unitPrice, add } = usePurchaseOptions(product);
  const inStock = product.availability === 'in-stock';

  return (
    <>
      <section className="bg-hp-black text-white">
        <div className="mx-auto max-w-store px-4 pb-16 pt-6 md:px-8 md:pt-8">
          <Breadcrumbs current={product.name} tone="dark" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-start lg:gap-10">
            <div className="order-2 lg:order-1 lg:pt-6">
              <h1 className="font-display text-6xl font-bold uppercase leading-[0.95] tracking-wide md:text-7xl">
                Beast <span className="text-hp-red">Mode</span>
              </h1>
              <p className="mt-3 font-display text-xl uppercase tracking-wide text-hp-gold">{product.tagline}</p>
              <a href="#reviews" className="mt-4 inline-flex items-center gap-2 text-sm hover:underline">
                <StarRating rating={product.rating} size={16} />
                <span className="text-neutral-400">({product.reviewCount.toLocaleString()} reviews)</span>
              </a>
              <p className="mt-5 text-[15px] leading-relaxed text-neutral-300">{product.description}</p>
              <ul className="mt-7 space-y-5">
                {product.highlights.map((h, i) => {
                  const Icon = benefitIcons[i % benefitIcons.length];
                  return (
                    <li key={h} className="flex items-center gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hp-red/60 text-hp-red">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-lg font-medium uppercase tracking-wide">{h}</span>
                    </li>);

                })}
              </ul>
            </div>

            <div className="order-1 lg:order-2">
              <ProductGallery images={product.images} tone="dark" />
            </div>

            <div className="order-3 rounded-lg bg-white p-5 text-hp-black md:p-6">
              <p className="text-sm font-medium text-neutral-600">{product.packSize}</p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold">{formatPrice(unitPrice)}</span>
                {mode === 'subscription' && <span className="text-sm text-neutral-600">/ {product.subscriptionInterval}</span>}
              </p>
              <div className="mt-5">
                <PurchaseModeSelector product={product} mode={mode} onChange={setMode} />
              </div>
              <div className="mt-5 flex gap-3">
                <QuantitySelector value={quantity} onChange={setQuantity} />
                <AddToCartButton onAdd={add} disabled={!inStock} className="h-12 flex-1 !py-0 !text-base" />
              </div>
              <p className="mt-3 text-center text-xs text-neutral-500">Ships in 1–2 business days · 30-day returns</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14">
        <ProductAccordion sections={product.details} />
      </section>

      <div id="reviews" className="mx-auto max-w-store scroll-mt-24 px-4 pb-16 md:px-8 md:pb-20">
        <ReviewSection reviews={catalogService.getReviews(product.id)} rating={product.rating} reviewCount={product.reviewCount} />
      </div>

      <div className="bg-hp-mist">
        <RelatedProducts products={catalogService.getRelated(product)} />
      </div>
      <GuaranteeBanner />
    </>);

}