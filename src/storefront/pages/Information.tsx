import { disclaimer } from '../data/catalog';
import { StoreLink } from '../components/navigation';
import { ArchivedNote, DemoForm } from '../components/UI';

export function About() {
  return (
    <article className="p1-about p1-text-container">
      <h1>Unlock Your Potential with Honeypacks.com</h1>
      <p>
        Welcome to Honeypacks.com, your premier destination for natural male
        enhancement and vitality. We pride ourselves on offering the highest
        quality honey packs designed to help men unlock their full potential and
        rediscover the passion and energy of youth.
      </p>
      <h2>
        <em>Why Choose Us?</em>
      </h2>
      <p>
        At Honeypacks.com, we understand the importance of male confidence and
        performance. Our carefully curated blends of natural ingredients are
        designed to help men take control of their health and experience a
        renewed sense of vigor and vitality.
      </p>
      <p>
        We are committed to quality, purity, and your well-being. Every honey
        packs is a testament to our dedication to bringing you the best nature
        has to offer.
      </p>
      <p>
        Rediscover the pleasure of intimacy, boost your confidence, and enjoy a
        more fulfilling life with Honeypacks.com.
      </p>
      <ArchivedNote>
        Brand paragraphs and ingredient artwork are reproduced from the archived
        About Us page (C21). The claims in them have not been independently
        verified.
      </ArchivedNote>
      <h2>
        <em>Ingredients</em>
      </h2>
      <div className="p1-about-ingredients">
        {[1, 2, 3].map((n) => (
          <img
            key={n}
            src={`/assets/storefront/ingredients-${n}.png`}
            alt={`Archived ingredient information artwork ${n}; claims are from the published brand page`}
            loading="lazy"
            width="480"
            height="480"
          />
        ))}
      </div>
      <p className="p1-about-disclaimer">{disclaimer}</p>
      <StoreLink to="/products/black-thai-honey-10-pack">
        View Black Thai Honey and its published label
      </StoreLink>
    </article>
  );
}
export function Contact() {
  return (
    <section className="p1-contact">
      <h1 className="p1-sr-only">Contact Us</h1>
      <DemoForm
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'message', label: 'Message', type: 'textarea', wide: true },
        ]}
        submit="SEND"
        success="Demo message validated. No message was sent to HoneyPacks."
      />
      <p className="p1-contact-spam">
        This form is protected against spam. By submitting, you agree to be
        contacted about your inquiry.
        <br />
        <span>
          Archived form notice. This demonstration does not send inquiries.
        </span>
      </p>
      <p className="p1-contact-email">
        If you have any questions or would like to make a complaint, please
        reach out to our
        <br /> support team via honeypacks.com, email us at{' '}
        <a href="mailto:orders@honeypacks.com">orders@honeypacks.com</a>.
      </p>
    </section>
  );
}

