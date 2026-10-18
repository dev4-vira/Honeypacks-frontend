import React from 'react';
import { Link } from 'react-router-dom';
import { primaryButtonClass } from '../utils/formStyles';

export function NotFound() {
  return (
    <section className="bg-hp-black px-4 py-24 text-center text-white md:py-32">
      <p className="font-display text-[120px] font-bold leading-none text-hp-gold md:text-[180px]">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-neutral-400">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/" className={primaryButtonClass}>
          Back to Home
        </Link>
        <Link to="/products" className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3.5 font-display text-[15px] font-semibold uppercase tracking-wide hover:border-white">
          Shop All Products
        </Link>
      </div>
    </section>);

}