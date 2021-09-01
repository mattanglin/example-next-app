import { useCallback, useEffect, useState } from 'react';
import useSwr from 'swr';
import { Post } from '../types/Post';
import { fetcher } from '../lib/fetcher';


export const useUserFeed = () => {
  const PAGE_SIZE = 15;
  const [toId, setToId] = useState('');
  const [fromId, setFromId] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState([] as Post[]);
  const postsUrl = toId ? `/posts/feed?to=${toId}` : '/posts/feed';
  const { data: newPosts, error: newPostsError } = useSwr<Post[]>(postsUrl, fetcher, { refreshInterval: 15000 });
  const { data: oldPosts, error: oldPostsError } = useSwr<Post[]>(fromId ? `/posts/feed?from=${fromId}` : null, fetcher);
  const loadMore = useCallback(() => setFromId(posts[posts.length - 1].id), [setFromId, posts]);

  // Handle new posts
  useEffect(() => {
    if (newPosts && newPosts.length) {
      const refreshedPosts = [
        ...newPosts,
        ...posts,
      ];
      setPosts(refreshedPosts);
      setToId(refreshedPosts[0].id);
    }
  }, [newPosts]);

  useEffect(() => {
    if (oldPosts && oldPosts.length) {
      const updatedPosts = [
        ...posts,
        ...oldPosts,
      ];
      setPosts(updatedPosts);
    }
    if (oldPosts && oldPosts.length < PAGE_SIZE) {
      setHasMore(false);
    }
  }, [oldPosts]);


  return {
    loading: !newPosts,
    posts,
    error: oldPostsError || newPostsError,
    hasMore,
    loadMore,
  }
}