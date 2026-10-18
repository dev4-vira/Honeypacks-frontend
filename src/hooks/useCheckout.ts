import { useMemo, useState } from 'react';
import { shippingMethods } from '../data/checkout';
import { Address, CheckoutErrors, CheckoutFormState, PromoCode } from '../types/checkout';
import { calculateCheckoutTotals, validateCheckout, validatePromoCode } from '../utils/checkoutService';

const emptyAddress: Address = {
  country: 'United States',
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  phone: ''
};

export function useCheckout(subtotal: number, protectionFee: number) {
  const [form, setForm] = useState<CheckoutFormState>({
    email: '',
    marketingOptIn: false,
    shipping: emptyAddress,
    shippingMethodId: shippingMethods[0].id,
    billingSameAsShipping: true,
    billing: emptyAddress
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [promo, setPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');
  const [noticeOpen, setNoticeOpen] = useState(false);

  const clearError = (key: string) =>
  setErrors((prev) => {
    if (!prev[key]) return prev;
    const next = { ...prev };
    delete next[key];
    return next;
  });

  const setEmail = (email: string) => {
    setForm((f) => ({ ...f, email }));
    clearError('email');
  };

  const setMarketingOptIn = (marketingOptIn: boolean) => setForm((f) => ({ ...f, marketingOptIn }));

  const updateAddress = (which: 'shipping' | 'billing', field: keyof Address, value: string) => {
    setForm((f) => ({ ...f, [which]: { ...f[which], [field]: value } }));
    clearError(`${which}.${field}`);
  };

  const setShippingMethod = (shippingMethodId: string) => setForm((f) => ({ ...f, shippingMethodId }));
  const setBillingSame = (billingSameAsShipping: boolean) => setForm((f) => ({ ...f, billingSameAsShipping }));

  const applyPromo = (code: string) => {
    const result = validatePromoCode(code);
    if (result.ok) {
      setPromo(result.promo);
      setPromoError('');
      return true;
    }
    setPromo(null);
    setPromoError(result.error);
    return false;
  };

  const removePromo = () => setPromo(null);

  const totals = useMemo(
    () => calculateCheckoutTotals(subtotal, protectionFee, form.shippingMethodId, promo),
    [subtotal, protectionFee, form.shippingMethodId, promo]
  );

  const submit = () => {
    const nextErrors = validateCheckout(form);
    setErrors(nextErrors);
    const firstKey = Object.keys(nextErrors)[0];
    if (firstKey) {
      document.getElementById(firstKey)?.focus();
      return;
    }
    setNoticeOpen(true);
  };

  return {
    form,
    errors,
    promo,
    promoError,
    totals,
    noticeOpen,
    setNoticeOpen,
    setEmail,
    setMarketingOptIn,
    updateAddress,
    setShippingMethod,
    setBillingSame,
    applyPromo,
    removePromo,
    clearPromoError: () => setPromoError(''),
    submit
  };
}