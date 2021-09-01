import React from 'react';
import Image from 'next/image';
import { Avatar } from '../Avatar/Avatar';
import { FollowButton } from '../FollowButton/FollowButton';
import { UserWithRelationship } from '../../types/User';
import styles from './UserCard.module.css';

export interface UserCardProps {
  user: UserWithRelationship;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const bgStyle = user.background ? { backgroundImage: `url(${user.background})` } : {};
  
  return (
    <div className={styles.usercard}>
      <div className={styles.bg}>
        <div className={styles.bgImg} style={bgStyle} />
      </div>
      <div className={styles.info}>
        <div className={styles.heading}>
          <div className={styles.avatar}>
            <Avatar username={user.username} avatar={user.avatar} />
          </div>
          <div className={styles.details}>
            <div className={styles.meta}>
              <div>
                {user.posts.length} posts
              </div>
              <div>
                {user.following.length} following
              </div>
              <div>
              {user.followers.length} followers
              </div>
            </div>
            <div className={styles.actions}>
              <FollowButton user={user} />
            </div>
          </div>
        </div>
        <div className={styles.userinfo}>
          <div className={styles.name}>
            {user.name}
          </div>
          <div className={styles.handle}>
            @{user.username}
          </div>
          <div className={styles.bio}>
            {user.bio}
          </div>
        </div>
      </div>
    </div>
  )
}
