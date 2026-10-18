import React, { useEffect, useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { primaryButtonClass } from '../../utils/formStyles';

interface AddToCartButtonProps {
  onAdd: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export function AddToCartButton({ onAdd, label = 'Add to Cart', disabled, className = '', size = 'md' }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(t);
  }, [added]);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        onAdd();
        setAdded(true);
      }}
      className={`${primaryButtonClass} ${size === 'sm' ? '!py-2.5 !text-sm' : ''} whitespace-nowrap ${className}`}>
      
      {disabled ?
      'Out of Stock' :
      added ?
      <>
          <CheckIcon className="h-4 w-4" aria-hidden="true" /> Added
        </> :

      label
      }
    </button>);

}