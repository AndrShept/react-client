import { useDelay } from '@/hooks/useDelay';
import {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
} from '@/lib/services/userApi';
import { useEffect } from 'react';

import { Search } from './Search';
import { UsersBarList } from './UsersBarList';
import { UserBarSkeleton } from './skeletons/UserBarSkeleton';

export const UsersBar = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [refetchUsers] = useLazyGetAllUsersQuery();

  useEffect(() => {
    const interval = setInterval(async () => {
      await refetchUsers();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <UserBarSkeleton />;
  }
  if (!users?.length) {
    return <div>Users not found</div>;
  }

  return (
    <section className="flex flex-col flex-1 gap-2  p-2">
      <Search placeholder="search users..." />
      <ul className="flex flex-col space-y-1 mt-4 ">
        {users.map((user) => (
          <UsersBarList key={user.id} user={user} />
        ))}
      </ul>
    </section>
  );
};
