import React from 'react';
import { shippingMethods } from '../../data/checkout';
import { formatPrice } from '../../utils/currency';

interface ShippingMethodSelectorProps {
  value: string;
  onChange: (id: string) => void;
}

export function ShippingMethodSelector({ value, onChange }: ShippingMethodSelectorProps) {
  return (
    <fieldset>
      <legend className="sr-only">Shipping method</legend>
      <div className="overflow-hidden rounded-md border border-hp-line">
        {shippingMethods.map((method, i) => {
          const selected = method.id === value;
          return (
            <label
              key={method.id}
              className={`flex cursor-pointer items-center gap-3 px-4 py-4 transition-colors duration-150 ${i > 0 ? 'border-t border-hp-line' : ''} ${
              selected ? 'bg-[#fffbea] ring-1 ring-inset ring-hp-black' : 'hover:bg-hp-mist'}`
              }>
              
              <input type="radio" name="shipping-method" className="h-4 w-4 accent-hp-black" checked={selected} onChange={() => onChange(method.id)} />
              <span className="flex-1">
                <span className="block text-sm font-medium">{method.label}</span>
                <span className="block text-xs text-neutral-500">{method.description}</span>
              </span>
              <span className="text-sm font-semibold tabular-nums">{formatPrice(method.price)}</span>
            </label>);

        })}
      </div>
    </fieldset>);

}