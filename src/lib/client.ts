import axios, { AxiosInstance } from 'axios';
import { AuthCredentials, AuthPayload } from '../types/Auth';
import { Content } from '../types/Content';
import { Page } from '../types/Page';
import { User } from '../types/User';

export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL = '/api') {
    this.client = axios.create({
      baseURL,
    });
  }

  /**
   * CONTENT
   */
  public getContent = async (key: string) => {
    const { data } = await this.client.get<Content>(`/content/${key}`);
    return data;
  }

  public getPageSlugs = async () => {
    const { data } = await this.client.get<{ slugs: string[] }>('/pages');
    return data.slugs;
  }

  public getPage = async (slug: string) => {
    const { data } = await this.client.get<Page>(`/pages/${slug}`)
    return data;
  }

  /**
   * AUTH
   */
  public signIn = async (credentials: AuthCredentials) => {
    const { data } = await this.client.post<AuthPayload>('/auth/login', credentials);

    return data;
  }

  /**
   * USERS
   */
  public getUserProfile = async (username: string) => {
    const { data } = await this.client.get<User>(`/users/${username}`);
    return data;
  }
}

export const client = new ApiClient();
export const serverClient = new ApiClient('http://localhost:8000');
