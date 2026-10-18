import React from 'react';
import { ProductArtVariant } from '../../types/product';

/*
 * Vector packaging placeholders. These stand in for the real HoneyPacks product
 * photography until approved assets are supplied — each one is tagged "Placeholder".
 */

interface ProductArtProps {
  variant: ProductArtVariant;
  packLabel?: string;
  tone?: 'light' | 'dark' | 'none';
  showTag?: boolean;
  label?: string;
  className?: string;
}

const GOLD = '#c9a227';
const GOLD_LIGHT = '#e7c75f';
const RED = '#c8102e';
const FONT = 'Oswald, Impact, sans-serif';

export function ProductArt({ variant, packLabel, tone = 'light', showTag = true, label, className = '' }: ProductArtProps) {
  const bg = tone === 'dark' ? 'bg-hp-ink' : tone === 'light' ? 'bg-hp-mist' : '';
  return (
    <div className={`relative h-full w-full overflow-hidden ${bg} ${className}`} role="img" aria-label={label ?? 'Product image placeholder'}>
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        <ellipse cx="200" cy="352" rx="135" ry="13" fill="#000" opacity={tone === 'dark' ? 0.5 : 0.1} />
        {renderVariant(variant, packLabel)}
      </svg>
      {showTag &&
      <span className="absolute bottom-2 left-2 rounded-sm bg-black/75 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
          Placeholder
        </span>
      }
    </div>);

}

function renderVariant(variant: ProductArtVariant, packLabel?: string) {
  switch (variant) {
    case 'honey-box':
      return <Box band={packLabel ?? '10 PACK'} />;
    case 'honey-pack':
      return (
        <>
          <Sachet x={135} y={92} rotate={-16} />
          <Sachet x={145} y={92} rotate={16} />
          <Sachet x={140} y={100} />
        </>);

    case 'honey-sachet':
      return <Sachet x={120} y={58} w={160} h={270} />;
    case 'box-back':
      return <Box back />;
    case 'pro-max':
      return <Box subtitle="PRO MAX" band="5 RESEALABLE" frontFill={GOLD} textColor="#0b0b0b" subtitleColor="#0b0b0b" bandFill="#0b0b0b" bandText={GOLD_LIGHT} />;
    case 'pro-max-unit':
      return <Pouch />;
    case 'pro-max-duo':
      return (
        <>
          <Box x={40} y={130} w={150} h={185} d={28} subtitle="PRO MAX" band="5 RESEALABLE" frontFill={GOLD} textColor="#0b0b0b" subtitleColor="#0b0b0b" bandFill="#0b0b0b" bandText={GOLD_LIGHT} />
          <Box x={180} y={105} w={150} h={210} d={28} subtitle="PRO MAX" band="5 RESEALABLE" frontFill={GOLD} textColor="#0b0b0b" subtitleColor="#0b0b0b" bandFill="#0b0b0b" bandText={GOLD_LIGHT} />
        </>);

    case 'beast-mode':
      return <Box title="BEAST" subtitle="MODE" band="ENERGY BLEND" accent={RED} bandFill={RED} bandText="#ffffff" />;
    case 'bundle':
      return (
        <>
          <Box x={40} y={125} w={150} h={190} d={28} band="10 PACK" />
          <Box x={180} y={105} w={150} h={210} d={28} title="BEAST" subtitle="MODE" band="ENERGY BLEND" accent={RED} bandFill={RED} bandText="#ffffff" />
        </>);

    case 'shaker-white':
      return <Shaker body="#fafafa" stroke="#d4d4d4" cap="#111111" logo="#111111" />;
    case 'shaker-black':
      return <Shaker body="#161616" stroke="#2a2a2a" cap="#0b0b0b" logo={GOLD} />;
    default:
      return null;
  }
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = Math.PI / 3 * i - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(' ');
}

interface BoxProps {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  d?: number;
  title?: string;
  subtitle?: string;
  band?: string;
  accent?: string;
  frontFill?: string;
  textColor?: string;
  subtitleColor?: string;
  bandFill?: string;
  bandText?: string;
  back?: boolean;
}

function Box({
  x = 100,
  y = 100,
  w = 180,
  h = 235,
  d = 38,
  title = 'BLACK THAI',
  subtitle = 'HONEY',
  band = '10 PACK',
  accent = GOLD,
  frontFill = '#111111',
  textColor,
  subtitleColor = '#ffffff',
  bandFill,
  bandText = '#0b0b0b',
  back = false
}: BoxProps) {
  const s = w / 180;
  const cx = x + w / 2;
  const lift = d * 0.6;
  const titleColor = textColor ?? accent;
  return (
    <g>
      <polygon points={`${x},${y} ${x + d},${y - lift} ${x + w + d},${y - lift} ${x + w},${y}`} fill="#262626" />
      <polygon points={`${x + w},${y} ${x + w + d},${y - lift} ${x + w + d},${y + h - lift} ${x + w},${y + h}`} fill="#070707" />
      <rect x={x} y={y} width={w} height={h} fill={frontFill} />
      <rect x={x + 7 * s} y={y + 7 * s} width={w - 14 * s} height={h - 14 * s} fill="none" stroke={frontFill === '#111111' ? accent : '#0b0b0b'} strokeOpacity={0.45} strokeWidth={1.2} />
      {back ?
      <g>
          <text x={cx} y={y + 36 * s} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={15 * s} fill={accent} letterSpacing={1.5}>
            SUPPLEMENT FACTS
          </text>
          {Array.from({ length: 9 }, (_, i) =>
        <rect key={i} x={x + 22 * s} y={y + (56 + i * 17) * s} width={(i % 3 === 2 ? 90 : 136) * s} height={5 * s} rx={2} fill="#3a3a3a" />
        )}
          <text x={cx} y={y + h - 18 * s} textAnchor="middle" fontFamily={FONT} fontSize={9 * s} fill="#8a8a8a" letterSpacing={3}>
            HONEYPACKS
          </text>
        </g> :

      <g>
          <polygon points={hexPoints(cx, y + 42 * s, 17 * s)} fill="none" stroke={titleColor} strokeWidth={2} />
          <polygon points={hexPoints(cx, y + 42 * s, 8 * s)} fill={titleColor} />
          <text x={cx} y={y + 100 * s} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={29 * s} fill={titleColor} letterSpacing={1}>
            {title}
          </text>
          <text x={cx} y={y + 138 * s} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36 * s} fill={subtitleColor} letterSpacing={1}>
            {subtitle}
          </text>
          <rect x={x + 18 * s} y={y + 156 * s} width={w - 36 * s} height={30 * s} fill={bandFill ?? accent} />
          <text x={cx} y={y + 177 * s} textAnchor="middle" fontFamily={FONT} fontWeight={600} fontSize={15 * s} fill={bandText} letterSpacing={2}>
            {band}
          </text>
          <text x={cx} y={y + h - 18 * s} textAnchor="middle" fontFamily={FONT} fontSize={9 * s} fill={frontFill === '#111111' ? '#8a8a8a' : '#3a2f0b'} letterSpacing={3}>
            HONEYPACKS
          </text>
        </g>
      }
    </g>);

}

