import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
      {products.map((product) =>
      <li key={product.id}>
          <ProductCard product={product} />
        </li>
      )}
    </ul>);

}