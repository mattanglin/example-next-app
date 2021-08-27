import React from 'react';
import { GetStaticPaths, GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../../../components/Layout/Layout';
import { serverClient } from '../../../lib/client';
import { User } from '../../../types/User';

export interface UserProfilePageProps {
  user: User;
}

export const getServerSideProps: GetServerSideProps<UserProfilePageProps, { username: string }> = async (context) => {
  const { username = '' } = context.params || {};
  try {
    const user = await serverClient.getUserProfile(username);
    return {
      props: { user },
    };
  } catch (err) {
    console.log(`Could not fetch user profile for "${username}"`, err);
    return {
      notFound: true
    }
  }
}

const UserProfilePage: NextPage<UserProfilePageProps> = ({ user }) => {
  console.log('UserProfilePage', user);
  return (
    <Layout>
      <Head>
        <title>{user.username} - User Profile</title>
      </Head>
      UserProfilePage
    </Layout>
  )
}

export default UserProfilePage;
