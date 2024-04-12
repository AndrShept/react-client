import { useGetAllUsersQuery } from '@/lib/services/userApi';
import { useEffect, useState } from 'react';

import { UsersBarList } from './UsersBarList';

export const UsersBar = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const delay = async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('asdasfsa');
        }, 2000);
      });
      setIsPending(false);
    };
    delay();
  }, []);

  if (isLoading || isPending) {
    return <div>Loding....</div>;
  }
  if (!users?.length) {
    return <div>Users not found</div>;
  }
  return (
    <ul className="flex flex-col space-y-1 w-full">
      {users.map((user) => (
        <UsersBarList user={user} />
      ))}
    </ul>
  );
};
