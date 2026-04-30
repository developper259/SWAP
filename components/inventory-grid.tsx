'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface InventoryItem {
  id: string;
  image: string;
  title: string;
  condition: string;
  dateAdded: string;
}

const INVENTORY_ITEMS: InventoryItem[] = [
  { id: '1', image: '🧥', title: 'Vintage Leather Jacket', condition: 'Good', dateAdded: '2 days ago' },
  { id: '2', image: '👟', title: 'Air Jordan 1s', condition: 'New', dateAdded: '1 week ago' },
  { id: '3', image: '📷', title: 'Canon EOS Camera', condition: 'Good', dateAdded: '2 weeks ago' },
  { id: '4', image: '🎮', title: 'PS5 Controller', condition: 'Fair', dateAdded: '1 month ago' },
  { id: '5', image: '👜', title: 'Designer Handbag', condition: 'Good', dateAdded: '1 month ago' },
  { id: '6', image: '⌚', title: 'Smart Watch', condition: 'New', dateAdded: '2 months ago' },
  { id: '7', image: '🎧', title: 'Wireless Headphones', condition: 'Good', dateAdded: '2 months ago' },
  { id: '8', image: '📱', title: 'iPhone 12', condition: 'Fair', dateAdded: '3 months ago' },
];

export default function InventoryGrid() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-4">My Wardrobe</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {INVENTORY_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={`/edit-item?id=${item.id}`}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow hover:border-primary/30 block cursor-pointer"
          >
            {/* Image */}
            <div className="w-full aspect-square bg-secondary flex items-center justify-center text-4xl">
              {item.image}
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="font-semibold text-foreground text-sm truncate">{item.title}</p>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="outline" className="text-xs">
                  {item.condition}
                </Badge>
                <span className="text-xs text-muted-foreground">{item.dateAdded}</span>
              </div>
            </div>

            {/* Quick Action */}
            <div className="px-3 pb-3">
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-1 rounded-lg text-xs border-border text-foreground hover:bg-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Mark as swapped:', item.id);
                }}
              >
                <CheckCircle className="w-3 h-3" />
                Mark as Swapped
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
