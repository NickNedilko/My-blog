import { setAuthHeader } from "../lib/jwt";
import { User } from "../types";
import { buildUrl, sendRequest } from "./instance";

interface UsersResponse { 
    users: User[];
    totalUsers: number;
    lastMonthUsers: number;
}


export const getUser = ():Promise<User> => {
    const token = localStorage.getItem('authToken');
   
    if (!token) {
        return Promise.reject(new Error('No token found'));
    }
    setAuthHeader(token);
    return sendRequest(buildUrl(['user', 'get-user']),
    {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },    
    });
}

export const updateUser = ( data: Partial<User>) => {
    return sendRequest(buildUrl(['user', 'update-user']),
    {
        method: 'PATCH', 
        data   
    });
}

export const deleteUser = (id:string) => {
    return sendRequest(buildUrl(['user', 'delete-user', id]),
    {
        method: 'DELETE',
     
    });
}

export const getUsers = async (page: number, limit:number):Promise<UsersResponse> => {
    return sendRequest(buildUrl(['user', 'get-users'], {page, limit} ), {
        method: 'GET',
    })
}

export const getUserById = async (id:string):Promise<User> => {
    return sendRequest(buildUrl(['user', id]), {
        method: 'GET',
    })
}