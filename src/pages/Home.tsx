import React from 'react';
import { Link } from 'react-router-dom';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { BundlePromo } from '../components/home/BundlePromo';
import { HomeHero } from '../components/home/HomeHero';
import { SubscribePromo } from '../components/home/SubscribePromo';
import { DiscountPopup } from '../components/layout/DiscountPopup';
import { ProductGrid } from '../components/product/ProductGrid';
import { FAQAccordion } from '../components/shared/FAQAccordion';
import { GuaranteeBanner } from '../components/shared/GuaranteeBanner';
import { ReviewSection } from '../components/shared/ReviewSection';
import { SectionHeading } from '../components/shared/SectionHeading';
import { generalFaqs } from '../data/faqs';
import { bestSellerIds } from '../data/products';
import { catalogService } from '../utils/catalogService';

export function Home() {
  return (
    <>
      <HomeHero />

      <section className="mx-auto max-w-store px-4 py-16 md:px-8 md:py-24">
        <div className="mb-10 flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <SectionHeading title="Best Sellers" subtitle="Our most-loved packs, ready to ship." align="left" className="md:mx-0" />
          <Link to="/products" className="shrink-0 font-display text-[15px] font-semibold uppercase tracking-wide underline underline-offset-4 hover:text-hp-gold">
            Shop all products
          </Link>
        </div>
        <ProductGrid products={catalogService.getByIds(bestSellerIds)} />
      </section>

      <BundlePromo />
      <BenefitsSection />
      <SubscribePromo />

      <section className="border-t border-hp-line">
        <div className="mx-auto max-w-store px-4 py-16 md:px-8 md:py-24">
          <ReviewSection reviews={catalogService.getReviews().slice(0, 5)} rating={4.8} reviewCount={2318} title="What customers say" />
        </div>
      </section>

      <section className="bg-hp-black py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading title="Frequently Asked Questions" tone="dark" className="mb-10" />
          <FAQAccordion items={generalFaqs} tone="dark" />
        </div>
      </section>

      <GuaranteeBanner />
      <DiscountPopup />
    </>);

}