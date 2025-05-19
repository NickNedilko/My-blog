import { api } from '../../../shared/config/api';
import { Post } from '../../../shared/types';

interface AllPostsResponse {
  tags: string[];
  posts: Post[];
  totalPosts: number;
  lastMonthPosts: number;
}

export const createPost = async (data: Partial<Post>): Promise<Post> => {
  const response = await api.post<Post>('/posts', data);
  return response.data;
};

export const getAllPosts = async (
  page: number,
  limit: number = 4,
  search?: string,
  category?: string,
  sort?: string,
  sortBy?: string
): Promise<AllPostsResponse> => {
  const response = await api.get<AllPostsResponse>('/posts', {
    params: {
      page,
      limit,
      search,
      category,
      sort,
      sortBy,
    },
  });
  return response.data;
};

export const getOnePost = async (slug: string): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${slug}`);
  return response.data;
};

export const getMyPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts/my');
  return response.data;
};

export const updatePost = async (slug: string, data: Partial<Post>) => {
  const response = await api.patch(`/posts/${slug}`, data);
  return response.data;
};

export const deletePost = async (slug: string) => {
  await api.delete(`/posts/${slug}`);
};

export const getPostsByCategory = async (
  category: string
): Promise<AllPostsResponse> => {
  const response = await api.get<AllPostsResponse>('/posts', {
    params: { category },
  });
  return response.data;
};
