import React, { useMemo, useState } from 'react';
import { PackageSearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { FilterPanel } from '../components/product/FilterPanel';
import { ProductGrid } from '../components/product/ProductGrid';
import { defaultFilters, sortOptions } from '../data/catalogOptions';
import { ProductFilters } from '../types/catalog';
import { catalogService } from '../utils/catalogService';
import { darkButtonClass } from '../utils/formStyles';
import { applyProductFilters, countActiveFilters } from '../utils/productFilters';

export function Products() {
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);
  const [panelOpen, setPanelOpen] = useState(false);
  const all = catalogService.list();
  const results = useMemo(() => applyProductFilters(all, filters), [all, filters]);
  const activeCount = countActiveFilters(filters);

  const chips: {label: string;clear: Partial<ProductFilters>;}[] = [];
  if (filters.onSale) chips.push({ label: 'On Sale', clear: { onSale: false } });
  if (filters.minPrice || filters.maxPrice) chips.push({ label: `$${filters.minPrice || '0'} – ${filters.maxPrice ? `$${filters.maxPrice}` : 'any'}`, clear: { minPrice: '', maxPrice: '' } });
  if (filters.inStock) chips.push({ label: 'In Stock', clear: { inStock: false } });
  if (filters.outOfStock) chips.push({ label: 'Out of Stock', clear: { outOfStock: false } });

  return (
    <div className="mx-auto max-w-store px-4 pb-20 pt-10 md:px-8 md:pt-14">
      <header className="text-center">
        <h1 className="font-display text-4xl font-bold uppercase tracking-wide md:text-6xl">All Products</h1>
        <p className="mt-2 text-sm text-neutral-600" aria-live="polite">
          {results.length} {results.length === 1 ? 'product' : 'products'}
        </p>
      </header>

      <div className="sticky top-[72px] z-20 -mx-4 mt-8 flex flex-wrap items-center justify-between gap-3 border-y border-hp-line bg-white px-4 py-3 md:-mx-8 md:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-hp-black px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide transition-colors duration-150 hover:bg-hp-black hover:text-white">
            
            <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
            Filter
            {activeCount > 0 && <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-hp-yellow px-1 text-[11px] text-hp-black">{activeCount}</span>}
          </button>
          {chips.map((chip) =>
          <button
            key={chip.label}
            type="button"
            onClick={() => setFilters((f) => ({ ...f, ...chip.clear }))}
            className="inline-flex items-center gap-1.5 rounded-full bg-hp-mist px-3 py-1.5 text-xs font-medium hover:bg-neutral-200"
            aria-label={`Remove filter ${chip.label}`}>
            
              {chip.label}
              <XIcon className="h-3 w-3" aria-hidden="true" />
            </button>
          )}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="sr-only">Sort products</span>
          <select
            value={filters.sort}
            onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value as ProductFilters['sort'] }))}
            className="rounded-md border border-hp-line bg-white py-2 pl-3 pr-8 text-sm outline-none focus:border-hp-black">
            
            {sortOptions.map((o) =>
            <option key={o.value} value={o.value}>
                {o.label}
              </option>
            )}
          </select>
        </label>
      </div>

      <div className="mt-10">
        {results.length > 0 ?
        <ProductGrid products={results} /> :

        <div className="mx-auto max-w-md py-16 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-hp-mist">
              <PackageSearchIcon className="h-7 w-7 text-neutral-500" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold uppercase tracking-wide">No products found</h2>
            <p className="mt-2 text-neutral-600">No products match the selected filters. Try removing a filter to see more results.</p>
            <button type="button" onClick={() => setFilters(defaultFilters)} className={`${darkButtonClass} mt-6`}>
              Clear all filters
            </button>
          </div>
        }
      </div>

      <FilterPanel
        open={panelOpen}
        filters={filters}
        onClose={() => setPanelOpen(false)}
        onApply={(next) => {
          setFilters(next);
          setPanelOpen(false);
        }} />
      
    </div>);

}