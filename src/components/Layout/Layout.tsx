import React from 'react';
import Link from 'next/link';
import styles from './Layout.module.css';

export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.container}>
    <header className={styles.header}>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        header
      </div>
      <div>
        <Link href="/login">Login</Link>
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