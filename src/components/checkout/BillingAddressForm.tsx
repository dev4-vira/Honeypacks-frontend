import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Address, CheckoutErrors } from '../../types/checkout';
import { AddressFields } from './AddressFields';

interface BillingAddressFormProps {
  sameAsShipping: boolean;
  onSameChange: (value: boolean) => void;
  value: Address;
  errors: CheckoutErrors;
  onChange: (field: keyof Address, value: string) => void;
}

export function BillingAddressForm({ sameAsShipping, onSameChange, value, errors, onChange }: BillingAddressFormProps) {
  return (
    <div>
      <label className="flex cursor-pointer items-center gap-3 text-sm">
        <input type="checkbox" className="h-4 w-4 accent-hp-black" checked={sameAsShipping} onChange={(e) => onSameChange(e.target.checked)} />
        Billing address same as shipping address
      </label>
      <AnimatePresence initial={false}>
        {!sameAsShipping &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden">
          
            <div className="pt-5">
              <AddressFields prefix="billing" value={value} errors={errors} onChange={onChange} />
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}