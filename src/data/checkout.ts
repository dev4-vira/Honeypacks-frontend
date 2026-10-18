import { PromoCode, ShippingMethod } from '../types/checkout';

/** Illustrative values observed in the Oct 15, 2026 checkout session. */
export const shippingMethods: ShippingMethod[] = [
{ id: 'usps-ground', label: 'USPS Ground Advantage', description: '3–5 business days', price: 5 },
{ id: 'expedited', label: 'Expedited Shipping', description: '1–2 business days', price: 11.67 }];


/** Demo-only codes. Nothing here maps to a real store promotion. */
export const promoCodes: PromoCode[] = [
{ code: 'DEMO10', type: 'percent', value: 10, description: '10% off (prototype demo code)' }];


export const countries = ['United States'];

export const usStates = [
'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC',
'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];