import React from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { mainNav } from '../../data/navigation';
import { Logo } from './Logo';

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

const secondary = [
{ label: 'My Account', to: '/account/login' },
{ label: 'Manage Subscription', to: '/manage-subscription' },
{ label: 'About Us', to: '/about-us' },
{ label: 'Wholesale', to: '/wholesale' },
{ label: 'Contact Us', to: '/contact-us' }];


export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  useBodyScrollLock(open);
  return (
    <AnimatePresence>
      {open &&
      <>
          <motion.div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose} />
        
          <motion.nav
          aria-label="Mobile"
          className="fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col bg-hp-black text-white lg:hidden"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
              <Logo />
              <button type="button" onClick={onClose} className="-mr-2 rounded p-2" aria-label="Close menu">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <ul className="border-b border-white/10 px-5 py-4">
              {mainNav.map((item) =>
            <li key={item.to}>
                  <NavLink to={item.to} end onClick={onClose} className={({ isActive }) => `block py-3 font-display text-xl font-semibold uppercase tracking-wide ${isActive ? 'text-hp-gold' : ''}`}>
                    {item.label}
                  </NavLink>
                </li>
            )}
            </ul>
            <ul className="px-5 py-4">
              {secondary.map((item) =>
            <li key={item.to}>
                  <NavLink to={item.to} onClick={onClose} className="block py-2.5 text-[15px] text-neutral-300 hover:text-white">
                    {item.label}
                  </NavLink>
                </li>
            )}
            </ul>
          </motion.nav>
        </>
      }
    </AnimatePresence>);

}