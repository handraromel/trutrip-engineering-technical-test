import { User } from '@/types/user';

/**
 * Sort users by creation date in descending order (latest first)
 * @param users - Array of users to sort
 * @returns Sorted array with latest users first
 */
export const sortUsersByLatest = (users: User[]): User[] => {
  return [...users].sort((a, b) => Number(b.id) - Number(a.id));
};
