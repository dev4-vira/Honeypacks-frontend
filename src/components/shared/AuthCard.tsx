import React from 'react';

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

/** Centered account-style form shell used by Login, Lost Password and Manage Subscription. */
export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className="bg-hp-mist px-4 py-14 md:py-20">
      <div className="mx-auto w-full max-w-[460px] rounded-lg border border-hp-line bg-white p-7 md:p-9">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide">{title}</h1>
        {description && <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{description}</p>}
        <div className="mt-7">{children}</div>
      </div>
    </div>);

}