import { setAuthHeader } from "../lib/jwt";
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