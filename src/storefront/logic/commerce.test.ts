import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { catalog } from '../data/catalog.ts';
import {
  addLine,
  emptyCart,
  filterProducts,
  initialFilters,
  quote,
  restoreCart,
  serializeCart,
} from './commerce.ts';
import { validateCheckout } from './checkout.ts';

test('audit checkout totals stay consistent across protection and shipping changes', () => {
  const cart = addLine(emptyCart(), {
    product: 'honey',
    mode: 'one-time',
    quantity: 1,
  });
  assert.equal(quote(cart).total, 7000);
  assert.equal(quote({ ...cart, protection: true }).subtotal, 6756);
  assert.equal(quote({ ...cart, protection: true }).total, 7256);
  assert.equal(
    quote({ ...cart, protection: true, shipping: 'express' }).total,
    7923,
  );
  assert.equal(quote({ ...cart, shipping: 'express' }).total, 7667);
  assert.equal(
    quote(cart, 'WELCOME10').discount,
    0,
    'No unsolicited working coupon',
  );
});

test('mixed orders earn gifts by Honey box count and renew only subscription lines', () => {
  let cart = addLine(emptyCart(), {
    product: 'honey',
    mode: 'subscription',
    quantity: 1,
  });
  cart = addLine(cart, { product: 'honey', mode: 'one-time', quantity: 1 });
  assert.equal(quote(cart).total, 11500);
  assert.equal(quote(cart).giftSachets, 3);
  assert.equal(quote(cart).nextTotal, 5500);
  cart = addLine(cart, { product: 'honey', mode: 'one-time', quantity: 1 });
  assert.equal(quote(cart).giftSachets, 3, 'Gift is per order, not per box');
  assert.equal(
    quote({ ...cart, lines: cart.lines.slice(0, 1) }).giftSachets,
    0,
  );
  assert.equal(quote({ ...cart, protection: true }).nextTotal, 5500);
});

test('catalog supports the observed ten / seven / zero scenarios and sorting', () => {
  assert.equal(filterProducts(catalog, initialFilters).length, 10);
  assert.equal(
    filterProducts(catalog, { ...initialFilters, sale: true }).length,
    7,
  );
  assert.equal(
    filterProducts(catalog, { ...initialFilters, stock: 'out' }).length,
    0,
  );
  const az = filterProducts(catalog, { ...initialFilters, sort: 'az' }).map(
    (p) => p.name,
  );
  assert.deepEqual(
    az,
    [...az].sort((a, b) => a.localeCompare(b)),
  );
  assert.equal(
    filterProducts(catalog, { ...initialFilters, price: 'under25' }).length,
    2,
  );
});

test('stored carts validate schema, merge lines and prevent accessory subscriptions', () => {
  const cart = addLine(emptyCart(), {
    product: 'shaker-white',
    mode: 'subscription',
    quantity: 1,
  });
  assert.equal(cart.lines[0].mode, 'one-time');
  assert.deepEqual(
    restoreCart(
      serializeCart({ ...cart, protection: true, shipping: 'express' }),
    ),
    { ...cart, protection: true, shipping: 'express' },
  );
  const restored = restoreCart(
    JSON.stringify({
      version: 1,
      lines: [
        null,
        { product: 'missing', mode: 'one-time', quantity: 4 },
        { product: 'honey', mode: 'one-time', quantity: 1 },
        { product: 'honey', mode: 'one-time', quantity: 3 },
      ],
    }),
  );
  assert.equal(restored.lines.length, 1);
  assert.equal(restored.lines[0].quantity, 4);
  assert.deepEqual(restoreCart('invalid-json'), emptyCart());
  assert.deepEqual(restoreCart('{"version":2,"lines":[]}'), emptyCart());
});

test('checkout validates alternative billing and recurring consent independently', () => {
  const draft = {
    email: 'demo@example.com',
    deliveryCountry: 'United States',
    deliveryFirst: 'Demo',
    deliveryLast: 'Buyer',
    deliveryAddress: '123 Example Street',
    deliveryCity: 'Austin',
    deliveryState: 'TX',
    deliveryZip: '78701',
  };
  assert.deepEqual(validateCheckout(draft, true, false, false), {});
  assert.ok(validateCheckout(draft, true, true, false).consent);
  assert.deepEqual(validateCheckout(draft, true, true, true), {});
  assert.ok(validateCheckout(draft, false, false, false).billingAddress);
  assert.ok(
    validateCheckout({ ...draft, deliveryZip: 'bad' }, true, false, false)
      .deliveryZip,
  );
  assert.ok(
    validateCheckout(
      { ...draft, email: 'bad', deliveryCountry: 'Canada' },
      true,
      false,
      false,
    ).email,
  );
});
