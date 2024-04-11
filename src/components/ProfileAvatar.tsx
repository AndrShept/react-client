import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/hooks/useAuth';
import { BASE_URL } from '@/lib/constants';
import { logout } from '@/lib/redux/userSlice';
import { LogOutIcon, UserCog2Icon } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { UserAvatar } from './UserAvatar';
import { Button } from './ui/button';

export const ProfileAvatar = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };
  if (!userData) {
    return null;
  }
  console.log(userData.avatarUrl);
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="rounded-full " variant={'ghost'} size={'icon'}>
          <img src={`${BASE_URL}${userData.avatarUrl}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" w-fit p-2 flex flex-col gap-1 text-xs text-muted-foreground">
        <Button asChild className="justify-start" variant={'ghost'}>
          <Link to={`/users/${userData.username}`}>
            <UserCog2Icon className="mr-2 size-5" />
            Profile
          </Link>
        </Button>
        <Button onClick={onLogout} className="justify-start" variant={'ghost'}>
          <LogOutIcon className="mr-2 size-5" />
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};
