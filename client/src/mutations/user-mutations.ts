import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser, updateUser } from '../services/userApi';
import { toast } from 'react-toastify';


import { useAuthStore } from '../store/auth-store';

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: async (data) => {
      // @ts-ignore

      useAuthStore.getState().setUser(data);
      toast.success('Profile updated successfully!');
      await queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      if (!useAuthStore.getState().user?.isAdmin) {
        useAuthStore.getState().logout();
      }
     await queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
};
