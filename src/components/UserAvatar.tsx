import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

import { OnlineBadge } from './OnlineBadge';
import { Button } from './ui/button';

interface UserAvatarProps {
  avatarUrl: string | undefined;
  username: string | undefined;
  link?: boolean;
  className?: string;
  isOnline: boolean;
  badge?: boolean;
}

export const UserAvatar = ({
  avatarUrl,
  username,
  link = true,
  className,
  badge = false,
  isOnline,
}: UserAvatarProps) => {
  return (
    <>
      {link && (
        <Button
          onClick={(e) => e.stopPropagation()}
          variant={'ghost'}
          size={'icon'}
          className="rounded-full relative"
        >
          <Link to={`/users/${username}`}>
            <Avatar className={cn('', className)}>
              <AvatarImage
                className="object-cover"
                src={avatarUrl}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          {badge && <OnlineBadge isOnline={isOnline} />}
        </Button>
      )}
      {!link && (
        <div className="relative">
          <Avatar className={cn('', className)}>
            <AvatarImage
              className="object-cover"
              src={avatarUrl}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {badge && <OnlineBadge isOnline={isOnline} />}
        </div>
      )}
    </>
  );
};
