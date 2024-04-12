import { useFollowUserMutation } from '@/lib/services/followUserApi';
import { useLazyGetAllUsersQuery } from '@/lib/services/userApi';
import { cn } from '@/lib/utils';
import React from 'react';
import { toast } from 'sonner';

import { Button } from './ui/button';

interface FollowButtonProps {
  isFollowing: boolean;
  userId: string;
}

export const FollowButton = ({ isFollowing, userId }: FollowButtonProps) => {
  const [follow, { isLoading }] = useFollowUserMutation();
  const [refetchUsers] = useLazyGetAllUsersQuery();

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    try {
      const res = await follow(userId).unwrap();
      toast.success(res.message);
      await refetchUsers().unwrap();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Button
      disabled={isLoading}
      variant={!isFollowing ? 'outline' : 'default'}
      className={cn('rounded-full text-xs ', {
        'hover:bg-background/40': !isFollowing,
      })}
      onClick={handleFollow}
      size={'sm'}
    >
      {!isFollowing ? 'Follow' : 'Unfollow'}
    </Button>
  );
};
