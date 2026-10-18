import React from 'react';
import { Link } from 'react-router-dom';
import { heroHighlights } from '../../data/site';
import { primaryButtonClass } from '../../utils/formStyles';
import { ProductArt } from '../product/ProductArt';
import { StarRating } from '../product/StarRating';
import { BenefitIconGlyph } from '../shared/BenefitIconGlyph';

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-hp-black text-white">
      <div className="mx-auto grid max-w-store items-center gap-6 px-4 pb-14 pt-10 md:px-8 lg:min-h-[620px] lg:grid-cols-[1.05fr_1fr] lg:py-16">
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-2 text-sm">
            <StarRating rating={4.8} size={16} />
            <span className="text-neutral-300">Rated 4.8 by 2,000+ customers</span>
          </div>
          <h1 className="mt-4 font-display text-[52px] font-bold uppercase leading-[0.95] tracking-wide sm:text-7xl lg:text-[88px]">
            The original
            <br />
            <span className="text-hp-gold">Black Thai</span> Honey
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-neutral-300">
            Rich, dark honey blended with traditional botanicals — packed in single-serve packs you can take anywhere.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/products/black-thai-honey-10-pack" className={`${primaryButtonClass} !px-10 !py-4 !text-lg`}>
              Shop Now
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-8 py-4 font-display text-lg font-semibold uppercase tracking-wide text-white transition-colors duration-150 hover:border-white">
              
              All Products
            </Link>
          </div>
          <ul className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {heroHighlights.map((h) =>
            <li key={h.label} className="flex flex-col gap-2 text-sm text-neutral-300 sm:flex-row sm:items-center">
                <BenefitIconGlyph icon={h.icon} className="h-5 w-5 shrink-0 text-hp-gold" />
                {h.label}
              </li>
            )}
          </ul>
        </div>
        <div className="order-1 mx-auto aspect-square w-full max-w-[560px] lg:order-2">
          <ProductArt variant="honey-pack" tone="none" label="Black Thai Honey single-serve packs" />
        </div>
      </div>
    </section>);

}