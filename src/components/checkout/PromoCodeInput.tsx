import React, { useState } from 'react';
import { TagIcon, XIcon } from 'lucide-react';
import { PromoCode } from '../../types/checkout';
import { fieldClass, fieldErrorClass } from '../../utils/formStyles';

interface PromoCodeInputProps {
  applied: PromoCode | null;
  error: string;
  onApply: (code: string) => boolean;
  onRemove: () => void;
  onClearError: () => void;
}

export function PromoCodeInput({ applied, error, onApply, onRemove, onClearError }: PromoCodeInputProps) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onApply(code)) setCode('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-3" noValidate>
        <label htmlFor="promo-code" className="sr-only">
          Discount code
        </label>
        <input
          id="promo-code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            if (error) onClearError();
          }}
          placeholder="Discount code"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'promo-code-error' : undefined}
          className={`${fieldClass} ${error ? fieldErrorClass : ''}`} />
        
        <button
          type="submit"
          disabled={!code.trim()}
          className="shrink-0 rounded-md bg-hp-black px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-neutral-800 disabled:bg-neutral-300 disabled:text-neutral-500">
          
          Apply
        </button>
      </form>
      {error &&
      <p id="promo-code-error" className="mt-1.5 text-sm text-hp-red" role="alert">
          {error}
        </p>
      }
      {applied &&
      <span className="mt-3 inline-flex items-center gap-2 rounded-md bg-neutral-200 px-2.5 py-1.5 text-sm font-medium">
          <TagIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {applied.code}
          <button type="button" onClick={onRemove} aria-label={`Remove discount ${applied.code}`} className="rounded text-neutral-600 hover:text-hp-black">
            <XIcon className="h-3.5 w-3.5" />
          </button>
        </span>
      }
    </div>);

}