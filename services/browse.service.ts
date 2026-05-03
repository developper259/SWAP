/**
 * Browse Service - Handles all browse and search operations with API integration
 */

import { BrowseItem, BrowseFilters, ActiveFilter, SearchSuggestion, ItemCondition } from '@/struct';
import { apiService, ApiResponse } from './api.service';

export class BrowseService {
  private items: Map<string, BrowseItem> = new Map();
  private recentSearches: string[] = [];
  private maxRecentSearches: number = 10;
  private resource = 'browse';

  constructor(initialItems: BrowseItem[] = []) {
    initialItems.forEach(item => this.items.set(item.id, item));
  }

  // ==================== API CALLS ====================

  // Get all items via API
  async getAllItemsApi(): Promise<ApiResponse<BrowseItem[]>> {
    const response = await apiService.getAll<BrowseItem>(this.resource);
    if (response.data) {
      response.data.forEach(item => this.items.set(item.id, item));
    }
    return response;
  }

  // Get item by ID via API
  async getItemByIdApi(id: string): Promise<ApiResponse<BrowseItem>> {
    return apiService.getById<BrowseItem>(this.resource, id);
  }

  // Search items via API
  async searchApi(query: string): Promise<ApiResponse<BrowseItem[]>> {
    this.addRecentSearch(query);
    return apiService.get<BrowseItem[]>(`/${this.resource}/search`, { q: query });
  }

  // Quick search for suggestions via API
  async quickSearchApi(query: string, limit: number = 4): Promise<ApiResponse<SearchSuggestion[]>> {
    return apiService.get<SearchSuggestion[]>(`/${this.resource}/quick-search`, { q: query, limit });
  }

  // Filter items via API
  async filterItemsApi(filters: BrowseFilters): Promise<ApiResponse<BrowseItem[]>> {
    return apiService.get<BrowseItem[]>(`/${this.resource}/filter`, filters as Record<string, string | number>);
  }

  // Get paginated items via API
  async getPaginatedItemsApi(page: number, limit: number = 12): Promise<ApiResponse<{
    items: BrowseItem[];
    total: number;
    totalPages: number;
    currentPage: number;
  }>> {
    return apiService.get(`/${this.resource}`, { page, limit });
  }

  // Get categories via API
  async getCategoriesApi(): Promise<ApiResponse<string[]>> {
    return apiService.get<string[]>(`/${this.resource}/categories`);
  }

  // Get items by user via API
  async getItemsByUserApi(userId: string): Promise<ApiResponse<BrowseItem[]>> {
    return apiService.get<BrowseItem[]>(`/${this.resource}/user/${userId}`);
  }

  // Get stats via API
  async getStatsApi(): Promise<ApiResponse<{
    totalItems: number;
    averageRating: number;
    topCategories: string[];
  }>> {
    return apiService.get(`/${this.resource}/stats`);
  }

  // Get recent searches via API
  async getRecentSearchesApi(): Promise<ApiResponse<string[]>> {
    return apiService.get<string[]>(`/${this.resource}/recent-searches`);
  }

  // Clear recent searches via API
  async clearRecentSearchesApi(): Promise<ApiResponse<void>> {
    const response = await apiService.delete<void>(`/${this.resource}/recent-searches`);
    if (!response.error) {
      this.recentSearches = [];
    }
    return response;
  }

  // ==================== LOCAL OPERATIONS ====================

  // Add Item
  addItem(item: BrowseItem): void {
    this.items.set(item.id, item);
  }

  // Get All Items
  getAllItems(): BrowseItem[] {
    return Array.from(this.items.values());
  }

  // Get Item by ID
  getItemById(id: string): BrowseItem | undefined {
    return this.items.get(id);
  }

