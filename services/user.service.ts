/**
 * User Service - Handles all user-related operations with API integration
 */

import { User, TraderInfo, UserProfile } from '@/struct';
import { apiService, ApiResponse } from './api.service';

export class UserService {
  private users: Map<string, User> = new Map();
  private resource = 'users';

  constructor(initialUsers: User[] = []) {
    initialUsers.forEach(user => this.users.set(user.id, user));
  }

  // ==================== API CALLS ====================

  // Create user via API
  async createUserApi(data: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    const response = await apiService.create<User>(this.resource, data);
    if (response.data) {
      this.users.set(response.data.id, response.data);
    }
    return response;
  }

  // Get user by ID via API
  async getUserByIdApi(id: string): Promise<ApiResponse<User>> {
    const response = await apiService.getById<User>(this.resource, id);
    if (response.data) {
      this.users.set(response.data.id, response.data);
    }
    return response;
  }

  // Get all users via API
  async getAllUsersApi(): Promise<ApiResponse<User[]>> {
    const response = await apiService.getAll<User>(this.resource);
    if (response.data) {
      response.data.forEach(user => this.users.set(user.id, user));
    }
    return response;
  }

  // Update user via API
  async updateUserApi(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await apiService.partialUpdate<User>(this.resource, id, data);
    if (response.data) {
      this.users.set(id, response.data);
    }
    return response;
  }

  // Delete user via API
  async deleteUserApi(id: string): Promise<ApiResponse<void>> {
    const response = await apiService.remove<void>(this.resource, id);
    if (!response.error) {
      this.users.delete(id);
    }
    return response;
  }

  // Get profile via API
  async getProfileApi(id: string): Promise<ApiResponse<UserProfile>> {
    return apiService.getById<UserProfile>(`${this.resource}/profile`, id);
  }

  // Search users via API
  async searchUsersApi(query: string): Promise<ApiResponse<User[]>> {
    return apiService.get<User[]>(`/${this.resource}/search`, { q: query });
  }

  // Verify user via API
  async verifyUserApi(id: string): Promise<ApiResponse<User>> {
    return apiService.patch<User>(`/${this.resource}/${id}/verify`, {});
  }

  // ==================== LOCAL OPERATIONS ====================

  // Create
  createUser(data: Omit<User, 'id'>): User {
    const id = this.generateId();
    const user: User = { ...data, id };
    this.users.set(id, user);
    return user;
  }

  // Read
  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find(u => u.email === email);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  // Update
  updateUser(id: string, data: Partial<User>): User | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Delete
  deleteUser(id: string): boolean {
    return this.users.delete(id);
  }

  // Profile
  getProfile(id: string): UserProfile | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    return {
      userName: user.userName,
      userAvatar: user.userAvatar,
      memberSince: user.memberSince,
      location: user.location,
      successfulSwaps: user.successfulSwaps,
      rating: user.rating,
      responseTime: user.responseTime,
      verified: user.verified,
      bio: user.bio || '',
      preferredItems: user.preferredItems || [],
    };
  }

  // Trader Info
  getTraderInfo(id: string): TraderInfo | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    return {
      name: user.userName,
      avatar: user.userAvatar,
      rating: user.rating,
      trades: user.successfulSwaps,
      memberSince: user.memberSince,
    };
  }

  // Stats
  incrementSuccessfulSwaps(id: string): void {
    const user = this.users.get(id);
    if (user) {
      user.successfulSwaps += 1;
      this.users.set(id, user);
    }
  }

  updateRating(id: string, newRating: number): void {
    const user = this.users.get(id);
    if (user) {
      const totalReviews = user.reviews || 1;
      user.rating = ((user.rating * totalReviews) + newRating) / (totalReviews + 1);
      this.users.set(id, user);
    }
  }

  verifyUser(id: string): boolean {
    return this.updateUser(id, { verified: true }) !== undefined;
  }

  // Search
  searchUsers(query: string): User[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllUsers().filter(user =>
      user.userName.toLowerCase().includes(lowerQuery) ||
      user.location.toLowerCase().includes(lowerQuery)
    );
  }

  // Validation
  validateUser(user: Partial<User>): string[] {
    const errors: string[] = [];
    
    if (!user.userName || user.userName.length < 2) {
      errors.push('Username must be at least 2 characters');
    }
    if (!user.location || user.location.length < 2) {
      errors.push('Location is required');
    }
    if (user.email && !this.isValidEmail(user.email)) {
      errors.push('Invalid email format');
    }
    
    return errors;
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
