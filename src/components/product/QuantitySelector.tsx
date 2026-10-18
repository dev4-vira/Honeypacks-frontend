import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  label?: string;
}

export function QuantitySelector({ value, onChange, min = 1, max = 99, size = 'md', label = 'Quantity' }: QuantitySelectorProps) {
  const btn = size === 'sm' ? 'h-8 w-8' : 'h-12 w-11';
  return (
    <div className="inline-flex items-center rounded-md border border-hp-line bg-white" role="group" aria-label={label}>
      <button
        type="button"
        className={`${btn} flex items-center justify-center text-hp-black transition-colors duration-150 hover:bg-hp-mist disabled:opacity-30`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity">
        
        <MinusIcon className="h-3.5 w-3.5" />
      </button>
      <span className={`${size === 'sm' ? 'w-7 text-sm' : 'w-9 text-base'} text-center font-semibold tabular-nums`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={`${btn} flex items-center justify-center text-hp-black transition-colors duration-150 hover:bg-hp-mist disabled:opacity-30`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity">
        
        <PlusIcon className="h-3.5 w-3.5" />
      </button>
    </div>);

}