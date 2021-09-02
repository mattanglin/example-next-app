import { useCallback, useEffect, useMemo, useState } from 'react';
import useSwr from 'swr';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { fetcher } from '../lib/fetcher';


export const useUserPosts = (user: User) => {
  const PAGE_SIZE = 15;
  const [fromId, setFromId] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState([] as Post[]);
  const url = useMemo(() => fromId ? `/posts/user/${user.username}?from=${fromId}` : `/posts/user/${user.username}`, [user.username, fromId]);
  const {
    data,
    error,
    ...rest
  } = useSwr<Post[]>(url, fetcher);
  const loadMore = useCallback(() => setFromId(posts[posts.length - 1].id), [setFromId, posts]);

  
  useEffect(() => {
    if (data && data.length) {
      const dataIds = data.map((p) => p.id);
      const updatedPosts = [
        ...posts.filter((p) => !dataIds.includes(p.id)),
        ...data,
      ]
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