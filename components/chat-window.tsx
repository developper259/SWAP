'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TransactionBox from './transaction-box';
import AddItemToTradeModal from './add-item-to-trade-modal';

interface Message {
  id: string;
  sender: 'user' | 'other';
  content: string;
  timestamp: string;
}

const MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'other',
    content: 'Hi! I\'m interested in your vintage leather jacket.',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    sender: 'user',
    content: 'Great! What would you like to trade for it?',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    sender: 'other',
    content: 'I have a brand new camera I\'d like to swap. Would that work?',
    timestamp: '10:35 AM',
  },
  {
    id: '4',
    sender: 'user',
    content: 'That sounds perfect for me!',
    timestamp: '10:37 AM',
  },
];

export default function ChatWindow() {
  const [message, setMessage] = useState('');
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [selectedTradeItems, setSelectedTradeItems] = useState<any[]>([]);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b border-border p-4 bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground text-lg">Sarah Chen</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Online
            </p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:bg-secondary">
            View Profile
          </Button>
        </div>
      </div>

      {/* Transaction Box */}
      <div className="p-4 border-b border-border bg-card/50">
        <p className="text-xs font-semibold text-muted-foreground mb-3">PROPOSED TRADE</p>
        <TransactionBox
          itemA={{
            name: 'Vintage Leather Jacket',
            image: '🧥',
            condition: 'Good',
          }}
          itemB={{
            name: 'Digital Camera',
            image: '📷',
            condition: 'New',
          }}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {MESSAGES.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-secondary text-foreground rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="border-t border-border p-4 bg-card">
        <div className="flex gap-2 mb-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddItemModalOpen(true)}
            className="gap-2 text-sm rounded-lg border-border"
          >
            <Plus className="w-4 h-4" />
            Add Item to Trade
          </Button>
          <Button
            asChild
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-lg"
          >
            <Link href="/propose-swap">
              Propose Exchange
            </Link>
          </Button>
        </div>

        {/* Add Item Modal */}
        <AddItemToTradeModal
          open={isAddItemModalOpen}
          onOpenChange={setIsAddItemModalOpen}
          onConfirm={(items) => {
            setSelectedTradeItems(items);
            console.log('[v0] Selected items for trade:', items);
          }}
        />

        {/* Message Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-lg bg-secondary border-0"
          />
          <Button size="icon" className="rounded-lg bg-primary hover:bg-primary/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
