import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { NextPage } from 'next';
import { useAuth } from '../lib/auth';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.destroy(context, 'auth-token');

  return { props: {} };
}

// Simple wrapper to provide logout route
const LogoutPage: NextPage = () => {
  const { logout } = useAuth();
  useEffect(() => {
  logout();
  }, [logout]);

  return null;
}

export default LogoutPage;
