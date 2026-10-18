import { promoCodes, shippingMethods } from '../data/checkout';
import { Address, CheckoutErrors, CheckoutFormState, CheckoutTotals, PromoCode } from '../types/checkout';
import { round } from './cartRules';
import { isValidEmail } from './validation';

/**
 * Checkout logic, isolated from UI. Replace with Django REST calls
 * (e.g. POST /api/checkout/validate-promo/, POST /api/orders/) when the backend is ready.
 * This prototype never processes payments or creates orders.
 */
export function validatePromoCode(input: string): {ok: true;promo: PromoCode;} | {ok: false;error: string;} {
  const code = input.trim().toUpperCase();
  if (!code) return { ok: false, error: 'Enter a discount code.' };
  const promo = promoCodes.find((p) => p.code === code);
  if (!promo) return { ok: false, error: 'Enter a valid discount code.' };
  return { ok: true, promo };
}

export function calculateDiscount(subtotal: number, promo: PromoCode | null): number {
  if (!promo) return 0;
  const raw = promo.type === 'percent' ? subtotal * promo.value / 100 : promo.value;
  return round(Math.min(raw, subtotal));
}

export function calculateCheckoutTotals(
subtotal: number,
protectionFee: number,
shippingMethodId: string,
promo: PromoCode | null)
: CheckoutTotals {
  const shipping = shippingMethods.find((m) => m.id === shippingMethodId)?.price ?? 0;
  const discount = calculateDiscount(subtotal, promo);
  return {
    subtotal,
    protectionFee,
    shipping,
    discount,
    total: round(subtotal - discount + protectionFee + shipping)
  };
}

function validateAddress(address: Address, prefix: string, errors: CheckoutErrors) {
  const required: (keyof Address)[] = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip'];
  const labels: Record<string, string> = {
    firstName: 'Enter a first name',
    lastName: 'Enter a last name',
    address1: 'Enter an address',
    city: 'Enter a city',
    state: 'Select a state',
    zip: 'Enter a ZIP code'
  };
  required.forEach((field) => {
    if (!address[field].trim()) errors[`${prefix}.${field}`] = labels[field];
  });
  if (address.zip.trim() && !/^\d{5}(-\d{4})?$/.test(address.zip.trim())) {
    errors[`${prefix}.zip`] = 'Enter a valid ZIP code';
  }
}

export function validateCheckout(form: CheckoutFormState): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (!isValidEmail(form.email)) errors.email = 'Enter a valid email';
  validateAddress(form.shipping, 'shipping', errors);
  if (!form.billingSameAsShipping) validateAddress(form.billing, 'billing', errors);
  return errors;
}