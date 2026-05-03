/**
 * User data structure for the Swap barter application
 */

export interface User {
  id: string;
  userName: string;
  userAvatar: string;
  email?: string;
  memberSince: string;
  location: string;
  successfulSwaps: number;
  rating: number;
  reviews: number;
  responseTime: string;
  verified: boolean;
  bio?: string;
  preferredItems?: string[];
}

export interface TraderInfo {
  name: string;
  avatar: string;
  rating: number;
  trades: number;
  memberSince: string;
}

export interface UserProfile {
  userName: string;
  userAvatar: string;
  memberSince: string;
  location: string;
  successfulSwaps: number;
  rating: number;
  responseTime: string;
  verified: boolean;
  bio: string;
  preferredItems: string[];
}
