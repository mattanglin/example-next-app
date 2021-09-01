import { useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { authContext } from './authContext';
import { clearAuth, storeAuth } from './util';
import { client } from '../client';
import { AuthCredentials } from '../../types/Auth';

export const useAuth = () => {
  const { auth, setAuth } = useContext(authContext);
  const router = useRouter();

  const login = useCallback(async (credentials: AuthCredentials) => {
    const payload = await client.signIn(credentials);
    setAuth(payload);
    storeAuth(payload);
  }, [setAuth]);
  const logout = useCallback(async () => {
    await client.logout();
    clearAuth();
    setAuth({});

    router.replace('/login');
  }, [router, setAuth]);

  return {
    ...auth,
    login,
    logout,
    isLoggedIn: !!(auth.user && auth.token),
  }
}