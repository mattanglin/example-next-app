import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../lib/auth';
import { readableDate } from '../../lib/format';
import { Post } from '../../types/Post';
import { Avatar } from '../Avatar/Avatar';
import { StarPostButton } from '../StarPostButton/StarPostButton';
import styles from './PostCard.module.css';

export interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuth();

  return (
    <div className={styles.post}>
      <div className={styles.meta}>
        <Link href={`/users/${post.username}`}>
          <a className={styles.avatar}>
            <Avatar username={post.username} avatar={post.userAvatar} />
          </a>
        </Link>
        <div className={styles.userinfo}>
          {post.name && (
            <div className={styles.name}>{post.name}</div>
          )}
          <Link href={`/users/${post.username}`}>
            <a className={styles.username}>
              @{post.username}
            </a>
          </Link>
          <div className={styles.date}>
            &bull; {readableDate(post.created)}
          </div>
        </div>
      </div>
      <div className={styles.body}>
        {post.body}
        {post.image && (
          <div className={styles.img}>
            <Image src={post.image} width={640} height={480} layout="responsive" alt={post.title} />
          </div>
        )}
      </div>
      <div className={styles.actions}>
        {post.stars.length} <StarPostButton post={post} />
      </div>
    </div>
  );
};
