import { buildUrl, api } from '../../../shared/config/instance';
import { User } from '../../../shared/types';

interface UsersResponse {
  users: User[];
  totalUsers: number;
  lastMonthUsers: number;
}

export const getUser = async (): Promise<User> => {
  const response = await api.get<User>(buildUrl(['user', 'get-user']));
  return response.data;
};

export const updateUser = async (data: Partial<User>): Promise<User> => {
  const response = await api.patch<User>(
    buildUrl(['user', 'update-user']),
    data
  );
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(buildUrl(['user', 'delete-user', id]));
};

export const getUsers = async (
  page: number,
  limit: number
): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>(
    buildUrl(['user', 'get-users'], { page, limit })
  );
  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<User>(buildUrl(['user', id]));
  return response.data;
};
