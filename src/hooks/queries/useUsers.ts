import { API_ENDPOINTS } from '@/constants/api';
import { httpService } from '@/services/httpService';
import { User, UserSubmissionValues } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query keys for User
export const QUERY_KEYS = {
  USERS: ['users'] as const,
} as const;

export const useGetUsers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: () => httpService.get<User[]>(API_ENDPOINTS.USERS),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, id],
    queryFn: () => httpService.get<User>(`${API_ENDPOINTS.USERS}/${id}`),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserSubmissionValues) =>
      httpService.post<UserSubmissionValues>(API_ENDPOINTS.USERS, data),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
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
        queryKey: QUERY_KEYS.USERS,
      });

      // Invalidate and refetch the specific user query
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS, userId],
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => httpService.delete(`${API_ENDPOINTS.USERS}/${userId}`),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USERS,
      });
    },
  });
};
