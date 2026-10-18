import React from 'react';
import { Link } from 'react-router-dom';
import { GiftIcon } from 'lucide-react';
import { darkButtonClass } from '../../utils/formStyles';
import { ProductArt } from '../product/ProductArt';

export function BundlePromo() {
  return (
    <section className="bg-hp-yellow">
      <div className="mx-auto grid max-w-store items-center gap-8 px-4 py-14 md:px-8 lg:grid-cols-[1fr_1.1fr_auto] lg:gap-12">
        <div className="text-hp-black">
          <p className="flex items-center gap-2 font-display text-lg font-semibold uppercase tracking-wide">
            <GiftIcon className="h-5 w-5" aria-hidden="true" /> Free gift offer
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase leading-[1.02] tracking-wide md:text-5xl">Buy 2 boxes, get a free shaker</h2>
          <p className="mt-3 max-w-md text-[17px]">Add two Black Thai Honey 10 Packs to your cart and we&apos;ll include a HoneyPacks shaker on us.</p>
        </div>
        <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3">
          <div className="aspect-square overflow-hidden rounded-md">
            <ProductArt variant="honey-box" tone="dark" label="Black Thai Honey 10 Pack" showTag={false} />
          </div>
          <div className="aspect-square overflow-hidden rounded-md">
            <ProductArt variant="shaker-white" tone="dark" label="Free white shaker" />
          </div>
        </div>
        <Link to="/products/black-thai-honey-10-pack" className={`${darkButtonClass} !px-10 !py-4 !text-lg`}>
          Claim Offer
        </Link>
      </div>
    </section>);

}