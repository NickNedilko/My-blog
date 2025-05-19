import { api } from '../../../shared/config/api';
import { User } from '../../../shared/types';
import { LoginFormData } from '../model/loginSchema';
import { RegisterFormData } from '../model/registerSchema';

export const signin = async (data: LoginFormData): Promise<User> => {
  const response = await api.post<User>('/auth/signin', data);
  return response.data;
};

export const signup = async (data: RegisterFormData): Promise<User> => {
  const response = await api.post<User>('/auth/signup', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const signWithGoogle = async (
  data: Pick<User, 'email' | 'userName'>
): Promise<User> => {
  const response = await api.post<User>('/auth/google', data);
  return response.data;
};
