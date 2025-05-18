import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://my-blog-dn9y.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Тип значений для query-параметров
type QueryValue = string | number | boolean;


export const buildUrl = (
  paths: (string | number)[],
  queryParams?: Record<string, QueryValue>
): string => {
  const path = paths.join('/');
  const queryString = queryParams
    ? `?${new URLSearchParams(
        Object.entries(queryParams).map(([key, value]) => [key, String(value)])
      ).toString()}`
    : '';
  return `${path}${queryString}`;
};