const privacy = [
  [
    'Overview',
    'This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from honeypacks.com (the “Site”).',
  ],
  [
    'Personal information we collect',
    'The captured page describes device information, browser, IP address, time zone, pages viewed and interaction information. It also describes order information including name, billing and shipping addresses, payment information, email address and phone number.',
  ],
  [
    'Cookies and device information',
    'The archived text lists cookies, log files, web beacons, tags, pixels, web storage and local storage.',
  ],
  [
    'Use and sharing of information',
    'Complete approved wording is pending. The full section was not captured in the supplied screenshot.',
  ],
  [
    'Your rights and contact',
    'Complete approved wording is pending. For questions about the live business policy, contact orders@honeypacks.com.',
  ],
];
const terms = [
  [
    'Introduction and acceptance',
    'The general Terms and Conditions of Sale detailed below govern the contractual relationship between the User and honeypacks.com. The archive describes acceptance of its sales conditions when confirming an order.',
  ],
  [
    'Changes to the Terms of Service and the Website',
    'The captured page states that the website and terms may change. Complete approved wording is pending.',
  ],
  [
    'Product information',
    '“honeypacks.com takes great care when putting product information, descriptions, and images online but will not be held responsible for any mistakes or omissions to any information given.”',
  ],
  [
    'Prices',
    'The captured terms describe prices in US dollars, delivery costs shown separately and the possibility of price corrections. These statements are archived context, not a new contract for this demo.',
  ],
  [
    'Availability',
    'The captured heading is retained. Complete approved availability terms are pending.',
  ],
  [
    'Shipping and payment',
    'The audit found an unfilled payment-method placeholder and a PayPal reference. They have not been converted into operative terms. This demonstration accepts no payment. Approved current wording is pending.',
  ],
  [
    'Returns',
    'For this reconstruction, the agreed return rule is 30 days from delivery for new, unopened products. See the Return & Refund Policies page.',
  ],
];
export function Policy({ type }: { type: 'returns' | 'privacy' | 'terms' }) {
  if (type === 'returns')
    return (
      <article className="p1-policy p1-text-container p1-return-policy">
        <h1>Return and Refund Policies page</h1>
        <p>
          At Honeypacks.com, we are dedicated to offering you exceptional
          products and services at the most competitive prices. We guarantee
          that all products we sell are brand new, authentic, and come in their
          original packaging.
        </p>
        <p>
          We are proud to offer a 30-day money-back guarantee on all new and
          unopened products, based on the delivery date provided by the shipper.
        </p>
        <p>
          To request a refund or return a product, please submit a request
          through our <StoreLink to="/contact-us">Contact Us</StoreLink> form.
        </p>
        <p>
          Please note that purchases are considered final after 30 days from the
          delivery date.
        </p>
        <ArchivedNote>
          Policy text transcribed from C32. The 30-day unopened-product rule is
          used consistently in this demo; final production conditions require
          business confirmation. No refund is issued here.
        </ArchivedNote>
      </article>
    );
  const sections = type === 'privacy' ? privacy : terms;
  return (
    <article className="p1-policy p1-text-container">
      <h1>{type === 'privacy' ? 'Privacy Policy' : 'Terms And Conditions'}</h1>
      <div className="p1-legal-notice">
        <strong>Archived reference — approved legal text pending</strong>
        <p>
          The following structured excerpts and summaries describe the October
          15, 2026 capture ({type === 'privacy' ? 'C33' : 'C34'}). They are not
          a newly drafted legal policy or accepted production terms.
        </p>
      </div>
      <nav aria-label="Policy sections">
        <ol>
          {sections.map(([title], i) => (
            <li key={title}>
              <a href={`#p1-policy-${i}`}>{title}</a>
            </li>
          ))}
        </ol>
      </nav>
      {type === 'privacy' && (
        <section>
          <h2>Using this demonstration</h2>
          <p>
            This demo stores cart contents, shipping preferences and offer
            dismissal locally in your browser. Contact, login and checkout
            fields remain in memory and are not transmitted. Demo account identifiers
            and simulated subscription preferences are kept in session storage
            until sign-out or the end of the tab session. Passwords are never saved. Card numbers cannot
            be entered.
          </p>
        </section>
      )}
      {sections.map(([title, text], i) => (
        <section key={title} id={`p1-policy-${i}`}>
          <h2>{title}</h2>
          <p>{text}</p>
        </section>
      ))}
      <p>
        <StoreLink to="/contact-us">Contact Us</StoreLink> ·{' '}
        <StoreLink to="/returns-refunds">
          Return &amp; Refund Policies
        </StoreLink>
      </p>
    </article>
  );
}
export function NotFound() {
  return (
    <section className="p1-not-found p1-container">
      <span>404</span>
      <h1>This page could not be found.</h1>
      <p>
        The address may have changed. Explore the catalog or return to the
        HoneyPacks homepage.
      </p>
      <div className="hp:flex hp:gap-4 hp:flex-wrap">
        <StoreLink className="p1-btn" to="/products">
          VIEW PRODUCTS
        </StoreLink>
        <StoreLink className="p1-btn p1-btn-black" to="/">
          BACK HOME
        </StoreLink>
      </div>
    </section>
  );
}
