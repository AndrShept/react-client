import { useGetAllUsersQuery } from '@/lib/services/userApi';
import React, { useEffect, useState, useTransition } from 'react';

import { UsersBarList } from './UsersBarList';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

export const UsersBar = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  //   const [isPending, startTransition] = useTransition();
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const delay = async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      setIsPending(false);
    };
    delay()
  }, []);

  if (isLoading || isPending) {
    return <div>Loding....</div>;
  }
  if (!users?.length) {
    return <div>Users not found</div>;
  }
  console.log(users);
  return (
    <ul className="flex flex-col space-y-1 w-full">
      {users.map((user) => (
        <UsersBarList user={user} />
      ))}
    </ul>
  );
};
