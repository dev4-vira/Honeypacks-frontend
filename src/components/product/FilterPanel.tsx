import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { defaultFilters, sortOptions } from '../../data/catalogOptions';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { ProductFilters } from '../../types/catalog';
import { darkButtonClass, fieldClass } from '../../utils/formStyles';

interface FilterPanelProps {
  open: boolean;
  filters: ProductFilters;
  onApply: (filters: ProductFilters) => void;
  onClose: () => void;
}

export function FilterPanel({ open, filters, onApply, onClose }: FilterPanelProps) {
  const [draft, setDraft] = useState<ProductFilters>(filters);
  useBodyScrollLock(open);

  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

  const set = <K extends keyof ProductFilters,>(key: K, value: ProductFilters[K]) => setDraft((d) => ({ ...d, [key]: value }));

  return (
    <AnimatePresence>
      {open &&
      <>
          <motion.div className="fixed inset-0 z-50 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={onClose} />
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-title"
          className="fixed inset-y-0 left-0 z-50 flex w-full max-w-[380px] flex-col bg-white shadow-2xl"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-hp-line px-5">
              <h2 id="filter-title" className="font-display text-xl font-bold uppercase tracking-wide">
                Filter &amp; Sort
              </h2>
              <button type="button" onClick={onClose} className="-mr-2 rounded p-2 hover:bg-hp-mist" aria-label="Close filters">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 divide-y divide-hp-line overflow-y-auto px-5">
              <fieldset className="py-5">
                <legend className="font-display text-sm font-semibold uppercase tracking-[0.08em]">Sort</legend>
                <div className="mt-3 space-y-2.5">
                  {sortOptions.map((opt) =>
                <label key={opt.value} className="flex cursor-pointer items-center gap-3 text-[15px]">
                      <input type="radio" name="sort" className="h-4 w-4 accent-hp-black" checked={draft.sort === opt.value} onChange={() => set('sort', opt.value)} />
                      {opt.label}
                    </label>
                )}
                </div>
              </fieldset>

              <fieldset className="py-5">
                <legend className="font-display text-sm font-semibold uppercase tracking-[0.08em]">Offers</legend>
                <label className="mt-3 flex cursor-pointer items-center gap-3 text-[15px]">
                  <input type="checkbox" className="h-4 w-4 accent-hp-black" checked={draft.onSale} onChange={(e) => set('onSale', e.target.checked)} />
                  On Sale
                </label>
              </fieldset>

              <fieldset className="py-5">
                <legend className="font-display text-sm font-semibold uppercase tracking-[0.08em]">Set Price</legend>
                <div className="mt-3 flex items-center gap-3">
                  <label className="sr-only" htmlFor="min-price">
                    Minimum price
                  </label>
                  <div className="relative flex-1">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                    <input id="min-price" inputMode="decimal" placeholder="Min" value={draft.minPrice} onChange={(e) => set('minPrice', e.target.value.replace(/[^\d.]/g, ''))} className={`${fieldClass} !py-2.5 pl-7`} />
                  </div>
                  <span className="text-neutral-400">–</span>
                  <label className="sr-only" htmlFor="max-price">
                    Maximum price
                  </label>
                  <div className="relative flex-1">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                    <input id="max-price" inputMode="decimal" placeholder="Max" value={draft.maxPrice} onChange={(e) => set('maxPrice', e.target.value.replace(/[^\d.]/g, ''))} className={`${fieldClass} !py-2.5 pl-7`} />
                  </div>
                </div>
              </fieldset>

              <fieldset className="py-5">
                <legend className="font-display text-sm font-semibold uppercase tracking-[0.08em]">Availability</legend>
                <div className="mt-3 space-y-2.5">
                  <label className="flex cursor-pointer items-center gap-3 text-[15px]">
                    <input type="checkbox" className="h-4 w-4 accent-hp-black" checked={draft.inStock} onChange={(e) => set('inStock', e.target.checked)} />
                    In Stock
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 text-[15px]">
                    <input type="checkbox" className="h-4 w-4 accent-hp-black" checked={draft.outOfStock} onChange={(e) => set('outOfStock', e.target.checked)} />
                    Out of Stock
                  </label>
                </div>
              </fieldset>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-hp-line p-5">
              <button
              type="button"
              onClick={() => {
                setDraft(defaultFilters);
                onApply(defaultFilters);
              }}
              className="rounded-md border border-hp-black py-3.5 font-display text-[15px] font-semibold uppercase tracking-wide transition-colors duration-150 hover:bg-hp-mist">
              
                Clear
              </button>
              <button type="button" onClick={() => onApply(draft)} className={darkButtonClass}>
                Apply
              </button>
            </div>
          </motion.aside>
        </>
      }
    </AnimatePresence>);

}