import React from 'react';
import { StarIcon } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, size = 14, className = '' }: StarRatingProps) {
  const rounded = Math.round(rating);
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) =>
      <StarIcon
        key={i}
        width={size}
        height={size}
        className={i < rounded ? 'fill-hp-gold text-hp-gold' : 'fill-neutral-200 text-neutral-200'}
        aria-hidden="true" />

      )}
    </span>);

}