import React from 'react';
import { Button } from '../Button/Button';
import { PostList } from '../PostsList/PostsList';
import { useUserFeed, useUserFeedInfinite } from '../../hooks/useUserFeed';
import styles from './UserFeed.module.css';

export const UserFeed: React.FC = () => {
  const {
    posts,
    loading,
    hasMore,
    loadMore,
  // } = useUserFeed();
  } = useUserFeedInfinite();

  return (
    <div className={styles.userfeed}>
      <PostList posts={posts} />
      <div className={styles.more}>
        {loading ? '...loading...' : (
          <>
            {hasMore ? (
              <Button onClick={loadMore}>
                Load more
              </Button>
            ) : 'all posts loaded.'}
          </>
        )}
      </div>
    </div>
  );
};
