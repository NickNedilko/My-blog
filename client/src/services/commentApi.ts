import { buildUrl, sendRequest } from "./instance";


export type CommentPayload = {
  post: string;       
  content: string;    
};

export const createComment = async (data:CommentPayload) => {
    return sendRequest(buildUrl(['comments', 'add-comment']), {
        method: 'POST',
        data, 
        headers: {
          'Content-Type': 'application/json', 
        },
      }); 
    };