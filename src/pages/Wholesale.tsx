import React from 'react';
import { MessageCircleIcon } from 'lucide-react';
import { ProductArt } from '../components/product/ProductArt';
import { ConfirmationFlag } from '../components/shared/ConfirmationFlag';
import { WholesaleForm } from '../components/wholesale/WholesaleForm';
import { whatsappLink } from '../data/site';
import { wholesaleBenefits, wholesaleTiers } from '../data/wholesale';

function WhatsAppButton({ className = '' }: {className?: string;}) {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3.5 font-display text-[15px] font-semibold uppercase tracking-wide text-hp-black transition-colors duration-150 hover:bg-[#1ebe5a] ${className}`}>
      
      <MessageCircleIcon className="h-5 w-5" aria-hidden="true" />
      Chat on WhatsApp
    </a>);

}

export function Wholesale() {
  return (
    <>
      <section className="bg-hp-black text-white">
        <div className="mx-auto grid max-w-store gap-10 px-4 py-14 md:px-8 lg:grid-cols-[1fr_520px] lg:items-center lg:py-20">
          <div>
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.98] tracking-wide md:text-7xl">
              Wholesale <span className="text-hp-yellow">Black Thai Honey</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-neutral-300">
              Stock the honey packs your customers already ask for. Competitive case pricing for retailers and distributors across the US.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#pricing-form" className="inline-flex items-center justify-center rounded-md bg-hp-yellow px-6 py-3.5 font-display text-[15px] font-semibold uppercase tracking-wide text-hp-black hover:bg-hp-yellow-hover">
                Get Pricing
              </a>
              <WhatsAppButton />
            </div>
            <div className="mt-10 hidden aspect-[16/9] max-w-md overflow-hidden rounded-md lg:block">
              <ProductArt variant="bundle" tone="dark" label="Wholesale cases" />
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 text-hp-black md:p-8">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide">Request wholesale pricing</h2>
            <p className="mb-5 mt-1 text-sm text-neutral-600">We&apos;ll reply within 1 business day.</p>
            <WholesaleForm idPrefix="hero" compact />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-store px-4 py-16 md:px-8 md:py-24">
        <h2 className="max-w-xl font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">Why retailers carry HoneyPacks</h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {wholesaleBenefits.map((b) =>
          <li key={b.title} className="border-t-2 border-hp-black pt-5">
              <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{b.title}</h3>
              <p className="mt-2 text-[15px] text-neutral-600">{b.text}</p>
            </li>
          )}
        </ul>
      </section>

      <section className="bg-hp-yellow">
        <div className="mx-auto max-w-store px-4 py-16 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-4xl font-bold uppercase tracking-wide">Volume tiers</h2>
            <ConfirmationFlag text="Tier pricing and margins pending business confirmation" />
          </div>
          <div className="mt-8 overflow-hidden rounded-lg bg-white">
            <table className="w-full text-left">
              <thead className="bg-hp-black text-white">
                <tr>
                  <th scope="col" className="px-5 py-3.5 font-display text-sm font-semibold uppercase tracking-wide">Tier</th>
                  <th scope="col" className="px-5 py-3.5 font-display text-sm font-semibold uppercase tracking-wide">Monthly volume</th>
                  <th scope="col" className="hidden px-5 py-3.5 font-display text-sm font-semibold uppercase tracking-wide sm:table-cell">What you get</th>
                  <th scope="col" className="px-5 py-3.5 text-right font-display text-sm font-semibold uppercase tracking-wide">Pricing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hp-line">
                {wholesaleTiers.map((t) =>
                <tr key={t.volume}>
                    <th scope="row" className="px-5 py-4 font-display text-lg font-semibold uppercase">{t.volume}</th>
                    <td className="px-5 py-4 text-[15px]">{t.cases}</td>
                    <td className="hidden px-5 py-4 text-[15px] text-neutral-600 sm:table-cell">{t.note}</td>
                    <td className="px-5 py-4 text-right">
                      <a href="#pricing-form" className="text-sm font-semibold underline underline-offset-2">
                        Request
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="pricing-form" className="scroll-mt-24 bg-hp-mist">
        <div className="mx-auto grid max-w-store gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">Open a wholesale account</h2>
            <p className="mt-4 max-w-md text-[17px] text-neutral-600">Tell us about your business and we&apos;ll send current case pricing, minimums and shipping details.</p>
            <p className="mt-6 text-sm font-medium">Prefer to talk?</p>
            <WhatsAppButton className="mt-2" />
          </div>
          <div className="rounded-lg border border-hp-line bg-white p-6 md:p-8">
            <WholesaleForm idPrefix="bottom" />
          </div>
        </div>
      </section>
    </>);

}