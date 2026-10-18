import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  hideLabel?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, error, hint, hideLabel = false, className = '', children }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={hideLabel ? 'sr-only' : 'mb-1.5 block text-sm font-medium text-hp-black'}>
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>}
      {error &&
      <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-hp-red" role="alert">
          {error}
        </p>
      }
    </div>);

}