import { Review } from '../types/catalog';

export const reviews: Review[] = [
{
  id: 'r1',
  productId: 'black-thai-honey-10-pack',
  author: 'Marcus T.',
  location: 'Houston, TX',
  rating: 5,
  title: 'My go-to every month',
  body: 'Been on the subscription for half a year. Shipping is always fast and the packs are easy to keep in the car or gym bag.',
  date: '2026-09-28',
  verified: true
},
{
  id: 'r2',
  productId: 'black-thai-honey-10-pack',
  author: 'Daniel R.',
  location: 'Phoenix, AZ',
  rating: 5,
  title: 'Great taste, discreet box',
  body: 'Tastes like real dark honey, not syrupy. Packaging came plain on the outside which I appreciated.',
  date: '2026-09-12',
  verified: true
},
{
  id: 'r3',
  productId: 'black-thai-honey-pro-max',
  author: 'Andre W.',
  location: 'Atlanta, GA',
  rating: 5,
  title: 'Resealable is a game changer',
  body: 'I like that I can open the Pro Max unit and save the rest. Same great honey, better format for me.',
  date: '2026-08-30',
  verified: true
},
{
  id: 'r4',
  productId: 'black-thai-honey-10-pack',
  author: 'Chris L.',
  location: 'Miami, FL',
  rating: 4,
  title: 'Solid product',
  body: 'Good product and the free shaker with the subscription was a nice touch. Would love a bigger box option on subscription.',
  date: '2026-08-14',
  verified: true
},
{
  id: 'r5',
  productId: 'beast-mode',
  author: 'Jordan P.',
  location: 'Denver, CO',
  rating: 5,
  title: 'Bold flavor',
  body: 'Beast Mode has a stronger taste than the original. I keep a few packs in my desk for long workdays.',
  date: '2026-09-02',
  verified: true
},
{
  id: 'r6',
  productId: 'beast-mode',
  author: 'Kevin M.',
  location: 'Charlotte, NC',
  rating: 4,
  title: 'Good, a little intense',
  body: 'Definitely more intense than the regular honey. Subscribing saved me a decent amount.',
  date: '2026-07-21',
  verified: true
},
{
  id: 'r7',
  productId: 'shaker-white',
  author: 'Sam K.',
  location: 'Austin, TX',
  rating: 5,
  title: "Doesn't leak",
  body: 'Threw it in my bag full and nothing leaked. Clean white look with the logo.',
  date: '2026-08-05',
  verified: true
},
{
  id: 'r8',
  productId: 'black-thai-honey-pro-max',
  author: 'Luis G.',
  location: 'San Diego, CA',
  rating: 5,
  title: 'Worth it',
  body: 'Ordered once, switched to subscription right after. Customer service answered my question the same day.',
  date: '2026-07-10',
  verified: true
}];


export const ratingDistribution = [
{ stars: 5, percent: 84 },
{ stars: 4, percent: 11 },
{ stars: 3, percent: 3 },
{ stars: 2, percent: 1 },
{ stars: 1, percent: 1 }];