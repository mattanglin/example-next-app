import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useAuth } from '../lib/auth';

// Simple wrapper to provide logout route
const LogoutPage: NextPage = () => {
  const { logout } = useAuth();
  useEffect(() => logout, [logout]);

  return null;
}

export default LogoutPage;
