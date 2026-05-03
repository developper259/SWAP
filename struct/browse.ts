/**
 * Browse data structure for the Swap barter application
 */

import { ItemCondition } from './item';

export interface BrowseItem {
  id: string;
  image: string;
  title: string;
  condition: ItemCondition;
  rating: number;
  reviews: number;
  user: string;
  userImage: string;
  userId?: string;
}

export interface BrowseFilters {
  category?: string;
  condition?: ItemCondition[];
  location?: string;
  minRating?: number;
  maxDistance?: number;
}

export interface ActiveFilter {
  label: string;
  value: string;
}

export interface SearchSuggestion {
  id: string;
  title: string;
  image: string;
  condition: string;
}
