import { NextApiRequest } from 'next';
import axios, { AxiosInstance } from 'axios';
import { AuthCredentials, AuthPayload } from '../types/Auth';
import { parseAuthToken } from '../lib/auth/util';
import { Content } from '../types/Content';
import { Page } from '../types/Page';
import { UserWithRelationship } from '../types/User';

export class ApiClient {
  private client: AxiosInstance;
  private token?: string;

  constructor(baseURL = '/api') {
    // const { token } = loadAuth() || {};
    const token = '';
    
    this.client = axios.create({
      baseURL,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      }
    });
  }

  public setToken = (req: NextApiRequest) => {
    const token = parseAuthToken(req);
    this.token = token;
    this.client.defaults.headers.Authorization = `Bearer ${token}`;
  }

  /**
   * CONTENT
   */
  public getContent = async (key: string) => {
    const { data } = await this.client.get<Content>(`/content/${key}`, { withCredentials: true });
    return data;
  }

  public getPageSlugs = async () => {
    const { data } = await this.client.get<{ slugs: string[] }>('/pages', { withCredentials: true });
    return data.slugs;
  }

  public getPage = async (slug: string) => {
    const { data } = await this.client.get<Page>(`/pages/${slug}`, { withCredentials: true })
    return data;
  }

  /**
   * AUTH
   */
  public signIn = async (credentials: AuthCredentials) => {
    const { data } = await this.client.post<AuthPayload>('/auth/login', credentials, { withCredentials: true });

    return data;
  }
  public logout = async () => {
    await this.client.post('/auth/logout');
  }

  /**
   * USERS
   */
  public getUserProfile = async (username: string) => {
    const { data } = await this.client.get<UserWithRelationship>(`/users/${username}`, { withCredentials: true });
    return data;
  }

  public getPopularUsers = async () => {
    const { data } = await this.client.get<UserWithRelationship>('/users/popular', { withCredentials: true });
    return data;
  }

  public followUser = async (username: string) => {
    await this.client.post(`/users/${username}/follow`, {}, { withCredentials: true });
  }
  public unfollowUser = async (username: string) => {
    await this.client.post(`/users/${username}/unfollow`, {}, { withCredentials: true });
  }
}

export const client = new ApiClient();
export const serverClient = new ApiClient('http://localhost:8000');
