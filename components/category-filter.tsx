'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shirt, Laptop, Home, Book } from 'lucide-react';

const categories = [
  { id: 'fashion', label: 'Fashion', icon: Shirt },
  { id: 'tech', label: 'Tech', icon: Laptop },
  { id: 'home', label: 'Home', icon: Home },
  { id: 'books', label: 'Books', icon: Book },
];

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState('fashion');

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-b border-border">
      <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 md:flex-wrap">
        {categories.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            onClick={() => setActiveCategory(id)}
            variant={activeCategory === id ? 'default' : 'outline'}
            className={`flex gap-2 rounded-xl whitespace-nowrap ${
              activeCategory === id
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                : 'border-border hover:bg-secondary'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Button>
        ))}
      </div>
    </section>
  );
}
