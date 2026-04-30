'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Command } from 'lucide-react';

interface SuggestedItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

// Mock suggested items - in production, this would come from an API
const SUGGESTED_ITEMS: SuggestedItem[] = [
  { id: '1', title: 'Vintage Leather Jacket', image: '🧥', category: 'Clothing' },
  { id: '2', title: 'Air Jordan 1s', image: '👟', category: 'Shoes' },
  { id: '3', title: 'Canon EOS Camera', image: '📷', category: 'Electronics' },
  { id: '4', title: 'Designer Handbag', image: '👜', category: 'Accessories' },
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<SuggestedItem[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Filter items based on query
  useEffect(() => {
    if (query.trim()) {
      const filtered = SUGGESTED_ITEMS.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4);
      setFilteredItems(filtered);
      setHighlightedIndex(-1); // Reset highlight when results change
    } else {
      setFilteredItems([]);
      setHighlightedIndex(-1);
    }
  }, [query]);

  // Handle keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle search submission
  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/browse?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    } else {
      inputRef.current?.focus();
    }
  };

  // Handle form submit (Enter key)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (highlightedIndex >= 0 && filteredItems[highlightedIndex]) {
      handleItemClick(filteredItems[highlightedIndex].id);
    } else {
      handleSearch();
    }
  };

  // Handle item click
  const handleItemClick = (itemId: string) => {
    router.push(`/product?id=${itemId}`);
    setIsOpen(false);
    setQuery('');
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredItems.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div className="flex-1 max-w-md hidden md:block relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            onClick={handleSearch}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
      {isOpen && query.trim() && filteredItems.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white/80 backdrop-blur-xl border border-border shadow-lg overflow-hidden z-50"
          onMouseLeave={() => setHighlightedIndex(-1)}
        >
          <div className="p-2">
            <p className="text-xs text-muted-foreground px-2 py-1 font-medium">Quick Results</p>
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
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
                  <p className="text-xs text-muted-foreground">{item.category}</p>
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
  );
}
