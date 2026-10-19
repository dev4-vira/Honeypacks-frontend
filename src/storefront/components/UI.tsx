import { useId, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Minus, Plus, Star, Check, ChevronDown } from 'lucide-react';
import { Modal } from './Modal';
export { Modal };

export function Stars({ empty = false }: { empty?: boolean }) {
  return (
    <span
      className="p1-stars"
      aria-label={empty ? 'No rating' : 'Archived five-star display'}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={18}
          fill={empty ? 'none' : 'currentColor'}
          strokeWidth={empty ? 1.5 : 0}
        />
      ))}
    </span>
  );
}
export function Quantity({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="p1-qty" role="group" aria-label="Quantity">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={14} />
      </button>
      <output>{value}</output>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= 20}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
export function ArchivedNote({ children }: { children?: ReactNode }) {
  return (
    <p className="p1-archive-note">
      {children ??
        'Archived storefront copy · October 15, 2026. Commercial claims and ratings are reproduced as reference, not independently verified.'}
    </p>
  );
}
export function CheckList({ children }: { children: string[] }) {
  return (
    <ul className="p1-check-list">
      {children.map((text) => (
        <li key={text}>
          <Check size={16} />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}
export function Accordion({
  title,
  children,
  open,
}: {
  title: string;
  children: ReactNode;
  open?: boolean;
}) {
  return (
    <details className="p1-accordion" open={open}>
      <summary>
        {title}
        <ChevronDown size={18} />
      </summary>
      <div>{children}</div>
    </details>
  );
}
export function DemoNotice({ message }: { message: string }) {
  return (
    <p className="p1-demo-notice" role="status">
      {message}
    </p>
  );
}

export type FormField = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: string[];
  wide?: boolean;
  placeholder?: string;
};
export function DemoForm({
  fields,
  submit = 'Send',
  success = 'Demo complete. No information was sent or saved.',
  children,
  className = '',
}: {
  fields: FormField[];
  submit?: string;
  success?: string;
  children?: ReactNode;
  className?: string;
}) {
  const id = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = String(data.get(field.name) ?? '').trim();
      if (field.required !== false && !value)
        next[field.name] = `${field.label} is required.`;
      else if (
        field.type === 'email' &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      )
        next[field.name] = 'Enter a valid email address.';
    }
    setErrors(next);
    setDone(!Object.keys(next).length);
    if (Object.keys(next).length)
      (
        form.elements.namedItem(Object.keys(next)[0]) as HTMLElement | null
      )?.focus();
  }
  return (
    <form
      className={`p1-demo-form ${className}`}
      onSubmit={handleSubmit}
      onChange={() => setDone(false)}
      noValidate
    >
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="p1-form-error">
          Please check the highlighted fields.
        </p>
      )}
      <div className="p1-form-grid">
        {fields.map((field) => (
          <label
            key={field.name}
            className={field.wide ? 'p1-field-wide' : ''}
            htmlFor={`${id}-${field.name}`}
          >
            <span>
              {field.label}
              {field.required !== false && <b aria-hidden="true"> *</b>}
            </span>
            {field.options ? (
              <select
                id={`${id}-${field.name}`}
                name={field.name}
                defaultValue=""
                required={field.required !== false}
                aria-invalid={!!errors[field.name]}
                aria-describedby={
                  errors[field.name] ? `${id}-${field.name}-error` : undefined
                }
              >
                <option value="">Select {field.label.toLowerCase()}</option>
                {field.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={`${id}-${field.name}`}
                name={field.name}
                required={field.required !== false}
                aria-invalid={!!errors[field.name]}
                aria-describedby={
                  errors[field.name] ? `${id}-${field.name}-error` : undefined
                }
                rows={6}
              />
            ) : (
              <input
                id={`${id}-${field.name}`}
                name={field.name}
                type={field.type ?? 'text'}
                required={field.required !== false}
                placeholder={field.placeholder}
                autoComplete="off"
                aria-invalid={!!errors[field.name]}
                aria-describedby={
                  errors[field.name] ? `${id}-${field.name}-error` : undefined
                }
              />
            )}
            {errors[field.name] && (
              <small id={`${id}-${field.name}-error`} className="p1-form-error">
                {errors[field.name]}
              </small>
            )}
          </label>
        ))}
      </div>
      {children}
      <button className="p1-btn p1-btn-black" type="submit">
        {submit}
      </button>
      {done && <DemoNotice message={success} />}
      <p className="p1-form-caption">
        Local demo only. Use sample details; nothing is sent or stored.
      </p>
    </form>
  );
}
