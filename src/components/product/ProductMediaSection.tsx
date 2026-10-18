import React from 'react';
import { PlayIcon } from 'lucide-react';

const clips = [
{ title: 'How to open a pack', length: '0:32' },
{ title: 'Customer stories', length: '1:05' },
{ title: 'Inside the box', length: '0:48' }];


interface ProductMediaSectionProps {
  productName: string;
}

/** Placeholder tiles for the product videos shown on the live product page. */
export function ProductMediaSection({ productName }: ProductMediaSectionProps) {
  return (
    <section aria-labelledby="media-heading" className="bg-hp-black py-16 text-white md:py-20">
      <div className="mx-auto max-w-store px-4 md:px-8">
        <h2 id="media-heading" className="font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">
          See {productName} in action
        </h2>
        <ul className="no-scrollbar -mx-4 mt-8 flex snap-x gap-4 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-3 md:px-0">
          {clips.map((clip) =>
          <li key={clip.title} className="w-[78%] shrink-0 snap-start md:w-auto">
              <div className="relative flex aspect-[9/12] items-center justify-center overflow-hidden rounded-md border border-neutral-800 bg-hp-coal">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-hp-yellow text-hp-black">
                  <PlayIcon className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
                </span>
                <span className="absolute left-3 top-3 rounded-sm bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">Video placeholder</span>
                <span className="absolute bottom-3 right-3 rounded-sm bg-black/70 px-1.5 py-0.5 text-xs tabular-nums">{clip.length}</span>
              </div>
              <p className="mt-3 font-display text-lg font-medium uppercase tracking-wide">{clip.title}</p>
            </li>
          )}
        </ul>
      </div>
    </section>);

}