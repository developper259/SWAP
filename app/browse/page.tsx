'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ItemCard from '@/components/item-card';
import SearchFilters from '@/components/search-filters';
import SearchHeader from '@/components/search-header';
import EmptyState from '@/components/empty-state';
import { Menu, X } from 'lucide-react';

const MOCK_ITEMS = [
  {
    id: '1',
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
    image: '⌚',
    title: 'Vintage Analog Watch',
    condition: 'Excellent',
    rating: 4.7,
    reviews: 14,
    user: 'Chris H.',
    userImage: '👨',
  },
];

export default function BrowsePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState<{ label: string; value: string }[]>([]);
  const [hasItems] = useState(true);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, you would apply these filters to the results
  };

  const handleRemoveFilter = (value: string) => {
    setActiveFilters(activeFilters.filter(f => f.value !== value));
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
    setFilters({});
  };

  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="gap-2 rounded-lg border-border"
          >
            {sidebarOpen ? (
              <>
                <X className="w-4 h-4" />
                Close Filters
              </>
            ) : (
              <>
                <Menu className="w-4 h-4" />
                Show Filters
              </>
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div
            className={`${
              sidebarOpen ? 'block' : 'hidden'
            } lg:block lg:col-span-1 bg-card border border-border rounded-2xl p-6 h-fit sticky top-20`}
          >
            <h2 className="text-lg font-bold text-foreground mb-6">Filters</h2>
            <SearchFilters onFiltersChange={handleFiltersChange} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Header */}
            <SearchHeader
              searchQuery="leather jacket"
              activeFilters={activeFilters}
              onClearFilters={handleClearFilters}
              onRemoveFilter={handleRemoveFilter}
            />

            {/* Results Grid or Empty State */}
            {hasItems ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_ITEMS.map(item => (
                  <ItemCard key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <EmptyState onClearFilters={handleClearFilters} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
