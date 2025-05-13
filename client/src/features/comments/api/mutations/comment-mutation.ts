import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createComment,
  deleteComment,
  editComment,
  likeComment,
} from '../commentApi';

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['post-comments'],
      });
    },
  });
};

export const useLikeCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likeComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['post-comments'],
      });
    },
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['post-comments'],
      });
    },
  });
};

export const useEditCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, data }: { commentId: string; data: any }) =>
      editComment(commentId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['post-comments'],
      });
    },
  });
};
