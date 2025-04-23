import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createComment } from "../services/commentApi"


export const useCreateCommentMutation = () => {
   const queryClient = useQueryClient();
    return useMutation({
    mutationFn: createComment,
      onSuccess: async () => {
      queryClient.invalidateQueries({
         queryKey: ['post-comments'],
        });
    }
    })
}
