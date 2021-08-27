import { createContext } from 'react';
import { User } from '../../types/User';

export interface AuthState {
  user?: User;
  token?: string;
}
export interface AuthContext {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
}

export const authContext = createContext<AuthContext>({ auth: {}, setAuth: () => undefined });