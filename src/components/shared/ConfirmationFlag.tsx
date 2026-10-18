import React from 'react';
import { AlertTriangleIcon } from 'lucide-react';

interface ConfirmationFlagProps {
  text?: string;
}

/** Marks copy that must be confirmed by the business before launch. */
export function ConfirmationFlag({ text = 'Requires business confirmation before launch' }: ConfirmationFlagProps) {
  return (
    <p className="inline-flex items-center gap-1.5 rounded-sm bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800">
      <AlertTriangleIcon className="h-3.5 w-3.5" aria-hidden="true" />
      {text}
    </p>);

}