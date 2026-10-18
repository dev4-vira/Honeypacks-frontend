import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { AuthCard } from '../../components/shared/AuthCard';
import { DemoNoticeModal } from '../../components/shared/DemoNoticeModal';
import { FormField } from '../../components/shared/FormField';
import { darkButtonClass, fieldClass, fieldErrorClass } from '../../utils/formStyles';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{username?: string;password?: string;}>({});
  const [notice, setNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!username.trim()) next.username = 'Username or email address is required.';
    if (!password) next.password = 'Password is required.';
    setErrors(next);
    if (Object.keys(next).length === 0) setNotice(true);
  };

  return (
    <>
      <AuthCard title="My Account" description="Log in to view your orders and manage your account.">
        <h2 className="mb-5 font-display text-xl font-semibold uppercase tracking-wide">Login</h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <FormField label="Username or email address *" htmlFor="login-username" error={errors.username}>
            <input
              id="login-username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`${fieldClass} ${errors.username ? fieldErrorClass : ''}`}
              aria-invalid={Boolean(errors.username)} />
            
          </FormField>
          <FormField label="Password *" htmlFor="login-password" error={errors.password}>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${fieldClass} pr-12 ${errors.password ? fieldErrorClass : ''}`}
                aria-invalid={Boolean(errors.password)} />
              
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-neutral-500 hover:text-hp-black"
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </FormField>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm">
            <input type="checkbox" className="h-4 w-4 accent-hp-black" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Remember me
          </label>
          <button type="submit" className={`${darkButtonClass} w-full`}>
            Log In
          </button>
        </form>
        <Link to="/account/lost-password" className="mt-5 inline-block text-sm font-medium text-hp-black underline underline-offset-2 hover:text-hp-gold">
          Lost your password?
        </Link>
      </AuthCard>
      <DemoNoticeModal
        open={notice}
        onClose={() => setNotice(false)}
        title="Login is a demo"
        message="Authentication isn't connected in this prototype. No credentials were checked or stored." />
      
    </>);

}