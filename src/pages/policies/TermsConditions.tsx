import React from 'react';
import { PolicyLayout } from '../../components/policy/PolicyLayout';
import { termsConditions } from '../../data/policies';

export function TermsConditions() {
  return (
    <PolicyLayout
      title="Terms and Conditions"
      updated="Pending approval"
      notice="Placeholder content: the approved Terms and Conditions have not been supplied. Sections below are structural placeholders only and contain no legal or payment commitments."
      sections={termsConditions} />);


}