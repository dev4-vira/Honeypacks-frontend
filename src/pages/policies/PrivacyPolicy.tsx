import React from 'react';
import { PolicyLayout } from '../../components/policy/PolicyLayout';
import { privacyPolicy } from '../../data/policies';

export function PrivacyPolicy() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      updated="Pending approval"
      notice="Placeholder content: the approved Privacy Policy text has not been supplied. Sections below are structural placeholders only and are not legally binding."
      sections={privacyPolicy} />);


}