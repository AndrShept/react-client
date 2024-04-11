import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BASE_URL } from '@/lib/constants';
import { Link } from 'react-router-dom';

import { Button } from './ui/button';

interface UserAvatarProps {
  avatarImg: string | undefined;
  username: string | undefined;
}

export const UserAvatar = ({ avatarImg, username }: UserAvatarProps) => {
  return (
    <Button variant={'ghost'} size={'icon'} className="rounded-full">
      <Link to={`/users/${username}`}>
        <Avatar>
          <AvatarImage src={`${BASE_URL}${avatarImg}`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
    </Button>
  );
};
