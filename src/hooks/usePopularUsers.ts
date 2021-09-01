import useSwr from 'swr';
import { UserWithRelationship } from '../types/User';
import { fetcher } from '../lib/fetcher';


export const usePopularUsers = () => {
  const {
    data: users,
    error,
  } = useSwr<UserWithRelationship[]>('/users/popular', fetcher, { refreshInterval: 10000 });

  return {
    loading: !users,
    users: users || [],
    error,
  }
}