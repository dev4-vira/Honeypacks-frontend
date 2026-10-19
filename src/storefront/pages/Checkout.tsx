import { useId, useRef } from 'react';
import type { FormEvent } from 'react';
import {
  ShoppingCart,
  ShieldCheck,
  Package,
  FlaskConical,
  CreditCard,
  LockKeyhole,
} from 'lucide-react';
import { assets } from '../data/catalog';
import { productRepository } from '../services/productRepository';
import { money, quote, rules, unitPrice } from '../logic/commerce';
import { useCheckout } from '../state/useCheckout';
import { states } from '../logic/checkout';
import type { CheckoutDraft as Draft } from '../logic/checkout';
import { useStorefront } from '../state/StorefrontProvider';
import { useAccount } from '../state/AccountProvider';
import { mockCheckoutDetails } from '../logic/accounts';
import { StoreLink } from '../components/navigation';
import { ArchivedNote } from '../components/UI';
import { Reviews } from '../components/CommerceBlocks';

type FieldProps = {
  name: string;
  label: string;
  draft: Draft;
  setValue: (name: string, value: string) => void;
  errors: Draft;
  type?: string;
  optional?: boolean;
  options?: string[];
};
function Field({
  name,
  label,
  draft,
  setValue,
  errors,
  type = 'text',
  optional = false,
  options,
}: FieldProps) {
  const id = useId();
  return (
    <label className="p1-checkout-field" htmlFor={id}>
      <span>
        {label}
        {optional ? ' (optional)' : ''}
      </span>
      {options ? (
        <select
          id={id}
          name={name}
          value={draft[name] ?? ''}
          onChange={(e) => setValue(name, e.target.value)}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${id}-error` : undefined}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={draft[name] ?? ''}
          onChange={(e) => setValue(name, e.target.value)}
          autoComplete="off"
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${id}-error` : undefined}
        />
      )}{' '}
      {errors[name] && (
        <small id={`${id}-error`} className="p1-form-error">
          {errors[name]}
        </small>
      )}
    </label>
  );
}
function Address({
  prefix,
  draft,
  setValue,
  errors,
}: {
  prefix: string;
  draft: Draft;
  setValue: FieldProps['setValue'];
  errors: Draft;
}) {
  const common = { draft, setValue, errors };
  return (
    <div className="p1-address-fields">
      <Field
        {...common}
        name={`${prefix}Country`}
        label="Country"
        options={['United States']}
      />
      <div className="hp:grid hp:grid-cols-2 hp:gap-3">
        <Field {...common} name={`${prefix}First`} label="First name" />
        <Field {...common} name={`${prefix}Last`} label="Last name" />
      </div>
      <Field {...common} name={`${prefix}Address`} label="Address" />
      <Field
        {...common}
        name={`${prefix}Apartment`}
        label="Apt, suite, etc."
        optional
      />
      <Field {...common} name={`${prefix}City`} label="City" />
      <div className="hp:grid hp:grid-cols-2 hp:gap-3">
        <Field
          {...common}
          name={`${prefix}State`}
          label="State / province"
          options={states}
        />
        <Field {...common} name={`${prefix}Zip`} label="Postal code" />
      </div>
    </div>
  );
}

