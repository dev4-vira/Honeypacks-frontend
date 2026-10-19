import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Check, Plus, RefreshCw, Package } from 'lucide-react';
import { assets, ingredients } from '../data/catalog';
import type { Product as ProductData, PurchaseMode } from '../data/catalog';
import { productRepository } from '../services/productRepository';
import { money, quote, unitPrice } from '../logic/commerce';
import { useStorefront } from '../state/StorefrontProvider';
import { StoreLink, useStorePath } from '../components/navigation';
import {
  Accordion,
  ArchivedNote,
  CheckList,
  Modal,
  Quantity,
  Stars,
} from '../components/UI';
import {
  FAQ,
  Guarantee,
  PaymentMarks,
  Related,
  Reviews,
  ShippingStrip,
} from '../components/CommerceBlocks';
import { NotFound } from './Information';

const honeyClaims = [
  'Improves blood flow in 15 minutes and last over 72 hours',
  'Shortens duration in between sessions',
  'naturally Increases testosterone and stamina',
];
const proClaims = [
  'Long-lasting stamina and energy boost',
  'Enhances desire, confidence, and performance',
  'Convenient, resealable pouches for freshness',
];

function Gallery({ product }: { product: ProductData }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  return (
    <div className="p1-product-gallery">
      <button
        className="p1-product-image"
        onClick={() => setZoom(true)}
        aria-label={`Enlarge ${product.shortName} image ${index + 1}`}
      >
        <img
          src={product.gallery[index]}
          alt={`${product.name}${index ? `, detail ${index}` : ''}`}
          width="632"
          height="632"
        />
        {product.badge && (
          <span
            className={`p1-badge ${product.id === 'pro-max' ? 'p1-badge-green' : product.id === 'beast' ? 'p1-badge-red' : ''}`}
          >
            {product.badge}
          </span>
        )}
        <span className="p1-image-zoom">
          <Plus size={19} />
        </span>
      </button>
      {product.gallery.length > 1 && (
        <div className="p1-product-thumbnails">
          {product.gallery.map((src, i) => (
            <button
              key={src}
              aria-label={`Show ${product.shortName} image ${i + 1}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <img src={src} alt="" width="88" height="88" />
            </button>
          ))}
        </div>
      )}
      <Modal
        open={zoom}
        onClose={() => setZoom(false)}
        title={`${product.shortName} — image ${index + 1}`}
        className="p1-image-modal"
      >
        <img src={product.gallery[index]} alt={product.name} />
        <a href={product.gallery[index]} target="_blank" rel="noreferrer">
          Open original image (new tab)
        </a>
      </Modal>
    </div>
  );
}

function ProductAccordions({ product }: { product: ProductData }) {
  return (
    <div className="p1-product-accordions">
      <Accordion title="Description">
        <p>{product.description}</p>
        {product.kind === 'accessory' ? (
          <p>
            This is an accessory. No supplement ingredients, performance claims
            or recurring plan apply.
          </p>
        ) : (
          <ArchivedNote />
        )}
      </Accordion>
      <Accordion title="Product Details">
        <ul>
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </Accordion>
      {product.kind !== 'accessory' && (
        <>
          <Accordion title="How To Use">
            <p>
              Approved complete usage instructions are not available in this
              reconstruction. The photographed label is reproduced for
              inspection; no new dosage recommendation is supplied.
            </p>
          </Accordion>
          <Accordion title="Supplements Facts">
            {product.id === 'honey' ? (
              <>
                <img
                  src={assets.facts}
                  alt="Published Honey 10 Pack supplement facts"
                />
                <table>
                  <caption>Published label · amount per serving</caption>
                  <tbody>
                    {ingredients.map(([name, amount]) => (
                      <tr key={name}>
                        <th scope="row">{name}</th>
                        <td>{amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p>
                  Label serving size: one sachet. Ten servings per container.
                </p>
              </>
            ) : (
              <p>
                The product-specific supplement facts were not supplied in the
                captured media. See the original packaging; verified
                transcription is pending.
              </p>
            )}
          </Accordion>
        </>
      )}
      <Accordion title="Shipping And Returns Information">
        <p>
          Standard US ground shipping is $5 under $75 and free from $75 in
          merchandise. Express is $11.67. Subscription shipping is calculated
          for each order.
        </p>
        <p>
          New, unopened products can be submitted for return within 30 days of
          delivery.
        </p>
        <StoreLink to="/returns-refunds">
          Return &amp; Refund Policies
        </StoreLink>
      </Accordion>
      {product.subscription !== undefined && (
        <Accordion title="Subscription Details">
          <>
            <p>
              {money(product.subscription)} per{' '}
              {product.kind === 'honey' ? 'box' : 'bottle'}, every 4 weeks. No
              real contract is created in this demo. Renewals have their own
              shipping calculation.
            </p>
            <StoreLink to="/manage-subscription">Manage Subscription</StoreLink>
          </>
        </Accordion>
      )}
    </div>
  );
}

function Purchase({
  product,
  beast = false,
}: {
  product: ProductData;
  beast?: boolean;
}) {
  const store = useStorefront();
  const [mode, setMode] = useState<PurchaseMode>(product.defaultMode);
  const [count, setCount] = useState(1);
  const [gift, setGift] = useState('sachets');
  const [details, setDetails] = useState(false);
  const price = unitPrice(product, mode);
  const comparison = product.listPrice ?? product.price;
  const totals = quote({
    lines: [{ product: product.id, mode, quantity: count }],
    protection: false,
    shipping: 'ground',
  });
  const isHoney = product.id === 'honey';
  const accessory = product.kind === 'accessory';
  return (
    <div
      className={`p1-buy-panel ${beast ? 'p1-beast-panel' : ''} ${accessory ? 'p1-accessory-panel' : ''}`}
    >
      {product.id === 'pro-max' && (
        <span className="p1-black-label">
          SUPER DUTY XXL — THE UPGRADE FROM GOLD
        </span>
      )}
      <h1>{product.name}</h1>
      {beast && (
        <p className="p1-note">
          Complete Testosterone Boosting Formula · 120 capsules
        </p>
      )}
      {!beast && (
        <div className="p1-product-rating">
          {accessory ? (
            <>
              <Stars empty />
              <a href="#p1-reviews">0 reviews</a>
            </>
          ) : product.kind === 'honey' ? (
            <>
              <Stars />
              <a href="#p1-reviews">
                <strong>{product.rating.toFixed(1)} / 5</strong>{' '}
                <u>
                  {product.reviewCount?.toLocaleString('en-US')}+ archived
                  reviews
                </u>
              </a>
            </>
          ) : (
            <a href="#p1-reviews">View product reviews</a>
          )}
        </div>
      )}
      <div className="p1-product-price" aria-live="polite">
        <strong>{money(price)}</strong>
        {comparison > price && (
          <>
            <del>{money(comparison)}</del>
            <span className="p1-saving-badge">
              SAVE {money(comparison - price).replace('.00', '')}
            </span>
          </>
        )}
        {product.units && (
          <small>
            Only {money(price / product.units)} per {product.unit}
          </small>
        )}
      </div>
      {product.kind === 'honey' && (
        <>
          <CheckList>{isHoney ? honeyClaims : proClaims}</CheckList>
          <ArchivedNote>
            Commercial copy and review totals from C06/C28; not independently
            verified.
          </ArchivedNote>
          <div className="p1-dispatch-label">
            <Package size={14} /> US WAREHOUSE · SHIPPING SHOWN AT CHECKOUT
          </div>
        </>
      )}
      {product.subscription !== undefined &&
        (beast ? (
          <fieldset className="p1-beast-plans">
            <legend>Choose your plan</legend>
            {(['one-time', 'subscription'] as const).map((option) => (
              <label
                key={option}
                className={mode === option ? 'p1-selected' : ''}
              >
                {option === 'subscription' && (
                  <span className="p1-plan-ribbon">
                    BEST VALUE <span>SAVE 20%</span>
                  </span>
                )}
                <img src={product.image} alt="" />
                <span>
                  <input
                    type="radio"
                    name="p1-purchase-mode"
                    value={option}
                    checked={mode === option}
                    onChange={() => setMode(option)}
                  />
                  <strong>
                    {option === 'one-time'
                      ? 'One-time purchase'
                      : 'Subscribe & save'}
                  </strong>
                  <small>
                    {option === 'one-time'
                      ? 'One bottle. No commitment.'
                      : 'Every 4 weeks. Cancel anytime.'}
                  </small>
                </span>
                <b>{money(unitPrice(product, option))}</b>
              </label>
            ))}
          </fieldset>
        ) : (
          <>
            <div className="p1-frequency-label">
              <span>Frequency:</span>
              <button onClick={() => setDetails(true)}>
                <RefreshCw size={14} /> Subscription Details
              </button>
            </div>
            <fieldset
              className={`p1-frequency-box ${mode === 'subscription' ? 'p1-selected' : ''}`}
            >
              <legend className="p1-sr-only">Purchase frequency</legend>
              <div className="p1-buy-one-summary">
                <img src={product.image} alt="" />
                <div>
                  <strong>BUY 1 BOX</strong>
                  <p>
                    {comparison > price && <del>{money(comparison)}</del>}{' '}
                    <b>{money(price)}</b>{' '}
                    {comparison > price && `Save ${money(comparison - price)}`}
                  </p>
                  <small>{product.format}</small>
                </div>
              </div>
              <label className="p1-sub-radio">
                <span>
                  <input
                    type="radio"
                    name="p1-purchase-mode"
                    value="subscription"
                    checked={mode === 'subscription'}
                    onChange={() => setMode('subscription')}
                  />{' '}
                  <strong>SUBSCRIBE &amp; SAVE</strong>
                </span>
                <b>{money(product.subscription)}</b>
              </label>
              {mode === 'subscription' && (
                <>
                  <div className="p1-frequency-value">
                    Deliver every 4 weeks
                  </div>
                  <ul className="p1-plan-benefits">
                    <li>
                      <Check size={16} />
                      Save {money(product.price - product.subscription)} vs.
                      one-time purchase
                    </li>
                    <li>
                      <Check size={16} />
                      Free ground shipping on $75+ merchandise
                    </li>
                    <li>
                      <Check size={16} />
                      Pause, skip or cancel through your account
                    </li>
                    {isHoney && (
                      <li>
                        <Check size={16} />3 free sachets with at least 2 Honey
                        boxes
                      </li>
                    )}
                  </ul>
                  {isHoney && (
                    <>
                      <h3>Choose Your Free Gift</h3>
                      <div className="p1-gift-options">
                        {[
                          ['sachets', assets.sachets, '3 sachets'],
                          ['beast', assets.beast, 'Beast Mode'],
                          [
                            'maxx',
                            '/assets/storefront/maxx-nut.jpg',
                            'Maxx Nut',
                          ],
                        ].map(([id, src, label]) => (
                          <button
                            key={id}
                            className={gift === id ? 'p1-selected' : ''}
                            aria-pressed={gift === id}
                            onClick={() => setGift(id)}
                          >
                            <img src={src} alt="" />
                            <span>{label}</span>
                          </button>
                        ))}
                      </div>
                      <p className="p1-note">
                        Gift selection is a visual demo. Only 3 sachets with 2+
                        Honey boxes are calculated; other shown gifts are
                        previews, not included items.
                      </p>
                    </>
                  )}
                </>
              )}
            </fieldset>
            <label
              className={`p1-onetime-option ${mode === 'one-time' ? 'p1-selected' : ''}`}
            >
              <span>
                <input
                  type="radio"
                  name="p1-purchase-mode"
                  value="one-time"
                  checked={mode === 'one-time'}
                  onChange={() => setMode('one-time')}
                />{' '}
                ONE-TIME PURCHASE
              </span>
              <strong>{money(product.price)}</strong>
            </label>
          </>
        ))}
      <div className="p1-product-quantity">
        <span>Quantity</span>
        <Quantity value={count} onChange={setCount} />
        <span>{money(totals.items)}</span>
      </div>
      <button
        className="p1-btn p1-add-cart"
        data-testid="add-to-cart"
        disabled={!product.stock}
        onClick={() => store.add(product.id, mode, count)}
      >
        {beast ? 'BUILD YOUR DAILY EDGE' : 'ADD TO CART'}
      </button>
      <ShippingStrip />
      <PaymentMarks />
      <p className="p1-note" aria-live="polite">
        Estimated today: {money(totals.total)} with US ground shipping and $0
        demo tax.
        {mode === 'subscription' &&
          ` Recurring: ${money(totals.nextTotal)} every 4 weeks, including ${money(totals.nextShipping)} shipping.`}
      </p>
      <ProductAccordions product={product} />
      {!accessory && (
        <div className="p1-media-preview">
          <h3>What They Say</h3>
          <div>
            {[1, 2, 3].map((n) => (
              <div key={n}>
                <span>Video {n}</span>
                <small>Archived media unavailable</small>
              </div>
            ))}
          </div>
          <p className="p1-note">
            Video files were not captured. No simulated playback or testimonial
            is presented.
          </p>
        </div>
      )}
      <Modal
        open={details}
        onClose={() => setDetails(false)}
        title="Subscription Details"
      >
        <div className="p1-modal-body">
          <p>
            {money(product.subscription ?? product.price)} every 4 weeks, per
            box. One-time purchase is {money(product.price)}.
          </p>
          <p>
            Shipping is assessed on each order. Ground shipping is $5 under $75,
            or free from $75. Protection is optional for the initial order only.
          </p>
          {isHoney && (
            <p>
              The demo adds 3 free individual sachets with 2 or more Honey
              boxes. It does not award gifts per box.
            </p>
          )}
          <StoreLink
            to="/manage-subscription"
            onClick={() => setDetails(false)}
          >
            Manage Subscription
          </StoreLink>
        </div>
      </Modal>
    </div>
  );
}

function ProductView({ product }: { product: ProductData }) {
  const beast = product.id === 'beast';
  const accessory = product.kind === 'accessory';
  return (
    <>
      <section
        className={`p1-product-top ${beast ? 'p1-beast-layout' : accessory ? 'p1-accessory-layout' : ''}`}
      >
        {beast && (
          <div className="p1-beast-copy">
            <span className="p1-black-label">
              YOUR PERFORMANCE STARTS BEFORE THE BEDROOM
            </span>
            <h2>BUILD THE DRIVE BEHIND THE PERFORMANCE.</h2>
            <p>
              Healthy testosterone affects more than sex. Beast Mode supports
              your energy, muscle, recovery, confidence and libido every day.*
            </p>
            <div>
              <Stars />
              <small>Rated as “Excellent” 4.8 / 5 / 2,340+ reviews</small>
            </div>
            <CheckList>
              {[
                'Supports healthy testosterone levels*',
                'Supports muscle, libido & blood flow*',
                '9-part nutrient + botanical formula',
              ]}
            </CheckList>
            <ArchivedNote>
              Copy and rating reproduced from C29, not an independent
              assessment.
            </ArchivedNote>
          </div>
        )}
        <Gallery product={product} />
        <Purchase product={product} beast={beast} />
      </section>
      {!accessory && (
        <>
          <section className="p1-product-story p1-container">
            <img
              src={product.id === 'honey' ? assets.lifestyle : product.image}
              alt={`${product.shortName} published product image`}
              loading="lazy"
            />
            <div>
              <h2>{product.shortName.toUpperCase()}</h2>
              <p>{product.format}</p>
              <p>
                Explore the original packaging and select the purchase option
                that suits you. Your price, shipping and recurring terms stay
                visible throughout the demo.
              </p>
              <StoreLink className="p1-btn" to="/contact-us">
                HAVE A QUESTION? CONTACT US
              </StoreLink>
            </div>
          </section>
          <Guarantee />
          <FAQ />
        </>
      )}
      <Reviews product={product} />
      <Related exclude={product.id} />
      {accessory && <Guarantee />}
    </>
  );
}
export default function Product() {
  const { slug = '' } = useParams();
  const path = useStorePath();
  const store = useStorefront();
  const alias: Record<string, string> = {
    'honey-10-pack': 'black-thai-honey-10-pack',
    'pro-max': 'black-thai-honey-pro-max',
  };
  if (alias[slug])
    return <Navigate to={path(`/products/${alias[slug]}`)} replace />;
  const product = productRepository.findBySlug(slug);
  if (!product) return <NotFound />;
  return (
    <ProductView
      key={`${product.id}-${store.resetVersion}`}
      product={product}
    />
  );
}
