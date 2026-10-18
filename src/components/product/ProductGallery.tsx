import React, { useState } from 'react';
import { ProductImage } from '../../types/product';
import { ProductArt } from './ProductArt';

interface ProductGalleryProps {
  images: ProductImage[];
  tone?: 'light' | 'dark';
}

export function ProductGallery({ images, tone = 'light' }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse">
      <div className="aspect-square w-full overflow-hidden rounded-md lg:flex-1">
        <ProductArt variant={current.art} packLabel={current.packLabel} label={current.label} tone={tone} />
      </div>
      {images.length > 1 &&
      <div className="no-scrollbar flex gap-3 overflow-x-auto lg:w-20 lg:flex-col" role="tablist" aria-label="Product images">
          {images.map((image, i) =>
        <button
          key={image.id}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`Show image: ${image.label}`}
          onClick={() => setActive(i)}
          className={`h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors duration-150 ${
          i === active ? 'border-hp-black' : 'border-transparent hover:border-neutral-300'}`
          }>
          
              <ProductArt variant={image.art} packLabel={image.packLabel} tone={tone} showTag={false} label={image.label} />
            </button>
        )}
        </div>
      }
    </div>);

}