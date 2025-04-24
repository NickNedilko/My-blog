import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, deletePost, updatePost } from '../services/postApi';
import { toast } from 'react-toastify';

export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      toast.success('Post created successfully!');
    },
  });
};

export const useUpdatePostMutation = () => {
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: any }) =>
      updatePost(slug, data),
    onSuccess: async () => {
      toast.success('Post updated successfully!');
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => deletePost(slug),
    onSuccess: () => {
      toast.success('Post deleted successfully!');
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
    onError: () => {
      toast.error('Failed to delete post.');
    },
  });
};
