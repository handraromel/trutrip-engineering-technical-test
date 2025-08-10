/**
 * User Query Hooks
 *
 * Query hooks for user CRUD operations:
 * - useGetUsers() - Fetch all users
 * - useGetUser(id, enabled) - Fetch single user by ID
 * - useCreateUser() - Create new user
 * - useUpdateUser() - Update existing user
 * - useDeleteUser() - Delete user
 *
 */

import { API_ENDPOINTS } from '@/constants/api';
import { QUERY_KEY, QUERY_STALE_TIME } from '@/constants/user';
import { httpService } from '@/services/httpService';
import { User, UserSubmissionValues } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query keys for User

export const useGetUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => httpService.get<User[]>(API_ENDPOINTS.USERS),
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
  });
};

export const useGetUser = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => httpService.get<User>(`${API_ENDPOINTS.USERS}/${id}`),
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserSubmissionValues) =>
      httpService.post<UserSubmissionValues>(API_ENDPOINTS.USERS, data),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UserSubmissionValues }) =>
      httpService.put<UserSubmissionValues>(`${API_ENDPOINTS.USERS}/${userId}`, data),
    onSuccess: (_, { userId }) => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });

      // Invalidate and refetch the specific user query
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, userId],
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => httpService.delete(`${API_ENDPOINTS.USERS}/${userId}`),
    onSuccess: (_, userId) => {
      // Remove the specific user query from cache
      queryClient.removeQueries({ queryKey: [QUERY_KEY, userId] });

      // Invalidate and refetch users list
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
};
