import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { fieldClass } from '../../utils/formStyles';

/** Visual-only payment section. Inputs are disabled: no card data is collected. */
export function PaymentPlaceholder() {
  return (
    <div>
      <p className="mb-3 flex items-center gap-1.5 text-xs text-neutral-500">
        <LockIcon className="h-3.5 w-3.5" aria-hidden="true" /> All transactions are secure and encrypted.
      </p>
      <div className="overflow-hidden rounded-md border border-hp-line">
        <div className="flex items-center justify-between bg-[#fffbea] px-4 py-3.5 ring-1 ring-inset ring-hp-black">
          <span className="flex items-center gap-3 text-sm font-medium">
            <span className="flex h-4 w-4 items-center justify-center rounded-full border-[5px] border-hp-black" aria-hidden="true" />
            Credit card
          </span>
          <span className="flex items-center gap-1.5" aria-hidden="true">
            {['VISA', 'MC', 'AMEX'].map((b) =>
            <span key={b} className="rounded-sm border border-hp-line bg-white px-1.5 py-0.5 text-[10px] font-bold text-neutral-700">
                {b}
              </span>
            )}
          </span>
        </div>
        <div className="space-y-3 bg-hp-mist p-4">
          <div className="relative">
            <label htmlFor="card-number" className="sr-only">
              Card number (disabled in prototype)
            </label>
            <input id="card-number" disabled placeholder="Card number" className={`${fieldClass} pr-10`} />
            <CreditCardIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label htmlFor="card-exp" className="sr-only">
              Expiration date (disabled)
            </label>
            <input id="card-exp" disabled placeholder="Expiration date (MM / YY)" className={fieldClass} />
            <label htmlFor="card-cvc" className="sr-only">
              Security code (disabled)
            </label>
            <input id="card-cvc" disabled placeholder="Security code" className={fieldClass} />
          </div>
          <label htmlFor="card-name" className="sr-only">
            Name on card (disabled)
          </label>
          <input id="card-name" disabled placeholder="Name on card" className={fieldClass} />
          <p className="text-xs font-medium text-amber-800">Payment fields are disabled in this prototype. No card details are collected.</p>
        </div>
      </div>
    </div>);

}