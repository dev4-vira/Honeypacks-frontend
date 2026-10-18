import React from 'react';
import { LeafIcon, PackageIcon, RefreshCwIcon, ShieldCheckIcon, TruckIcon, ZapIcon } from 'lucide-react';
import { BenefitIcon } from '../../data/site';

const icons = {
  leaf: LeafIcon,
  zap: ZapIcon,
  package: PackageIcon,
  shield: ShieldCheckIcon,
  truck: TruckIcon,
  refresh: RefreshCwIcon
};

export function BenefitIconGlyph({ icon, className = 'h-5 w-5' }: {icon: BenefitIcon;className?: string;}) {
  const Icon = icons[icon];
  return <Icon className={className} aria-hidden="true" />;
}