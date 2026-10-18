import React, { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md';
}

export function AccordionItem({ title, children, defaultOpen = false, tone = 'light', size = 'md' }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const dark = tone === 'dark';

  return (
    <div className={`border-b ${dark ? 'border-neutral-800' : 'border-hp-line'}`}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className={`flex w-full items-center justify-between gap-4 text-left ${size === 'sm' ? 'py-4' : 'py-5'}`}>
          
          <span className={`font-display font-semibold uppercase tracking-wide ${size === 'sm' ? 'text-[15px]' : 'text-lg'} ${dark ? 'text-white' : 'text-hp-black'}`}>
            {title}
          </span>
          <PlusIcon
            className={`h-5 w-5 shrink-0 transition-transform duration-200 ease-out ${open ? 'rotate-45' : ''} ${dark ? 'text-hp-gold' : 'text-hp-black'}`}
            aria-hidden="true" />
          
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open &&
        <motion.div
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden">
          
            <div className={`pb-5 pr-8 text-[15px] leading-relaxed ${dark ? 'text-neutral-300' : 'text-neutral-700'}`}>{children}</div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}