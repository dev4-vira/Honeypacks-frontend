import React from 'react';
import { Product } from '../../types/product';
import { ProductGrid } from './ProductGrid';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export function RelatedProducts({ products, title = 'You may also like' }: RelatedProductsProps) {
  return (
    <section aria-labelledby="related-heading" className="mx-auto max-w-store px-4 py-16 md:px-8 md:py-20">
      <h2 id="related-heading" className="mb-8 font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">
        {title}
      </h2>
      <ProductGrid products={products} />
    </section>);

}