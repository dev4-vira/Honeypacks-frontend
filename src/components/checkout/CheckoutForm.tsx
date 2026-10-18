import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from 'lucide-react';
import { Address, CheckoutErrors, CheckoutFormState } from '../../types/checkout';
import { fieldClass, fieldErrorClass, primaryButtonClass } from '../../utils/formStyles';
import { FormField } from '../shared/FormField';
import { AddressFields } from './AddressFields';
import { BillingAddressForm } from './BillingAddressForm';
import { ExpressCheckout } from './ExpressCheckout';
import { PaymentPlaceholder } from './PaymentPlaceholder';
import { ShippingMethodSelector } from './ShippingMethodSelector';

interface CheckoutFormProps {
  form: CheckoutFormState;
  errors: CheckoutErrors;
  onEmailChange: (value: string) => void;
  onMarketingChange: (value: boolean) => void;
  onAddressChange: (which: 'shipping' | 'billing', field: keyof Address, value: string) => void;
  onShippingMethodChange: (id: string) => void;
  onBillingSameChange: (value: boolean) => void;
  onExpressSelect: (method: string) => void;
  onSubmit: () => void;
}

export function CheckoutForm(props: CheckoutFormProps) {
  const { form, errors } = props;
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }}
      className="space-y-9">
      
      <ExpressCheckout onSelect={props.onExpressSelect} />

      <section aria-labelledby="contact-heading">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 id="contact-heading" className="text-xl font-semibold">
            Contact
          </h2>
          <Link to="/account/login" className="text-sm text-neutral-700 underline underline-offset-2">
            Log in
          </Link>
        </div>
        <FormField label="Email" htmlFor="email" error={errors.email} hideLabel>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => props.onEmailChange(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`${fieldClass} ${errors.email ? fieldErrorClass : ''}`} />
          
        </FormField>
        <label className="mt-3 flex cursor-pointer items-center gap-2.5 text-sm">
          <input type="checkbox" className="h-4 w-4 accent-hp-black" checked={form.marketingOptIn} onChange={(e) => props.onMarketingChange(e.target.checked)} />
          Email me with news and offers
        </label>
      </section>

      <section aria-labelledby="delivery-heading">
        <h2 id="delivery-heading" className="mb-3 text-xl font-semibold">
          Delivery
        </h2>
        <AddressFields prefix="shipping" value={form.shipping} errors={errors} onChange={(f, v) => props.onAddressChange('shipping', f, v)} />
      </section>

      <section aria-labelledby="shipping-heading">
        <h2 id="shipping-heading" className="mb-3 text-xl font-semibold">
          Shipping method
        </h2>
        <ShippingMethodSelector value={form.shippingMethodId} onChange={props.onShippingMethodChange} />
      </section>

      <section aria-labelledby="payment-heading">
        <h2 id="payment-heading" className="mb-1 text-xl font-semibold">
          Payment
        </h2>
        <PaymentPlaceholder />
      </section>

      <section aria-labelledby="billing-heading">
        <h2 id="billing-heading" className="mb-3 text-xl font-semibold">
          Billing address
        </h2>
        <BillingAddressForm
          sameAsShipping={form.billingSameAsShipping}
          onSameChange={props.onBillingSameChange}
          value={form.billing}
          errors={errors}
          onChange={(f, v) => props.onAddressChange('billing', f, v)} />
        
      </section>

      <div>
        <button type="submit" className={`${primaryButtonClass} w-full !py-4 !text-lg`}>
          Review Order (Demo)
        </button>
        <p className="mt-3 text-center text-xs text-neutral-500">Prototype checkout — no payment will be processed and no order will be placed.</p>
        <Link to="/products" className="mt-6 inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-hp-black">
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" /> Return to shop
        </Link>
      </div>
    </form>);

}