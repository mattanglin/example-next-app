import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Page } from '../types/Page';
import { serverClient } from '../lib/client';
import { Layout } from '../components/Layout/Layout';

export type DynamicPageProps = Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await serverClient.getPageSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<DynamicPageProps, { slug: string }> = async (ctx) => {
  const { slug = '' } = ctx.params || {};
  const page = await serverClient.getPage(slug);
  
  return {
    props: page,
  }
}

const DynamicPage: NextPage<DynamicPageProps> = ({ title, content, slug }) => (
  <Layout>
    <Head>
        <title>Dynamic Page - {slug}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1>{title}</h1>
    <h2>({slug})</h2>
    {content.split('\n').map((text, idx) => (
      <p key={idx}>{text}</p>
    ))}
  </Layout>
);

export default DynamicPage;
