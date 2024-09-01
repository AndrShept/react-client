import { useSocket } from '@/components/providers/SocketProvider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/lib/redux/userSlice';
import { LogOutIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ActionTooltip } from './ActionTooltip';
import { UserAvatar } from './UserAvatar';
import { Button } from './ui/button';

export const ProfileAvatar = () => {
  const { socket, isConnected } = useSocket();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
    socket?.disconnect();
  };
  if (!userData) {
    return null;
  }
  return (
    // <Popover>
    //   <PopoverTrigger>
    //     <Button className="rounded-full " variant={'ghost'} size={'icon'}>
    //       <img src={`${BASE_URL}${userData.avatarUrl}`} />
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className=" w-fit p-2 flex flex-col gap-1 text-xs text-muted-foreground">
    //     <Button asChild className="justify-start" variant={'ghost'}>
    //       <Link to={`/users/${userData.username}`}>
    //         <UserCog2Icon className="mr-2 size-5" />
    //         Profile
    //       </Link>
    //     </Button>
    //     <Button onClick={onLogout} className="justify-start" variant={'ghost'}>
    //       <LogOutIcon className="mr-2 size-5" />
    //       Logout
    //     </Button>
    //   </PopoverContent>
    // </Popover>
    <div className="flex items-center md:gap-2 gap-1 scale-95 ml-2 ">
      <UserAvatar
        isOnline={userData.isOnline}
        avatarUrl={userData.avatarUrl}
        username={userData.username}
      />
      <div className="md:flex flex-col hidden">
        <p>{userData.username}</p>
        {/* <p className="text-xs text-muted-foreground text-wrap line-clamp-1 break-all">
          {' '}
          {userData.email}
        </p> */}
      </div>
      <ActionTooltip label="Logout">
        <Button
          onClick={onLogout}
          className="size-7"
          variant={'ghost'}
          size={'icon'}
        >
          <LogOutIcon className="size-4" />
        </Button>
      </ActionTooltip>
    </div>
  );
};
