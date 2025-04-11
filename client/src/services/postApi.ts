import { Post } from "../types";
import { buildUrl, sendRequest } from "./instance";



export const createPost = async (data:Partial<Post> ) => {
return sendRequest(buildUrl('post', 'add-post'), {
    method: 'POST',
    data, 
    headers: {
      'Content-Type': 'application/json', 
    },
  }); 
};