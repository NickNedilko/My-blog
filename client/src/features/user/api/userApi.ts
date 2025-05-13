import { buildUrl, sendRequest } from '../../../shared/config/instance';
import { User } from '../../../shared/types';

interface UsersResponse {
  users: User[];
  totalUsers: number;
  lastMonthUsers: number;
}

export const getUser = (): Promise<User> => {
  return sendRequest(buildUrl(['user', 'get-user']), {
    method: 'GET',
    withCredentials: true,
  });
};

export const updateUser = (data: Partial<User>) => {
  return sendRequest(buildUrl(['user', 'update-user']), {
    method: 'PATCH',
    data,
    withCredentials: true,
  });
};

export const deleteUser = (id: string) => {
  return sendRequest(buildUrl(['user', 'delete-user', id]), {
    method: 'DELETE',
    withCredentials: true,
  });
};

export const getUsers = async (
  page: number,
  limit: number
): Promise<UsersResponse> => {
  return sendRequest(buildUrl(['user', 'get-users'], { page, limit }), {
    method: 'GET',
    withCredentials: true,
  });
};

export const getUserById = async (id: string): Promise<User> => {
  return sendRequest(buildUrl(['user', id]), {
    method: 'GET',
    withCredentials: true,
  });
};
