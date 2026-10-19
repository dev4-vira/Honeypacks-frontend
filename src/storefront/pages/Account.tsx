import { useState } from 'react';
import type { FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAccount } from '../state/AccountProvider';
import { mockAccounts, mockPassword } from '../logic/accounts';
import { assets } from '../data/catalog';
import { StoreLink, useStorePath } from '../components/navigation';
import { DemoForm, DemoNotice } from '../components/UI';

export function Login() {
  const auth = useAccount();
  const navigate = useNavigate();
  const path = useStorePath();
  const [params] = useSearchParams();
  const destination = params.get('next') === 'checkout' ? '/checkout' : params.get('next') === 'subscriptions' ? '/manage-subscription' : '/account';
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const missing = !String(data.get('username') ?? '').trim()
      ? 'username'
      : !String(data.get('password') ?? '').trim()
        ? 'password'
        : '';
    setError(missing);
    if (missing) (form.elements.namedItem(missing) as HTMLElement)?.focus();
    if (!missing) {
      if (auth.login(String(data.get('username')), String(data.get('password')))) navigate(path(destination), { replace: true });
      else setError('credentials');
    }
  }
  if (auth.account) return <Navigate to={path(destination)} replace />;
  return (
    <section className="p1-account p1-text-container">
      <h1>My account</h1>
      <h2>Login</h2>
      <form
        className="p1-login-form"
        onSubmit={submit}
        onChange={() => setError('')}
        noValidate
      >
        <label>
          Username or email address <b>*</b>
          <input
            name="username"
            required
            autoComplete="off"
            aria-invalid={error === 'username'}
            aria-describedby={
              error === 'username' ? 'p1-login-error' : undefined
            }
          />
        </label>
        <label>
          Password <b>*</b>
          <span className="p1-password-field">
            <input
              name="password"
              required
              type={visible ? 'text' : 'password'}
              autoComplete="off"
              aria-invalid={error === 'password'}
              aria-describedby={
                error === 'password' ? 'p1-login-error' : undefined
              }
            />
            <button
              type="button"
              aria-label={visible ? 'Hide password' : 'Show password'}
              onClick={() => setVisible(!visible)}
            >
              {visible ? <Eye /> : <EyeOff />}
            </button>
          </span>
        </label>
        {error && (
          <p className="p1-form-error" id="p1-login-error" role="alert">
            {error === 'credentials' ? 'Invalid demo credentials. Use one of the accounts below.' : error === 'username' ? 'Enter your username or email address.' : 'Enter your demo password.'}
          </p>
        )}
        <div className="p1-login-actions">
          <button type="submit">Log in</button>
        </div>
        <StoreLink to="/account/lost-password">Lost your password?</StoreLink>
        <p className="p1-note">Temporary demo session for this tab. No real account or email is used. Signing out clears the session.</p>
      </form>
      <aside className="p1-mock-card" aria-label="Demo accounts">
        <h2>Try a demo account</h2>
        <p>Password for both accounts: <code>{mockPassword}</code></p>
        {mockAccounts.map(account => <div key={account.id}>
          <p><strong>{account.subscription ? 'Subscriber' : 'Customer'}</strong><br />{account.email}</p>
          <button className="p1-btn" type="button" onClick={() => {
            auth.login(account.email, mockPassword);
            navigate(path(destination), { replace: true });
          }}>Explore as {account.subscription ? 'subscriber' : 'customer'}</button>
        </div>)}
      </aside>
    </section>
  );
}
export function LostPassword() {
  return (
    <section className="p1-account p1-text-container p1-lost">
      <h1>Lost password</h1>
      <p>
        Lost your password? Please enter your username or email address. The
        original storefront sends a reset link; this demonstration only checks
        the form locally.
      </p>
      <DemoForm
        fields={[{ name: 'username', label: 'Username or email', wide: true }]}
        submit="Reset password"
        success="Demo reset request checked. No email was sent."
      />
      <StoreLink to="/account/login">Back to login</StoreLink>
    </section>
  );
}
export function ManageSubscription() {
  const auth = useAccount();
  const [message, setMessage] = useState('');
  if (auth.account) return <section className="p1-account p1-text-container">
    <h1>Manage Subscription</h1>
    <DemoNotice message={`Demo account: ${auth.account.email}. Changes affect this temporary session only.`} />
    {auth.account.subscription && auth.session ? <div className="p1-mock-card">
      <h2>Black Thai Honey 10 pack</h2>
      <p>$50 every 4 weeks · shipping calculated separately.</p>
      <p role="status">Status: <strong>{auth.session.status}</strong>{auth.session.skipped ? ' · Next delivery skipped' : ''}</p>
      <div className="p1-mock-actions">
        {auth.session.status === 'active' && <>
          <button className="p1-btn" onClick={() => { auth.setStatus('paused'); setMessage('Demo subscription paused.'); }}>Pause subscription</button>
          <button className="p1-btn" disabled={auth.session.skipped} onClick={() => { auth.skip(); setMessage('Demo next delivery skipped. The following delivery is in 8 weeks instead of 4.'); }}>Skip next delivery</button>
        </>}
        {auth.session.status === 'paused' && <button className="p1-btn" onClick={() => { auth.setStatus('active'); setMessage('Demo subscription resumed.'); }}>Resume subscription</button>}
        {auth.session.status !== 'cancelled' && <button className="p1-btn" onClick={() => { auth.setStatus('cancelled'); setMessage('Demo subscription cancelled.'); }}>Cancel subscription</button>}
        <button className="p1-btn" onClick={() => { auth.reset(); setMessage('Demo subscription restored to its initial state.'); }}>Reset simulation</button>
      </div>
      {message && <DemoNotice message={message} />}
    </div> : <div className="p1-mock-card"><h2>No subscriptions yet</h2><p>This customer profile has a one-time purchase only. Sign out and choose the subscriber account to test subscription management.</p><StoreLink to="/products">Browse products</StoreLink></div>}
    <StoreLink to="/account">Back to my account</StoreLink>
  </section>;
  return (
    <section className="p1-portal">
      <div>
        <StoreLink
          to="/"
          aria-label="HoneyPacks home"
          className="p1-portal-logo"
        >
          <img
            src={assets.logoBlack}
            alt="HoneyPacks"
            width="200"
            height="200"
          />
        </StoreLink>
        <h1>Welcome!</h1>
        <p>Sign in below to view your subscriptions.</p>
        <StoreLink to="/account/login?next=subscriptions" className="p1-btn">Sign in with a demo account</StoreLink>
        <DemoForm
          fields={[
            {
              name: 'email',
              label: 'Email address',
              type: 'email',
              wide: true,
              placeholder: 'example@email.com',
            },
          ]}
          submit="Continue with email"
          success="Demo access request checked. No sign-in email was sent."
        />
        <p className="p1-note">
          The original portal uses a sign-in link. This demo does not
          authenticate or send email.
        </p>
        <StoreLink to="/">Back to shop</StoreLink>
      </div>
    </section>
  );
}

