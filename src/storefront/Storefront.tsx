import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { StorefrontProvider, useStorefront } from './state/StorefrontProvider';
import { storefrontBase, useStorePath } from './components/navigation';
import { Header, Footer } from './components/StoreShell';
import { CartDrawer } from './components/CartDrawer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import { About, Contact, NotFound, Policy } from './pages/Information';
import { Login, LostPassword, ManageSubscription } from './pages/Account';
import { Affiliate, AffiliateApply, Wholesale } from './pages/Programs';
import '@fontsource/nunito-sans/latin-400.css';
import '@fontsource/nunito-sans/latin-600.css';
import '@fontsource/nunito-sans/latin-700.css';
import '@fontsource/nunito-sans/latin-800.css';
import './tailwind.css';
import './style.css';

function Storefront() {
  const location = useLocation();
  const store = useStorefront();
  const path = useStorePath();
  const page =
    location.pathname.slice(storefrontBase.length).replace(/\/$/, '') || '/';
  const standalonePage = [
    '/checkout',
    '/manage-subscription',
    '/affiliate/apply',
  ].includes(page);
  useEffect(() => {
    store.closeCart();
    const heading = document.querySelector('.p1-storefront h1')?.textContent;
    document.title = `${heading || 'Storefront'} | HoneyPacks`;
    if (location.hash)
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    else {
      window.scrollTo({ top: 0, behavior: 'instant' });
      requestAnimationFrame(() =>
        document.getElementById('main-content')?.focus({ preventScroll: true }),
      );
    }
    // Only navigation closes the drawer; cart changes must not dismiss it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);
  const route = (suffix: string) => `${storefrontBase}${suffix}`;
  return (
    <div
      className={`p1 p1-storefront ${standalonePage ? 'p1-standalone-page' : ''}`}
    >
      <a href="#main-content" className="p1-skip-link">
        Skip to content
      </a>
      {!standalonePage && <Header />}
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path={route('/')} element={<Home />} />
          {storefrontBase && (
            <Route path="/" element={<Navigate to={path('/')} replace />} />
          )}
          <Route
            path={route('/products')}
            element={<Catalog key={store.resetVersion} />}
          />
          <Route path={route('/products/:slug')} element={<Product />} />
          <Route
            path={route('/honey-10-pack')}
            element={
              <Navigate
                to={path('/products/black-thai-honey-10-pack')}
                replace
              />
            }
          />
          <Route
            path={route('/pro-max')}
            element={
              <Navigate
                to={path('/products/black-thai-honey-pro-max')}
                replace
              />
            }
          />
          <Route
            path={route('/checkout')}
            element={<Checkout key={store.resetVersion} />}
          />
          <Route path={route('/account/login')} element={<Login />} />
          <Route
            path={route('/account/lost-password')}
            element={<LostPassword />}
          />
          <Route
            path={route('/manage-subscription')}
            element={<ManageSubscription />}
          />
          <Route path={route('/about-us')} element={<About />} />
          <Route path={route('/contact-us')} element={<Contact />} />
          <Route path={route('/wholesale')} element={<Wholesale />} />
          <Route path={route('/affiliate')} element={<Affiliate />} />
          <Route
            path={route('/affiliate/apply')}
            element={<AffiliateApply />}
          />
          <Route
            path={route('/returns-refunds')}
            element={<Policy type="returns" />}
          />
          <Route
            path={route('/privacy-policy')}
            element={<Policy type="privacy" />}
          />
          <Route
            path={route('/terms-conditions')}
            element={<Policy type="terms" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!standalonePage && <Footer />}
      <CartDrawer />
    </div>
  );
}

export default function StorefrontApp() {
  return (
    <StorefrontProvider>
      <Storefront />
    </StorefrontProvider>
  );
}
