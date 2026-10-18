import React from 'react';
import { GiftIcon } from 'lucide-react';
import { GiftProgress } from '../../types/cart';

interface GiftProgressBarProps {
  gift: GiftProgress;
  triggerName: string;
  giftName: string;
}

export function GiftProgressBar({ gift, triggerName, giftName }: GiftProgressBarProps) {
  const pct = Math.min(100, gift.current / gift.required * 100);
  return (
    <div className="bg-hp-black px-5 py-3.5 text-white">
      <p className="flex items-center gap-2 text-[13px]">
        <GiftIcon className="h-4 w-4 shrink-0 text-hp-yellow" aria-hidden="true" />
        {gift.unlocked ?
        <span>
            <strong className="text-hp-yellow">Unlocked!</strong> Free {giftName} added to your order.
          </span> :

        <span>
            Add <strong className="text-hp-yellow">{gift.remaining} more</strong> {triggerName} to get a <strong>free {giftName}</strong>
          </span>
        }
      </p>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuemin={0} aria-valuemax={gift.required} aria-valuenow={Math.min(gift.current, gift.required)}>
        <div className="h-full rounded-full bg-hp-yellow transition-[width] duration-300 ease-out" style={{ width: `${pct}%` }} />
      </div>
    </div>);

}