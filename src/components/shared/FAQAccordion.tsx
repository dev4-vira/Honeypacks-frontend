import React from 'react';
import { FaqItem } from '../../types/catalog';
import { AccordionItem } from './AccordionItem';

interface FAQAccordionProps {
  items: FaqItem[];
  tone?: 'light' | 'dark';
}

export function FAQAccordion({ items, tone = 'light' }: FAQAccordionProps) {
  return (
    <div className={`border-t ${tone === 'dark' ? 'border-neutral-800' : 'border-hp-line'}`}>
      {items.map((item) =>
      <AccordionItem key={item.question} title={item.question} tone={tone}>
          <p>{item.answer}</p>
        </AccordionItem>
      )}
    </div>);

}