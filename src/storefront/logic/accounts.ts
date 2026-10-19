// Public fixtures for navigation only. Never use these as production authentication.
export const mockPassword = 'HoneyDemo123!';
export const mockAccounts = [
  { id: 'customer', name: 'Alex Morgan', email: 'customer@example.com', subscription: false,
    order: 'DEMO-1001', product: 'Black Thai Honey 10 pack', total: 70 },
  { id: 'subscriber', name: 'Sam Taylor', email: 'subscriber@example.com', subscription: true,
    order: 'DEMO-1002', product: 'Black Thai Honey 10 pack', total: 55 },
] as const;
export type MockAccount = (typeof mockAccounts)[number];
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled';
export type MockSession = { accountId: string; status: SubscriptionStatus; skipped: boolean };
export function authenticateMock(username: string, password: string): MockAccount | undefined {
  if (password !== mockPassword) return undefined;
  const value = username.trim().toLowerCase();
  return mockAccounts.find(account => account.email === value || account.id === value);
}
export function restoreMockSession(raw: string | null): MockSession | null {
  try {
    const value = JSON.parse(raw ?? 'null');
    if (!value || !mockAccounts.some(account => account.id === value.accountId) ||
      !['active', 'paused', 'cancelled'].includes(value.status) || typeof value.skipped !== 'boolean') return null;
    return { accountId: value.accountId, status: value.status, skipped: value.skipped };
  } catch { return null; }
}
export function mockCheckoutDetails(account: MockAccount): Record<string, string> {
  const [first, last] = account.name.split(' ');
  return { email: account.email, deliveryFirst: first, deliveryLast: last,
    deliveryCountry: 'United States', deliveryAddress: '123 Demo Street',
    deliveryCity: 'Austin', deliveryState: 'TX', deliveryZip: '78701' };
}
