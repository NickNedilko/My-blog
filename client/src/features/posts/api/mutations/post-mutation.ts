import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, deletePost, updatePost } from '../postApi';
import { toast } from 'react-toastify';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      toast.success('Post created successfully!');
      await queryClient.invalidateQueries({
        queryKey: ['my-posts'],
      });
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: any }) =>
      updatePost(slug, data),
    onSuccess: async () => {
      toast.success('Post updated successfully!');
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['posts'] }),
        queryClient.invalidateQueries({ queryKey: ['my-posts'] }),
      ]);
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => deletePost(slug),
    onSuccess: async () => {
      toast.success('Post deleted successfully!');
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['posts'] }),
        queryClient.invalidateQueries({ queryKey: ['my-posts'] }),
      ]);
    },
    onError: () => {
      toast.error('Failed to delete post.');
    },
  });
};
