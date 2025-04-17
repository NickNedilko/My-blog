import { Post } from "../types";
import { buildUrl, sendRequest } from "./instance";


interface AllPostsResponse {
  tags: string[];
  posts: Post[];
}


export const createPost = async (data:Partial<Post> ) => {
return sendRequest(buildUrl('posts', 'add-post'), {
    method: 'POST',
    data, 
    headers: {
      'Content-Type': 'application/json', 
    },
  }); 
};





export const getAllPosts = async(): Promise<AllPostsResponse> => {
    return sendRequest(buildUrl('posts', 'get-posts'), {
        method: 'GET',
    })
}

export const getOnePost = async(slug: string): Promise<Post> => {
    return sendRequest(buildUrl('posts' , slug), {
        method: 'GET',
    })
}

export const getMyPosts = async():Promise<Post[]> => {
    return sendRequest(buildUrl('posts', 'my-posts'), {
        method: 'GET',
    })
}

export const updatePost = async(slug: string, data: Partial<Post>) => {
    return sendRequest(buildUrl('posts', 'update-post', slug), {
        method: 'PATCH',
        data,
    })
}

export const deletePost = async(slug: string):Promise<Post[]> => {
    return sendRequest(buildUrl('posts', 'delete-post', slug), {
        method: 'DELETE',
    })
}