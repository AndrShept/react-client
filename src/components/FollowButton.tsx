import { useFollowUserMutation } from '@/lib/services/followUserApi';
import {
  useLazyGetAllFollowingUsersQuery,
  useLazyGetAllUsersQuery,
  useLazyGetUserByUsernameQuery,
} from '@/lib/services/userApi';
import { cn } from '@/lib/utils';
import {
  UserMinus,
  UserMinus2Icon,
  UserPlus,
  UserPlus2Icon,
} from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { Button } from './ui/button';

interface FollowButtonProps {
  isFollowing: boolean;
  userId: string;
  username: string;
  label?: boolean;
}

export const FollowButton = ({
  isFollowing,
  userId,
  username,
  label = false,
}: FollowButtonProps) => {
  const [follow, { isLoading }] = useFollowUserMutation();
  const [refetchUsers] = useLazyGetAllUsersQuery();
  const [refetchUserByUsername] = useLazyGetUserByUsernameQuery();
  const [refetchFollowingUsers] = useLazyGetAllFollowingUsersQuery();

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    try {
      const res = await follow(userId).unwrap();
      toast.success(res.message);
      await refetchUsers().unwrap();
      await refetchFollowingUsers().unwrap();
      await refetchUserByUsername(username).unwrap();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Button
      disabled={isLoading}
      variant={!isFollowing ? 'indigo' : 'outline'}
      className={cn('rounded-full text-xs gap-1 ', {
        'size-9': !label,
      })}
      onClick={handleFollow}
      size={label ? 'sm' : 'icon'}
    >
      {!isFollowing && <UserPlus2Icon className="size-[17px]" />}
      {isFollowing && <UserMinus2Icon className="size-[17px]" />}
      {label && (!isFollowing ? 'Follow' : 'Unfollow')}
    </Button>
  );
};