function Sachet({ x, y, w = 120, h = 200, rotate = 0 }: {x: number;y: number;w?: number;h?: number;rotate?: number;}) {
  const s = w / 120;
  const cx = x + w / 2;
  return (
    <g transform={`rotate(${rotate} ${cx} ${y + h})`}>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="#101010" stroke={GOLD} strokeWidth={1.5} />
      <rect x={x} y={y} width={w} height={16 * s} rx={6} fill="#1e1e1e" />
      <rect x={x} y={y + h - 16 * s} width={w} height={16 * s} rx={6} fill="#1e1e1e" />
      <line x1={x + 6} x2={x + w - 6} y1={y + 16 * s} y2={y + 16 * s} stroke={GOLD} strokeOpacity={0.5} strokeDasharray="4 3" />
      <polygon points={hexPoints(cx, y + 52 * s, 15 * s)} fill="none" stroke={GOLD} strokeWidth={1.8} />
      <polygon points={hexPoints(cx, y + 52 * s, 7 * s)} fill={GOLD} />
      <text x={cx} y={y + 102 * s} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={19 * s} fill={GOLD}>
        BLACK THAI
      </text>
      <text x={cx} y={y + 128 * s} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={22 * s} fill="#ffffff">
        HONEY
      </text>
      <path
        d={`M${x + 18 * s} ${y + 140 * s} H${x + w - 18 * s} V${y + 146 * s} C${x + w - 30 * s} ${y + 146 * s} ${x + w - 32 * s} ${y + 160 * s} ${x + w - 40 * s} ${y + 160 * s} C${x + w - 48 * s} ${y + 160 * s} ${x + w - 50 * s} ${y + 148 * s} ${x + w - 60 * s} ${y + 148 * s} H${x + 18 * s} Z`}
        fill={GOLD} />
      
      <text x={cx} y={y + h - 26 * s} textAnchor="middle" fontFamily={FONT} fontSize={8 * s} fill="#8a8a8a" letterSpacing={2}>
        SINGLE SERVE
      </text>
    </g>);

}

function Pouch() {
  return (
    <g>
      <path d="M125 85 H275 Q285 85 285 95 V320 Q285 335 270 335 H130 Q115 335 115 320 V95 Q115 85 125 85 Z" fill={GOLD} />
      <rect x="115" y="85" width="170" height="22" fill="#b38f1e" />
      <line x1="122" x2="278" y1="118" y2="118" stroke="#0b0b0b" strokeWidth="3" strokeDasharray="6 4" />
      <polygon points={hexPoints(200, 165, 20)} fill="none" stroke="#0b0b0b" strokeWidth="2.5" />
      <polygon points={hexPoints(200, 165, 9)} fill="#0b0b0b" />
      <text x="200" y="228" textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize="26" fill="#0b0b0b">
        BLACK THAI
      </text>
      <text x="200" y="262" textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize="30" fill="#0b0b0b">
        PRO MAX
      </text>
      <text x="200" y="305" textAnchor="middle" fontFamily={FONT} fontSize="10" fill="#3a2f0b" letterSpacing="3">
        RESEALABLE
      </text>
    </g>);

}

function Shaker({ body, stroke, cap, logo }: {body: string;stroke: string;cap: string;logo: string;}) {
  return (
    <g>
      <rect x="183" y="52" width="34" height="20" rx="5" fill={cap} />
      <rect x="146" y="68" width="108" height="40" rx="10" fill={cap} />
      <rect x="138" y="104" width="124" height="22" rx="5" fill={cap} />
      <path d="M142 126 H258 L248 332 Q247 346 233 346 H167 Q153 346 152 332 Z" fill={body} stroke={stroke} strokeWidth="2" />
      {[170, 200, 230, 260, 290].map((yy) =>
      <line key={yy} x1="236" x2="246" y1={yy} y2={yy} stroke={logo} strokeOpacity="0.35" strokeWidth="2" />
      )}
      <polygon points={hexPoints(196, 208, 18)} fill="none" stroke={logo} strokeWidth="2.5" />
      <polygon points={hexPoints(196, 208, 8)} fill={logo} />
      <text x="196" y="256" textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize="17" fill={logo} letterSpacing="1">
        HONEYPACKS
      </text>
    </g>);

}