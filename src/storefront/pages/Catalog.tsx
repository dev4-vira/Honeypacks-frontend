import { useState } from 'react';
import { SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { productRepository } from '../services/productRepository';
import { assets } from '../data/catalog';
import { filterProducts, initialFilters } from '../logic/commerce';
import type { CatalogFilters } from '../logic/commerce';
import { Modal, ArchivedNote } from '../components/UI';
import { FAQ, ProductCard, Guarantee } from '../components/CommerceBlocks';

export default function Catalog() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<CatalogFilters>(initialFilters);
  const visible = filterProducts(productRepository.list(), filters);
  const hasFilters =
    filters.sale ||
    filters.stock !== 'all' ||
    filters.price !== 'all' ||
    filters.sort !== 'default';
  return (
    <>
      <section className="p1-catalog p1-container">
        <header>
          <h1>ALL PRODUCTS</h1>
          <p aria-live="polite">{visible.length} products</p>
          <img src={assets.underline} className="p1-swish" alt="" />
          <div className="p1-catalog-benefits">
            {[
              'Fast-acting formula',
              'Discreet packaging',
              'Third-party lab tested ingredients',
            ].map((text) => (
              <span key={text}>
                <CheckCircle2 size={18} />
                {text}
              </span>
            ))}
          </div>
          <ArchivedNote>
            Benefit statements are archived storefront copy. Catalog pricing,
            stock and sort data are demonstration fixtures.
          </ArchivedNote>
        </header>
        <div className="p1-filter-toolbar">
          <button className="p1-filter-trigger" onClick={() => setOpen(true)}>
            FILTER <SlidersHorizontal size={16} />
          </button>
          {hasFilters && (
            <button
              className="p1-link-button"
              onClick={() => setFilters(initialFilters)}
            >
              Clear all filters
            </button>
          )}
          {filters.sale && <span>On Sale</span>}
        </div>
        {visible.length ? (
          <div className="p1-product-grid">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p1-catalog-empty" role="status">
            <h2>No products found</h2>
            <p>No products match your current filters.</p>
            <button
              className="p1-btn"
              onClick={() => setFilters(initialFilters)}
            >
              CLEAR FILTERS
            </button>
          </div>
        )}
      </section>
      <Guarantee />
      <FAQ />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="FILTER"
        className="p1-filter-drawer"
      >
        <div className="p1-filter-fields">
          <label className="p1-filter-sale">
            <input
              type="checkbox"
              checked={filters.sale}
              onChange={(e) =>
                setFilters({ ...filters, sale: e.target.checked })
              }
            />{' '}
            On Sale
          </label>
          <label>
            <span className="p1-sr-only">Set price</span>
            <select
              value={filters.price}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  price: e.target.value as CatalogFilters['price'],
                })
              }
            >
              <option value="all">Set Price</option>
              <option value="under25">Under $25</option>
              <option value="25to50">$25–$50</option>
              <option value="over50">Over $50</option>
            </select>
          </label>
          <small>
            Price ranges are demo controls; no ranges were captured in C04.
          </small>
          <label>
            <span className="p1-sr-only">Stock availability</span>
            <select
              value={filters.stock}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  stock: e.target.value as CatalogFilters['stock'],
                })
              }
            >
              <option value="all">Select All</option>
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </label>
          <label>
            <span className="p1-sr-only">Sort products</span>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              {[
                ['default', 'Default'],
                ['popular', 'Popularity'],
                ['rating', 'Average rating'],
                ['newest', 'Newest'],
                ['oldest', 'Oldest'],
                ['az', 'Name A–Z'],
                ['za', 'Name Z–A'],
                ['price-low', 'Price: low to high'],
                ['price-high', 'Price: high to low'],
              ].map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <div className="hp:grid hp:grid-cols-2 hp:gap-5">
            <button onClick={() => setOpen(false)}>FILTER</button>
            <button onClick={() => setFilters(initialFilters)}>CLEAR</button>
          </div>
          <p role="status">
            {visible.length} products. Filters apply automatically.
          </p>
        </div>
      </Modal>
    </>
  );
}
