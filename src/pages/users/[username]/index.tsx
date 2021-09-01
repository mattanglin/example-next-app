import React from 'react';
import { GetServerSideProps, NextPage, NextApiRequest } from 'next';
import Head from 'next/head';
import { Layout } from '../../../components/Layout/Layout';
import { serverClient } from '../../../lib/client';
import { UserWithRelationship } from '../../../types/User';

import { UserCard } from '../../../components/UserCard/UserCard';
import { UserPosts } from '../../../components/UserPosts/UserPosts';
import { useUserProfile } from '../../../hooks/useUserProfile';

export interface UserProfilePageProps {
  user: UserWithRelationship;
}

export const getServerSideProps: GetServerSideProps<UserProfilePageProps, { username: string }> = async (context) => {
  const { username = '' } = context.params || {};
  serverClient.setToken(context.req as NextApiRequest);

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

const UserProfilePage: NextPage<UserProfilePageProps> = ({ user: ssrUser }) => {
  const { user: dynamicUser } = useUserProfile(ssrUser.username);
  const user = dynamicUser || ssrUser;

  return (
    <Layout>
      <Head>
        <title>{user.username} - User Profile</title>
      </Head>
      <UserCard user={user} />
      <UserPosts user={user} />
    </Layout>
  )
}

export default UserProfilePage;
