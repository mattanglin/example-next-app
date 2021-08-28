import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { User } from '../../types/User';
import styles from './Avatar.module.css';

export interface AvatarProps extends React.ComponentPropsWithoutRef<'div'> {
  user: User;
}

export const Avatar: React.FC<AvatarProps> = ({
  user,
  className,
  ...rest
}) => (
  <div {...rest} className={cn(className, styles.avatar)}>
    <div className={styles.inner}>
      {user.avatar ? (
        <Image
          className={styles.img}
          src={user.avatar}
          alt={`${user.username} avatar`}
          layout="fill"
        />
      ) : (
        <div className={styles.text}>
          {user.username.slice(0, 2)}
        </div>
      )}
    </div>
  </div>
);
