import { useDelay } from '@/hooks/useDelay';
import {
  useGetAllFollowingUsersQuery,
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
  const { data: followingUsers, isLoading: isLoadingFollowingUsers } =
    useGetAllFollowingUsersQuery();
  useEffect(() => {
    const refetchInterval = setInterval(async () => {
      await refetchUsers();
    }, 30000);
    return () => clearInterval(refetchInterval);
  }, []);

  if (isLoading || isLoadingFollowingUsers) {
    return <UserBarSkeleton />;
  }
  if (!users?.length && !followingUsers?.length) {
    return (
      <p className="text-sm text-muted-foreground text-center m-auto">
        Users not found
      </p>
    );
  }

  return (
    <section className="flex flex-col flex-1 gap-2  p-2">
      <Search placeholder="search users..." />
      <div className="flex flex-col gap-4 mt-3 ">
        {!!followingUsers?.length && (
          <div>
            <h3 className="">Following:</h3>
            <ul className="flex flex-col space-y-1 mt-4 ">
              {followingUsers.map((user) => (
                <UsersBarList key={user.id} user={user} />
              ))}
            </ul>
          </div>
        )}
        {!!users?.length && (
          <div>
            <h3 className="">All Users:</h3>
            <ul className="flex flex-col space-y-1 mt-4 ">
              {users.map((user) => (
                <UsersBarList key={user.id} user={user} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
