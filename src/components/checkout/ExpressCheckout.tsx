import React from 'react';

interface ExpressCheckoutProps {
  onSelect: (method: string) => void;
}

/** Non-functional Apple Pay / Google Pay buttons. */
export function ExpressCheckout({ onSelect }: ExpressCheckoutProps) {
  return (
    <section aria-labelledby="express-heading">
      <h2 id="express-heading" className="text-center text-sm text-neutral-600">
        Express checkout
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onSelect('Apple Pay')}
          className="flex h-12 items-center justify-center gap-1 rounded-md bg-black text-lg font-semibold text-white transition-opacity duration-150 hover:opacity-90">
          
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.5-1-2.5-4Zm-2.4-7.2c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4Z" />
          </svg>
          Pay
        </button>
        <button
          type="button"
          onClick={() => onSelect('Google Pay')}
          className="flex h-12 items-center justify-center gap-1.5 rounded-md border border-neutral-300 bg-white text-lg font-medium text-neutral-800 transition-colors duration-150 hover:bg-hp-mist">
          
          <span className="font-bold">
            <span className="text-[#4285F4]">G</span>
          </span>
          Pay
        </button>
      </div>
      <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-wider text-neutral-500">
        <span className="h-px flex-1 bg-hp-line" />
        or
        <span className="h-px flex-1 bg-hp-line" />
      </div>
    </section>);

}