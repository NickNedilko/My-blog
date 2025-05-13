import { buildUrl, sendRequest } from '../../../shared/config/instance';
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

export const getComments = async ({
  page = 1,
  limit = 5,
}: getComment): Promise<commentsResponse> => {
  return sendRequest(buildUrl(['comments', 'get-comments'], { page, limit }), {
    method: 'GET',
  });
};

export const likeComment = async (
  commentId: string
): Promise<PostCommentResponse[]> => {
  return sendRequest(buildUrl(['comments', 'like-comment', commentId]), {
    method: 'Put',
    withCredentials: true,
  });
};

export const deleteComment = async (commentId: string) => {
  return sendRequest(buildUrl(['comments', 'delete-comment', commentId]), {
    method: 'DELETE',
    withCredentials: true,
  });
};

export const editComment = async (
  commentId: string,
  data: CommentPayload
): Promise<PostCommentResponse[]> => {
  return sendRequest(buildUrl(['comments', 'edit-comment', commentId]), {
    method: 'PUT',
    data,
    withCredentials: true,
  });
};
