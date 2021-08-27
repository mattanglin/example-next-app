export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  bio?: string;
  private?: boolean;
  followers: string[];
  following: string[];
  starredPosts: string[];
}