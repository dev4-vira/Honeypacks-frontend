import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  tone?: 'light' | 'dark';
  className?: string;
}

/** Wordmark placeholder for the HoneyPacks logo — swap in the official SVG when supplied. */
export function Logo({ tone = 'light', className = '' }: LogoProps) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 ${className}`} aria-label="HoneyPacks home">
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <polygon points="16,1.5 29,9 29,23 16,30.5 3,23 3,9" fill="none" stroke="#c9a227" strokeWidth="2.5" />
        <polygon points="16,9 22,12.5 22,19.5 16,23 10,19.5 10,12.5" fill="#c9a227" />
      </svg>
      <span className="font-display text-[22px] font-bold uppercase leading-none tracking-wide">
        <span className={tone === 'light' ? 'text-white' : 'text-hp-black'}>Honey</span>
        <span className="text-hp-gold">Packs</span>
      </span>
    </Link>);

}