/**
 * API Service - Base service for all HTTP operations
 */

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

interface RequestOptions {
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean>;
}

class ApiService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Set authorization token
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Remove authorization token
  clearAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  // Build URL with query params
  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    
    return url.toString();
  }

  // Generic request method
  async request<T>(
    method: HttpMethod,
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options.params);
      
      const config: RequestInit = {
        method,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      };

      if (options.body && method !== 'GET') {
        config.body = JSON.stringify(options.body);
      }

      const response = await fetch(url, config);
      const status = response.status;

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          data: null,
          error: errorData.message || `HTTP Error: ${status}`,
          status,
        };
      }

      // Handle 204 No Content
      if (status === 204) {
        return { data: null, error: null, status };
      }

      const data = await response.json();
      return { data, error: null, status };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 0,
      };
    }
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, { params });
  }

  // POST request
  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, { body });
  }

  // PUT request (full update)
  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, { body });
  }

  // PATCH request (partial update)
  async patch<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, { body });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint);
  }

  // Convenience methods for common patterns
  async getAll<T>(resource: string, params?: Record<string, string | number | boolean>): Promise<ApiResponse<T[]>> {
    return this.get<T[]>(`/${resource}`, params);
  }

  async getById<T>(resource: string, id: string): Promise<ApiResponse<T>> {
    return this.get<T>(`/${resource}/${id}`);
  }

  async create<T>(resource: string, data: Partial<T>): Promise<ApiResponse<T>> {
    return this.post<T>(`/${resource}`, data);
  }

  async update<T>(resource: string, id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    return this.put<T>(`/${resource}/${id}`, data);
  }

  async partialUpdate<T>(resource: string, id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    return this.patch<T>(`/${resource}/${id}`, data);
  }

  async remove<T>(resource: string, id: string): Promise<ApiResponse<T>> {
    return this.delete<T>(`/${resource}/${id}`);
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export class for custom instances
export { ApiService };
export type { ApiResponse, RequestOptions };
