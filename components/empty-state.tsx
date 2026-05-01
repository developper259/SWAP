import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

interface EmptyStateProps {
  onClearFilters?: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{t('emptyState.title')}</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        {t('emptyState.description')}
      </p>
      <Button
        onClick={onClearFilters}
        className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {t('emptyState.clearFilters')}
      </Button>
    </div>
  );
}
