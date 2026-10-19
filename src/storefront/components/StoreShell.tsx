import { useState } from 'react';
import {
  ArrowRight,
  Package,
  Menu,
  UserRound,
  ShoppingBag,
  Music2,
  X,
} from 'lucide-react';
import { assets, disclaimer } from '../data/catalog';
import { useStorefront } from '../state/StorefrontProvider';
import { useAccount } from '../state/AccountProvider';
import { StoreLink } from './navigation';
import { DemoForm, Modal } from './UI';

// Lucide intentionally excludes brand marks; retain the recognizable footer symbols.
const Instagram = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
  </svg>
);
const Facebook = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M14.4 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7H18V2.4A22 22 0 0 0 15.4 2c-2.6 0-4.4 1.6-4.4 4.6v2.9H8V13h3v9z" />
  </svg>
);

export function Header() {
  const { account } = useAccount();
  const store = useStorefront();
  const [menu, setMenu] = useState(false);
  return (
    <>
      <header className="p1-store-header">
        <div className="p1-promo">
          <Package size={15} />
          <span>
            FREE SHIPPING US OVER $75{' '}
            <span className="p1-international">
              FREE SHIPPING INTERNATIONAL OVER $200*
            </span>
          </span>
          <StoreLink to="/products">
            SHOP NOW <ArrowRight size={16} />
          </StoreLink>
        </div>
        <div className="p1-nav">
          <div className="p1-container hp:flex hp:items-center hp:justify-between">
            <button
              className="p1-menu-trigger p1-icon-button"
              aria-label="Open menu"
              aria-expanded={menu}
              onClick={() => setMenu(true)}
            >
              <Menu />
            </button>
            <StoreLink to="/" className="p1-logo" aria-label="HoneyPacks home">
              <img src={assets.logo} alt="HoneyPacks" width="70" height="70" />
            </StoreLink>
            <nav className="p1-main-nav" aria-label="Main navigation">
              <StoreLink to="/products/black-thai-honey-10-pack">
                Black Thai Honey <span className="p1-badge">BEST SELLER</span>
              </StoreLink>
              <StoreLink to="/products/black-thai-honey-pro-max">
                Black Thai Honey Pro Max{' '}
                <span className="p1-badge p1-badge-green">NEW</span>
              </StoreLink>
              <StoreLink to="/products">All Products</StoreLink>
            </nav>
            <div className="p1-nav-icons">
              <StoreLink to={account ? '/account' : '/account/login'} aria-label={account ? `My account, ${account.name}` : 'My account'}>
                <UserRound size={26} strokeWidth={1} />
              </StoreLink>
              <button
                aria-label={`Open cart, ${store.cartCount} items`}
                onClick={store.openCart}
              >
                <ShoppingBag size={27} strokeWidth={1.3} />
                <span>{store.cartCount}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <Modal
        open={menu}
        onClose={() => setMenu(false)}
        title="Menu"
        className="p1-menu-drawer"
      >
        <nav className="p1-mobile-links" aria-label="Mobile navigation">
          {[
            ['/', 'Home'],
            ['/products/black-thai-honey-10-pack', 'Black Thai Honey'],
            ['/products/black-thai-honey-pro-max', 'Black Thai Honey Pro Max'],
            ['/products', 'All Products'],
            ['/about-us', 'About Us'],
            ['/wholesale', 'Wholesale'],
            ['/affiliate', 'Become an Affiliate'],
            ['/contact-us', 'Contact Us'],
            [account ? '/account' : '/account/login', account ? 'My account' : 'Login'],
            ['/manage-subscription', 'Manage Subscription'],
          ].map(([to, label]) => (
            <StoreLink key={to} to={to} onClick={() => setMenu(false)}>
              {label}
              <ArrowRight size={16} />
            </StoreLink>
          ))}
        </nav>
      </Modal>
    </>
  );
}

