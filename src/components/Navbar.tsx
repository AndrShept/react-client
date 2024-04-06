import { useGetAllUsersQuery } from '@/lib/services/userApi';
import { User2Icon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from './ui/button';

export const Navbar = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  console.log(data);
  return (
    <header className="h-14 w-full sticky top-0 bg-secondary/50 border-b ">
      <Button variant={'ghost'} size={'icon'}>
        <User2Icon />
      </Button>
      <Button variant={'ghost'} size={'icon'}>
        LOGOUT
      </Button>
      <Button asChild variant={'outline'}>
        <Link to={'/login'}>Login</Link>
      </Button>

      {data?.map((dat) => <p key={dat.id}>{dat.username}</p>)}
    </header>
  );
};
