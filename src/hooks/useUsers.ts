import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../constants/api';
import { httpService } from '../services/httpService';
import { User } from '../types/user';

// Query keys for React Query
export const QUERY_KEYS = {
  USERS: ['users'] as const,
} as const;

// Custom hook to fetch users
export const useUsers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: () => httpService.get<User[]>(API_ENDPOINTS.USERS),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// You can add more user-related hooks here as needed
export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => httpService.get<User>(`${API_ENDPOINTS.USERS}/${id}`),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
