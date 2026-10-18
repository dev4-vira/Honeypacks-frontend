import React, { useState } from 'react';
import { businessTypes, orderVolumes } from '../../data/wholesale';
import { fieldClass, fieldErrorClass, primaryButtonClass } from '../../utils/formStyles';
import { isValidEmail } from '../../utils/validation';
import { DemoNoticeModal } from '../shared/DemoNoticeModal';
import { FormField } from '../shared/FormField';

interface WholesaleFormProps {
  idPrefix: string;
  tone?: 'light' | 'dark';
  compact?: boolean;
}

type Fields = 'name' | 'storeName' | 'businessType' | 'email' | 'phone' | 'address' | 'volume';

const empty: Record<Fields, string> = { name: '', storeName: '', businessType: '', email: '', phone: '', address: '', volume: '' };

export function WholesaleForm({ idPrefix, tone = 'light', compact = false }: WholesaleFormProps) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [done, setDone] = useState(false);

  const set = (key: Fields, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Fields, string>> = {};
    if (!values.name.trim()) next.name = 'Enter your name';
    if (!values.storeName.trim()) next.storeName = 'Enter your store name';
    if (!values.businessType) next.businessType = 'Select a business type';
    if (!isValidEmail(values.email)) next.email = 'Enter a valid email';
    if (!values.phone.trim()) next.phone = 'Enter a phone number';
    if (!values.volume) next.volume = 'Select an expected volume';
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setDone(true);
      setValues(empty);
    }
  };

  const id = (k: Fields) => `${idPrefix}-${k}`;
  const cls = (k: Fields) => `${fieldClass} ${errors[k] ? fieldErrorClass : ''}`;
  const labelTone = tone === 'dark' ? '[&_label]:text-white' : '';

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className={`grid gap-3 sm:grid-cols-2 ${labelTone}`}>
        <FormField label="Name" htmlFor={id('name')} error={errors.name}>
          <input id={id('name')} value={values.name} onChange={(e) => set('name', e.target.value)} className={cls('name')} autoComplete="name" aria-invalid={Boolean(errors.name)} />
        </FormField>
        <FormField label="Store name" htmlFor={id('storeName')} error={errors.storeName}>
          <input id={id('storeName')} value={values.storeName} onChange={(e) => set('storeName', e.target.value)} className={cls('storeName')} autoComplete="organization" aria-invalid={Boolean(errors.storeName)} />
        </FormField>
        <FormField label="Business type" htmlFor={id('businessType')} error={errors.businessType}>
          <select id={id('businessType')} value={values.businessType} onChange={(e) => set('businessType', e.target.value)} className={cls('businessType')} aria-invalid={Boolean(errors.businessType)}>
            <option value="">Select…</option>
            {businessTypes.map((t) =>
            <option key={t}>{t}</option>
            )}
          </select>
        </FormField>
        <FormField label="Email" htmlFor={id('email')} error={errors.email}>
          <input id={id('email')} type="email" value={values.email} onChange={(e) => set('email', e.target.value)} className={cls('email')} autoComplete="email" aria-invalid={Boolean(errors.email)} />
        </FormField>
        <FormField label="Phone" htmlFor={id('phone')} error={errors.phone}>
          <input id={id('phone')} type="tel" value={values.phone} onChange={(e) => set('phone', e.target.value)} className={cls('phone')} autoComplete="tel" aria-invalid={Boolean(errors.phone)} />
        </FormField>
        <FormField label="Expected order volume" htmlFor={id('volume')} error={errors.volume}>
          <select id={id('volume')} value={values.volume} onChange={(e) => set('volume', e.target.value)} className={cls('volume')} aria-invalid={Boolean(errors.volume)}>
            <option value="">Select…</option>
            {orderVolumes.map((v) =>
            <option key={v}>{v}</option>
            )}
          </select>
        </FormField>
        {!compact &&
        <FormField label="Business address" htmlFor={id('address')} className="sm:col-span-2">
            <input id={id('address')} value={values.address} onChange={(e) => set('address', e.target.value)} className={cls('address')} autoComplete="street-address" />
          </FormField>
        }
        <button type="submit" className={`${primaryButtonClass} mt-2 sm:col-span-2`}>
          Request Wholesale Pricing
        </button>
      </form>
      <DemoNoticeModal
        open={done}
        onClose={() => setDone(false)}
        title="Request received (demo)"
        message="This is a prototype. Your wholesale request was validated locally but was not sent to HoneyPacks." />
      
    </>);

}