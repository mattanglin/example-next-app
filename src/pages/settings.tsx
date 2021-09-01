import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRedirectUnauthorized, getServerAuth } from '../lib/auth';
import { Layout } from '../components/Layout/Layout';

export interface SettingsPageProps {
  isLoggedIn?: boolean;
}

export const getServerSideProps: GetServerSideProps<SettingsPageProps> = async (context) => {
  const authToken = getServerAuth(context.req);

  console.log({ authToken });

  if (!authToken) {
    console.log('Redirecting?');
    return {
      redirect: {
        destination: '/login',
      },
      props: {
        isLoggedIn: false,
      }
    };
  }

  return {
    props: {
      isLoggedIn: true,
    },
  }
}

const SettingsPage: NextPage<SettingsPageProps> = ({ isLoggedIn }) => {
  useRedirectUnauthorized({ isLoggedIn });

  return (
    <Layout>
      <h1>Settings</h1>
      <p>This Page has server and client side auth redirects on it. You should not see this if you are not logged in.</p>
    </Layout>
  );
};

export default SettingsPage;
