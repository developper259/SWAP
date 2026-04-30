'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface ActiveTrade {
  id: string;
  partner: string;
  partnerAvatar: string;
  itemA: string;
  itemB: string;
  status: 'pending' | 'approved' | 'transit' | 'completed';
  date: string;
}

const STATUS_CONFIG = {
  pending: { bg: 'bg-yellow-50', text: 'text-yellow-800', label: 'Pending Approval' },
  approved: { bg: 'bg-blue-50', text: 'text-blue-800', label: 'In Transit' },
  transit: { bg: 'bg-purple-50', text: 'text-purple-800', label: 'Delivery Expected' },
  completed: { bg: 'bg-green-50', text: 'text-green-800', label: 'Completed' },
};

const ACTIVE_TRADES: ActiveTrade[] = [
  {
    id: '1',
    partner: 'Sarah Chen',
    partnerAvatar: '👩‍🦰',
    itemA: 'Vintage Leather Jacket',
    itemB: 'Digital Camera',
    status: 'approved',
    date: 'Expected: Mar 15',
  },
  {
    id: '2',
    partner: 'Mike Johnson',
    partnerAvatar: '👨‍💼',
    itemA: 'Air Jordan 1s',
    itemB: 'Gaming Console',
    status: 'pending',
    date: 'Awaiting confirmation',
  },
  {
    id: '3',
    partner: 'Emma Wilson',
    partnerAvatar: '👩‍🎨',
    itemA: 'Canon EOS Camera',
    itemB: 'MacBook Air',
    status: 'completed',
    date: 'Completed: Mar 8',
  },
];

export default function ActiveTradesList() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-4">Active Trades</h2>
      <div className="space-y-4">
        {ACTIVE_TRADES.map((trade) => {
          const config = STATUS_CONFIG[trade.status];
          return (
            <div
              key={trade.id}
              className="bg-card border border-border rounded-2xl p-4"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Partner & Items */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-lg">
                      {trade.partnerAvatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{trade.partner}</p>
                      <p className="text-xs text-muted-foreground">{trade.date}</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="bg-secondary/50 rounded-lg p-3 space-y-1">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-semibold">{trade.itemA}</span>
                      {' '}for{' '}
                      <span className="text-foreground font-semibold">{trade.itemB}</span>
                    </p>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex flex-col items-end gap-3">
                  <Badge
                    className={`${config.bg} ${config.text} hover:${config.bg}`}
                  >
                    {config.label}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2 rounded-lg border-border text-foreground hover:bg-secondary"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
