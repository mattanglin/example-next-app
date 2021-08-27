import axios, { AxiosInstance } from 'axios';
import { Content } from '../types/Content';

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
}
