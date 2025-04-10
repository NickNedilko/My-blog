import { setAuthHeader } from "../lib/jwt";
import { User } from "../types";
import { buildUrl, sendRequest } from "./instance";



export const getUser = () => {
    const token = localStorage.getItem('authToken');
   
    if (!token) {
        return Promise.reject(new Error('No token found'));
    }
    setAuthHeader(token);
    return sendRequest(buildUrl('user', 'get-user'),
    {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },    
    });
}

export const updateUser = ( data: Partial<User>) => {
    return sendRequest(buildUrl('user', 'update-user'),
    {
        method: 'PATCH', 
        data   
    });
}

export const deleteUser = () => {
    return sendRequest(buildUrl('user', 'delete-user'),
    {
        method: 'DELETE',
     
    });
}