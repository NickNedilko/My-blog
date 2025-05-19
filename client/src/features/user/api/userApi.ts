import { api } from '../../../shared/config/api';
import { User } from '../../../shared/types';

interface UsersResponse {
  users: User[];
  totalUsers: number;
  lastMonthUsers: number;
}

export const getUser = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const updateUser = async (data: Partial<User>): Promise<User> => {
  const response = await api.patch<User>('/users/me', data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const getUsers = async (
  page: number,
  limit: number
): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>('/users', {
    params: { page, limit },
  });
  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};
