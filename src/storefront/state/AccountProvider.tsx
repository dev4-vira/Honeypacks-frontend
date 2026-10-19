import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { authenticateMock, mockAccounts, restoreMockSession } from '../logic/accounts';
import type { MockAccount, MockSession, SubscriptionStatus } from '../logic/accounts';

const key = 'honeypacks-mock-session-v1';
type AccountState = {
  account: MockAccount | undefined;
  session: MockSession | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setStatus: (status: SubscriptionStatus) => void;
  skip: () => void;
  reset: () => void;
};
const Context = createContext<AccountState | null>(null);
export function AccountProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<MockSession | null>(() => {
    try { return restoreMockSession(sessionStorage.getItem(key)); } catch { return null; }
  });
  useEffect(() => {
    try {
      if (session) sessionStorage.setItem(key, JSON.stringify(session));
      else sessionStorage.removeItem(key);
    } catch { /* Continue in memory if storage is unavailable. */ }
  }, [session]);
  useEffect(() => {
    const clear = () => setSession(null);
    window.addEventListener('hp:storefront-reset', clear);
    return () => window.removeEventListener('hp:storefront-reset', clear);
  }, []);
  return <Context.Provider value={{
    account: mockAccounts.find(account => account.id === session?.accountId), session,
    login: (username, password) => {
      const account = authenticateMock(username, password);
      if (!account) return false;
      setSession({ accountId: account.id, status: 'active', skipped: false });
      return true;
    },
    logout: () => setSession(null),
    setStatus: status => setSession(previous => previous ? { ...previous, status } : null),
    skip: () => setSession(previous => previous?.status === 'active' ? { ...previous, skipped: true } : previous),
    reset: () => setSession(previous => previous ? { ...previous, status: 'active', skipped: false } : null),
  }}>{children}</Context.Provider>;
}
export function useAccount() {
  const value = useContext(Context);
  if (!value) throw new Error('AccountProvider is required');
  return value;
}
