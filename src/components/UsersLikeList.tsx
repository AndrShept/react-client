import { Like } from '@/lib/types';
import { cn } from '@/lib/utils';

import { UserAvatar } from './UserAvatar';

interface UsersLikeListProps {
  like: Like;
  idx: number;
}

export const UsersLikeList = ({ like, idx }: UsersLikeListProps) => {
  console.log(like.user.avatarUrl);
  return (
    <li className={cn('')}>
      <UserAvatar
     
        className={cn('size-8  ring-1 ring-white  border-muted-foreground ')}
        avatarUrl={like.user.avatarUrl}
        username={like.user.username}
      />
    </li>
  );
};
