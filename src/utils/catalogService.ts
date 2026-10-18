import { products } from '../data/products';
import { reviews } from '../data/reviews';
import { Review } from '../types/catalog';
import { Product } from '../types/product';

/**
 * Catalog access layer. The UI only talks to this interface, so the local
 * implementation can later be swapped for a Django REST client
 * (e.g. GET /api/products/, GET /api/products/:slug/, GET /api/reviews/?product=).
 */
export interface CatalogService {
  list(): Product[];
  getBySlug(slug: string): Product | undefined;
  getById(id: string): Product | undefined;
  getByIds(ids: string[]): Product[];
  getRelated(product: Product, limit?: number): Product[];
  getReviews(productId?: string): Review[];
}

export const catalogService: CatalogService = {
  list: () => products,
  getBySlug: (slug) => products.find((p) => p.slug === slug),
  getById: (id) => products.find((p) => p.id === id),
  getByIds: (ids) => ids.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => Boolean(p)),
  getRelated: (product, limit = 4) =>
  products.
  filter((p) => p.id !== product.id).
  sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category) || b.popularity - a.popularity).
  slice(0, limit),
  getReviews: (productId) => {
    if (!productId) return reviews;
    const matching = reviews.filter((r) => r.productId === productId);
    return matching.length > 0 ? matching : reviews.slice(0, 3);
  }
};