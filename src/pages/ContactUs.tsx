import React, { useState } from 'react';
import { ClockIcon, MailIcon } from 'lucide-react';
import { DemoNoticeModal } from '../components/shared/DemoNoticeModal';
import { FormField } from '../components/shared/FormField';
import { contactEmail } from '../data/site';
import { darkButtonClass, fieldClass, fieldErrorClass } from '../utils/formStyles';
import { isValidEmail } from '../utils/validation';

export function ContactUs() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = 'Enter your name';
    if (!isValidEmail(values.email)) next.email = 'Enter a valid email address';
    if (values.message.trim().length < 10) next.message = 'Message must be at least 10 characters';
    setErrors(next);
    if (Object.keys(next).every((k) => !next[k])) {
      setSent(true);
      setValues({ name: '', email: '', message: '' });
    }
  };

  return (
    <>
      <header className="bg-hp-black py-14 text-center text-white md:py-20">
        <h1 className="font-display text-5xl font-bold uppercase tracking-wide md:text-6xl">Contact Us</h1>
        <p className="mx-auto mt-3 max-w-md px-4 text-neutral-400">Questions about an order or our products? We&apos;re here to help.</p>
      </header>
      <section className="mx-auto grid max-w-[1040px] gap-12 px-4 py-14 md:grid-cols-[1fr_1.4fr] md:py-20">
        <div>
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">Get in touch</h2>
          <ul className="mt-6 space-y-5">
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-hp-gold" aria-hidden="true" />
              <div>
                <p className="text-sm text-neutral-500">Email</p>
                <a href={`mailto:${contactEmail}`} className="font-semibold hover:underline">
                  {contactEmail}
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-hp-gold" aria-hidden="true" />
              <div>
                <p className="text-sm text-neutral-500">Response time</p>
                <p className="font-semibold">Within 1 business day</p>
              </div>
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <FormField label="Name *" htmlFor="contact-name" error={errors.name}>
            <input id="contact-name" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} className={`${fieldClass} ${errors.name ? fieldErrorClass : ''}`} aria-invalid={Boolean(errors.name)} />
          </FormField>
          <FormField label="Email *" htmlFor="contact-email" error={errors.email}>
            <input id="contact-email" type="email" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} className={`${fieldClass} ${errors.email ? fieldErrorClass : ''}`} aria-invalid={Boolean(errors.email)} />
          </FormField>
          <FormField label="Message *" htmlFor="contact-message" error={errors.message}>
            <textarea id="contact-message" rows={6} value={values.message} onChange={(e) => set('message', e.target.value)} className={`${fieldClass} resize-y ${errors.message ? fieldErrorClass : ''}`} aria-invalid={Boolean(errors.message)} />
          </FormField>
          <button type="submit" className={`${darkButtonClass} w-full sm:w-auto sm:px-12`}>
            Send
          </button>
        </form>
      </section>
      <DemoNoticeModal open={sent} onClose={() => setSent(false)} title="Message not sent (demo)" message={`This prototype doesn't send emails. In the live store, your message would go to ${contactEmail}.`} />
    </>);

}