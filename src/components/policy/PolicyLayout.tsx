import React from 'react';
import { PolicySection } from '../../types/catalog';
import { ConfirmationFlag } from '../shared/ConfirmationFlag';

interface PolicyLayoutProps {
  title: string;
  intro?: string;
  updated: string;
  sections: PolicySection[];
  notice?: string;
}

export function PolicyLayout({ title, intro, updated, sections, notice }: PolicyLayoutProps) {
  return (
    <div className="bg-white">
      <header className="bg-hp-black py-14 text-center text-white md:py-20">
        <h1 className="font-display text-4xl font-bold uppercase tracking-wide md:text-6xl">{title}</h1>
        <p className="mt-3 text-sm text-neutral-400">Last updated: {updated}</p>
      </header>
      <article className="mx-auto max-w-[720px] px-4 py-12 md:py-16">
        {notice &&
        <div className="mb-10 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900" role="note">
            {notice}
          </div>
        }
        {intro && <p className="mb-10 text-lg leading-relaxed text-neutral-700">{intro}</p>}
        <div className="space-y-10">
          {sections.map((section) =>
          <section key={section.heading}>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-[16px] leading-[1.75] text-neutral-700">
                {section.paragraphs.map((p) =>
              <p key={p}>{p}</p>
              )}
                {section.bullets &&
              <ul className="list-disc space-y-1.5 pl-5">
                    {section.bullets.map((b) =>
                <li key={b}>{b}</li>
                )}
                  </ul>
              }
              </div>
              {section.needsConfirmation &&
            <div className="mt-3">
                  <ConfirmationFlag />
                </div>
            }
            </section>
          )}
        </div>
      </article>
    </div>);

}