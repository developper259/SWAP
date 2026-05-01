'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

interface ActiveTrade {
  id: string;
  partner: string;
  partnerAvatar: string;
  itemA: string;
  itemB: string;
  status: 'pending' | 'approved' | 'transit' | 'completed';
  date: string;
}

export default function ActiveTradesList() {
  const { t } = useLanguage();

  const ACTIVE_TRADES: ActiveTrade[] = [
    {
      id: '1',
      partner: 'Sarah Chen',
      partnerAvatar: '👩‍🦰',
      itemA: 'Vintage Leather Jacket',
      itemB: 'Digital Camera',
      status: 'approved',
      date: `${t('activeTrades.expected')}: Mar 15`,
    },
    {
      id: '2',
      partner: 'Mike Johnson',
      partnerAvatar: '👨‍💼',
      itemA: 'Air Jordan 1s',
      itemB: 'Gaming Console',
      status: 'pending',
      date: t('activeTrades.awaitingConfirmation'),
    },
    {
      id: '3',
      partner: 'Emma Wilson',
      partnerAvatar: '👩‍🎨',
      itemA: 'Canon EOS Camera',
      itemB: 'MacBook Air',
      status: 'completed',
      date: `${t('activeTrades.completed')}: Mar 8`,
    },
  ];

  const STATUS_CONFIG = {
    pending: { bg: 'bg-yellow-50', text: 'text-yellow-800', label: t('activeTrades.status.pending') },
    approved: { bg: 'bg-blue-50', text: 'text-blue-800', label: t('activeTrades.status.approved') },
    transit: { bg: 'bg-purple-50', text: 'text-purple-800', label: t('activeTrades.status.transit') },
    completed: { bg: 'bg-green-50', text: 'text-green-800', label: t('activeTrades.status.completed') },
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-4">{t('activeTrades.title')}</h2>
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
                      {' '}{t('activeTrades.for')}{' '}
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
                    {t('activeTrades.chat')}
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
