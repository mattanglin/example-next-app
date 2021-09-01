import React from 'react';
import { User } from '../../types/User';
import { useUserPosts } from '../../hooks/useUserPosts';
import { Button } from '../Button/Button';
import { PostList } from '../PostsList/PostsList';
import styles from './UserPosts.module.css';

export interface UserPostsProps {
  user: User;
}

export const UserPosts: React.FC<UserPostsProps> = ({ user }) => {
  const {
    loading,
    hasMore,
    loadMore,
    posts,
  } = useUserPosts(user);

  return (
    <div>
      <PostList posts={posts} />
      <div className={styles.more}>
        {loading ? (
          <div>...loading...</div>
        ) : (
          <>
            {hasMore ? (
              <Button onClick={loadMore}>Load more</Button>
            ) : (
              <div>all posts loaded...</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}