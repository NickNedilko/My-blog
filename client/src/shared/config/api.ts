import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://my-blog-dn9y.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
