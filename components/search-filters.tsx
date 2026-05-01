'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

interface SearchFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

export default function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const { t } = useLanguage();
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    condition: true,
    distance: true,
    rating: true,
  });

  const [filters, setFilters] = useState({
    categories: [] as string[],
    conditions: [] as string[],
    distance: 50,
    minRating: 0,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const categories = ['Fashion', 'Electronics', 'Home', 'Books', 'Sports', 'Art'];
  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Used'];
  const ratings = [5, 4, 3, 2, 1];

  const getCategoryTranslation = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Fashion': t('searchFilters.categories.fashion'),
      'Electronics': t('searchFilters.categories.electronics'),
      'Home': t('searchFilters.categories.home'),
      'Books': t('searchFilters.categories.books'),
      'Sports': t('searchFilters.categories.sports'),
      'Art': t('searchFilters.categories.art')
    };
    return categoryMap[category] || category;
  };

  const getConditionTranslation = (condition: string) => {
    const conditionMap: { [key: string]: string } = {
      'New': t('searchFilters.conditions.new'),
      'Like New': t('searchFilters.conditions.likeNew'),
      'Good': t('searchFilters.conditions.good'),
      'Fair': t('searchFilters.conditions.fair'),
      'Used': t('searchFilters.conditions.used')
    };
    return conditionMap[condition] || condition;
  };

  return (
    <ScrollArea className="h-full">
      <div className="pr-4 space-y-6">
        {/* Category Filter */}
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full mb-3"
          >
            <h3 className="font-semibold text-foreground">{t('searchFilters.category')}</h3>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expandedSections.category ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSections.category && (
            <div className="space-y-2">
              {categories.map(cat => (
                <div key={cat} className="flex items-center gap-2">
                  <Checkbox
                    id={`cat-${cat}`}
                    checked={filters.categories.includes(cat)}
                    onCheckedChange={(checked) => {
                      const newCats = checked
                        ? [...filters.categories, cat]
                        : filters.categories.filter(c => c !== cat);
                      setFilters({ ...filters, categories: newCats });
                      onFiltersChange?.({ ...filters, categories: newCats });
                    }}
                    className="rounded"
                  />
                  <Label htmlFor={`cat-${cat}`} className="text-sm cursor-pointer">
                    {getCategoryTranslation(cat)}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Condition Filter */}
        <div>
          <button
            onClick={() => toggleSection('condition')}
            className="flex items-center justify-between w-full mb-3"
          >
            <h3 className="font-semibold text-foreground">{t('searchFilters.condition')}</h3>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expandedSections.condition ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSections.condition && (
            <div className="space-y-2">
              {conditions.map(cond => (
                <div key={cond} className="flex items-center gap-2">
                  <Checkbox
                    id={`cond-${cond}`}
                    checked={filters.conditions.includes(cond)}
                    onCheckedChange={(checked) => {
                      const newConds = checked
                        ? [...filters.conditions, cond]
                        : filters.conditions.filter(c => c !== cond);
                      setFilters({ ...filters, conditions: newConds });
                      onFiltersChange?.({ ...filters, conditions: newConds });
                    }}
                    className="rounded"
                  />
                  <Label htmlFor={`cond-${cond}`} className="text-sm cursor-pointer">
                    {getConditionTranslation(cond)}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Distance Filter */}
        <div>
          <button
            onClick={() => toggleSection('distance')}
            className="flex items-center justify-between w-full mb-3"
          >
            <h3 className="font-semibold text-foreground">{t('searchFilters.distance')}</h3>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expandedSections.distance ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSections.distance && (
            <div className="space-y-3">
              <Slider
                value={[filters.distance]}
                onValueChange={(val) => {
                  setFilters({ ...filters, distance: val[0] });
                  onFiltersChange?.({ ...filters, distance: val[0] });
                }}
                max={200}
                step={5}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">Dans un rayon de {filters.distance} km</p>
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div>
          <button
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full mb-3"
          >
            <h3 className="font-semibold text-foreground">{t('searchFilters.userRating')}</h3>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expandedSections.rating ? '' : '-rotate-90'
              }`}
            />
          </button>
          {expandedSections.rating && (
            <div className="space-y-2">
              {ratings.map(rating => (
                <div key={rating} className="flex items-center gap-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.minRating === rating}
                    onCheckedChange={(checked) => {
                      const newRating = checked ? rating : 0;
                      setFilters({ ...filters, minRating: newRating });
                      onFiltersChange?.({ ...filters, minRating: newRating });
                    }}
                    className="rounded"
                  />
                  <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center gap-1">
                    {Array.from({ length: rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                    {rating > 0 && <span className="text-muted-foreground">{t('searchFilters.andUp')}</span>}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
