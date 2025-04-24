import axios, { AxiosRequestConfig } from 'axios';

// export const buildUrl = (...paths: string[]) =>
//     `http://localhost:3000/api/${paths.join('/')}`;

type QueryValue = string | number | boolean;
export const buildUrl = (
  paths: (string | number)[],
  queryParams?: Record<string, QueryValue>
): string => {
  const baseUrl = `http://localhost:3000/api/${paths.join('/')}`;

  const query = queryParams
    ? new URLSearchParams(
        Object.entries(queryParams).map(([key, value]) => [key, String(value)])
      ).toString()
    : '';

  return query ? `${baseUrl}?${query}` : baseUrl;
};

export const sendRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await axios(url, config);
    return response.data as T;
  } catch (error) {
    console.error('Error during request:', error);
    throw error;
  }
};
