'use client';

import ItemCard from './item-card';

const items = [
  {
    id: '1',
    userId: 'u1',
    image: '👕',
    title: 'Vintage Leather Jacket',
    condition: 'Mint',
    rating: 4.8,
    reviews: 12,
    user: 'Sarah M.',
    userImage: '👩',
  },
  {
    id: '2',
    userId: 'u2',
    image: '💻',
    title: 'MacBook Pro 2020',
    condition: 'Like New',
    rating: 4.9,
    reviews: 8,
    user: 'Alex K.',
    userImage: '👨',
  },
  {
    id: '3',
    userId: 'u3',
    image: '📚',
    title: 'Collection of Design Books',
    condition: 'Good',
    rating: 4.6,
    reviews: 5,
    user: 'Emma L.',
    userImage: '👩',
  },
  {
    id: '4',
    userId: 'u4',
    image: '🏠',
    title: 'Minimalist Wooden Shelf',
    condition: 'Excellent',
    rating: 4.7,
    reviews: 15,
    user: 'James W.',
    userImage: '👨',
  },
  {
    id: '5',
    userId: 'u5',
    image: '👟',
    title: 'Nike Air Max 90',
    condition: 'Mint',
    rating: 4.8,
    reviews: 20,
    user: 'Lisa P.',
    userImage: '👩',
  },
  {
    id: '6',
    userId: 'u6',
    image: '🎧',
    title: 'Wireless Headphones',
    condition: 'Like New',
    rating: 4.9,
    reviews: 18,
    user: 'Tom R.',
    userImage: '👨',
  },
  {
    id: '7',
    userId: 'u7',
    image: '👜',
    title: 'Designer Handbag',
    condition: 'Good',
    rating: 4.5,
    reviews: 10,
    user: 'Nina C.',
    userImage: '👩',
  },
  {
    id: '8',
    userId: 'u8',
    image: '⌚',
    title: 'Vintage Analog Watch',
    condition: 'Excellent',
    rating: 4.7,
    reviews: 14,
    user: 'Chris H.',
    userImage: '👨',
  },
];

export default function ProductGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
