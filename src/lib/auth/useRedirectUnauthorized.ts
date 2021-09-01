import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

export interface UseRedirectUnauthorizedOptions {
  isLoggedIn?: boolean;
  destination?: string;
}

export const useRedirectUnauthorized = ({ destination = '/login', isLoggedIn }: UseRedirectUnauthorizedOptions = {}) => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !auth.isLoggedIn) {
      router.replace(destination);
    }
  }, []);
}