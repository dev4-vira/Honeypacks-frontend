import React from 'react';
import { Link } from 'react-router-dom';
import { PackageIcon, RotateCcwIcon, TruckIcon } from 'lucide-react';

const points = [
{ icon: RotateCcwIcon, title: '30-Day Returns', text: 'New, unopened products can be returned within 30 days.' },
{ icon: TruckIcon, title: 'Fast US Shipping', text: 'Orders ship within 1–2 business days.' },
{ icon: PackageIcon, title: 'Discreet Packaging', text: 'Plain outer box. Nothing on it but your address.' }];


export function GuaranteeBanner() {
  return (
    <section aria-label="Our guarantee" className="border-y border-hp-line bg-hp-mist">
      <div className="mx-auto grid max-w-store gap-8 px-4 py-10 md:grid-cols-3 md:px-8">
        {points.map(({ icon: Icon, title, text }) =>
        <div key={title} className="flex items-start gap-4">
            <Icon className="mt-0.5 h-7 w-7 shrink-0 text-hp-gold" aria-hidden="true" />
            <div>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide">{title}</h3>
              <p className="mt-1 text-sm text-neutral-600">
                {text}{' '}
                {title === '30-Day Returns' &&
              <Link to="/returns-refunds" className="font-medium text-hp-black underline underline-offset-2">
                    Learn more
                  </Link>
              }
              </p>
            </div>
          </div>
        )}
      </div>
    </section>);

}