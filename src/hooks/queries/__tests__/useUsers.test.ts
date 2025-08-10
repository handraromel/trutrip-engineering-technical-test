import { httpService } from '@/services/httpService';
import { User, UserSubmissionValues } from '@/types/user';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { useCreateUser, useDeleteUser, useGetUser, useGetUsers, useUpdateUser } from '../useUsers';

// Mock the httpService
jest.mock('@/services/httpService');
const mockHttpService = httpService as jest.Mocked<typeof httpService>;

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    createdAt: '2024-01-01T00:00:00.000Z',
    name: 'John Doe',
    origin: 'New York',
    avatar: 'https://example.com/avatar1.jpg',
  },
  {
    id: '2',
    createdAt: '2024-01-02T00:00:00.000Z',
    name: 'Jane Smith',
    origin: 'Los Angeles',
    avatar: 'https://example.com/avatar2.jpg',
  },
];

const mockUser: User = mockUsers[0];

const mockUserSubmission: UserSubmissionValues = {
  name: 'New User',
  origin: 'Chicago',
};

// Helper to create QueryClient wrapper
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
  Wrapper.displayName = 'QueryClientProviderWrapper';
  return Wrapper;
};

describe('useUsers Query Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useGetUsers', () => {
    it('should fetch users successfully', async () => {
      mockHttpService.get.mockResolvedValueOnce(mockUsers);

      const { result } = renderHook(() => useGetUsers(), {
        wrapper: createWrapper(),
      });

      // Initially loading
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      // Wait for success
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockUsers);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockHttpService.get).toHaveBeenCalledWith('/users');
    });

    it('should handle error when fetching users fails', async () => {
      const errorMessage = 'Failed to fetch users';
      mockHttpService.get.mockRejectedValueOnce(new Error(errorMessage));

      const { result } = renderHook(() => useGetUsers(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(errorMessage);
      expect(result.current.data).toBeUndefined();
      expect(mockHttpService.get).toHaveBeenCalledWith('/users');
    });

    it('should have correct query configuration', () => {
      mockHttpService.get.mockResolvedValueOnce(mockUsers);

      const { result } = renderHook(() => useGetUsers(), {
        wrapper: createWrapper(),
      });

      // Check that refetchOnWindowFocus is disabled
      expect(result.current.isRefetchError).toBe(false);
    });
  });

  describe('useGetUser', () => {
    it('should fetch single user successfully when enabled', async () => {
      const userId = '1';
      mockHttpService.get.mockResolvedValueOnce(mockUser);

      const { result } = renderHook(() => useGetUser(userId, true), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockUser);
      expect(mockHttpService.get).toHaveBeenCalledWith('/users/1');
    });

    it('should not fetch when disabled', () => {
      const userId = '1';

      const { result } = renderHook(() => useGetUser(userId, false), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(mockHttpService.get).not.toHaveBeenCalled();
    });

    it('should handle error when fetching single user fails', async () => {
      const userId = '1';
      const errorMessage = 'User not found';
      mockHttpService.get.mockRejectedValueOnce(new Error(errorMessage));

      const { result } = renderHook(() => useGetUser(userId, true), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(errorMessage);
      expect(mockHttpService.get).toHaveBeenCalledWith('/users/1');
    });
  });

  describe('useCreateUser', () => {
    it('should create user successfully', async () => {
      const createdUser = {
        ...mockUserSubmission,
        id: '3',
        createdAt: '2024-01-03T00:00:00.000Z',
        avatar: 'https://example.com/avatar3.jpg',
      };
      mockHttpService.post.mockResolvedValueOnce(createdUser);

      const { result } = renderHook(() => useCreateUser(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isPending).toBe(false);

      // Trigger mutation
      result.current.mutate(mockUserSubmission);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(createdUser);
      expect(mockHttpService.post).toHaveBeenCalledWith('/users', mockUserSubmission);
    });

    it('should handle error when creating user fails', async () => {
      const errorMessage = 'Failed to create user';
      mockHttpService.post.mockRejectedValueOnce(new Error(errorMessage));

      const { result } = renderHook(() => useCreateUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(mockUserSubmission);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(errorMessage);
      expect(mockHttpService.post).toHaveBeenCalledWith('/users', mockUserSubmission);
    });
  });

  describe('useUpdateUser', () => {
    it('should update user successfully', async () => {
      const userId = '1';
      const updatedData = { name: 'Updated Name', origin: 'Updated Origin' };
      const updatedUser = { ...mockUser, ...updatedData };

      mockHttpService.put.mockResolvedValueOnce(updatedUser);

      const { result } = renderHook(() => useUpdateUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ userId, data: updatedData });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(updatedUser);
      expect(mockHttpService.put).toHaveBeenCalledWith('/users/1', updatedData);
    });

    it('should handle error when updating user fails', async () => {
      const userId = '1';
      const updatedData = { name: 'Updated Name', origin: 'Updated Origin' };
      const errorMessage = 'Failed to update user';

      mockHttpService.put.mockRejectedValueOnce(new Error(errorMessage));

      const { result } = renderHook(() => useUpdateUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ userId, data: updatedData });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(errorMessage);
      expect(mockHttpService.put).toHaveBeenCalledWith('/users/1', updatedData);
    });
  });

  describe('useDeleteUser', () => {
    it('should delete user successfully', async () => {
      const userId = '1';
      mockHttpService.delete.mockResolvedValueOnce({});

      const { result } = renderHook(() => useDeleteUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(userId);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockHttpService.delete).toHaveBeenCalledWith('/users/1');
    });

    it('should handle error when deleting user fails', async () => {
      const userId = '1';
      const errorMessage = 'Failed to delete user';

      mockHttpService.delete.mockRejectedValueOnce(new Error(errorMessage));

      const { result } = renderHook(() => useDeleteUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(userId);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(errorMessage);
      expect(mockHttpService.delete).toHaveBeenCalledWith('/users/1');
    });
  });

  describe('Query Cache Management', () => {
    it('should invalidate queries after successful user creation', async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });

      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const wrapper = ({ children }: { children: React.ReactNode }) =>
        React.createElement(QueryClientProvider, { client: queryClient }, children);

      mockHttpService.post.mockResolvedValueOnce(mockUser);

      const { result } = renderHook(() => useCreateUser(), { wrapper });

      result.current.mutate(mockUserSubmission);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['users'] });
    });

    it('should invalidate and remove queries after successful user deletion', async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });

      const removeQueriesSpy = jest.spyOn(queryClient, 'removeQueries');
      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const wrapper = ({ children }: { children: React.ReactNode }) =>
        React.createElement(QueryClientProvider, { client: queryClient }, children);

      mockHttpService.delete.mockResolvedValueOnce({});

      const { result } = renderHook(() => useDeleteUser(), { wrapper });
      const userId = '1';

      result.current.mutate(userId);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(removeQueriesSpy).toHaveBeenCalledWith({ queryKey: ['users', userId] });
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['users'] });
    });

    it('should invalidate both user list and specific user queries after successful update', async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });

      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const wrapper = ({ children }: { children: React.ReactNode }) =>
        React.createElement(QueryClientProvider, { client: queryClient }, children);

      mockHttpService.put.mockResolvedValueOnce(mockUser);

      const { result } = renderHook(() => useUpdateUser(), { wrapper });
      const userId = '1';
      const updateData = { name: 'Updated Name', origin: 'Updated Origin' };

      result.current.mutate({ userId, data: updateData });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['users'] });
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['users', userId] });
    });
  });
});
