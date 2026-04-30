'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ItemCard from '@/components/item-card';
import SearchFilters from '@/components/search-filters';
import SearchHeader from '@/components/search-header';
import EmptyState from '@/components/empty-state';
import { Menu, X, Search, Command } from 'lucide-react';

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('q') || '';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState<{ label: string; value: string }[]>([]);
  const [inputQuery, setInputQuery] = useState(searchQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Suggested items for quick results
  const suggestedItems = MOCK_ITEMS.filter(item =>
    item.title.toLowerCase().includes(inputQuery.toLowerCase())
  ).slice(0, 4);

  // Update input when URL changes
  useEffect(() => {
    setInputQuery(searchQuery);
  }, [searchQuery]);

  // Filter items based on search query
  const filteredItems = MOCK_ITEMS.filter(item => {
    if (!searchQuery) return true;
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const hasItems = filteredItems.length > 0;

  // Handle search submission
  const handleSearch = () => {
    if (inputQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(inputQuery.trim())}`);
      setIsOpen(false);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (highlightedIndex >= 0 && suggestedItems[highlightedIndex]) {
      router.push(`/product?id=${suggestedItems[highlightedIndex].id}`);
      setIsOpen(false);
    } else {
      handleSearch();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestedItems.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < suggestedItems.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : suggestedItems.length - 1
        );
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

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
        {/* Search Bar */}
        <div className="mb-6 relative">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={handleSearch}
              />
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                onKeyDown={handleKeyDown}
                placeholder="Search items..."
                className="w-full pl-9 pr-16 h-10 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground pointer-events-none">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>
          </form>

          {/* Quick Results Dropdown */}
          {isOpen && inputQuery.trim() && suggestedItems.length > 0 && (
            <div 
              className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white/80 backdrop-blur-xl border border-border shadow-lg overflow-hidden z-50"
              onMouseLeave={() => setHighlightedIndex(-1)}
            >
              <div className="p-2">
                <p className="text-xs text-muted-foreground px-2 py-1 font-medium">Quick Results</p>
                {suggestedItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      router.push(`/product?id=${item.id}`);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-colors text-left ${
                      index === highlightedIndex
                        ? 'bg-primary/10 border border-primary/30'
                        : 'hover:bg-secondary/50'
                    }`}
                  >
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.condition}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="border-t border-border px-3 py-2 bg-secondary/30">
                <p className="text-xs text-muted-foreground">
                  Use <span className="font-medium">↑↓</span> to navigate, <span className="font-medium">Enter</span> to select
                </p>
              </div>
            </div>
          )}
        </div>

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
              searchQuery={searchQuery}
              activeFilters={activeFilters}
              onClearFilters={handleClearFilters}
              onRemoveFilter={handleRemoveFilter}
            />

            {/* Results Grid or Empty State */}
            {hasItems ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
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
