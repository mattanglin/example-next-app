import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { User } from '../../types/User';
import styles from './Avatar.module.css';

export interface AvatarProps extends React.ComponentPropsWithoutRef<'div'> {
  username: string;
  avatar?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  username,
  avatar,
  className,
  ...rest
}) => (
  <div {...rest} className={cn(className, styles.avatar)}>
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {avatar ? (
          <Image
            className={styles.img}
            src={avatar}
            alt={`${username} avatar`}
            layout="fill"
          />
        ) : (
          <div className={styles.text}>
            {username.slice(0, 2)}
          </div>
        )}
      </div>
    </div>
  </div>
);
