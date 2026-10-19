import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { authenticateMock, mockAccounts, mockCheckoutDetails, mockPassword, restoreMockSession } from './accounts.ts';
import { validateCheckout } from './checkout.ts';

test('only fixture credentials authenticate; email and username are normalized', () => {
  assert.equal(authenticateMock(' CUSTOMER@EXAMPLE.COM ', mockPassword)?.id, 'customer');
  assert.equal(authenticateMock('subscriber', mockPassword)?.subscription, true);
  assert.equal(authenticateMock('customer', 'wrong'), undefined);
  assert.equal(authenticateMock('unknown@example.com', mockPassword), undefined);
});
test('session restoration rejects malformed and unknown accounts', () => {
  for (const raw of [null, '{', '{}', 'null', '{"accountId":"admin","status":"active","skipped":false}', '{"accountId":"customer","status":"unknown","skipped":false}']) {
    assert.equal(restoreMockSession(raw), null);
  }
  const session = { accountId: 'subscriber', status: 'paused', skipped: true };
  assert.deepEqual(restoreMockSession(JSON.stringify(session)), session);
});
test('both fixture addresses pass checkout validation without bypassing recurring consent', () => {
  for (const account of mockAccounts) {
    const details = mockCheckoutDetails(account);
    assert.deepEqual(validateCheckout(details, true, false, false), {});
    assert.ok(validateCheckout(details, true, true, false).consent);
  }
});
