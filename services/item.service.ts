/**
 * Item Service - Handles all item-related operations with API integration
 */

import { Item, ItemCardData, TradeItem, InventoryItem, ItemCondition } from '@/struct';
import { apiService, ApiResponse } from './api.service';

export class ItemService {
  private items: Map<string, Item> = new Map();
  private resource = 'items';

  constructor(initialItems: Item[] = []) {
    initialItems.forEach(item => this.items.set(item.id, item));
  }

  // ==================== API CALLS ====================

  // Create item via API
  async createItemApi(data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Item>> {
    const response = await apiService.create<Item>(this.resource, data);
    if (response.data) {
      this.items.set(response.data.id, response.data);
    }
    return response;
  }

  // Get item by ID via API
  async getItemByIdApi(id: string): Promise<ApiResponse<Item>> {
    const response = await apiService.getById<Item>(this.resource, id);
    if (response.data) {
      this.items.set(response.data.id, response.data);
    }
    return response;
  }

  // Get all items via API
  async getAllItemsApi(): Promise<ApiResponse<Item[]>> {
    const response = await apiService.getAll<Item>(this.resource);
    if (response.data) {
      response.data.forEach(item => this.items.set(item.id, item));
    }
    return response;
  }

  // Get items by user ID via API
  async getItemsByUserIdApi(userId: string): Promise<ApiResponse<Item[]>> {
    return apiService.get<Item[]>(`/${this.resource}`, { userId });
  }

  // Update item via API
  async updateItemApi(id: string, data: Partial<Item>): Promise<ApiResponse<Item>> {
    const response = await apiService.partialUpdate<Item>(this.resource, id, data);
    if (response.data) {
      this.items.set(id, response.data);
    }
    return response;
  }

  // Delete item via API
  async deleteItemApi(id: string): Promise<ApiResponse<void>> {
    const response = await apiService.remove<void>(this.resource, id);
    if (!response.error) {
      this.items.delete(id);
    }
    return response;
  }

  // Search items via API
  async searchItemsApi(query: string): Promise<ApiResponse<Item[]>> {
    return apiService.get<Item[]>(`/${this.resource}/search`, { q: query });
  }

  // Filter items via API
  async filterItemsApi(filters: {
    category?: string;
    condition?: string;
    minRating?: number;
    userId?: string;
  }): Promise<ApiResponse<Item[]>> {
    return apiService.get<Item[]>(`/${this.resource}/filter`, filters as Record<string, string | number>);
  }

  // ==================== LOCAL OPERATIONS ====================

  // Create
  createItem(data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Item {
    const id = this.generateId();
    const now = new Date().toISOString();
    const item: Item = { 
      ...data, 
      id, 
      createdAt: now, 
      updatedAt: now 
    };
    this.items.set(id, item);
    return item;
  }

  // Read
  getItemById(id: string): Item | undefined {
    return this.items.get(id);
  }

  getItemsByUserId(userId: string): Item[] {
    return Array.from(this.items.values()).filter(item => item.userId === userId);
  }

  getItemsByCategory(category: string): Item[] {
    return Array.from(this.items.values()).filter(item => 
      item.category?.toLowerCase() === category.toLowerCase()
    );
  }

  getItemsByCondition(condition: ItemCondition): Item[] {
    return Array.from(this.items.values()).filter(item => item.condition === condition);
  }

  getAllItems(): Item[] {
    return Array.from(this.items.values());
  }

  // Update
  updateItem(id: string, data: Partial<Item>): Item | undefined {
    const item = this.items.get(id);
    if (!item) return undefined;
    
    const updatedItem = { 
      ...item, 
      ...data, 
      updatedAt: new Date().toISOString() 
    };
    this.items.set(id, updatedItem);
    return updatedItem;
  }

  // Delete
  deleteItem(id: string): boolean {
    return this.items.delete(id);
  }

  // Transform to ItemCardData
  toItemCardData(item: Item): ItemCardData {
    return {
      id: item.id,
      userId: item.userId,
      image: item.image,
      title: item.title,
      condition: item.condition,
      rating: item.rating,
      reviews: item.reviews,
      user: item.user,
      userImage: item.userImage,
    };
  }

  // Transform to TradeItem
  toTradeItem(item: Item): TradeItem {
    return {
      id: item.id,
      image: item.image,
      title: item.title,
      condition: item.condition,
    };
  }

  // Transform to InventoryItem
  toInventoryItem(item: Item): InventoryItem {
    return {
      id: item.id,
      image: item.image,
      title: item.title,
      condition: item.condition,
      category: item.category || '',
    };
  }

  // Get items as ItemCardData array
  getItemCards(userId?: string): ItemCardData[] {
    const items = userId ? this.getItemsByUserId(userId) : this.getAllItems();
    return items.map(this.toItemCardData);
  }

  // Get items as TradeItem array
  getTradeItems(userId: string): TradeItem[] {
    return this.getItemsByUserId(userId).map(this.toTradeItem);
  }

  // Get items as InventoryItem array
  getInventoryItems(userId: string): InventoryItem[] {
    return this.getItemsByUserId(userId).map(this.toInventoryItem);
  }

  // Search
  searchItems(query: string): Item[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllItems().filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description?.toLowerCase().includes(lowerQuery) ||
      item.category?.toLowerCase().includes(lowerQuery)
    );
  }

  // Filter
  filterItems(filters: {
    category?: string;
    condition?: ItemCondition[];
    minRating?: number;
    userId?: string;
  }): Item[] {
    let items = this.getAllItems();
    
    if (filters.userId) {
      items = items.filter(item => item.userId === filters.userId);
    }
    if (filters.category) {
      items = items.filter(item => 
        item.category?.toLowerCase() === filters.category!.toLowerCase()
      );
    }
    if (filters.condition && filters.condition.length > 0) {
      items = items.filter(item => 
        filters.condition!.includes(item.condition)
      );
    }
    if (filters.minRating) {
      items = items.filter(item => item.rating >= filters.minRating!);
    }
    
    return items;
  }

  // Sort
  sortItems(items: Item[], sortBy: 'rating' | 'date' | 'title', order: 'asc' | 'desc' = 'desc'): Item[] {
    const sorted = [...items];
    
    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case 'date':
        sorted.sort((a, b) => 
          new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
        );
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    return order === 'desc' ? sorted.reverse() : sorted;
  }

  // Validation
  validateItem(item: Partial<Item>): string[] {
    const errors: string[] = [];
    
    if (!item.title || item.title.length < 3) {
      errors.push('Title must be at least 3 characters');
    }
    if (!item.condition) {
      errors.push('Condition is required');
    }
    if (!item.userId) {
      errors.push('User ID is required');
    }
    
    return errors;
  }

  private generateId(): string {
    return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
