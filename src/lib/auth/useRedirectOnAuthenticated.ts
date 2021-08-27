import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

export const useRedirectOnAuthenticated = (redirectTo = '/dashboard') => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(redirectTo);
    }
  }, [isLoggedIn, router, redirectTo]);
}