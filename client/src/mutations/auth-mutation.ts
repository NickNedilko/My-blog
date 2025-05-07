import { useMutation } from '@tanstack/react-query';
import { logout, signin, signup } from '../services/authApi';
import { useAuthStore } from '../store/auth-store';



export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      useAuthStore.getState().logout();
    },
  });
};

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: signin,
    onSuccess: async (data) => {
      const { ...user } = data;
      useAuthStore.getState().setLoggedIn();
      useAuthStore.getState().setUser(user);
    },

  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: async (data) => {
      const { ...user } = data;
      useAuthStore.getState().setLoggedIn();
      useAuthStore.getState().setUser(user);
    },
        onError: (error) => {
      console.error('Signup error:', error);
  },
  });
};
