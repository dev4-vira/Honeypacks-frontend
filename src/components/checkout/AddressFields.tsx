import React from 'react';
import { countries, usStates } from '../../data/checkout';
import { Address, CheckoutErrors } from '../../types/checkout';
import { fieldClass, fieldErrorClass } from '../../utils/formStyles';
import { FormField } from '../shared/FormField';

interface AddressFieldsProps {
  prefix: 'shipping' | 'billing';
  value: Address;
  errors: CheckoutErrors;
  onChange: (field: keyof Address, value: string) => void;
}

export function AddressFields({ prefix, value, errors, onChange }: AddressFieldsProps) {
  const id = (field: keyof Address) => `${prefix}.${field}`;
  const cls = (field: keyof Address) => `${fieldClass} ${errors[id(field)] ? fieldErrorClass : ''}`;
  const aria = (field: keyof Address) => ({
    'aria-invalid': Boolean(errors[id(field)]),
    'aria-describedby': errors[id(field)] ? `${id(field)}-error` : undefined
  });

  return (
    <div className="grid grid-cols-6 gap-3">
      <FormField label="Country / Region" htmlFor={id('country')} className="col-span-6">
        <select id={id('country')} value={value.country} onChange={(e) => onChange('country', e.target.value)} className={cls('country')} autoComplete="country-name">
          {countries.map((c) =>
          <option key={c}>{c}</option>
          )}
        </select>
      </FormField>
      <FormField label="First name" htmlFor={id('firstName')} error={errors[id('firstName')]} className="col-span-6 sm:col-span-3">
        <input id={id('firstName')} value={value.firstName} onChange={(e) => onChange('firstName', e.target.value)} className={cls('firstName')} autoComplete="given-name" {...aria('firstName')} />
      </FormField>
      <FormField label="Last name" htmlFor={id('lastName')} error={errors[id('lastName')]} className="col-span-6 sm:col-span-3">
        <input id={id('lastName')} value={value.lastName} onChange={(e) => onChange('lastName', e.target.value)} className={cls('lastName')} autoComplete="family-name" {...aria('lastName')} />
      </FormField>
      <FormField label="Address" htmlFor={id('address1')} error={errors[id('address1')]} className="col-span-6">
        <input id={id('address1')} value={value.address1} onChange={(e) => onChange('address1', e.target.value)} className={cls('address1')} autoComplete="address-line1" {...aria('address1')} />
      </FormField>
      <FormField label="Apartment, suite, etc. (optional)" htmlFor={id('address2')} className="col-span-6">
        <input id={id('address2')} value={value.address2} onChange={(e) => onChange('address2', e.target.value)} className={cls('address2')} autoComplete="address-line2" />
      </FormField>
      <FormField label="City" htmlFor={id('city')} error={errors[id('city')]} className="col-span-6 sm:col-span-2">
        <input id={id('city')} value={value.city} onChange={(e) => onChange('city', e.target.value)} className={cls('city')} autoComplete="address-level2" {...aria('city')} />
      </FormField>
      <FormField label="State" htmlFor={id('state')} error={errors[id('state')]} className="col-span-3 sm:col-span-2">
        <select id={id('state')} value={value.state} onChange={(e) => onChange('state', e.target.value)} className={cls('state')} autoComplete="address-level1" {...aria('state')}>
          <option value="">Select</option>
          {usStates.map((s) =>
          <option key={s} value={s}>
              {s}
            </option>
          )}
        </select>
      </FormField>
      <FormField label="ZIP code" htmlFor={id('zip')} error={errors[id('zip')]} className="col-span-3 sm:col-span-2">
        <input id={id('zip')} inputMode="numeric" value={value.zip} onChange={(e) => onChange('zip', e.target.value)} className={cls('zip')} autoComplete="postal-code" {...aria('zip')} />
      </FormField>
      <FormField label="Phone (optional)" htmlFor={id('phone')} className="col-span-6">
        <input id={id('phone')} type="tel" value={value.phone} onChange={(e) => onChange('phone', e.target.value)} className={cls('phone')} autoComplete="tel" />
      </FormField>
    </div>);

}