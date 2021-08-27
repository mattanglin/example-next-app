import React from 'react';
import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Layout } from '../components/Layout/Layout';
import { ApiClient } from '../lib/client';
import { Content } from '../types/Content';

export interface LoginPageProps {
  content: Content;
}

export const getStaticProps: GetStaticProps<LoginPageProps> = async () => {
  const client = new ApiClient();
  const content = await client.getContent('login');
  
  return {
    props: {
      content,
    },
  };
}

const LoginPage: NextPage<LoginPageProps> = ({ content }) => {
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
    </Layout>
  )
}

export default LoginPage;

