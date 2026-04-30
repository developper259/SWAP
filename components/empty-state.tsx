import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface EmptyStateProps {
  onClearFilters?: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No items found</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        We couldn't find any items matching your filters. Try adjusting your search criteria or clearing all filters.
      </p>
      <Button
        onClick={onClearFilters}
        className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Clear all filters
      </Button>
    </div>
  );
}
