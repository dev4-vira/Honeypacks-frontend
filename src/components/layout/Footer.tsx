import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { footerColumns } from '../../data/navigation';
import { contactEmail } from '../../data/site';
import { isValidEmail } from '../../utils/validation';
import { Logo } from './Logo';
import { SocialIcons } from './SocialIcons';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'done'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      return;
    }
    setStatus('done');
    setEmail('');
  };

  return (
    <footer className="bg-hp-black text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-store gap-6 px-4 py-12 md:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
              Get <span className="text-hp-yellow">10% off</span> your first order
            </h2>
            <p className="mt-2 text-neutral-400">Join our email list for exclusive offers, new drops and restock alerts.</p>
          </div>
          <form onSubmit={handleSubmit} noValidate className="w-full">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus('idle');
                }}
                placeholder="Enter your email"
                aria-invalid={status === 'error'}
                className="h-12 flex-1 rounded-md border border-neutral-700 bg-hp-coal px-4 text-white placeholder:text-neutral-500 outline-none focus:border-hp-gold" />
              
              <button type="submit" className="h-12 whitespace-nowrap rounded-md bg-hp-yellow px-7 font-display font-semibold uppercase tracking-wide text-hp-black transition-colors duration-150 hover:bg-hp-yellow-hover">
                Subscribe
              </button>
            </div>
            <p className="mt-2 min-h-[20px] text-sm" role="status">
              {status === 'error' && <span className="text-red-400">Please enter a valid email address.</span>}
              {status === 'done' && <span className="text-hp-gold-light">Thanks! (Prototype — no email was sent or stored.)</span>}
            </p>
          </form>
        </div>
      </div>

      <div className="mx-auto grid max-w-store gap-10 px-4 py-12 md:px-8 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">Premium Black Thai Honey in single-serve packs. Shipped discreetly across the US.</p>
          <a href={`mailto:${contactEmail}`} className="mt-4 inline-block text-sm text-hp-gold hover:underline">
            {contactEmail}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
          {footerColumns.map((col) =>
          <nav key={col.title} aria-label={col.title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-hp-gold">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) =>
              <li key={link.to}>
                    <Link to={link.to} className="text-sm text-neutral-300 transition-colors duration-150 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
              )}
              </ul>
            </nav>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-store flex-col-reverse items-start gap-5 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} HoneyPacks. All rights reserved. These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure or prevent any disease.
          </p>
          <SocialIcons />
        </div>
      </div>
    </footer>);

}