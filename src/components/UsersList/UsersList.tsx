import React from 'react';
import Link from 'next/link';
import { UserWithRelationship } from '../../types/User';
import { Avatar } from '../Avatar/Avatar';
import { FollowButton } from '../FollowButton/FollowButton';
import { useAuth } from '../../lib/auth';
import styles from './UsersList.module.css'

export interface UsersListProps {
  users: UserWithRelationship[];
}

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const { isLoggedIn } = useAuth();
  return (
    <div className={styles.userslist}>
      {users.map((user) => (
        <div key={user.id} className={styles.usercard}>
          <div className={styles.avatar}>
            <Link href={`/users/${user.username}`}><a>
              <Avatar username={user.username} avatar={user.avatar} />
            </a></Link>
          </div>
          <div className={styles.meta}>
            <div className={styles.userinfo}>
              <Link href={`/users/${user.username}`}><a>
                <div className={styles.username}>
                  {user.username}
                </div>
                <div className={styles.posts}>
                  {user.posts.length} posts
                </div>
                <div className={styles.followers}>
                  {user.followers.length} followers
                </div>
              </a></Link>
            </div>
            {isLoggedIn && (
              <div className={styles.follow}>
                <FollowButton user={user} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
