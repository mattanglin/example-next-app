export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  password: string;
  avatar?: string;
  background?: string;
  bio?: string;
  private?: boolean;
  followers: string[];
  following: string[];
  starredPosts: string[];
  posts: string[];
}

export interface UserWithRelationship extends User {
  isFollowing: boolean;
  isFollowedBy: boolean;
  isUser: boolean;
}
