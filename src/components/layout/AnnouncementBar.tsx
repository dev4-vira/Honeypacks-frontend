import React from 'react';
import { Link } from 'react-router-dom';
import { announcementMessages } from '../../data/site';

export function AnnouncementBar() {
  return (
    <div className="bg-hp-red text-white">
      <Link
        to="/products/black-thai-honey-10-pack"
        className="mx-auto flex max-w-store items-center justify-center gap-6 px-4 py-2 text-center text-[12px] font-semibold uppercase tracking-[0.08em] hover:underline">
        
        <span>{announcementMessages[0]}</span>
        <span className="hidden h-3 w-px bg-white/50 md:block" aria-hidden="true" />
        <span className="hidden md:block">{announcementMessages[1]}</span>
      </Link>
    </div>);

}