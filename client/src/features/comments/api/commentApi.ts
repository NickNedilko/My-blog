import { api } from '../../../shared/config/api';
import { Comment, PostCommentResponse } from '../../../shared/types';

export type CommentPayload = {
  post: string;
  content: string;
};

interface GetComment {
  page?: number;
  limit?: number;
}

interface CommentsResponse {
  comments: Comment[];
  commentsCount: number;
  lastMonthComments: number;
}

export const createComment = async (data: CommentPayload) => {
  const response = await api.post<PostCommentResponse>('/comments', data);
  return response.data;
};

export const getPostComments = async (
  postId: string
): Promise<PostCommentResponse[]> => {
  const response = await api.get<PostCommentResponse[]>(`/comments/${postId}`);
  return response.data;
};

export const getComments = async ({
  page = 1,
  limit = 5,
}: GetComment): Promise<CommentsResponse> => {
  const response = await api.get<CommentsResponse>('/comments', {
    params: { page, limit },
  });
  return response.data;
};

export const likeComment = async (
  commentId: string
): Promise<PostCommentResponse[]> => {
  const response = await api.put<PostCommentResponse[]>(
    `/comments/${commentId}/like`
  );
  return response.data;
};

export const deleteComment = async (commentId: string): Promise<void> => {
  await api.delete(`/comments/${commentId}`);
};

export const editComment = async (
  commentId: string,
  data: CommentPayload
): Promise<PostCommentResponse[]> => {
  const response = await api.put<PostCommentResponse[]>(
    `/comments/${commentId}`,
    data
  );
  return response.data;
};
