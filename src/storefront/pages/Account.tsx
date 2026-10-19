import { useState } from 'react';
import type { FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { assets } from '../data/catalog';
import { StoreLink } from '../components/navigation';
import { DemoForm, DemoNotice } from '../components/UI';

export function Login() {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
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
    setDone(!missing);
    if (missing) (form.elements.namedItem(missing) as HTMLElement)?.focus();
  }
  return (
    <section className="p1-account p1-text-container">
      <h1>My account</h1>
      <h2>Login</h2>
      <form
        className="p1-login-form"
        onSubmit={submit}
        onChange={() => setDone(false)}
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
            Enter your{' '}
            {error === 'username'
              ? 'username or email address'
              : 'demo password'}
            .
          </p>
        )}
        <div className="p1-login-actions">
          <button type="submit">Log in</button>
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>
        <StoreLink to="/account/lost-password">Lost your password?</StoreLink>
        {done && (
          <DemoNotice message="Demo login checked. No authentication was performed; no username or password was saved." />
        )}
        <p className="p1-note">
          Use sample details only. “Remember me” is a visual demo and does not
          store credentials.
        </p>
      </form>
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
