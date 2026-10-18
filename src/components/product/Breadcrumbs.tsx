import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

interface BreadcrumbsProps {
  current: string;
  tone?: 'light' | 'dark';
}

export function Breadcrumbs({ current, tone = 'light' }: BreadcrumbsProps) {
  const muted = tone === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-hp-black';
  return (
    <nav aria-label="Breadcrumb" className="text-xs">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className={muted}>
            Home
          </Link>
        </li>
        <ChevronRightIcon className="h-3 w-3 text-neutral-400" aria-hidden="true" />
        <li>
          <Link to="/products" className={muted}>
            All Products
          </Link>
        </li>
        <ChevronRightIcon className="h-3 w-3 text-neutral-400" aria-hidden="true" />
        <li aria-current="page" className={tone === 'dark' ? 'text-white' : 'text-hp-black'}>
          {current}
        </li>
      </ol>
    </nav>);

}