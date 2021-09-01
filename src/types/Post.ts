export interface Post {
  id: string;
  username: string;
  name?: string;
  userAvatar?: string;
  title: string;
  slug: string;
  image?: string;
  body: string;
  created: string;
  published?: boolean;
  stars: string[];
}
