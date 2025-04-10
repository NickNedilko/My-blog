import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../services/userApi";
import { toast } from "react-toastify";
import { deleteUser } from "firebase/auth";
import { useAuthStore } from "../store/auth-store";


export const useUpdateUserMutation = () => {
    return useMutation({
    mutationFn: updateUser,
      onSuccess: async (data) => {
        // @ts-ignore
        useAuthStore.getState().setUser(data); 
        toast.success('Profile updated successfully!')
    }
    })
}

export const useDeleteUserMutation = () => {
    return useMutation({
    mutationFn: deleteUser,
      onSuccess: async () => {
        useAuthStore.getState().logout();
    }
  })    
}
