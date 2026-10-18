import React from 'react';
import { ProductDetailSection } from '../../types/product';
import { AccordionItem } from '../shared/AccordionItem';
import { ConfirmationFlag } from '../shared/ConfirmationFlag';

interface ProductAccordionProps {
  sections: ProductDetailSection[];
  tone?: 'light' | 'dark';
}

export function ProductAccordion({ sections, tone = 'light' }: ProductAccordionProps) {
  return (
    <div className={`border-t ${tone === 'dark' ? 'border-neutral-800' : 'border-hp-line'}`}>
      {sections.map((section, i) =>
      <AccordionItem key={section.title} title={section.title} defaultOpen={i === 0} tone={tone} size="sm">
          <div className="space-y-3">
            {section.paragraphs.map((p) =>
          <p key={p}>{p}</p>
          )}
            {section.bullets &&
          <ul className="list-disc space-y-1 pl-5">
                {section.bullets.map((b) =>
            <li key={b}>{b}</li>
            )}
              </ul>
          }
            {section.needsConfirmation && <ConfirmationFlag />}
          </div>
        </AccordionItem>
      )}
    </div>);

}