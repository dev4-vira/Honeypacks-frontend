import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeading({ title, subtitle, align = 'center', tone = 'light', as = 'h2', className = '' }: SectionHeadingProps) {
  const Tag = as;
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      <Tag className={`font-display text-3xl font-bold uppercase tracking-wide md:text-[40px] md:leading-[1.1] ${tone === 'dark' ? 'text-white' : 'text-hp-black'}`}>
        {title}
      </Tag>
      {subtitle && <p className={`mt-3 text-base ${tone === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>{subtitle}</p>}
    </div>);

}