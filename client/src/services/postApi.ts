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
    return sendRequest(buildUrl('posts'), {
        method: 'GET',
    })
}

export const getOnePost = async(slug: string): Promise<Post> => {
    return sendRequest(buildUrl('posts' , slug), {
        method: 'GET',
    })
}