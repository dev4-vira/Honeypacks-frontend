import React, { useState } from 'react';
import { CheckCircle2Icon, MailIcon } from 'lucide-react';
import { FormField } from '../components/shared/FormField';
import { primaryButtonClass, fieldClass, fieldErrorClass } from '../utils/formStyles';
import { isValidEmail } from '../utils/validation';

export function ManageSubscription() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Enter the email address used for your subscription.');
      return;
    }
    setSent(true);
  };

  return (
    <div className="bg-hp-black px-4 py-16 md:py-24">
      <div className="mx-auto w-full max-w-[480px] rounded-lg bg-white p-8 text-center md:p-10">
        <svg viewBox="0 0 32 32" className="mx-auto h-12 w-12" aria-hidden="true">
          <polygon points="16,1.5 29,9 29,23 16,30.5 3,23 3,9" fill="none" stroke="#c9a227" strokeWidth="2.5" />
          <polygon points="16,9 22,12.5 22,19.5 16,23 10,19.5 10,12.5" fill="#c9a227" />
        </svg>
        <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide">Manage Subscription</h1>
        {sent ?
        <div className="mt-6" role="status">
            <CheckCircle2Icon className="mx-auto h-10 w-10 text-hp-green" aria-hidden="true" />
            <p className="mt-3 font-semibold">Check your inbox</p>
            <p className="mt-1 text-sm text-neutral-600">In the live store we&apos;d email a secure access link to {email}. This prototype doesn&apos;t send emails.</p>
            <button type="button" onClick={() => setSent(false)} className="mt-5 text-sm font-medium underline underline-offset-2">
              Use a different email
            </button>
          </div> :

        <>
            <p className="mt-2 text-[15px] text-neutral-600">Enter the email you used at checkout and we&apos;ll send you a secure link to skip, change or cancel your subscription.</p>
            <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4 text-left">
              <FormField label="Email address" htmlFor="sub-email" error={error}>
                <div className="relative">
                  <MailIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
                  <input
                  id="sub-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="you@example.com"
                  className={`${fieldClass} pl-10 ${error ? fieldErrorClass : ''}`}
                  aria-invalid={Boolean(error)} />
                
                </div>
              </FormField>
              <button type="submit" className={`${primaryButtonClass} w-full`}>
                Continue
              </button>
            </form>
          </>
        }
      </div>
    </div>);

}