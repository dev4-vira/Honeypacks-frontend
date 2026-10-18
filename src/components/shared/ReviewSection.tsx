import React from 'react';
import { BadgeCheckIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ratingDistribution } from '../../data/reviews';
import { Review } from '../../types/catalog';
import { StarRating } from '../product/StarRating';

interface ReviewSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  title?: string;
}

export function ReviewSection({ reviews, rating, reviewCount, title = 'Customer Reviews' }: ReviewSectionProps) {
  return (
    <section aria-labelledby="reviews-heading" className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
      <div>
        <h2 id="reviews-heading" className="font-display text-3xl font-bold uppercase tracking-wide">
          {title}
        </h2>
        <div className="mt-5 flex items-end gap-3">
          <span className="font-display text-6xl font-bold leading-none">{rating.toFixed(1)}</span>
          <div className="pb-1">
            <StarRating rating={rating} size={18} />
            <p className="mt-1 text-sm text-neutral-600">Based on {reviewCount.toLocaleString()} reviews</p>
          </div>
        </div>
        <dl className="mt-6 space-y-2">
          {ratingDistribution.map((row) =>
          <div key={row.stars} className="flex items-center gap-3 text-sm">
              <dt className="w-12 shrink-0 text-neutral-600">{row.stars} star</dt>
              <dd className="flex flex-1 items-center gap-3">
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-hp-line">
                  <span className="block h-full bg-hp-gold" style={{ width: `${row.percent}%` }} />
                </span>
                <span className="w-9 text-right tabular-nums text-neutral-600">{row.percent}%</span>
              </dd>
            </div>
          )}
        </dl>
      </div>
      <ul className="divide-y divide-hp-line border-y border-hp-line">
        {reviews.map((review) =>
        <li key={review.id} className="py-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <StarRating rating={review.rating} />
              <time className="text-xs text-neutral-500" dateTime={review.date}>
                {format(new Date(review.date), 'MMM d, yyyy')}
              </time>
            </div>
            <h3 className="mt-2 font-semibold">{review.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-700">{review.body}</p>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-neutral-600">
              <span className="font-medium text-hp-black">{review.author}</span>
              <span aria-hidden="true">·</span>
              {review.location}
              {review.verified &&
            <span className="ml-1 inline-flex items-center gap-1 text-xs font-medium text-hp-green">
                  <BadgeCheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> Verified buyer
                </span>
            }
            </p>
          </li>
        )}
      </ul>
    </section>);

}