export default function Checkout() {
  const auth = useAccount();
  const store = useStorefront();
  const {
    draft,
    setValue,
    sameBilling,
    setSameBilling,
    payment,
    setPayment,
    consent,
    setConsent,
    errors,
    message,
    setMessage,
    coupon,
    setCoupon,
    appliedCoupon,
    couponMessage,
    applyCoupon: applyCode,
    validate,
  } = useCheckout();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const totals = quote(store.cart, appliedCoupon);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(totals.nextItems > 0);
    if (Object.keys(next).length) {
      (
        event.currentTarget.elements.namedItem(
          Object.keys(next)[0],
        ) as HTMLElement | null
      )?.focus();
      return;
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  }
  function applyCoupon(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applyCode();
  }
  if (!store.cart.lines.length)
    return (
      <section className="p1-checkout-empty">
        <StoreLink to="/" className="p1-checkout-logo">
          <img src={assets.logoBlack} alt="HoneyPacks" />
        </StoreLink>
        <h1>Your cart is empty</h1>
        <p>Add a product before continuing to the demo checkout.</p>
        <StoreLink to="/products" className="p1-btn">
          VIEW PRODUCTS
        </StoreLink>
      </section>
    );
  return (
    <div className="p1-checkout">
      <div className="p1-checkout-layout">
        <section className="p1-checkout-left">
          <StoreLink
            to="/"
            className="p1-checkout-logo"
            aria-label="HoneyPacks home"
          >
            <img
              src={assets.logoBlack}
              alt="HoneyPacks"
              width="200"
              height="200"
            />
          </StoreLink>
          <h1 className="p1-sr-only">Checkout</h1>
          <div className="p1-checkout-trust">
            3rd Party Lab Tested | Fast &amp; Discreet Shipping
          </div>
          <p className="p1-checkout-reference">
            Archived storefront banner. Claims not independently verified.
          </p>
          <p className="p1-express-label">Express checkout</p>
          <div className="p1-express-pay">
            <button
              onClick={() => {
                setPayment('apple');
                setMessage(
                  'Apple Pay selected for demonstration. No wallet was opened; complete the form to review the demo.',
                );
              }}
            >
              Apple Pay
            </button>
            <button
              onClick={() => {
                setPayment('google');
                setMessage(
                  'Google Pay selected for demonstration. No wallet was opened; complete the form to review the demo.',
                );
              }}
            >
              <span>G</span> Pay
            </button>
          </div>
          <div className="p1-checkout-or">OR</div>
          <form ref={formRef} onSubmit={submit} noValidate>
            <section>
              <div className="p1-checkout-contact-title">
                <h2>Contact</h2>
                {auth.account ? <div>
                  <StoreLink to="/account">{auth.account.name} · Demo account</StoreLink>
                  <button type="button" className="p1-btn" onClick={() => {
                    if (auth.account) Object.entries(mockCheckoutDetails(auth.account)).forEach(([name, value]) => setValue(name, value));
                  }}>Use demo account details</button>
                </div> : <StoreLink to="/account/login?next=checkout">Log in</StoreLink>}
              </div>
              <Field
                name="email"
                label="Email"
                type="email"
                draft={draft}
                setValue={setValue}
                errors={errors}
              />
              <Field
                name="phone"
                label="Phone"
                type="tel"
                draft={draft}
                setValue={setValue}
                errors={errors}
                optional
              />
              <label className="p1-check-label">
                <input type="checkbox" />
                Sign up for exclusive offers and updates
              </label>
            </section>
            <section>
              <h2>Delivery</h2>
              <Address
                prefix="delivery"
                draft={draft}
                setValue={setValue}
                errors={errors}
              />
              <p className="p1-note">
                US demo addresses only. Details remain in memory and are never
                sent or saved to local storage.
              </p>
            </section>
            <section>
              <h2>Shipping method</h2>
              <div className="p1-shipping-methods">
                <label>
                  <input
                    type="radio"
                    name="shipping"
                    checked={store.cart.shipping === 'ground'}
                    onChange={() => store.setShipping('ground')}
                  />
                  <span>USPS Ground Advantage</span>
                  <strong>
                    {totals.items - totals.discount >= rules.freeShipping
                      ? 'Free'
                      : money(rules.ground)}
                  </strong>
                </label>
                <label>
                  <input
                    type="radio"
                    name="shipping"
                    checked={store.cart.shipping === 'express'}
                    onChange={() => store.setShipping('express')}
                  />
                  <span>Expedited Shipping</span>
                  <strong>{money(rules.express)}</strong>
                </label>
              </div>
            </section>
            <section>
              <h2>Billing address</h2>
              <label className="p1-check-label">
                <input
                  type="checkbox"
                  checked={sameBilling}
                  onChange={(e) => setSameBilling(e.target.checked)}
                />
                Billing address same as shipping address
              </label>
              {!sameBilling && (
                <Address
                  prefix="billing"
                  draft={draft}
                  setValue={setValue}
                  errors={errors}
                />
              )}
            </section>
            <section>
              <h2>Payment method</h2>
              <div className="p1-payment-options">
                {[
                  ['card', 'Card'],
                  ['apple', 'Apple Pay'],
                  ['google', 'Google Pay'],
                ].map(([value, label]) => (
                  <div key={value}>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value={value}
                        checked={payment === value}
                        onChange={() => setPayment(value)}
                      />
                      {value === 'card' && <CreditCard size={23} />}
                      <strong>{label}</strong>
                      <small>Demo</small>
                    </label>
                    {payment === value &&
                      (value === 'card' ? (
                        <div className="p1-card-placeholder">
                          <span>Card information</span>
                          <div aria-label="Non-editable card placeholder">
                            Card details are disabled in this demo
                            <div>
                              <span>MM / YY</span>
                              <span>CVC</span>
                              <LockKeyhole size={16} />
                            </div>
                          </div>
                          <small>
                            No card number can be entered or collected.
                          </small>
                        </div>
                      ) : (
                        <p className="p1-wallet-note">
                          {label} is a visual demonstration. No wallet or
                          payment SDK is connected.
                        </p>
                      ))}
                  </div>
                ))}
              </div>
            </section>
            {totals.nextItems > 0 && (
              <section className="p1-checkout-recurring">
                <h2>Recurring purchase</h2>
                <p>
                  {money(totals.nextTotal)} every 4 weeks:{' '}
                  {money(totals.nextItems)} in items +{' '}
                  {money(totals.nextShipping)} shipping. Initial shipping
                  protection does not recur.
                </p>
                <label className="p1-check-label">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    aria-invalid={!!errors.consent}
                    aria-describedby={
                      errors.consent ? 'p1-consent-error' : undefined
                    }
                  />
                  I understand the every-4-week selection shown above (demo).
                </label>
                {errors.consent && (
                  <p id="p1-consent-error" className="p1-form-error">
                    {errors.consent}
                  </p>
                )}
              </section>
            )}
            <p className="p1-checkout-terms">
              This is a local checkout demonstration. No payment processor is
              connected.{' '}
              <StoreLink to="/terms-conditions">Terms reference</StoreLink> ·{' '}
              <StoreLink to="/privacy-policy">Privacy reference</StoreLink>
            </p>
            <button type="submit" className="p1-complete-checkout">
              Complete checkout
            </button>
            <div
              ref={resultRef}
              tabIndex={-1}
              className={message ? 'p1-checkout-result' : ''}
              role="status"
            >
              {message}
            </div>
          </form>
        </section>
        <aside className="p1-checkout-summary">
          <StoreLink to="/" className="p1-continue-shopping">
            <ShoppingCart size={18} /> Continue shopping
          </StoreLink>
          <h2>Order summary</h2>
          <div className="p1-checkout-items">
            {store.cart.lines.map((line) => {
              const p = productRepository.get(line.product);
              return (
                <div key={`${line.product}-${line.mode}`}>
                  <span className="p1-summary-image">
                    <img src={p.image} alt="" />
                    <b>{line.quantity}</b>
                  </span>
                  <span>
                    {p.name}
                    <small>
                      {line.mode === 'subscription'
                        ? 'Every 4 weeks'
                        : 'One-time purchase'}{' '}
                      · {money(unitPrice(p, line.mode))} each
                    </small>
                  </span>
                  <strong>
                    {money(unitPrice(p, line.mode) * line.quantity)}
                  </strong>
                </div>
              );
            })}
            {totals.giftSachets > 0 && (
              <div>
                <span className="p1-summary-image">
                  <img src={assets.sachets} alt="" />
                </span>
                <span>
                  3 Free Sachets<small>Gift with 2+ Honey boxes</small>
                </span>
                <strong>$0.00</strong>
              </div>
            )}
            {totals.protection > 0 && (
              <div>
                <span className="p1-summary-image">
                  <Package size={34} />
                </span>
                <span>Add shipping protection</span>
                <strong>{money(totals.protection)}</strong>
              </div>
            )}
          </div>
          <form className="p1-promo-code" onSubmit={applyCoupon}>
            <label className="p1-sr-only" htmlFor="p1-coupon">
              Enter promo code
            </label>
            <input
              id="p1-coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter promo code"
            />
            <button disabled={!coupon.trim()} type="submit">
              Apply
            </button>
            <p role="status">{couponMessage}</p>
          </form>
          <dl className="p1-checkout-totals" aria-live="polite">
            <div>
              <dt>Items</dt>
              <dd>{money(totals.items)}</dd>
            </div>
            {totals.discount > 0 && (
              <div>
                <dt>Discount</dt>
                <dd>−{money(totals.discount)}</dd>
              </div>
            )}
            {totals.protection > 0 && (
              <div>
                <dt>Shipping protection</dt>
                <dd>{money(totals.protection)}</dd>
              </div>
            )}
            <div>
              <dt>Subtotal</dt>
              <dd>{money(totals.subtotal)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{totals.shipping ? money(totals.shipping) : 'Free'}</dd>
            </div>
            <div>
              <dt>Tax (demo)</dt>
              <dd>$0.00</dd>
            </div>
            <div className="p1-checkout-total">
              <dt>Total</dt>
              <dd>
                <small>USD</small> {money(totals.total)}
              </dd>
            </div>
          </dl>
          <label className="p1-check-label p1-summary-protection">
            <input
              type="checkbox"
              checked={store.cart.protection}
              onChange={(e) => store.setProtection(e.target.checked)}
            />
            Optional shipping protection (+{money(rules.protection)})
          </label>
          {totals.nextItems > 0 && (
            <p className="p1-summary-renewal">
              Next recurring total: {money(totals.nextTotal)} every 4 weeks,
              including shipping.
            </p>
          )}
          <button className="p1-link-button" onClick={store.openCart}>
            Edit cart
          </button>
          <div className="p1-checkout-or">Honey Packs</div>
          <div className="p1-checkout-benefits">
            <article>
              <ShieldCheck />
              <span>
                Hassle Free Returns
                <small>30 days · new and unopened products</small>
              </span>
            </article>
            <article>
              <Package />
              <span>
                Discreet Packaging
                <small>Archived storefront presentation</small>
              </span>
            </article>
            <article>
              <FlaskConical />
              <span>
                Third-Party Lab Tested Ingredients
                <small>Archived claim · verification not supplied</small>
              </span>
            </article>
          </div>
          <Reviews compact />
          <ArchivedNote>
            Checkout composition follows C10–C14. No order, invoice, wallet
            authorization or payment is created.
          </ArchivedNote>
        </aside>
      </div>
    </div>
  );
}
