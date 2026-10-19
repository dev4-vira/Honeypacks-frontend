import { useState } from 'react';
import { MessageCircle, ArrowRight, Check } from 'lucide-react';
import { assets } from '../data/catalog';
import { StoreLink } from '../components/navigation';
import { Accordion, ArchivedNote, DemoForm, Modal } from '../components/UI';
import type { FormField } from '../components/UI';

const wholesaleFields: FormField[] = [
  { name: 'name', label: 'Your name', wide: true },
  { name: 'store', label: 'Store name', wide: true },
  {
    name: 'type',
    label: 'Store type',
    options: [
      'Retail store',
      'Smoke shop',
      'Convenience store',
      'Online retailer',
      'Distributor',
      'Other',
    ],
    wide: true,
  },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'address', label: 'Business address', wide: true },
  { name: 'zip', label: 'ZIP / postal code' },
  {
    name: 'volume',
    label: 'Estimated volume',
    options: [
      'Under 50 boxes',
      '50–100 boxes',
      '101–500 boxes',
      'Over 500 boxes',
    ],
  },
];
function WholesaleForm({
  lower,
  onChat,
}: {
  lower?: boolean;
  onChat: () => void;
}) {
  return (
    <div className="p1-wholesale-form">
      <h2>
        {lower ? 'Get wholesale pricing' : 'Request pricing in 30 seconds'}
      </h2>
      <p>No spam. No sales calls. Just pricing.</p>
      <DemoForm
        fields={wholesaleFields}
        submit="Get My Pricing →"
        success="Demo pricing request validated. No application or message was sent."
      />
      <div className="p1-or">FASTER OPTION</div>
      <button className="p1-whatsapp" onClick={onChat}>
        <MessageCircle size={20} /> WhatsApp us — instant pricing &amp; same-day
        order
      </button>
    </div>
  );
}
export function Wholesale() {
  const [chat, setChat] = useState(false);
  return (
    <>
      <section className="p1-wholesale-hero">
        <div className="p1-program-container">
          <div className="p1-wholesale-copy">
            <span className="p1-program-label">
              ● WHOLESALE PARTNERSHIP PROGRAM
            </span>
            <h1>
              Stock the product
              <br />
              they’re
              <br />
              <em>already asking for.</em>
            </h1>
            <p>
              Black Thai Honey is what your customers walk in looking for
              instead of the gas-station knockoffs. Authentic Thai-sourced
              honey. US warehouse. Same-day shipping. Margins your shelf has
              been waiting for.
            </p>
            <button className="p1-whatsapp-pill" onClick={() => setChat(true)}>
              <MessageCircle size={15} /> WhatsApp us → pricing &amp; order in
              minutes, not hours
            </button>
            <div className="p1-wholesale-stats">
              <div>
                <strong>10×</strong>
                <span>RETAIL MARKUP</span>
              </div>
              <div>
                <strong>24h</strong>
                <span>SHIP TIME</span>
              </div>
              <div>
                <strong>$0</strong>
                <span>SETUP FEES</span>
              </div>
            </div>
            <ArchivedNote>
              Archived program claims from C23. Markup, shipping time, fees and
              exclusivity are reference examples, not current wholesale
              commitments.
            </ArchivedNote>
            <div className="hp:flex hp:flex-wrap hp:gap-3">
              <button className="p1-whatsapp" onClick={() => setChat(true)}>
                <MessageCircle size={20} /> WhatsApp Now — Instant Response
              </button>
              <a className="p1-btn p1-btn-outline" href="#p1-wholesale-lower">
                Or fill the form →
              </a>
            </div>
          </div>
          <WholesaleForm onChat={() => setChat(true)} />
        </div>
      </section>
      <section className="p1-wholesale-benefits p1-program-container">
        <h2>
          Built for your shelf.
          <br />
          Backed by the brand.
        </h2>
        <div className="hp:grid hp:md:grid-cols-3 hp:gap-6">
          {[
            [
              'Start with a conversation',
              'Explore the archived program and request demo pricing using the form.',
            ],
            [
              'Know the product',
              'Original Black Thai Honey packaging, honey formats and complementary products.',
            ],
            [
              'Make room for repeat orders',
              'Review quantities and business needs before any real agreement.',
            ],
          ].map(([title, text]) => (
            <article key={title}>
              <Check />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        className="p1-wholesale-lower p1-program-container"
        id="p1-wholesale-lower"
      >
        <div>
          <h2>Lock in your ZIP.</h2>
          <p>
            First retailer per ZIP gets 90-day exclusivity. WhatsApp us for
            instant pricing, or use the form for a 4-hour reply.
          </p>
          <ul>
            <li>WhatsApp: live response in minutes</li>
            <li>Form: reply within 4 business hours</li>
            <li>Sell-through guarantee on opening order</li>
            <li>Free retailer kit included</li>
          </ul>
          <ArchivedNote>
            These C24 program statements are archived references. No ZIP,
            exclusivity, response time, guarantee or kit is reserved by this
            demo.
          </ArchivedNote>
          <button className="p1-whatsapp" onClick={() => setChat(true)}>
            <MessageCircle size={20} /> WhatsApp Us — Fastest Path
          </button>
        </div>
        <WholesaleForm lower onChat={() => setChat(true)} />
      </section>
      <section className="p1-program-faq p1-program-container">
        <h2>Wholesale questions</h2>
        <Accordion title="How do I request pricing?">
          <p>
            Use either form on this page. Both are local demonstrations and show
            validation without sending a request.
          </p>
        </Accordion>
        <Accordion title="What are the minimum order and current margins?">
          <p>
            Current prices, minimums and retail terms require business
            confirmation. The archived 10× markup is not a production price
            list.
          </p>
        </Accordion>
        <Accordion title="Can I reserve my ZIP?">
          <p>
            No reservation is made here. The archived exclusivity offer requires
            confirmation directly with the business.
          </p>
          <StoreLink to="/contact-us">Contact Us</StoreLink>
        </Accordion>
      </section>
      <Modal open={chat} onClose={() => setChat(false)} title="WhatsApp — demo">
        <div className="p1-modal-body">
          <p>
            This button represents the archived WhatsApp entry point. No chat
            was opened and no information was sent.
          </p>
          <p>You can use the local pricing form to try the request flow.</p>
          <button className="p1-btn" onClick={() => setChat(false)}>
            BACK TO PRICING
          </button>
        </div>
      </Modal>
    </>
  );
}

export function Affiliate() {
  return (
    <section className="p1-affiliate">
      <div className="p1-affiliate-inner">
        <div className="p1-affiliate-pill">CREATOR PROGRAM · 2026</div>
        <div className="p1-affiliate-top">
          <div>
            <p className="p1-affiliate-kicker">
              BLACK THAI HONEY · CREATOR PROGRAM
            </p>
            <h1>
              Get paid
              <br />
              to <em>post.</em>
            </h1>
            <p>
              Earn <strong>$2 for every 1,000 views</strong> — plus{' '}
              <strong>50% of every sale</strong> through your code. One video
              can pay out <strong>$34,500</strong>. We’re recruiting creators to
              make real content about a product people actually buy.
            </p>
            <div className="p1-affiliate-rates">
              <div>
                <b>$2</b>
                <span>CPM · PER 1,000 VIEWS</span>
              </div>
              <div>
                <b>50%</b>
                <span>OF EVERY SALE</span>
              </div>
            </div>
            <div className="p1-affiliate-example">
              <span>EXAMPLE — WHAT ONE VIDEO CAN PAY</span>
              <div>
                1,000,000 views × $2 CPM <b>$2,000</b>
              </div>
              <div>
                1,000 boxes sold through your code
                <br />
                ($65 each) × 50% <b>+ $32,500</b>
              </div>
              <div>
                TOTAL FROM A SINGLE VIDEO <strong>$34,500</strong>
              </div>
            </div>
            <ArchivedNote>
              Archived C35 marketing example, not guaranteed earnings or an
              active offer. C36 showed a conflicting $1 CPM example; current
              terms require business confirmation.
            </ArchivedNote>
            <StoreLink
              className="p1-btn p1-affiliate-apply"
              to="/affiliate/apply"
            >
              APPLY TO CREATE <ArrowRight size={16} />
            </StoreLink>
          </div>
          <figure>
            <img src={assets.honey} alt="Black Thai Honey box and sachet" />
            <figcaption>◆ YOUR CONTENT HERE</figcaption>
          </figure>
        </div>
        <section className="p1-affiliate-benefits">
          <h2>
            Real content.
            <br />
            Your own point of view.
          </h2>
          <div>
            <article>
              <h3>Create</h3>
              <p>
                Show the real product in your own content. This is a
                demonstration of the archived creator application.
              </p>
            </article>
            <article>
              <h3>Apply</h3>
              <p>
                Review the program information and try the local application. No
                affiliate account is created.
              </p>
            </article>
            <article>
              <h3>Review the terms</h3>
              <p>
                Rates, eligibility and attribution need approval before any live
                collaboration.
              </p>
            </article>
          </div>
        </section>
        <section className="p1-affiliate-faq">
          <h2>Creator questions</h2>
          <Accordion title="How do I apply?">
            <p>
              Open the application below. The original flow used Refersion; this
              recreation validates locally without registering an account.
            </p>
          </Accordion>
          <Accordion title="Are the rates guaranteed?">
            <p>
              No. The figures shown are the archived C35 example. Production
              terms and eligibility have not been confirmed.
            </p>
          </Accordion>
          <Accordion title="Do I need a password?">
            <p>No password is needed for this local demo application.</p>
          </Accordion>
          <StoreLink className="p1-btn" to="/affiliate/apply">
            APPLY TO CREATE
          </StoreLink>
        </section>
      </div>
    </section>
  );
}

export function AffiliateApply() {
  return (
    <section className="p1-affiliate-application">
      <div className="p1-application-header">
        <StoreLink to="/" className="p1-application-logo">
          <img src={assets.logoBlack} alt="HoneyPacks" />
        </StoreLink>
        <StoreLink to="/affiliate">Back to creator program</StoreLink>
      </div>
      <div className="p1-application-box">
        <div>
          <h1>Program Application</h1>
          <DemoForm
            fields={[
              { name: 'firstName', label: 'First Name' },
              { name: 'lastName', label: 'Last Name' },
              { name: 'email', label: 'Email', type: 'email', wide: true },
              { name: 'promo', label: 'Preferred promo code', wide: true },
              { name: 'instagram', label: 'IG username', wide: true },
              { name: 'tiktok', label: 'TikTok username', wide: true },
              { name: 'address', label: 'Address', wide: true },
              { name: 'city', label: 'City' },
              {
                name: 'country',
                label: 'Country',
                options: ['United States', 'Canada', 'United Kingdom', 'Other'],
              },
            ]}
            submit="Submit demo application"
            success="Demo application validated. No registration, affiliate code or account was created."
          />
          <p>
            No password is requested because this is not an authentication flow.
          </p>
        </div>
        <aside>
          <h2>Commission &amp; Business Details</h2>
          <table>
            <tbody>
              <tr>
                <th>Conversion action</th>
                <td>Online purchase with processed valid payment</td>
              </tr>
              <tr>
                <th>Attribution Window</th>
                <td>90 days (archived)</td>
              </tr>
              <tr>
                <th>Commission type</th>
                <td>Percent of Sale</td>
              </tr>
              <tr>
                <th>Base commission</th>
                <td>50.00% (archived)</td>
              </tr>
            </tbody>
          </table>
          <div className="p1-application-banner">
            <span>HONEYPACKS · CREATOR PROGRAM</span>
            <h2>
              Get paid to <em>post.</em>
            </h2>
          </div>
          <ArchivedNote>
            C36 reference details. No commission agreement is formed; approved
            current program terms are pending.
          </ArchivedNote>
          <StoreLink to="/terms-conditions">Read terms reference</StoreLink>
        </aside>
      </div>
    </section>
  );
}
