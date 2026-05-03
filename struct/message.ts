/**
 * Message data structure for the Swap barter application
 */

export type MessageSender = 'user' | 'other';

export interface Message {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  read?: boolean;
}

export interface Conversation {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}
