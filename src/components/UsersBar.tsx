import { useAppSelector } from '@/hooks/store';
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
  let { searchUser } = useAppSelector((state) => state.search.searchData);

  const { data: users, isLoading } = useGetAllUsersQuery(searchUser);

  const [refetchUsers] = useLazyGetAllUsersQuery();
  const { data: followingUsers, isLoading: isLoadingFollowingUsers } =
    useGetAllFollowingUsersQuery();
  useEffect(() => {
    const refetchInterval = setInterval(async () => {
      await refetchUsers('');
    }, 30000);
    return () => clearInterval(refetchInterval);
  }, []);

  if (!users?.length && !followingUsers?.length && !searchUser) {
    return (
      <p className="text-sm text-muted-foreground text-center m-auto">
        Users not found
      </p>
    );
  }

  return (
    <section className="flex flex-col flex-1 gap-2  p-2">
      <Search placeholder="search users..." type="users" />
      <div className="flex flex-col gap-4 mt-3 ">
        {!!followingUsers?.length && (
          <div>
            <h3 className="">Following:</h3>
            <ul className="flex flex-col space-y-1 mt-4 ">
              {!isLoadingFollowingUsers &&
                followingUsers.map((user) => (
                  <UsersBarList key={user.id} user={user} />
                ))}
              {isLoadingFollowingUsers && <UserBarSkeleton />}
            </ul>
          </div>
        )}
        {
          <div>
            {!!users?.length && !searchUser && <h3 className="">All Users:</h3>}
            <ul className="flex flex-col space-y-1 mt-4 ">
              {!isLoading &&
                users?.map((user) => (
                  <UsersBarList key={user.id} user={user} />
                ))}
              {isLoading && <UserBarSkeleton />}
              {searchUser && !users?.length && (
                <p className="text-muted-foreground text-sm text-center">
                  User not found
                </p>
              )}
            </ul>
          </div>
        }
      </div>
    </section>
  );
};
