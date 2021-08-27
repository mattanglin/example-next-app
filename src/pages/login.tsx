import React from 'react';
import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { useAuth, useRedirectOnAuthenticated } from '../lib/auth';
import { Layout } from '../components/Layout/Layout';
import { Error } from '../components/Error/Error';
import {
  Form,
  Input,
  SubmitButton,
} from '../components/form';
import { serverClient } from '../lib/client';
import { Content } from '../types/Content';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAsync } from '../hooks/useAsync';
import { AuthCredentials } from '../types/Auth';

export interface LoginPageProps {
  content: Content;
}

export type LoginFormValues = AuthCredentials;

export const validate = yupResolver(
  yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
)

export const getStaticProps: GetStaticProps<LoginPageProps> = async () => {
  const content = await serverClient.getContent('login');
  
  return {
    props: {
      content,
    },
  };
}

const LoginPage: NextPage<LoginPageProps> = ({ content }) => {
  const auth = useAuth();
  useRedirectOnAuthenticated('/');
  const {
    callback: login,
    loading,
    error,
    result,
  } = useAsync(auth.login)
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
      <Form<LoginFormValues>
        onSubmit={login}
        resolver={validate}
      >
        <Input name="email" label="Email Address" required />
        <Input name="password" label="Password" type="password" required />
        <SubmitButton label="Sign In" submittingLabel="..." />
        {!loading && error && (
          <Error error={error} style={{ padding: '16px 0' }} />
        )}
      </Form>
    </Layout>
  )
}

export default LoginPage;

