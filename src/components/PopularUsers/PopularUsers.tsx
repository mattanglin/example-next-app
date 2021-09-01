import React from 'react';
import { usePopularUsers } from '../../hooks/usePopularUsers';
import { UsersList } from '../UsersList/UsersList';

export const PopularUsers: React.FC = () => {
  const { users } = usePopularUsers();

  return (
    <div>
      <h2>Popular Accounts</h2>
      <UsersList users={users} />
    </div>
  )
}