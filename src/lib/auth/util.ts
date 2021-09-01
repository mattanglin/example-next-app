import { NextApiRequest } from 'next';
import nookies from 'nookies';
import { AuthState } from './authContext';

export const authStorageKey = 'NEXT_EXAMPLE_AUTH_STORAGE';

export const storeAuth = (auth: AuthState) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(authStorageKey, JSON.stringify(auth));
  }
};

export const loadAuth = () => {
  if (typeof window !== 'undefined') {
    const data = window.localStorage.getItem(authStorageKey) || '';
    try {
      const auth = JSON.parse(data) as AuthState;
      return auth;
    } catch (err) {
      clearAuth();
    }
  }
};

export const clearAuth = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(authStorageKey);
  }
};

export const parseAuthToken = (req: NextApiRequest) => {
  const cookies = nookies.get({ req });
  return cookies['auth-token'];
}