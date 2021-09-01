import React, { useCallback } from 'react';
import { client } from '../../lib/client';
import { Button } from '../Button/Button';

import { UserWithRelationship } from '../../types/User';
import { useUserProfile } from '../../hooks/useUserProfile';

export interface FollowButtonProps {
  user: UserWithRelationship;
}

export const FollowButton: React.FC<FollowButtonProps> = ({ user }) => {
  const { refresh } = useUserProfile(user.username);

  const follow = useCallback(async () => {
    await client.followUser(user.username);
    await refresh();
  }, [refresh, user.username]);
  const unfollow = useCallback(async () => {
    await client.unfollowUser(user.username);
    await refresh();
  }, [refresh, user.username]);

  // TODO: Map follow

  if (user.isUser) {
    return (
      <div>Settings</div>
    );
  }

  if (user.isFollowing) {
    return (
      <Button onClick={unfollow}>
        Unfollow
      </Button>
    );
  }

  return (
    <Button onClick={follow}>
      Follow
    </Button>
  );
}