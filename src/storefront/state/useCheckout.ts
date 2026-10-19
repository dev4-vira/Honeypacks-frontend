import { useState } from 'react';
import { demoCoupons } from '../logic/commerce';
import { validateCheckout } from '../logic/checkout';
import type { CheckoutDraft } from '../logic/checkout';

// Personal/contact fields live only in memory. This hook has no transport or storage.
export function useCheckout() {
  const [draft, setDraft] = useState<CheckoutDraft>({
    deliveryCountry: 'United States',
    billingCountry: 'United States',
  });
  const [sameBilling, setSameBilling] = useState(true);
  const [payment, setPayment] = useState('card');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<CheckoutDraft>({});
  const [message, setMessage] = useState('');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  function validate(recurring: boolean) {
    const next = validateCheckout(draft, sameBilling, recurring, consent);
    setErrors(next);
    setMessage(
      Object.keys(next).length
        ? 'Check the highlighted fields. No order was placed.'
        : 'Demo complete: no order placed or payment taken. Your form was checked locally; no information was sent.',
    );
    return next;
  }
  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    const valid = demoCoupons.some((item) => item.code === code);
    if (valid) setAppliedCoupon(code);
    setCouponMessage(
      valid
        ? 'Demo promo code applied.'
        : 'Invalid promo code. No discount was applied.',
    );
  }
  const setValue = (name: string, value: string) => {
    setDraft((previous) => ({ ...previous, [name]: value }));
    setMessage('');
  };
  return {
    draft,
    setValue,
    sameBilling,
    setSameBilling,
    payment,
    setPayment,
    consent,
    setConsent,
    errors,
    message,
    setMessage,
    coupon,
    setCoupon,
    appliedCoupon,
    couponMessage,
    applyCoupon,
    validate,
  };
}
