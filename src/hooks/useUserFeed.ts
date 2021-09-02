import { useCallback, useEffect, useMemo, useState } from 'react';
import useSwr, { KeyLoader } from 'swr';
import useSWRInfinite from 'swr/infinite';
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

/**
 * Let's do the same thing, but with infinite
 */
export const morePostsGetKey: KeyLoader<Post[]> = (pageIdx: number, prevPageData: Post[] | null) => {
  const arr = prevPageData || [];
  const from = (arr[arr.length - 1] || {}).id;
  console.log('getKey', { pageIdx, from });

  if (pageIdx === 0) return '/posts/feed';
  if (prevPageData && prevPageData.length) {
    const fromId = prevPageData[prevPageData.length - 1].id;
    return `/posts/feed?from=${fromId}`;
  };
  
  return null;
}
export const freshPostsGetKey = (to?: string): KeyLoader<Post[]> => (pageIdx: number, prevPageData: Post[] | null) => {
  if (to) {
    if (pageIdx === 0) return `/posts/feed?to=${to}`;
    if (prevPageData && prevPageData.length === 15) {
      const newPageTo = prevPageData[0].id;
      return `/posts/feed?to=${newPageTo}`;
    };
  }

  return null;
}

export const useUserFeedInfinite = () => {
  const { data, error, size, setSize } = useSWRInfinite<Post[]>(morePostsGetKey, fetcher);
  const firstId = data?.[0]?.[0].id;
  const refresh = useSWRInfinite<Post[]>(freshPostsGetKey(firstId), fetcher, { refreshInterval: 5000 });

  const newerPosts = useMemo(() => (refresh.data || []).reverse().reduce((agg, pagePosts) => ([
    ...agg,
    ...pagePosts,
  ]), []), [refresh.data]);
  const olderPosts = useMemo(() => (data || []).reduce((agg, pagePosts) => ([
    ...agg,
    ...pagePosts,
  ]), []), [data]);
  const posts = [...newerPosts, ...olderPosts];

  const loadMore = useCallback(() => {
    setSize(size + 1);
  }, [size, setSize])
  const hasMore = useMemo(() => !data || (data && data[size - 1].length === 15), [data]);


  return {
    posts,
    loading: !data,
    error,
    hasMore,
    loadMore,
  };
};