import { buildUrl, api } from '../../../shared/config/instance';
import { User } from '../../../shared/types';
import { LoginFormData } from '../model/loginSchema';
import { RegisterFormData } from '../model/registerSchema';

export const signin = async (data: LoginFormData): Promise<User> => {
  const response = await api.post<User>(buildUrl(['auth', 'signin']), data);
  return response.data;
};

export const signup = async (data: RegisterFormData): Promise<User> => {
  const response = await api.post<User>(buildUrl(['auth', 'signup']), data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post(buildUrl(['auth', 'logout']));
};

export const signWithGoogle = async (
  data: Pick<User, 'email' | 'userName'>
): Promise<User> => {
  const response = await api.post<User>(buildUrl(['auth', 'google']), data);
  return response.data;
};
