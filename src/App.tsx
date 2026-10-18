import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { StoreLayout } from './components/layout/StoreLayout';
import { CartProvider } from './contexts/CartContext';
import { AboutUs } from './pages/AboutUs';
import { Login } from './pages/account/Login';
import { LostPassword } from './pages/account/LostPassword';
import { Affiliate } from './pages/Affiliate';
import { Checkout } from './pages/Checkout';
import { ContactUs } from './pages/ContactUs';
import { Home } from './pages/Home';
import { ManageSubscription } from './pages/ManageSubscription';
import { NotFound } from './pages/NotFound';
import { PrivacyPolicy } from './pages/policies/PrivacyPolicy';
import { ReturnsRefunds } from './pages/policies/ReturnsRefunds';
import { TermsConditions } from './pages/policies/TermsConditions';
import { ProductDetail } from './pages/ProductDetail';
import { Products } from './pages/Products';
import { Wholesale } from './pages/Wholesale';

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route element={<StoreLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/lost-password" element={<LostPassword />} />
            <Route path="/manage-subscription" element={<ManageSubscription />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/wholesale" element={<Wholesale />} />
            <Route path="/affiliate" element={<Affiliate />} />
            <Route path="/returns-refunds" element={<ReturnsRefunds />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>);

}