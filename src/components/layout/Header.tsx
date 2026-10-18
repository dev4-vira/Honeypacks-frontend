import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuIcon, ShoppingBagIcon, UserIcon } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { mainNav } from '../../data/navigation';
import { Logo } from './Logo';
import { MobileNavigation } from './MobileNavigation';

export function Header() {
  const { totals, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-hp-black text-white">
      <div className="mx-auto grid h-[72px] max-w-store grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8 lg:grid-cols-[auto_1fr_auto] lg:gap-10">
        <button type="button" onClick={() => setMenuOpen(true)} className="-ml-2 justify-self-start rounded p-2 lg:hidden" aria-label="Open menu">
          <MenuIcon className="h-6 w-6" />
        </button>
        <Logo className="justify-self-center lg:justify-self-start" />
        <nav aria-label="Main" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) =>
            <li key={item.to}>
                <NavLink
                to={item.to}
                end
                className={({ isActive }) =>
                `whitespace-nowrap border-b-2 py-1 font-display text-[15px] font-medium uppercase tracking-[0.06em] transition-colors duration-150 ${
                isActive ? 'border-hp-gold text-hp-gold' : 'border-transparent text-white hover:text-hp-gold'}`

                }>
                
                  {item.label}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="flex items-center justify-self-end gap-1">
          <NavLink to="/account/login" className="hidden rounded p-2 transition-colors duration-150 hover:text-hp-gold sm:block" aria-label="My account">
            <UserIcon className="h-[22px] w-[22px]" />
          </NavLink>
          <button type="button" onClick={openCart} className="relative -mr-2 rounded p-2 transition-colors duration-150 hover:text-hp-gold" aria-label={`Open cart, ${totals.itemCount} items`}>
            <ShoppingBagIcon className="h-[22px] w-[22px]" />
            {totals.itemCount > 0 &&
            <span className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-hp-yellow px-1 text-[11px] font-bold text-hp-black">
                {totals.itemCount}
              </span>
            }
          </button>
        </div>
      </div>
      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>);

}