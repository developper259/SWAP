/**
 * Trade data structure for the Swap barter application
 */

export type TradeStatus = 'pending' | 'approved' | 'transit' | 'completed';

export interface Trade {
  id: string;
  partner: string;
  partnerAvatar: string;
  partnerId?: string;
  itemA: string;
  itemAId?: string;
  itemB: string;
  itemBId?: string;
  status: TradeStatus;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActiveTrade {
  id: string;
  partner: string;
  partnerAvatar: string;
  itemA: string;
  itemB: string;
  status: TradeStatus;
  date: string;
}

export interface TradeOffer {
  id: string;
  initiatorId: string;
  recipientId: string;
  offeredItems: string[];
  requestedItems: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  message?: string;
  createdAt: string;
  expiresAt?: string;
}
