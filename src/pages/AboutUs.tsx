import React from 'react';
import { Link } from 'react-router-dom';
import { ProductArt } from '../components/product/ProductArt';
import { ConfirmationFlag } from '../components/shared/ConfirmationFlag';
import { aboutIngredients, aboutStory, aboutValues } from '../data/about';
import { primaryButtonClass } from '../utils/formStyles';

export function AboutUs() {
  return (
    <>
      <section className="bg-hp-black text-white">
        <div className="mx-auto grid max-w-store items-center gap-10 px-4 py-16 md:px-8 lg:grid-cols-2 lg:py-24">
          <div>
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.98] tracking-wide md:text-7xl">
              About <span className="text-hp-gold">HoneyPacks</span>
            </h1>
            <div className="mt-6 max-w-lg space-y-4 text-lg leading-relaxed text-neutral-300">
              {aboutStory.map((p) =>
              <p key={p}>{p}</p>
              )}
            </div>
          </div>
          <div className="mx-auto aspect-square w-full max-w-[480px]">
            <ProductArt variant="honey-box" tone="none" label="Black Thai Honey box" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-store px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">What&apos;s inside</h2>
          <p className="mt-3 text-neutral-600">A short look at the ingredients behind our Black Thai Honey blend.</p>
          <div className="mt-3">
            <ConfirmationFlag text="Ingredient list pending confirmation against the approved label" />
          </div>
        </div>
        <div className="mt-12 space-y-16 md:space-y-20">
          {aboutIngredients.map((ing, i) =>
          <article key={ing.name} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <div className={`aspect-[4/3] overflow-hidden rounded-lg bg-hp-black ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <img src={ing.image} alt={ing.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-hp-gold">Ingredient {i + 1} of {aboutIngredients.length}</p>
                <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">{ing.name}</h3>
                <p className="mt-3 max-w-md text-[17px] leading-relaxed text-neutral-700">{ing.description}</p>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="bg-hp-mist">
        <div className="mx-auto grid max-w-store gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
          {aboutValues.map((v) =>
          <div key={v.title} className="border-l-2 border-hp-gold pl-5">
              <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{v.title}</h3>
              <p className="mt-1.5 text-[15px] text-neutral-600">{v.text}</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-hp-yellow">
        <div className="mx-auto flex max-w-store flex-col items-center justify-between gap-6 px-4 py-12 text-center md:flex-row md:px-8 md:text-left">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">Ready to try Black Thai Honey?</h2>
          <Link to="/products/black-thai-honey-10-pack" className={`${primaryButtonClass} !bg-hp-black !text-white hover:!bg-neutral-800`}>
            Shop Now
          </Link>
        </div>
      </section>
    </>);

}