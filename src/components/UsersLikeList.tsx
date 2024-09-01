import { Like } from '@/lib/types';
import { cn } from '@/lib/utils';

import { UserAvatar } from './UserAvatar';

interface UsersLikeListProps {
  like: Like;
}

export const UsersLikeList = ({ like }: UsersLikeListProps) => {
  return (
    <li className={cn('')}>
      <UserAvatar
        isOnline={like.user.isOnline}
        className={cn('size-8  ring-1 ring-white ')}
        avatarUrl={like.user.avatarUrl}
        username={like.user.username}
        isHover
      />
    </li>
  );
};
