import { Link, useLocation } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
export const storefrontBase = '';
export function useStorePath() {
  const { search } = useLocation();
  const embedded = new URLSearchParams(search).get('embed') === '1';
  return (path: string) => {
    const [pathname, hash] = path.split('#');
    return `${storefrontBase}${pathname === '/' ? '/' : pathname}${embedded ? `${pathname.includes('?') ? '&' : '?'}embed=1` : ''}${hash ? `#${hash}` : ''}`;
  };
}
export function StoreLink({
  to,
  ...props
}: Omit<LinkProps, 'to'> & { to: string }) {
  const path = useStorePath();
  return <Link {...props} to={path(to)} />;
}
