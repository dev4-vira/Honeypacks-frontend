import React from 'react';
import { homeBenefits } from '../../data/site';
import { BenefitIconGlyph } from '../shared/BenefitIconGlyph';
import { SectionHeading } from '../shared/SectionHeading';

export function BenefitsSection() {
  return (
    <section className="bg-hp-black py-16 text-white md:py-24">
      <div className="mx-auto max-w-store px-4 md:px-8">
        <SectionHeading title="Why HoneyPacks" subtitle="Everything you love about honey, in a format built for real life." tone="dark" />
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {homeBenefits.map((b) =>
          <li key={b.title} className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-hp-gold text-hp-gold">
                <BenefitIconGlyph icon={b.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide">{b.title}</h3>
              <p className="mx-auto mt-2 max-w-[260px] text-[15px] leading-relaxed text-neutral-400">{b.description}</p>
            </li>
          )}
        </ul>
      </div>
    </section>);

}