import { useMutation } from '@tanstack/react-query';
import { clearAuthHeader, setAuthHeader } from '../lib/jwt';
import { logout, signin, signup } from '../services/authApi';
import { useAuthStore } from '../store/auth-store';

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      useAuthStore.getState().logout();
      clearAuthHeader();
    },
  });
};

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: signin,
    onSuccess: async (data) => {
      const { token, ...user } = data;
      useAuthStore.getState().setToken(token as string);
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().login(token as string);
      setAuthHeader(token as string);
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: async (data) => {
      console.log(data);
      const { token, ...user } = data;
      useAuthStore.getState().setToken(token as string);
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().login(token as string);
      setAuthHeader(token as string);
    },
  });
};
