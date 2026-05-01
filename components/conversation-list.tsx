'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/lib/language-context';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  online: boolean;
}

const CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: '👩‍🦰',
    lastMessage: 'That sounds perfect for me!',
    timestamp: '2 min',
    unread: true,
    online: true,
  },
  {
    id: '2',
    name: 'Mike Johnson',
    avatar: '👨‍💼',
    lastMessage: 'Can you send more photos?',
    timestamp: '1 heure',
    unread: false,
    online: false,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: '👩‍🎨',
    lastMessage: 'I approve the trade!',
    timestamp: '3 heures',
    unread: false,
    online: true,
  },
];

export default function ConversationList() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold text-foreground mb-3">{t('chat.messages')}</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t('chat.searchConversations')}
            className="pl-9 pr-4 h-9 rounded-lg bg-secondary border-0 text-sm"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {CONVERSATIONS.map((conv) => (
          <div
            key={conv.id}
            className="p-3 border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                  {conv.avatar}
                </div>
                {conv.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{conv.name}</h3>
                  <span className="text-xs text-muted-foreground ml-2">{conv.timestamp}</span>
                </div>
                <p
                  className={`text-sm truncate ${
                    conv.unread
                      ? 'font-semibold text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {conv.lastMessage}
                </p>
              </div>

              {/* Unread Indicator */}
              {conv.unread && (
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
