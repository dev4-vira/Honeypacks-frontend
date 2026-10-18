import React from 'react';
import { ShieldCheckIcon } from 'lucide-react';
import { formatPrice } from '../../utils/currency';
import { SHIPPING_PROTECTION_FEE } from '../../utils/cartRules';

interface ShippingProtectionToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export function ShippingProtectionToggle({ checked, onChange }: ShippingProtectionToggleProps) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-hp-mist px-3.5 py-3">
      <ShieldCheckIcon className="h-6 w-6 shrink-0 text-hp-green" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold" id="protection-label">
          Shipping Protection <span className="font-normal text-neutral-600">· {formatPrice(SHIPPING_PROTECTION_FEE)}</span>
        </p>
        <p className="text-xs text-neutral-600">Coverage for lost, stolen or damaged packages.</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby="protection-label"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 ${checked ? 'bg-hp-green' : 'bg-neutral-300'}`}>
        
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-150 ease-out ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
      </button>
    </div>);

}