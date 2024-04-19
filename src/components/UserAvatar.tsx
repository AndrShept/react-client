import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BASE_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

import { Button } from './ui/button';

interface UserAvatarProps {
  avatarUrl: string | undefined;
  username: string | undefined;
  link?: boolean;
  className?: string;
}

export const UserAvatar = ({
  avatarUrl,
  username,
  link = true,
  className,
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
        <Avatar className={cn('', className)}>
          <AvatarImage
            className="object-cover"
            src={`${BASE_URL}${avatarUrl}`}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </>
  );
};
