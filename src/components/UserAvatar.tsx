import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useGetUserByUsernameQuery } from '@/lib/services/userApi';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { OnlineBadge } from './OnlineBadge';
import { Spinner } from './Spinner';
import { UserAvatarHoverCard } from './UserAvatarHoverCard';
import { Button } from './ui/button';

interface UserAvatarProps {
  avatarUrl: string | undefined;
  username: string | undefined;
  className?: string;
  isLink?: boolean;
  isOnline: boolean;
  isBadge?: boolean;
  isHover?: boolean;
}

export const UserAvatar = ({
  avatarUrl,
  username,
  isOnline,
  className,
  isLink = true,
  isBadge = false,
  isHover = false,
}: UserAvatarProps) => {
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  const { data: user, isLoading } = useGetUserByUsernameQuery(
    username as string,
  );
  return (
    <>
      <HoverCard
        open={isHoverOpen && isHover}
        onOpenChange={setIsHoverOpen}
        openDelay={400}
        closeDelay={100}
      >
        <HoverCardTrigger>
          {isLink && (
            <Button
              onClick={(e) => e.stopPropagation()}
              variant={'ghost'}
              size={'icon'}
              className="rounded-full relative flex"
            >
              <Link to={`/users/${username}`}>
                <Avatar className={cn('', className)}>
                  <AvatarImage className="object-cover" src={avatarUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              {isBadge && <OnlineBadge isOnline={isOnline} />}
            </Button>
          )}
          {!isLink && (
            <div className="relative">
              <Avatar className={cn('', className)}>
                <AvatarImage
                  className="object-cover will-change-transform"
                  src={avatarUrl}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {isBadge && <OnlineBadge isOnline={isOnline} />}
            </div>
          )}
        </HoverCardTrigger>
        <HoverCardContent className="w-full flex flex-col gap-4 max-w-[500px]  min-h-[200px] min-w-[300px] text-[15px] text-muted-foreground cursor-default">
          {isLoading && (
            <p className="m-auto space-y-4 ">
              <Spinner />
              <span className="">Loading...</span>
            </p>
          )}
          {!isLoading && user && <UserAvatarHoverCard user={user} />}
        </HoverCardContent>
      </HoverCard>
    </>
  );
};
