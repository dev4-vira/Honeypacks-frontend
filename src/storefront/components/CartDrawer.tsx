import { LockKeyhole, Trash2, Gift, Truck, Package } from 'lucide-react';
import { assets } from '../data/catalog';
import { productRepository } from '../services/productRepository';
import { money, quote, rules, unitPrice } from '../logic/commerce';
import { useStorefront } from '../state/StorefrontProvider';
import { StoreLink } from './navigation';
import { Modal, Quantity } from './UI';
import { PaymentMarks } from './CommerceBlocks';

export function CartDrawer() {
  const store = useStorefront();
  const totals = quote(store.cart);
  const recommended = ['pro-max', 'pregame', 'beast', 'maxx'] as const;
  return (
    <Modal
      open={store.cartOpen}
      onClose={store.closeCart}
      title={`CART (${store.cartCount})`}
      className={`p1-cart-drawer ${store.cart.lines.length ? '' : 'p1-cart-is-empty'}`}
    >
      <div className="p1-cart-inner">
        {!!store.cart.lines.length && (
          <div className="p1-cart-progress">
            <p>
              {totals.freeShippingRemaining ? (
                <>
                  You’re <strong>{money(totals.freeShippingRemaining)}</strong>{' '}
                  away from free ground shipping
                </>
              ) : (
                'Your order qualifies for free ground shipping'
              )}
            </p>
            <progress
              value={Math.min(totals.items, rules.freeShipping)}
              max={rules.freeShipping}
              aria-label="Progress toward free ground shipping"
            />
            <div>
              <span>
                <Truck size={18} />
                Free ground at $75
              </span>
              <span>
                <Gift size={18} />3 sachets with 2 Honey boxes
              </span>
            </div>
          </div>
        )}
        {!store.cart.lines.length && (
          <div className="p1-empty-cart">
            <ShoppingBagEmpty />
            <h3>Your cart is empty</h3>
            <p>Explore our products and find your HoneyPacks.</p>
          </div>
        )}
        <div className="p1-cart-lines">
          {store.cart.lines.map((line, index) => {
            const p = productRepository.get(line.product);
            return (
              <article
                key={`${line.product}-${line.mode}`}
                className="p1-cart-line"
              >
                <StoreLink to={`/products/${p.slug}`} onClick={store.closeCart}>
                  <img src={p.image} alt={p.shortName} />
                </StoreLink>
                <div>
                  <StoreLink
                    to={`/products/${p.slug}`}
                    onClick={store.closeCart}
                  >
                    {p.name}
                  </StoreLink>
                  <p>
                    {line.mode === 'subscription'
                      ? 'Subscribe · every 4 weeks'
                      : 'One-time purchase'}
                  </p>
                  <small>{money(unitPrice(p, line.mode))} each</small>
                  <Quantity
                    value={line.quantity}
                    onChange={(n) => store.update(index, n)}
                  />
                </div>
                <div>
                  <strong>
                    {money(unitPrice(p, line.mode) * line.quantity)}
                  </strong>
                  <button
                    aria-label={`Remove ${p.shortName} ${line.mode}`}
                    onClick={() => store.remove(index)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        {totals.giftSachets > 0 && (
          <div className="p1-cart-gift">
            <img src={assets.sachets} alt="Three free Honey sachets" />
            <div>
              <strong>3 Free Sachets</strong>
              <p>Demo gift: at least 2 Honey boxes.</p>
            </div>
            <strong>$0.00</strong>
          </div>
        )}
        <section className="p1-cart-recommendations">
          <h3>
            {store.cart.lines.length
              ? 'Complete Your Stack'
              : 'You may also like'}
          </h3>
          {recommended.map((id) => {
            const p = productRepository.get(id);
            return (
              <article key={id}>
                <StoreLink to={`/products/${p.slug}`} onClick={store.closeCart}>
                  <img src={p.image} alt="" />
                </StoreLink>
                <div>
                  <StoreLink
                    to={`/products/${p.slug}`}
                    onClick={store.closeCart}
                  >
                    {p.name}
                  </StoreLink>
                  <p>
                    {p.listPrice && <del>{money(p.listPrice)}</del>}{' '}
                    {money(p.price)}
                  </p>
                </div>
                <button
                  onClick={() => store.add(id)}
                  aria-label={`Add ${p.shortName}`}
                >
                  ADD +
                </button>
              </article>
            );
          })}
        </section>
      </div>
      <div className="p1-cart-bottom">
        {store.cart.lines.length ? (
          <>
            <label className="p1-protection">
              <Package size={27} />
              <span>
                <strong>
                  Add shipping protection (+{money(rules.protection)})
                </strong>
                <small>Optional · first order only</small>
              </span>
              <input
                type="checkbox"
                role="switch"
                checked={store.cart.protection}
                onChange={(e) => store.setProtection(e.target.checked)}
              />
            </label>
            <dl>
              <div>
                <dt>Items</dt>
                <dd>{money(totals.items)}</dd>
              </div>
              {store.cart.protection && (
                <div>
                  <dt>Shipping protection</dt>
                  <dd>{money(totals.protection)}</dd>
                </div>
              )}
              <div className="p1-cart-subtotal">
                <dt>Subtotal</dt>
                <dd>{money(totals.subtotal)}</dd>
              </div>
            </dl>
            <small>Shipping calculated at checkout. Tax $0 in this demo.</small>
            {totals.nextItems > 0 && (
              <p className="p1-cart-renewal">
                Recurring items: {money(totals.nextItems)} every 4 weeks, plus
                applicable shipping. No recurring protection.
              </p>
            )}
            <StoreLink
              className="p1-btn p1-btn-black"
              to="/checkout"
              onClick={store.closeCart}
            >
              <LockKeyhole size={16} /> SECURE CHECKOUT
            </StoreLink>
            <PaymentMarks />
            <button className="p1-link-button" onClick={store.closeCart}>
              Continue shopping
            </button>
          </>
        ) : (
          <StoreLink
            to="/products"
            className="p1-btn p1-btn-black"
            onClick={store.closeCart}
          >
            VIEW PRODUCTS
          </StoreLink>
        )}
      </div>
    </Modal>
  );
}
function ShoppingBagEmpty() {
  return <Package size={44} strokeWidth={1} />;
}
