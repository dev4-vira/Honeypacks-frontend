import React, { useState } from 'react';
import { AffiliateApplicationModal } from '../components/affiliate/AffiliateApplicationModal';
import { ProductArt } from '../components/product/ProductArt';
import { FAQAccordion } from '../components/shared/FAQAccordion';
import { SectionHeading } from '../components/shared/SectionHeading';
import { affiliateBenefits, affiliateSteps } from '../data/affiliate';
import { affiliateFaqs } from '../data/faqs';
import { primaryButtonClass } from '../utils/formStyles';

export function Affiliate() {
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <>
      <section className="bg-hp-black text-white">
        <div className="mx-auto grid max-w-store items-center gap-10 px-4 py-16 md:px-8 lg:grid-cols-2 lg:py-24">
          <div>
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.98] tracking-wide md:text-7xl">
              Earn with <span className="text-hp-gold">HoneyPacks</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-neutral-300">
              Join the HoneyPacks creator program. Share the product your audience will love and earn commission on every qualifying sale.
            </p>
            <button type="button" onClick={() => setApplyOpen(true)} className={`${primaryButtonClass} mt-8 !px-10 !py-4 !text-lg`}>
              Apply to Create
            </button>
            <p className="mt-3 text-xs text-neutral-500">Commission rate pending confirmation.</p>
          </div>
          <div className="mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <ProductArt variant="honey-box" tone="dark" label="Black Thai Honey box" />
            </div>
            <div className="mt-10 aspect-[3/4] overflow-hidden rounded-lg">
              <ProductArt variant="pro-max" tone="dark" label="Black Thai Honey Pro Max box" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-store px-4 py-16 md:px-8 md:py-24">
        <SectionHeading title="Program benefits" />
        <ul className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {affiliateBenefits.map((b) =>
          <li key={b.title} className="border-l-2 border-hp-gold pl-5">
              <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{b.title}</h3>
              <p className="mt-1.5 text-[15px] text-neutral-600">{b.text}</p>
            </li>
          )}
        </ul>
      </section>

      <section className="bg-hp-yellow">
        <div className="mx-auto max-w-store px-4 py-16 md:px-8">
          <h2 className="font-display text-4xl font-bold uppercase tracking-wide">How it works</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {affiliateSteps.map((s, i) =>
            <li key={s.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hp-black font-display text-lg font-bold text-hp-yellow">{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{s.title}</h3>
                  <p className="mt-1 text-[15px]">{s.text}</p>
                </div>
              </li>
            )}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <SectionHeading title="Affiliate FAQ" className="mb-8" />
        <FAQAccordion items={affiliateFaqs} />
        <div className="mt-12 text-center">
          <button type="button" onClick={() => setApplyOpen(true)} className={`${primaryButtonClass} !px-10 !py-4 !text-lg`}>
            Apply to Create
          </button>
        </div>
      </section>

      <AffiliateApplicationModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </>);

}