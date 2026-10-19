import { useState } from 'react';
import { ShieldCheck, Truck, Package, Plus, Search } from 'lucide-react';
import type { Product } from '../data/catalog';
import { archivedReviews, assets } from '../data/catalog';
import { money } from '../logic/commerce';
import { useStorefront } from '../state/StorefrontProvider';
import { productRepository } from '../services/productRepository';
import { StoreLink } from './navigation';
import { ArchivedNote, Stars } from './UI';

export function ProductCard({ product }: { product: Product }) {
  const store = useStorefront();
  return (
    <article className="p1-product-card">
      <div className="p1-card-visual">
        <StoreLink
          to={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width="450"
            height="450"
          />
        </StoreLink>
        {product.badge && (
          <span
            className={`p1-badge ${product.id === 'pro-max' ? 'p1-badge-green' : product.id === 'beast' ? 'p1-badge-red' : ''}`}
          >
            {product.badge}
          </span>
        )}
        <button
          className="p1-btn"
          disabled={!product.stock}
          onClick={() => store.add(product.id, 'one-time')}
        >
          {product.stock ? 'ADD TO CART' : 'OUT OF STOCK'}
        </button>
      </div>
      <StoreLink to={`/products/${product.slug}`} className="p1-card-name">
        {product.name}
      </StoreLink>
      <p className="p1-card-price">
        {product.listPrice && <del>{money(product.listPrice)}</del>}
        <strong>{money(product.price)}</strong>
      </p>
      <small className="p1-stock">
        {product.stock ? '● In stock' : 'Out of stock'}
      </small>
    </article>
  );
}
export function Related({ exclude }: { exclude?: string }) {
  return (
    <section className="p1-container p1-related">
      <h2 className="p1-section-title">YOU MAY ALSO LIKE</h2>
      <img className="p1-swish" src={assets.underline} alt="" />
      <div className="p1-product-grid">
        {productRepository
          .list()
          .filter((p) => p.id !== exclude)
          .slice(0, 3)
          .map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
      </div>
    </section>
  );
}
export function ShippingStrip() {
  return (
    <div className="p1-shipping-strip">
      <span>
        <Truck size={19} />
        Free Shipping Over $75
      </span>
      <span>
        <Package size={18} />
        Discreet Packaging
      </span>
    </div>
  );
}
export function PaymentMarks() {
  return (
    <div
      className="p1-payment-marks"
      aria-label="Payment methods represented in the archived storefront"
    >
      <span>Apple Pay</span>
      <span>AMEX</span>
      <span>VISA</span>
      <span className="p1-mastercard">●●</span>
      <span>G Pay</span>
      <span>DISCOVER</span>
      <small>Demo</small>
    </div>
  );
}
export function Guarantee() {
  return (
    <section className="p1-container p1-guarantee-wrap">
      <div className="p1-guarantee">
        <div className="p1-guarantee-seal">
          <ShieldCheck size={34} />
        </div>
        <h2>TRY IT NOW. RISK-FREE TRIAL.</h2>
        <p>
          Request a return within 30 days of delivery for new, unopened
          products.
        </p>
        <div>
          <span>✹ 30 day money back guarantee</span>
          <span>✹ Return any unopened packs</span>
        </div>
        <StoreLink to="/returns-refunds">
          Read the return &amp; refund policy
        </StoreLink>
      </div>
    </section>
  );
}

const faqQuestions = [
  [
    'How quickly will I see results?',
    'Archived answer: “Around 30 minutes. Tear, swallow, give it a beat. Energy ramps first, blood flow follows. Effects run up to 24 hours per sachet.” This is the store’s October 15 claim, not a verified outcome or usage recommendation.',
  ],
  [
    'Is it safe to use with my current medication?',
    'The complete answer was not captured in the audit. Medication compatibility is not established by this demo. Consult a qualified healthcare professional before use.',
  ],
  [
    'How does this compare to dick pills?',
    'This question appeared in the archived FAQ. Its complete answer and comparative evidence were not captured. No medical comparison is made in this demo.',
  ],
  [
    'Can it help with more than just erections?',
    'This question is reproduced from the archived storefront. The complete answer was not captured; no additional benefit is asserted here.',
  ],
  [
    'What if it doesn’t work for me?',
    'The demo follows the 30-day return policy for new, unopened products, measured from delivery. Contact us to review the request.',
  ],
  [
    'How should I take this?',
    'Inspect the published product label. Complete approved usage instructions are pending; this reconstruction does not add a dosage recommendation.',
  ],
  [
    'How much should I take?',
    'Dosage guidance was not verified in the audit. Read the original label and seek professional advice where appropriate.',
  ],
];
export function FAQ() {
  return (
    <section className="p1-faq">
      <div className="p1-container p1-faq-layout">
        <div>
          <h2>
            FREQUENTLY ASKED
            <br />
            QUESTIONS
          </h2>
          <p>For questions, support, or anything in between.</p>
          <img src={assets.underline} className="p1-swish" alt="" />
          <StoreLink to="/contact-us">Contact Us</StoreLink>
        </div>
        <div>
          {faqQuestions.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <Plus size={15} />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews({
  empty = false,
  compact = false,
  product,
}: {
  empty?: boolean;
  compact?: boolean;
  product?: Product;
}) {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [sort, setSort] = useState('recent');
  const count = product ? product.reviewCount : empty ? 0 : 86784;
  const hasExcerpts = !empty && (!product || product.kind === 'honey');
  const reviews = !hasExcerpts
    ? []
    : archivedReviews.filter((r) =>
        `${r.title} ${r.text} ${r.name}`
          .toLowerCase()
          .includes(submitted.toLowerCase()),
      );
  const sorted =
    sort === 'name'
      ? [...reviews].sort((a, b) => a.name.localeCompare(b.name))
      : reviews;
  return (
    <section
      className={`p1-reviews ${compact ? 'p1-reviews-compact' : 'p1-container'}`}
      id={compact ? undefined : 'p1-reviews'}
      aria-label="Customer reviews"
    >
      <h2>{compact ? 'Customer reviews' : 'WHAT THEY SAY'}</h2>
      {!compact && (
        <>
          <div className="p1-rating-overview">
            <div>
              <strong>
                {count === null
                  ? '—'
                  : count === 0
                    ? '0.0'
                    : (product?.rating ?? 4.9).toFixed(1)}
              </strong>
              <Stars empty={!count} />
              <span>
                {count === null
                  ? 'Review total not supplied in the audit'
                  : count === 0
                    ? 'Based on 0 reviews'
                    : `${count.toLocaleString('en-US')}+ reviews — archived reference`}
              </span>
            </div>
            <div>
              {[5, 4, 3, 2, 1].map((n) => (
                <div className="p1-rating-bar" key={n}>
                  {n} <span>★</span>
                  <i />
                  <span>{count === 0 ? '0%' : '—'}</span>
                </div>
              ))}
            </div>
          </div>
          <form
            className="p1-review-search"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(query);
            }}
          >
            <label>
              <Search size={18} />
              <span className="p1-sr-only">
                Search archived customer reviews
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search customer reviews"
              />
            </label>
            <button type="submit">Search</button>
          </form>
          <div className="p1-review-toolbar">
            <span>{reviews.length} archived excerpts</span>
            <label>
              <span className="p1-sr-only">Sort reviews</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="recent">Most Recent</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>
        </>
      )}
      {sorted.length ? (
        <div className="p1-review-cards">
          {sorted.map((review) => (
            <article key={review.name}>
              <h3>{review.title}</h3>
              <blockquote>{review.text}</blockquote>
              <div>
                <span>
                  <strong>{review.name}</strong>
                  <small>{review.location}</small>
                </span>
                <Stars />
              </div>
              <small className="p1-review-source">
                Archived attribution: {review.source}
              </small>
            </article>
          ))}
        </div>
      ) : (
        <p className="p1-no-reviews">
          {count && !hasExcerpts
            ? 'No product-specific written reviews were supplied in the audit.'
            : 'Sorry, no reviews match your current selections.'}
        </p>
      )}
      {!!count && (
        <ArchivedNote>
          Displayed totals are archived site claims; ratings distribution is
          unavailable.
          {hasExcerpts &&
            ' The two C14 checkout testimonials are storefront excerpts, not verified product-specific reviews.'}{' '}
          No new or independently verified reviews are presented.
        </ArchivedNote>
      )}
    </section>
  );
}
