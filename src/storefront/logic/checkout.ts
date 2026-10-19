export type CheckoutDraft = Record<string, string>;
export const states =
  'AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'.split(
    ' ',
  );

export function validateCheckout(
  draft: CheckoutDraft,
  sameBilling: boolean,
  recurring: boolean,
  consent: boolean,
): CheckoutDraft {
  const errors: CheckoutDraft = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email?.trim() ?? ''))
    errors.email = 'Enter a valid demo email address.';
  for (const prefix of sameBilling ? ['delivery'] : ['delivery', 'billing']) {
    for (const key of [
      'Country',
      'First',
      'Last',
      'Address',
      'City',
      'State',
      'Zip',
    ]) {
      if (!draft[prefix + key]?.trim())
        errors[prefix + key] = `Enter ${key.toLowerCase()}.`;
    }
    if (draft[prefix + 'Country'] !== 'United States')
      errors[prefix + 'Country'] =
        'This shipping fixture supports United States addresses.';
    if (draft[prefix + 'State'] && !states.includes(draft[prefix + 'State']))
      errors[prefix + 'State'] = 'Select a US state.';
    if (
      draft[prefix + 'Zip'] &&
      !/^\d{5}(-\d{4})?$/.test(draft[prefix + 'Zip'].trim())
    )
      errors[prefix + 'Zip'] = 'Enter a valid US ZIP code.';
  }
  if (recurring && !consent)
    errors.consent = 'Review the recurring terms and select the checkbox.';
  return errors;
}
