import { NavLink } from '../types/catalog';

export const mainNav: NavLink[] = [
{ label: 'Black Thai Honey', to: '/products/black-thai-honey-10-pack' },
{ label: 'Black Thai Honey Pro Max', to: '/products/black-thai-honey-pro-max' },
{ label: 'All Products', to: '/products' }];


export const footerColumns: {title: string;links: NavLink[];}[] = [
{
  title: 'Shop',
  links: [
  { label: 'Black Thai Honey', to: '/products/black-thai-honey-10-pack' },
  { label: 'Black Thai Honey Pro Max', to: '/products/black-thai-honey-pro-max' },
  { label: 'All Products', to: '/products' }]

},
{
  title: 'Account & Support',
  links: [
  { label: 'Login', to: '/account/login' },
  { label: 'Become an Affiliate', to: '/affiliate' },
  { label: 'Manage Subscription', to: '/manage-subscription' }]

},
{
  title: 'HoneyPacks',
  links: [
  { label: 'About Us', to: '/about-us' },
  { label: 'Wholesale', to: '/wholesale' },
  { label: 'Contact Us', to: '/contact-us' }]

},
{
  title: 'Policies & Info',
  links: [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms and Conditions', to: '/terms-conditions' },
  { label: 'Returns & Refund Policy', to: '/returns-refunds' }]

}];