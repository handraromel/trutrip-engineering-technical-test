export interface User {
  id: string;
  createdAt: string;
  name: string;
  origin: string;
  avatar: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
}

export type UserSubmissionValues = {
  name: string;
  origin: string;
};
