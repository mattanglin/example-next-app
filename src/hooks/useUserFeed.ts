import { useCallback, useEffect, useMemo, useState } from 'react';
import useSwr from 'swr';
import { Post } from '../types/Post';
import { fetcher } from '../lib/fetcher';


export const useUserFeed = () => {
  const PAGE_SIZE = 15;
  const [fromId, setFromId] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState([] as Post[]);
  const url = useMemo(() => fromId ? `/posts/feed?from=${fromId}` : `/posts/feed`, [fromId]);
  const {
    data,
    error,
    ...rest
  } = useSwr<Post[]>(url, fetcher, { refreshInterval: 15000 });
  const loadMore = useCallback(() => setFromId(posts[posts.length - 1].id), [setFromId, posts]);

  
  useEffect(() => {
    if (data && data.length) {
      const dataIds = data.map((p) => p.id);
      const updatedPosts = [
        ...posts.filter(p => !dataIds.includes(p.id)),
        ...data,
      ]
      updatedPosts.sort((a, b) => a .created > b.created ? -1 : 1);
      setPosts(updatedPosts);
    }
    if (data && data.length < PAGE_SIZE) {
      setHasMore(false);
    }
  }, [data]);


  return {
    loading: !data,
    posts,
    error,
    hasMore,
    loadMore,
  }
}