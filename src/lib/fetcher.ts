import axios from 'axios';

export const fetcher = async <T = any>(url: string) => {
  const { data } = await axios.get<T>(url, { baseURL: '/api', withCredentials: true });
  return data;
};