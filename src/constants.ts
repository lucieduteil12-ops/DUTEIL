/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  price: string;
  rating: number;
}

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Amalfi Coast',
    location: 'Italy',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200',
    description: 'Experience the pinnacle of Mediterranean luxury with breathtaking cliffs and turquoise waters.',
    price: '$1,200',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Reynisfjara',
    location: 'Iceland',
    image: 'https://images.unsplash.com/photo-1504893524553-f8591ce26c56?auto=format&fit=crop&q=80&w=800',
    description: 'Walk on the dark side of beauty at the world-famous black sand beach of Iceland.',
    price: '$950',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Kyoto Zen',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    description: 'Find inner peace among the ancient temples and colorful maple leaves of Japan.',
    price: '$1,400',
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Serengeti',
    location: 'Tanzania',
    image: 'https://images.unsplash.com/photo-1516422317953-2f8836a99268?auto=format&fit=crop&q=80&w=800',
    description: 'Witness the raw power of nature in the heart of the African wilderness.',
    price: '$2,100',
    rating: 5.0,
  }
];
