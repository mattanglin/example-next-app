import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApiClient } from '../lib/client';
import { Content } from '../types/Content';

export interface HomePageProps {
  content: Content;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  console.log('Fetching Content!');
  const client = new ApiClient();
  const content = await client.getContent('homepage');
  console.log(content);
  return {
    props: {
      content,
    },
  };
}

const HomePage: NextPage<HomePageProps> = ({ content }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.body} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {content.title}
        </h1>

        <p className={styles.description}>
          {content.body}
        </p>
      </main>

      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  )
}

export default HomePage;
