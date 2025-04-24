export const signin = async (
  data: Pick<User, 'email' | 'password'>
): Promise<User> => {
  return sendRequest<User>(buildUrl(['auth', 'signin']), {
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

import { User } from '../types';
import { buildUrl, sendRequest } from './instance';

export const signup = async (
  data: Pick<User, 'email' | 'password' | 'userName'>
): Promise<User> => {
  return sendRequest<User>(buildUrl(['auth', 'signup']), {
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const logout = async () => {
  return sendRequest(buildUrl(['auth', 'logout']), {
    method: 'POST',
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
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
