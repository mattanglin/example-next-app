export interface Post {
  id: string;
  title: string;
  slug: string;
  body: string;
  created: string;
  published?: boolean;
  stars: string[];
}
