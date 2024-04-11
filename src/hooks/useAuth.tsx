import { useCurrentQuery } from '@/lib/services/userApi';
import { User } from '@/lib/types';

import { useAppSelector } from './store';

export const useAuth = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const { data, isLoading } = useCurrentQuery();

  return {
    userId: data?.id,
    userData: data,
    isAuthenticated,
    isLoading,
  };
};
