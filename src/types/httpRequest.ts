// HTTP method types
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Request options interface
export interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
}
