'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SearchHeaderProps {
  searchQuery?: string;
  activeFilters?: { label: string; value: string }[];
  onSortChange?: (sort: string) => void;
  onClearFilters?: () => void;
  onRemoveFilter?: (value: string) => void;
}

export default function SearchHeader({
  searchQuery = 'leather jacket',
  activeFilters = [],
  onSortChange,
  onClearFilters,
  onRemoveFilter,
}: SearchHeaderProps) {
  const [sortBy, setSortBy] = useState('newest');

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange?.(value);
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Results Title and Sort */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Results for <span className="text-primary">"{searchQuery}"</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Found 24 items</p>
        </div>

        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px] rounded-lg border-border bg-card">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="closest">Closest</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map(filter => (
            <Badge
              key={filter.value}
              variant="secondary"
              className="gap-1 pr-1 rounded-full"
            >
              {filter.label}
              <button
                onClick={() => onRemoveFilter?.(filter.value)}
                className="ml-1 hover:opacity-70"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs h-6 text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
