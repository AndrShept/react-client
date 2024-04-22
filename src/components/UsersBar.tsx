import { useDelay } from '@/hooks/useDelay';
import { useGetAllUsersQuery } from '@/lib/services/userApi';

import { Search } from './Search';
import { UsersBarList } from './UsersBarList';
import { UserBarSkeleton } from './skeletons/UserBarSkeleton';

export const UsersBar = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();

  if (isLoading) {
    return <UserBarSkeleton />;
  }
  if (!users?.length) {
    return <div>Users not found</div>;
  }
  return (
    <section className="flex flex-col flex-1 gap-2 mt-1">
      <Search placeholder="search users..." />
      <ul className="flex flex-col space-y-1 mt-4 ">
        {users.map((user) => (
          <UsersBarList key={user.id} user={user} />
        ))}
      </ul>
    </section>
  );
};
