import { buildUrl, api } from '../../../shared/config/instance';
import { Comment, PostCommentResponse } from '../../../shared/types';

export type CommentPayload = {
  post: string;
  content: string;
};

interface getComment {
  page?: number;
  limit?: number;
}

interface commentsResponse {
  comments: Comment[];
  commentsCount: number;
  lastMonthComments: number;
}

export const createComment = async (data: CommentPayload) => {
  const response = await api.post<PostCommentResponse>(
    buildUrl(['comments', 'add-comment']),
    data
  );
  return response.data;
};

export const getPostComments = async (
  postId: string
): Promise<PostCommentResponse[]> => {
  const response = await api.get<PostCommentResponse[]>(
    buildUrl(['comments', 'get-post-comments', postId])
  );
  return response.data;
};

export const getComments = async ({
  page = 1,
  limit = 5,
}: getComment): Promise<commentsResponse> => {
  const response = await api.get<commentsResponse>(
    buildUrl(['comments', 'get-comments'], {
      page,
      limit,
    })
  );
  return response.data;
};

export const likeComment = async (
  commentId: string
): Promise<PostCommentResponse[]> => {
  const response = await api.put<PostCommentResponse[]>(
    buildUrl(['comments', 'like-comment', commentId])
  );
  return response.data;
};

export const deleteComment = async (commentId: string): Promise<void> => {
  await api.delete(buildUrl(['comments', 'delete-comment', commentId]));
};
export const editComment = async (
  commentId: string,
  data: CommentPayload
): Promise<PostCommentResponse[]> => {
  const response = await api.put<PostCommentResponse[]>(
    buildUrl(['comments', 'edit-comment', commentId]),
    data
  );
  return response.data;
};
