import { User } from './User';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthPayload {
  user: User;
  token: string;
}