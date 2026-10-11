import type { CSSProperties } from 'react';

const paths = {
  arrow: <><path d="M4 12h16M14 6l6 6-6 6" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
  house: <><path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7" /></>,
  apartment: <><path d="M5 21V3h14v18M3 21h18M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1M10 21v-3h4v3" /></>,
  land: <><path d="m2 20 7-13 5 9 3-5 5 9H2Z" /><circle cx="17" cy="5" r="2" /></>,
  store: <><path d="M4 10v11h16V10M2 10l2-7h16l2 7M2 10h20M9 21v-7h6v7" /></>,
  bed: <><path d="M3 18v3m18-3v3M3 13V6m0 10h18v-5a2 2 0 0 0-2-2h-8v7M3 13h8M3 16v2h18v-2" /><path d="M5 9h4v4H5Z" /></>,
  bath: <><path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-3Zm3 8v2m12-2v2M6 12V5a3 3 0 0 1 6 0M10 5h4" /></>,
  area: <><path d="M4 4h16v16H4Z" /><path d="M8 16 16 8M8 11v5h5M11 8h5v5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>,
  support: <><path d="M4 13V11a8 8 0 0 1 16 0v2M4 12H2v6h4v-6H4Zm16 0h2v6h-4v-6h2ZM20 18v1a3 3 0 0 1-3 3h-3" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  reset: <><path d="M3 10a9 9 0 1 1 1 8M3 4v6h6" /></>,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 18, className, style }: { name: IconName; size?: number; className?: string; style?: CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} style={style}>{paths[name]}</svg>;
}
