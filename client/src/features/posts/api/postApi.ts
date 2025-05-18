import { buildUrl, api } from '../../../shared/config/instance';
import { Post } from '../../../shared/types';

interface AllPostsResponse {
  tags: string[];
  posts: Post[];
  totalPosts: number;
  lastMonthPosts: number;
}

export const createPost = async (data: Partial<Post>): Promise<Post> => {
  const response = await api.post<Post>(buildUrl(['posts', 'add-post']), data);
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
  const url = buildUrl(['posts', 'get-posts'], {
    page,
    limit,
    search: search || '',
    category: category || '',
    sort: sort || '',
    sortBy: sortBy || '',
  });

  const response = await api.get<AllPostsResponse>(url);
  return response.data;
};

export const getOnePost = async (slug: string): Promise<Post> => {
  const response = await api.get<Post>(buildUrl(['posts', slug]));
  return response.data;
};

export const getMyPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>(buildUrl(['posts', 'my-posts']));
  return response.data;
};

export const updatePost = async (slug: string, data: Partial<Post>) => {
  const response = await api.patch(
    buildUrl(['posts', 'update-post', slug]),
    data
  );
  return response.data;
};

export const deletePost = async (slug: string) => {
  await api.delete(buildUrl(['posts', 'delete-post', slug]));
};

export const getPostsByCategory = async (
  category: string
): Promise<AllPostsResponse> => {
  const url = buildUrl(['posts', 'get-posts'], { category });
  const response = await api.get<AllPostsResponse>(url);
  return response.data;
};
