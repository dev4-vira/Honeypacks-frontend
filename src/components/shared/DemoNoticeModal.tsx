import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { InfoIcon, XIcon } from 'lucide-react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { darkButtonClass } from '../../utils/formStyles';

interface DemoNoticeModalProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

/** Shared "this is a prototype" confirmation used by every non-functional submit. */
export function DemoNoticeModal({ open, title, message, onClose }: DemoNoticeModalProps) {
  useBodyScrollLock(open);
  return (
    <AnimatePresence>
      {open &&
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}>
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-notice-title"
          className="relative w-full max-w-md rounded-lg bg-white p-7 shadow-xl"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onClick={(e) => e.stopPropagation()}>
          
            <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded p-1 text-neutral-500 hover:text-hp-black" aria-label="Close">
              <XIcon className="h-5 w-5" />
            </button>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-hp-yellow">
              <InfoIcon className="h-5 w-5 text-hp-black" aria-hidden="true" />
            </span>
            <h2 id="demo-notice-title" className="mt-4 font-display text-2xl font-bold uppercase tracking-wide">
              {title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">{message}</p>
            <button type="button" onClick={onClose} className={`${darkButtonClass} mt-6 w-full`} autoFocus>
              Got it
            </button>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}