export function Account() {
  const auth = useAccount();
  const path = useStorePath();
  if (!auth.account) return <Navigate to={path('/account/login')} replace />;
  const account = auth.account;
  return <section className="p1-account p1-text-container">
    <h1>My account</h1>
    <DemoNotice message="Demo account · sample orders and profile. No purchases or payments are made." />
    <h2>Welcome, {account.name}</h2>
    <p>{account.email}</p>
    <div className="p1-mock-actions">
      <StoreLink to="/products" className="p1-btn">Continue shopping</StoreLink>
      <StoreLink to="/manage-subscription" className="p1-btn">Manage Subscription</StoreLink>
      <StoreLink to="/checkout" className="p1-btn">Go to checkout</StoreLink>
      <button className="p1-btn" onClick={auth.logout}>Sign out</button>
    </div>
    <div className="p1-mock-card"><h2>Sample order</h2>
      <p><strong>{account.order}</strong> · Delivered (sample)</p>
      <p>{account.product} · Quantity: 1</p>
      <p>{account.subscription ? 'Subscription every 4 weeks' : 'One-time purchase'} · Total: ${account.total.toFixed(2)}</p>
      <p className="p1-note">Fixture order, including $5 demo shipping. Checkout simulations do not create new orders.</p>
    </div>
    <div className="p1-mock-card"><h2>Sample shipping address</h2><p>{account.name}<br />123 Demo Street<br />Austin, TX 78701<br />United States</p></div>
  </section>;
}
