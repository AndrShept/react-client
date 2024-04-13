import { useDelay } from '@/hooks/useDelay';
import { useGetAllUsersQuery } from '@/lib/services/userApi';

import { UsersBarList } from './UsersBarList';
import { UserBarSkeleton } from './skeletons/UserBarSkeleton';

export const UsersBar = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const { isPending } = useDelay();

  if (isLoading || isPending) {
    return <UserBarSkeleton />;
  }
  if (!users?.length) {
    return <div>Users not found</div>;
  }
  return (
    <ul className="flex flex-col space-y-1 w-full">
      {users.map((user) => (
        <UsersBarList key={user.id} user={user} />
      ))}
    </ul>
  );
};
