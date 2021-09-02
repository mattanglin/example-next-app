import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../lib/auth';
import { Avatar } from '../Avatar/Avatar';
import styles from './Layout.module.css';

export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <Link href="/">Home</Link>
        </div>
        <div>
          header
        </div>
        <div>
          {(isLoggedIn && user) ? (
            <div className={styles.userbar}>
              <div className={styles.avatar}>
                <Link href={`/users/${user.username}`}>
                  <a>
                    <Avatar username={user.username} avatar={user.avatar} />
                  </a>
                </Link>
              </div>
              <div>
                <Link href={`/users/${user.username}`}>
                  <a>
                    {user.username}
                  </a>
                </Link>
              </div>
              <Link href="/logout">Log out</Link>
            </div>
          ) : (
            <Link href="/login">Log in</Link>
          )}
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );
};