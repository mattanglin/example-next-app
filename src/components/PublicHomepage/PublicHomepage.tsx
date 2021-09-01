import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useTrendingPosts } from '../../hooks/useTrendingPosts';
import { Button } from '../Button/Button';
import { PostList } from '../PostsList/PostsList';
import { PopularUsers } from '../PopularUsers/PopularUsers';
import { Content } from '../../types/Content';
import styles from './PublicHomePage.module.css';

export interface PublicHomePageProps {
  content: Content;
  slugs: string[];
}

export const PublicHomePage: React.FC<PublicHomePageProps> = ({ content, slugs }) => {
  const {
    posts,
    loading,
    loadMore,
    hasMore,
  } = useTrendingPosts();

  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.body} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{content.title}</h1>
      <p>{content.body}</p>
      <h2>Here Are some statically generated pages!</h2>
      <ul>
        {slugs.map(slug => (
          <li key={slug}>
            <Link href={`/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
      <PopularUsers />
      <h2>Trending Posts!</h2>
      <div>
        <PostList posts={posts} />
        <div className={styles.more}>
        {loading ? '...loading...' : (
            <>
              {hasMore ? (
                <Button onClick={loadMore}>
                  Load more
                </Button>
              ) : 'no more trending posts.'}
            </>
          )}
        </div>
      </div>
    </>
  );
};
