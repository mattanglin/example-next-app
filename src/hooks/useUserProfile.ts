import { useCallback, useEffect, useMemo, useState } from 'react';
import useSwr from 'swr';
import { UserWithRelationship } from '../types/User';
import { fetcher } from '../lib/fetcher';

export const useUserProfile = (username: string) => {
  const url = `/users/${username}`;
  const {
    data: user,
    error,
    mutate,
  } = useSwr<UserWithRelationship>(url, fetcher);
  const refresh = useCallback(async () => {
    const updated = await fetcher<UserWithRelationship>(url);
    mutate(updated);
  }, [mutate, url]);

  return {
    user,
    loading: !user,
    error,
    mutate,
    refresh,
  }
}