import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Trade {
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

const ALL_TRADES: Trade[] = [
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
  {
    id: '4',
    partner: 'James Liu',
    partnerAvatar: '👨‍🎓',
    itemA: 'PS5 Controller',
    itemB: 'Nintendo Switch',
    status: 'transit',
    date: 'In transit',
  },
  {
    id: '5',
    partner: 'Lisa Anderson',
    partnerAvatar: '👩‍⚕️',
    itemA: 'Designer Handbag',
    itemB: 'Vintage Sunglasses',
    status: 'completed',
    date: 'Completed: Feb 28',
  },
];

export default function TradesPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">All Trades</h1>
        <p className="text-muted-foreground">Track all your trade negotiations</p>
      </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Trades</p>
            <p className="text-2xl font-bold text-foreground">{ALL_TRADES.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {ALL_TRADES.filter((t) => t.status === 'pending').length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">In Transit</p>
            <p className="text-2xl font-bold text-purple-600">
              {ALL_TRADES.filter((t) => t.status === 'transit').length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {ALL_TRADES.filter((t) => t.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Trades List */}
        <div className="space-y-4">
          {ALL_TRADES.map((trade) => {
            const config = STATUS_CONFIG[trade.status];
            return (
              <div
                key={trade.id}
                className="bg-card border border-border rounded-2xl p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Partner & Items */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                        {trade.partnerAvatar}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{trade.partner}</p>
                        <p className="text-xs text-muted-foreground">{trade.date}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="bg-secondary/50 rounded-lg p-3 space-y-1">
                      <p className="text-sm text-muted-foreground">
                        <span className="text-foreground font-semibold">
                          {trade.itemA}
                        </span>
                        {' '}for{' '}
                        <span className="text-foreground font-semibold">
                          {trade.itemB}
                        </span>
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
