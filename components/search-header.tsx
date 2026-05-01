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
import { useLanguage } from '@/lib/language-context';

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
  const { t } = useLanguage();
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
            {t('browseResults.results')} pour <span className="text-primary">"{searchQuery}"</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{t('browseResults.found')} 24 articles</p>
        </div>

        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px] rounded-lg border-border bg-card">
            <SelectValue placeholder={t('browsePage.sortBy')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t('browsePage.sortOptions.newest')}</SelectItem>
            <SelectItem value="closest">{t('browsePage.sortOptions.closest')}</SelectItem>
            <SelectItem value="popular">{t('browsePage.sortOptions.popular')}</SelectItem>
            <SelectItem value="rating">{t('browsePage.sortOptions.rating')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">{t('browsePage.activeFilters')}:</span>
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
            {t('browsePage.clearAll')}
          </Button>
        </div>
      )}
    </div>
  );
}
