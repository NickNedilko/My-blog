import { useMutation } from "@tanstack/react-query"
import { createComment } from "../services/commentApi"


export const useCreateCommentMutation = () => {
    return useMutation({
    mutationFn: createComment,
      onSuccess: async () => {
       
    }
    })
}
