import { useFollowUserMutation } from '@/lib/services/followUserApi';
import {
  useLazyGetAllUsersQuery,
  useLazyGetUserByUsernameQuery,
} from '@/lib/services/userApi';
import { cn } from '@/lib/utils';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from './ui/button';

interface FollowButtonProps {
  isFollowing: boolean;
  userId: string;
  username:string
}

export const FollowButton = ({ isFollowing, userId, username }: FollowButtonProps) => {

  const [follow, { isLoading }] = useFollowUserMutation();
  const [refetchUsers] = useLazyGetAllUsersQuery();
  const [refetchUserByUsername] = useLazyGetUserByUsernameQuery();

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    try {
      const res = await follow(userId).unwrap();
      toast.success(res.message);
      await refetchUsers().unwrap();
      await refetchUserByUsername(username).unwrap();
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
