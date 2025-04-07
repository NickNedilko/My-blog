import axios, { AxiosRequestConfig } from 'axios'


export const buildUrl = (...paths: string[]) =>
    `http://localhost:3000/api/${paths.join('/')}`;


export const sendRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axios(url, config);
    return response.data as T;
  } catch (error) {
   console.error('Error during request:', error);
    throw error; 
  }
};
    