import { BASE_URL } from '@/lib/constants';
import { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';

import { FollowButton } from './FollowButton';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface UsersBarList {
  user: User;
}

export const UsersBarList = ({ user }: UsersBarList) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <ScrollArea>
      <Button
        onClick={() => navigate(`/users/${user.username}`)}
        className="w-full  h-14 justify-between"
        variant={pathname === `/users/${user.username}` ? 'secondary' : 'ghost'}
      >
        <div className="flex items-center ">
          <img
            className={cn('size-10 rounded-full', {})}
            src={`${BASE_URL}${user.avatarUrl}`}
            alt="user-avatar"
          />
          <p className="ml-2 capitalize break-words line-clamp-1">
            {user.username}
          </p>
        </div>
        <FollowButton userId={user.id} isFollowing={user.isFollowing} />
      </Button>
    </ScrollArea>
  );
};
