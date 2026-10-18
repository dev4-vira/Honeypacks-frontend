import React from 'react';
import { PolicyLayout } from '../../components/policy/PolicyLayout';
import { returnsPolicy } from '../../data/policies';

export function ReturnsRefunds() {
  return (
    <PolicyLayout
      title="Returns & Refund Policy"
      updated="October 15, 2026"
      intro="This prototype uses a single 30-day return window across the site, as documented in the audit."
      notice="Business confirmation required: the live site referenced both 30-day and 60-day return windows. This prototype standardizes on 30 days until the approved policy is supplied."
      sections={returnsPolicy} />);


}