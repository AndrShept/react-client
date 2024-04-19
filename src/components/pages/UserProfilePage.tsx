import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useDelay } from '@/hooks/useDelay';
import { useGetUserByUsernameQuery } from '@/lib/services/userApi';
import {
  MessageCircleMore,
  MessageSquareMoreIcon,
  NotepadTextIcon,
  UsersIcon,
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import { FollowButton } from '../FollowButton';
import { UserAvatar } from '../UserAvatar';
import { UserProfileEditForm } from '../forms/UserProfileEditForm';
import { UserProfilePageSkeleton } from '../skeletons/UserProfilePageSkeleton';
import { Button } from '../ui/button';

export const UserProfilePage = () => {
  const { username } = useParams();
  const { username: currentName } = useAuth();
  const isSelf = username === currentName;
  if (!username) {
    throw new Error('User not found');
  }
  const { data: user, isLoading } = useGetUserByUsernameQuery(username);
  const { isPending } = useDelay();
  if (isLoading || isPending) {
    return <UserProfilePageSkeleton />;
  }
  if (!user) {
    return <div>User not found</div>;
  }
  console.log(user);
  return (
    <div className="flex flex-col">
      <div className="h-[100px] "></div>
      <article className="flex flex-col    rounded-3xl  gap-4 bg-secondary/40 backdrop-blur-md md:p-12 p-6">
        <div className="flex justify-between items-center relative">
          {!isSelf && (
            <FollowButton userId={user.id} isFollowing={user.isFollowing} />
          )}

          <div className="absolute z-[-1] inset-0 flex  items-center justify-center -top-[135px]   ">
            <UserAvatar
              avatarUrl={user.avatarUrl}
              link={false}
              username={user.username}
              className="h-40 w-40"
            />
          </div>
          {!isSelf && (
            <div className="flex items-center gap-1">
              <MessageCircleMore />
              <p>Message</p>
            </div>
          )}
        </div>

        <section className="flex flex-col mx-auto text-center max-w-xs gap-10 text-muted-foreground">
          <div className="flex flex-col gap-3">
            <h1 className="md:text-2xl text-xl font-semibold text-primary">
              {user.username}
            </h1>
            <p className="">{user.location}</p>
          </div>

          <p className="md:text-xl text-base">{user.bio}</p>
          <div className="flex justify-between  gap-4">
            <p className="flex flex-col items-center">
              {user._count.posts}
              <span>Posts</span>
            </p>
            <p className="flex flex-col items-center">
              {user._count.comments}
              <span>Comments</span>
            </p>
            <p className="flex flex-col items-center">
              {user._count.following}
              <span>Friends</span>
            </p>
          </div>
          {isSelf && (
            <Dialog>
              <DialogTrigger>
                <Button>Update prfofile</Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <section className=" border-b p-4">
                  <h1 className="font-semibold text-2xl ">Personal info</h1>
                  <p className="text-muted-foreground text-sm">
                    Customize how your profile information will appear to the
                    networks.
                  </p>
                </section>
                <UserProfileEditForm user={user} />
              </DialogContent>
            </Dialog>
          )}
        </section>
      </article>
    </div>
  );
};
