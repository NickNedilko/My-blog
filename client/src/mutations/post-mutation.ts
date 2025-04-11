import { useMutation } from "@tanstack/react-query";
import { createPost } from "../services/postApi";
import { toast } from "react-toastify";


export const useCreatePostMutation = () => {
    return useMutation({
    mutationFn: createPost,
      onSuccess: async (data) => {
        // @ts-ignore
console.log(data);
        toast.success('Post created successfully!')
    }
    })
}