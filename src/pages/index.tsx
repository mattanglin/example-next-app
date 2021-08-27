import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
// import Image from 'next/image'
import { Layout } from '../components/Layout/Layout';
import { serverClient } from '../lib/client';
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
  return (
    <Layout>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.body} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>
        {content.title}
      </h1>

      <p>
        {content.body}
      </p>
      <h2>Here Are some pages</h2>
      <ul>
        {slugs.map(slug => (
          <li key={slug}>
            <Link href={`/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default HomePage;
