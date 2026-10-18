import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2Icon } from 'lucide-react';
import { AuthCard } from '../../components/shared/AuthCard';
import { FormField } from '../../components/shared/FormField';
import { darkButtonClass, fieldClass, fieldErrorClass } from '../../utils/formStyles';

export function LostPassword() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) {
      setError('Enter a username or email address.');
      return;
    }
    setSent(true);
  };

  return (
    <AuthCard
      title="Lost Password"
      description="Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.">
      
      {sent ?
      <div className="rounded-md bg-hp-mist p-5" role="status">
          <p className="flex items-center gap-2 font-semibold">
            <CheckCircle2Icon className="h-5 w-5 text-hp-green" aria-hidden="true" />
            Request recorded (demo)
          </p>
          <p className="mt-2 text-sm text-neutral-600">This is a prototype — no password reset email was sent.</p>
          <Link to="/account/login" className="mt-4 inline-block text-sm font-medium underline underline-offset-2">
            Back to login
          </Link>
        </div> :

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <FormField label="Username or email *" htmlFor="lost-user" error={error}>
            <input
            id="lost-user"
            autoComplete="username"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError('');
            }}
            className={`${fieldClass} ${error ? fieldErrorClass : ''}`}
            aria-invalid={Boolean(error)} />
          
          </FormField>
          <button type="submit" className={`${darkButtonClass} w-full`}>
            Reset Password
          </button>
          <Link to="/account/login" className="inline-block text-sm text-neutral-600 underline underline-offset-2 hover:text-hp-black">
            Remembered it? Log in
          </Link>
        </form>
      }
    </AuthCard>);

}