const footerGroups = [
  [
    {
      title: 'SHOP',
      links: [
        ['Black Thai Honey', '/products/black-thai-honey-10-pack'],
        ['Black Thai Honey Pro Max', '/products/black-thai-honey-pro-max'],
        ['More Products', '/products'],
      ],
    },
    {
      title: 'HONEYPACKS',
      links: [
        ['About Us', '/about-us'],
        ['Wholesale', '/wholesale'],
        ['Contact Us', '/contact-us'],
      ],
    },
  ],
  [
    {
      title: 'ACCOUNT & SUPPORT',
      links: [
        ['Login', '/account/login'],
        ['Become An Affiliate', '/affiliate'],
        ['Manage Subscription', '/manage-subscription'],
      ],
    },
    {
      title: 'POLICIES & INFO',
      links: [
        ['Privacy Policy', '/privacy-policy'],
        ['Terms And Conditions', '/terms-conditions'],
        ['Return & Refund Policies', '/returns-refunds'],
        ['Affiliate Marketing', '/affiliate'],
      ],
    },
  ],
];
export function Footer() {
  const [social, setSocial] = useState<string | null>(null);
  return (
    <footer className="p1-store-footer">
      <div className="p1-container">
        <p className="p1-disclaimer">{disclaimer}</p>
        <div className="p1-footer-grid">
          {footerGroups.map((column, i) => (
            <div key={i}>
              {column.map((group) => (
                <section key={group.title}>
                  <h2>{group.title}</h2>
                  {group.links.map(([label, to]) => (
                    <StoreLink key={label} to={to}>
                      {label}
                    </StoreLink>
                  ))}
                </section>
              ))}
            </div>
          ))}
          <section className="p1-footer-signup">
            <h2>
              WANT 10% OFF YOUR
              <br />
              FIRST HONEYPACKS
              <br />
              ORDER?
            </h2>
            <img
              src={assets.underline}
              alt=""
              className="p1-signup-underline"
            />
            <DemoForm
              fields={[
                {
                  name: 'email',
                  label: 'Email address',
                  type: 'email',
                  wide: true,
                  placeholder: 'Enter your email address',
                },
              ]}
              submit="UNLOCK 10% OFF"
              success="Demo offer requested. No email was sent and no discount code was generated."
            />
            <small>You can unsubscribe at any time.</small>
          </section>
        </div>
        <div className="p1-footer-bottom">
          <div className="p1-socials">
            {[
              ['Instagram', Instagram],
              ['Facebook', Facebook],
              ['TikTok', Music2],
            ].map(([name, Icon]) => {
              const SocialIcon = Icon as typeof Instagram;
              return (
                <button
                  key={String(name)}
                  aria-label={String(name)}
                  onClick={() => setSocial(String(name))}
                >
                  <SocialIcon size={24} />
                </button>
              );
            })}
          </div>
          <p>Copyright 2026 © Honeypacks • All Rights Reserved</p>
        </div>
        <p className="p1-footer-demo">
          Archived storefront reconstruction. Demo prices and stock.
          *International banner reproduced from the archive; this checkout
          represents US shipping only.
        </p>
      </div>
      <Modal
        open={!!social}
        onClose={() => setSocial(null)}
        title={social ?? 'Social channel'}
      >
        <div className="p1-modal-body">
          <p>
            This icon is part of the archived HoneyPacks footer. A verified
            social profile URL is not available in this reconstruction.
          </p>
          <StoreLink to="/contact-us" onClick={() => setSocial(null)}>
            Contact HoneyPacks
          </StoreLink>
        </div>
      </Modal>
    </footer>
  );
}

const popupKey = 'honeypacks-storefront-offer-dismissed';
export function OfferPopup() {
  const [open, setOpen] = useState(() => {
    try {
      return localStorage.getItem(popupKey) !== '1';
    } catch {
      return false;
    }
  });
  const [claimed, setClaimed] = useState(false);
  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(popupKey, '1');
    } catch {
      /* Session-only dismissal. */
    }
  };
  return (
    <Modal
      open={open}
      onClose={dismiss}
      title="You've got 10% off"
      className="p1-offer-popup"
    >
      <button
        className="p1-popup-close"
        onClick={dismiss}
        aria-label="Close discount offer"
      >
        <X />
      </button>
      <div className="p1-popup-content">
        <img src={assets.logo} alt="HoneyPacks" width="96" height="96" />
        <h2>
          You’ve Got
          <br />
          <strong>10% Off</strong>
        </h2>
        <button className="p1-btn" onClick={() => setClaimed(true)}>
          GET YOUR 10% OFF
        </button>
        {claimed && (
          <p role="status">
            Demo offer only. No email is needed, no message was sent and no
            valid coupon was generated.
          </p>
        )}
        <button className="p1-popup-dismiss" onClick={dismiss}>
          Nah, I’m good
        </button>
      </div>
    </Modal>
  );
}
