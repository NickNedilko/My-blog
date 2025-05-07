import { LoginFormData } from '../schemas/loginSchema';
import { RegisterFormData } from '../schemas/registerSchema';
import { User } from '../types';
import { buildUrl, sendRequest } from './instance';


export const signin = async (
  data: LoginFormData
): Promise<User> => {
  return sendRequest<User>(buildUrl(['auth', 'signin']), {
    method: 'POST',
    data,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const signup = async (
  data: RegisterFormData
): Promise<User> => {
  return sendRequest<User>(buildUrl(['auth', 'signup']), {
    method: 'POST',
    data,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const logout = async () => {
  return sendRequest(buildUrl(['auth', 'logout']), {
    method: 'POST',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const signWithGoogle = async (
  data: Pick<User, 'email' | 'userName'>
): Promise<User> => {
  return sendRequest<User>(buildUrl(['auth', 'google']), {
    method: 'POST',
    data,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
