import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { subscriptionPerks } from '../../data/site';
import { primaryButtonClass } from '../../utils/formStyles';
import { ProductArt } from '../product/ProductArt';

export function SubscribePromo() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-store items-center gap-10 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <ProductArt variant="honey-box" tone="dark" label="Black Thai Honey 10 Pack box" />
          <div className="absolute right-4 top-4 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-hp-yellow text-center font-display uppercase leading-none text-hp-black">
            <span className="text-3xl font-bold">23%</span>
            <span className="text-sm font-semibold">off</span>
          </div>
        </div>
        <div>
          <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide md:text-5xl">
            Subscribe &amp; save.
            <br />
            <span className="text-hp-gold">Never run out.</span>
          </h2>
          <p className="mt-4 max-w-md text-[17px] text-neutral-600">
            Get Black Thai Honey 10 Pack for <strong className="text-hp-black">$50</strong> instead of $65, delivered every 4 weeks.
          </p>
          <ul className="mt-6 space-y-3">
            {subscriptionPerks.map((perk) =>
            <li key={perk} className="flex items-center gap-3 text-[15px]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hp-black">
                  <CheckIcon className="h-3.5 w-3.5 text-hp-yellow" strokeWidth={3} aria-hidden="true" />
                </span>
                {perk}
              </li>
            )}
          </ul>
          <Link to="/products/black-thai-honey-10-pack" className={`${primaryButtonClass} mt-8 !px-10 !py-4 !text-lg`}>
            Start My Subscription
          </Link>
        </div>
      </div>
    </section>);

}