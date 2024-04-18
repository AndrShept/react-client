import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BASE_URL } from '@/lib/constants';
import { Link } from 'react-router-dom';

import { Button } from './ui/button';

interface UserAvatarProps {
  avatarUrl: string | undefined;
  username: string | undefined;
  link?: boolean;
}

export const UserAvatar = ({
  avatarUrl,
  username,
  link = true,
}: UserAvatarProps) => {
  return (
    <>
      {link && (
        <Button variant={'ghost'} size={'icon'} className="rounded-full">
          <Link to={`/users/${username}`}>
            <Avatar>
              <AvatarImage
                className="object-cover"
                src={`${BASE_URL}${avatarUrl}`}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </Button>
      )}
      {!link && (
        <Button variant={'ghost'} size={'icon'} className="rounded-full">
          <Avatar>
            <AvatarImage
              className="object-cover"
              src={`${BASE_URL}${avatarUrl}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      )}
    </>
  );
};
