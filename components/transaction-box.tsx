'use client';

import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TransactionBoxProps {
  itemA: {
    name: string;
    image: string;
    condition: string;
  };
  itemB: {
    name: string;
    image: string;
    condition: string;
  };
}

export default function TransactionBox({ itemA, itemB }: TransactionBoxProps) {
  return (
    <div className="bg-secondary/50 border border-border rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between gap-4">
        {/* Item A */}
        <div className="flex-1 flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-2xl flex-shrink-0">
            {itemA.image}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground truncate">{itemA.name}</p>
            <Badge variant="outline" className="mt-1 text-xs">
              {itemA.condition}
            </Badge>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Item B */}
        <div className="flex-1 flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-2xl flex-shrink-0">
            {itemB.image}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground truncate">{itemB.name}</p>
            <Badge variant="outline" className="mt-1 text-xs">
              {itemB.condition}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
