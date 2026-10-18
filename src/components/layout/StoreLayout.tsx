import React from 'react';
import { Outlet } from 'react-router-dom';
import { CartDrawer } from '../cart/CartDrawer';
import { AnnouncementBar } from './AnnouncementBar';
import { Footer } from './Footer';
import { Header } from './Header';

export function StoreLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded focus:bg-hp-yellow focus:px-4 focus:py-2 focus:text-hp-black">
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>);

}