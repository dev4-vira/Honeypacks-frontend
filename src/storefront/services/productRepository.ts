import { catalog } from '../data/catalog.ts';
import type { Product, ProductId } from '../data/catalog.ts';

export interface ProductRepository {
  list(): readonly Product[];
  get(id: ProductId): Product;
  findBySlug(slug: string): Product | undefined;
}
export const productRepository: ProductRepository = {
  list: () => catalog,
  get: (id) => {
    const product = catalog.find((item) => item.id === id);
    if (!product) throw new Error(`Unknown product: ${id}`);
    return product;
  },
  findBySlug: (slug) => catalog.find((item) => item.slug === slug),
};
