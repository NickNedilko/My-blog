import { Post } from '../types';
import { buildUrl, sendRequest } from './instance';

interface AllPostsResponse {
  tags: string[];
  posts: Post[];
  totalPosts: number;
}

export const createPost = async (data: Partial<Post>): Promise<Post> => {
  return sendRequest(buildUrl(['posts', 'add-post']), {
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getAllPosts = async (
  page: number,
  limit: number = 4
): Promise<AllPostsResponse> => {
  return sendRequest(buildUrl(['posts', 'get-posts'], { page, limit }), {
    method: 'GET',
  });
};

export const getOnePost = async (slug: string): Promise<Post> => {
  return sendRequest(buildUrl(['posts', slug]), {
    method: 'GET',
  });
};

export const getMyPosts = async (): Promise<Post[]> => {
  return sendRequest(buildUrl(['posts', 'my-posts']), {
    method: 'GET',
  });
};

export const updatePost = async (slug: string, data: Partial<Post>) => {
  return sendRequest(buildUrl(['posts', 'update-post', slug]), {
    method: 'PATCH',
    data,
  });
};

export const deletePost = async (slug: string) => {
  return sendRequest(buildUrl(['posts', 'delete-post', slug]), {
    method: 'DELETE',
  });
};

export const getPostsByCategory = async (
  category: string
): Promise<AllPostsResponse> => {
  return sendRequest(buildUrl(['posts', 'get-posts'], { category }), {
    method: 'GET',
  });
};
