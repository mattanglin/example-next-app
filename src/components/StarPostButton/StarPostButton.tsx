import React from 'react';
import {
  FaStar,
  FaRegStar,
} from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '../../lib/auth';
import { useMemo } from 'react';
import styles from './StarPostButton.module.css';
import { Post } from '../../types/Post';

export interface StarPostButtonProps {
  post: Post;
  refresh: () => any;
}

export const StarPostButton: React.FC<StarPostButtonProps> = ({
  post,
}) => {
  const { user } = useAuth();
  const starredByUser = useMemo(() => user?.username && post.stars.includes(user.username), [user?.username, post.stars])

  const starPost = () => console.log('Star Post!');
  const unstarPost = () => console.log('Unstar!!!');

  if (user) {
    return (
      <button onClick={starredByUser ? unstarPost : starPost} className={styles.btn}>
        {starredByUser ? (
          <FaStar size={32} />
        ) : (
          <FaRegStar size={32} />  
        )}  
      </button>
    );
  }

  return (
    <Link href="/login">
      <a>
        <FaRegStar size={32} />
      </a>
    </Link>
  )
}