import { PostCommentResponse } from '../types';
import { buildUrl, sendRequest } from './instance';

export type CommentPayload = {
  post: string;
  content: string;
};

export const createComment = async (data: CommentPayload) => {
  return sendRequest(buildUrl(['comments', 'add-comment']), {
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getPostComments = async (
  postId: string
): Promise<PostCommentResponse[]> => {
  return sendRequest(buildUrl(['comments', 'get-post-comments', postId]), {
    method: 'GET',
  });
};

export const likeComment = async (
  commentId: string
): Promise<PostCommentResponse[]> => {
  return sendRequest(buildUrl(['comments', 'like-comment', commentId]), {
    method: 'Put',
  });
};

export const deleteComment = async (commentId: string) => {
  return sendRequest(buildUrl(['comments', 'delete-comment', commentId]), {
    method: 'DELETE',
  });
};

export const editComment = async (
  commentId: string,
  data: CommentPayload
): Promise<PostCommentResponse[]> => {
  return sendRequest(buildUrl(['comments', 'edit-comment', commentId]), {
    method: 'PUT',
    data,
  });
};