import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { isValidEmail } from '../../utils/validation';
import { primaryButtonClass } from '../../utils/formStyles';
import { ProductArt } from '../product/ProductArt';

export function DiscountPopup() {
  const [dismissed, setDismissed] = useLocalStorage<boolean>('hp-discount-popup-dismissed', false);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const t = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(t);
  }, [dismissed]);

  useBodyScrollLock(visible);

  const close = () => {
    setVisible(false);
    setDismissed(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {visible &&
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={close}>
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="discount-title"
          className="relative grid w-full max-w-3xl overflow-hidden rounded-lg bg-hp-black text-white shadow-2xl md:grid-cols-2"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          onClick={(e) => e.stopPropagation()}>
          
            <button type="button" onClick={close} className="absolute right-3 top-3 z-10 rounded p-1.5 text-neutral-400 hover:text-white" aria-label="Close offer">
              <XIcon className="h-5 w-5" />
            </button>
            <div className="hidden md:block">
              <ProductArt variant="honey-pack" tone="dark" label="Black Thai Honey packs" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              {submitted ?
            <>
                  <h2 id="discount-title" className="font-display text-4xl font-bold uppercase leading-tight">
                    You&apos;re on the list
                  </h2>
                  <p className="mt-3 text-neutral-300">This is a prototype — no email was sent and no discount code was issued.</p>
                  <button type="button" onClick={close} className={`${primaryButtonClass} mt-6`}>
                    Continue Shopping
                  </button>
                </> :

            <>
                  <p className="font-display text-lg font-medium uppercase tracking-wide text-hp-gold">Welcome to HoneyPacks</p>
                  <h2 id="discount-title" className="mt-1 font-display text-5xl font-bold uppercase leading-[1.02]">
                    Get <span className="text-hp-yellow">10% off</span> your first order
                  </h2>
                  <p className="mt-3 text-[15px] text-neutral-300">Sign up for emails and unlock your discount on Black Thai Honey.</p>
                  <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-3">
                    <label htmlFor="popup-email" className="sr-only">
                      Email address
                    </label>
                    <input
                  id="popup-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Email address"
                  aria-invalid={Boolean(error)}
                  className="h-12 w-full rounded-md border border-neutral-700 bg-hp-coal px-4 text-white placeholder:text-neutral-500 outline-none focus:border-hp-gold" />
                
                    {error &&
                <p className="text-sm text-red-400" role="alert">
                        {error}
                      </p>
                }
                    <button type="submit" className={`${primaryButtonClass} w-full`}>
                      Claim My 10% Off
                    </button>
                  </form>
                  <button type="button" onClick={close} className="mt-4 text-sm text-neutral-400 underline-offset-2 hover:text-white hover:underline">
                    No thanks, I&apos;ll pay full price
                  </button>
                </>
            }
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}