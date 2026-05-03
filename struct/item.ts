/**
 * Item data structure for the Swap barter application
 */

export type ItemCondition = 'Mint' | 'Like New' | 'Excellent' | 'Good' | 'Fair';

export interface Item {
  id: string;
  userId: string;
  image: string;
  title: string;
  description?: string;
  condition: ItemCondition;
  category?: string;
  rating: number;
  reviews: number;
  user: string;
  userImage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ItemCardData {
  id: string;
  userId: string;
  image: string;
  title: string;
  condition: ItemCondition;
  rating: number;
  reviews: number;
  user: string;
  userImage: string;
}

export interface TradeItem {
  id: string;
  image: string;
  title: string;
  condition: string;
}

export interface InventoryItem {
  id: string;
  image: string;
  title: string;
  condition: string;
  category: string;
}
