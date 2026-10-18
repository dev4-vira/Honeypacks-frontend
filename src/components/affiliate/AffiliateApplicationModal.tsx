import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2Icon, XIcon } from 'lucide-react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { fieldClass, fieldErrorClass, primaryButtonClass } from '../../utils/formStyles';
import { isValidEmail } from '../../utils/validation';
import { FormField } from '../shared/FormField';

interface AffiliateApplicationModalProps {
  open: boolean;
  onClose: () => void;
}

/** Stands in for the external Refersion application used on the live site. */
export function AffiliateApplicationModal({ open, onClose }: AffiliateApplicationModalProps) {
  const [values, setValues] = useState({ name: '', email: '', handle: '', audience: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  useBodyScrollLock(open);

  const close = () => {
    onClose();
    window.setTimeout(() => setSubmitted(false), 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = 'Enter your name';
    if (!isValidEmail(values.email)) next.email = 'Enter a valid email';
    if (!values.handle.trim()) next.handle = 'Enter your main social handle or website';
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
      setValues({ name: '', email: '', handle: '', audience: '' });
    }
  };

  const set = (k: keyof typeof values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  return (
    <AnimatePresence>
      {open &&
      <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={close}>
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="affiliate-apply-title"
          className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-7"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          onClick={(e) => e.stopPropagation()}>
          
            <button type="button" onClick={close} className="absolute right-4 top-4 rounded p-1 text-neutral-500 hover:text-hp-black" aria-label="Close">
              <XIcon className="h-5 w-5" />
            </button>
            {submitted ?
          <div className="py-6 text-center">
                <CheckCircle2Icon className="mx-auto h-12 w-12 text-hp-green" aria-hidden="true" />
                <h2 id="affiliate-apply-title" className="mt-4 font-display text-3xl font-bold uppercase tracking-wide">
                  Application preview complete
                </h2>
                <p className="mt-2 text-neutral-600">This is a prototype. Nothing was submitted — the live site sends applicants to its affiliate platform.</p>
                <button type="button" onClick={close} className={`${primaryButtonClass} mt-6`}>
                  Close
                </button>
              </div> :

          <>
                <h2 id="affiliate-apply-title" className="font-display text-3xl font-bold uppercase tracking-wide">
                  Apply to Create
                </h2>
                <p className="mt-1 text-sm text-neutral-600">Demo application — no data is submitted.</p>
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                  <FormField label="Full name" htmlFor="aff-name" error={errors.name}>
                    <input id="aff-name" value={values.name} onChange={(e) => set('name', e.target.value)} className={`${fieldClass} ${errors.name ? fieldErrorClass : ''}`} autoComplete="name" />
                  </FormField>
                  <FormField label="Email" htmlFor="aff-email" error={errors.email}>
                    <input id="aff-email" type="email" value={values.email} onChange={(e) => set('email', e.target.value)} className={`${fieldClass} ${errors.email ? fieldErrorClass : ''}`} autoComplete="email" />
                  </FormField>
                  <FormField label="Main social handle or website" htmlFor="aff-handle" error={errors.handle}>
                    <input id="aff-handle" value={values.handle} onChange={(e) => set('handle', e.target.value)} placeholder="@yourhandle" className={`${fieldClass} ${errors.handle ? fieldErrorClass : ''}`} />
                  </FormField>
                  <FormField label="Tell us about your audience (optional)" htmlFor="aff-audience">
                    <textarea id="aff-audience" rows={3} value={values.audience} onChange={(e) => set('audience', e.target.value)} className={fieldClass} />
                  </FormField>
                  <button type="submit" className={`${primaryButtonClass} w-full`}>
                    Submit Application
                  </button>
                </form>
              </>
          }
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}