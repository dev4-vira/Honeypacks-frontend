import { CheckCircle2, Truck, Package } from 'lucide-react';
import { assets } from '../data/catalog';
import { productRepository } from '../services/productRepository';
import { money, unitPrice } from '../logic/commerce';
import { StoreLink } from '../components/navigation';
import { ArchivedNote, Stars } from '../components/UI';
import {
  FAQ,
  Guarantee,
  ProductCard,
  Reviews,
} from '../components/CommerceBlocks';
import { OfferPopup } from '../components/StoreShell';

export default function Home() {
  const honey = productRepository.get('honey');
  const subscriptionPrice = unitPrice(honey, 'subscription');
  return (
    <>
      <section className="p1-home-hero">
        <div className="p1-container">
          <div className="p1-hero-copy">
            <div className="p1-hero-rating">
              <Stars />
              <span>4.8 / 5 from 106,120+ customers</span>
            </div>
            <h1>
              PREMIUM HONEY PACKS
              <br className="p1-desktop" /> FOR MEN – POWERED BY
              <br className="p1-desktop" /> BLACK THAI HONEY
            </h1>
            <img className="p1-hero-underline" src={assets.underline} alt="" />
            <ul>
              {[
                'Boosts stamina and performance',
                'Enhances desire and excitement',
                'Improves blood flow naturally',
              ].map((benefit, i) => (
                <li key={benefit}>
                  <CheckCircle2 size={18} fill="currentColor" />
                  <span>
                    <strong>
                      {benefit
                        .split(' ')
                        .slice(0, i === 2 ? 3 : 2)
                        .join(' ')}
                    </strong>{' '}
                    {benefit
                      .split(' ')
                      .slice(i === 2 ? 3 : 2)
                      .join(' ')}
                  </span>
                </li>
              ))}
            </ul>
            <StoreLink
              to="/products"
              data-testid="view-product"
              className="p1-btn p1-btn-white"
            >
              SHOP BEST SELLERS
            </StoreLink>
            <div className="p1-hero-services">
              <span>
                <Truck size={15} /> Free Shipping On Orders Over $75
              </span>
              <span>
                <Package size={15} /> Discreet Packaging
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="p1-container">
        <ArchivedNote>
          Hero wording and customer count are reproduced from C02, October 15,
          2026. These archived commercial claims are not independently verified.
        </ArchivedNote>
      </div>
      <section className="p1-container p1-bestsellers">
        <h2 className="p1-section-title">OUR BEST SELLERS</h2>
        <img src={assets.underline} alt="" className="p1-swish" />
        <div className="p1-product-grid">
          {productRepository
            .list()
            .slice(0, 3)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <StoreLink className="p1-btn p1-btn-black" to="/products">
          SHOP ALL PRODUCTS
        </StoreLink>
      </section>
      <Reviews />
      <section className="p1-home-benefits">
        <div className="p1-container hp:grid hp:md:grid-cols-2 hp:gap-12">
          <img
            src={assets.detail}
            alt="Archived HoneyPacks product information artwork"
            loading="lazy"
          />
          <div>
            <h2>
              MORE THAN HONEY.
              <br />
              BLACK THAI HONEY.
            </h2>
            <p>
              Premium honey packs for men, in the unmistakable black-and-gold
              box.
            </p>
            <ul>
              {[
                'Boosts stamina and performance',
                'Enhances desire and excitement',
                'Individually packed for convenience',
              ].map((text) => (
                <li key={text}>
                  <CheckCircle2 size={22} />
                  {text}
                </li>
              ))}
            </ul>
            <ArchivedNote>
              Benefit wording reproduced from the storefront. Packaging and
              product format are shown as captured.
            </ArchivedNote>
            <StoreLink className="p1-btn" to={`/products/${honey.slug}`}>
              GET THE BOX OF 10
            </StoreLink>
          </div>
        </div>
      </section>
      <section className="p1-home-subscription p1-container">
        <div>
          <h2>SUBSCRIBE &amp; SAVE</h2>
          <p className="p1-subscription-price">
            {money(subscriptionPrice)} <small>every 4 weeks</small>
          </p>
          <p>
            Keep your Black Thai Honey coming. Choose your plan, see the price
            and review the conditions before adding to your cart.
          </p>
          <ul>
            <li>10 individual sachets per box</li>
            <li>
              Save {money(honey.price - subscriptionPrice)} compared with a
              one-time box
            </li>
            <li>Pause, skip or cancel through your subscription account</li>
          </ul>
          <p className="p1-note">
            Demo gift: 3 free sachets with at least 2 Honey boxes. Standard US
            shipping is free at $75; renewal shipping is calculated separately.
          </p>
          <StoreLink className="p1-btn" to={`/products/${honey.slug}`}>
            SUBSCRIBE &amp; SAVE
          </StoreLink>
        </div>
        <img
          src={assets.subscription}
          alt="HoneyPacks product photography from the published subscription section"
          loading="lazy"
        />
      </section>
      <Guarantee />
      <FAQ />
      <OfferPopup />
    </>
  );
}
