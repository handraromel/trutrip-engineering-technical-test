import { API_BASE_URL } from '@/constants';
import { RequestOptions } from '@/types/httpRequest';

// Generic HTTP request function
const httpRequest = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', headers = {}, body } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // Add body for POST/PUT/PATCH requests
  if (body && ['POST', 'PUT'].includes(method)) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return {} as T;
  } catch (error) {
    console.error(`HTTP ${method} Error:`, error);
    throw error;
  }
};

// HTTP methods
export const httpService = {
  get: <T>(endpoint: string, headers?: Record<string, string>) =>
    httpRequest<T>(endpoint, { method: 'GET', headers }),

  post: <T>(endpoint: string, data: unknown, headers?: Record<string, string>) =>
    httpRequest<T>(endpoint, { method: 'POST', body: data, headers }),

  put: <T>(endpoint: string, data: unknown, headers?: Record<string, string>) =>
    httpRequest<T>(endpoint, { method: 'PUT', body: data, headers }),

  delete: <T>(endpoint: string, headers?: Record<string, string>) =>
    httpRequest<T>(endpoint, { method: 'DELETE', headers }),
};

export const fetchData = httpService.get;
export const createData = httpService.post;
export const updateData = httpService.put;
export const deleteData = httpService.delete;
