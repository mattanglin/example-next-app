import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Layout } from '../components/Layout/Layout';
import { PublicHomePage } from '../components/PublicHomepage/PublicHomepage';
import { PopularUsers } from '../components/PopularUsers/PopularUsers';
import { UserFeed } from '../components/UserFeed/UserFeed';
import { serverClient } from '../lib/client';
import { useAuth } from '../lib/auth';
import { Content } from '../types/Content';

export interface HomePageProps {
  content: Content;
  slugs: string[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const content = await serverClient.getContent('homepage');
  const slugs = await serverClient.getPageSlugs();
  
  return {
    props: {
      content,
      slugs,
    },
  };
}

const HomePage: NextPage<HomePageProps> = ({ content, slugs }) => {
  const { isLoggedIn, user } = useAuth();
  return (
    <Layout>
      {(isLoggedIn && user) ? (
        <>
          <Head>
            <title>{user.username} - Dashboard</title>
          </Head>
          <UserFeed />
          <PopularUsers />
        </>
      ) : (
        <PublicHomePage content={content} slugs={slugs} />
      )}
    </Layout>
  )
}

export default HomePage;
