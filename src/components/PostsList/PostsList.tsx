import React from 'react';
import { Post } from '../../types/Post';
import { PostCard } from '../PostCard/PostCard';

export interface PostListProps {
  posts: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  )
}