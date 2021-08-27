import axios, { AxiosInstance } from 'axios';
import { Content } from '../types/Content';
import { Page } from '../types/Page';

export class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8000',
    });
  }

  public async getContent(key: string) {
    const { data } = await this.client.get<Content>(`/content/${key}`);
    return data;
  }

  public async getPageSlugs() {
    const { data } = await this.client.get<{ slugs: string[] }>('/pages');
    return data.slugs;
  }

  public async getPage(slug: string) {
    const { data } = await this.client.get<Page>(`/pages/${slug}`)
    return data;
  }
}

export const client = new ApiClient();
