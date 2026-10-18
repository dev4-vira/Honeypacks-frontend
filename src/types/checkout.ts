export interface Address {
  country: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export interface ShippingMethod {
  id: string;
  label: string;
  description: string;
  price: number;
}

export interface PromoCode {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  description: string;
}

export interface CheckoutFormState {
  email: string;
  marketingOptIn: boolean;
  shipping: Address;
  shippingMethodId: string;
  billingSameAsShipping: boolean;
  billing: Address;
}

export type CheckoutErrors = Record<string, string>;

export interface CheckoutTotals {
  subtotal: number;
  protectionFee: number;
  shipping: number;
  discount: number;
  total: number;
}