  // Search Items
  search(query: string): BrowseItem[] {
    if (!query.trim()) return this.getAllItems();
    
    const lowerQuery = query.toLowerCase();
    return this.getAllItems().filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.condition.toLowerCase().includes(lowerQuery) ||
      item.user.toLowerCase().includes(lowerQuery)
    );
  }

  // Quick Search (for suggestions)
  quickSearch(query: string, limit: number = 4): SearchSuggestion[] {
    const results = this.search(query);
    return results.slice(0, limit).map(item => ({
      id: item.id,
      title: item.title,
      image: item.image,
      condition: item.condition,
    }));
  }

  // Filter Items
  filterItems(filters: BrowseFilters): BrowseItem[] {
    let items = this.getAllItems();
    
    if (filters.category) {
      items = items.filter(item => 
        (item as any).category?.toLowerCase() === filters.category!.toLowerCase()
      );
    }
    
    if (filters.condition && filters.condition.length > 0) {
      items = items.filter(item => 
        filters.condition!.includes(item.condition as ItemCondition)
      );
    }
    
    if (filters.location) {
      items = items.filter(item => 
        (item as any).location?.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.minRating) {
      items = items.filter(item => item.rating >= filters.minRating!);
    }
    
    return items;
  }

  // Apply Active Filters
  applyActiveFilters(items: BrowseItem[], activeFilters: ActiveFilter[]): BrowseItem[] {
    return items.filter(item => {
      return activeFilters.every(filter => {
        switch (filter.value.split(':')[0]) {
          case 'condition':
            return item.condition === filter.value.split(':')[1];
          case 'category':
            return (item as any).category === filter.value.split(':')[1];
          default:
            return true;
        }
      });
    });
  }

  // Sort Items
  sortItems(items: BrowseItem[], sortBy: 'rating' | 'reviews' | 'date', order: 'asc' | 'desc' = 'desc'): BrowseItem[] {
    const sorted = [...items];
    
    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case 'reviews':
        sorted.sort((a, b) => a.reviews - b.reviews);
        break;
      case 'date':
        sorted.sort((a, b) => 
          new Date((a as any).createdAt || 0).getTime() - 
          new Date((b as any).createdAt || 0).getTime()
        );
        break;
    }
    
    return order === 'desc' ? sorted.reverse() : sorted;
  }

  // Paginate Items
  paginateItems(items: BrowseItem[], page: number, limit: number = 12): {
    items: BrowseItem[];
    total: number;
    totalPages: number;
    currentPage: number;
  } {
    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedItems = items.slice(start, start + limit);
    
    return {
      items: paginatedItems,
      total,
      totalPages,
      currentPage: page,
    };
  }

  // Recent Searches
  addRecentSearch(query: string): void {
    const normalized = query.trim().toLowerCase();
    this.recentSearches = this.recentSearches.filter(s => s !== normalized);
    this.recentSearches.unshift(normalized);
    this.recentSearches = this.recentSearches.slice(0, this.maxRecentSearches);
  }

  getRecentSearches(): string[] {
    return this.recentSearches;
  }

  clearRecentSearches(): void {
    this.recentSearches = [];
  }

  // Categories
  getCategories(): string[] {
    const categories = new Set<string>();
    this.getAllItems().forEach(item => {
      if ((item as any).category) {
        categories.add((item as any).category);
      }
    });
    return Array.from(categories);
  }

  // Conditions
  getConditions(): ItemCondition[] {
    return ['Mint', 'Like New', 'Excellent', 'Good', 'Fair'];
  }

  // Get items by user
  getItemsByUser(userId: string): BrowseItem[] {
    return this.getAllItems().filter(item => item.userId === userId);
  }

  // Remove Item
  removeItem(id: string): boolean {
    return this.items.delete(id);
  }

  // Update Item
  updateItem(id: string, data: Partial<BrowseItem>): BrowseItem | undefined {
    const item = this.items.get(id);
    if (!item) return undefined;
    
    const updatedItem = { ...item, ...data };
    this.items.set(id, updatedItem);
    return updatedItem;
  }

  // Statistics
  getStats(): {
    totalItems: number;
    averageRating: number;
    topCategories: string[];
  } {
    const items = this.getAllItems();
    const avgRating = items.reduce((sum, item) => sum + item.rating, 0) / items.length || 0;
    
    const categoryCount = new Map<string, number>();
    items.forEach(item => {
      const cat = (item as any).category || 'Other';
      categoryCount.set(cat, (categoryCount.get(cat) || 0) + 1);
    });
    
    const topCategories = Array.from(categoryCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([cat]) => cat);
    
    return {
      totalItems: items.length,
      averageRating: Math.round(avgRating * 10) / 10,
      topCategories,
    };
  }
}
