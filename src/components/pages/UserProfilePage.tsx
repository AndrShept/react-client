import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useGetUserByUsernameQuery } from '@/lib/services/userApi';
import { cn, compactNumberFormatter } from '@/lib/utils';
import { PencilIcon } from 'lucide-react';
import { Link, Outlet, useParams } from 'react-router-dom';

import { ConversationButton } from '../ConversationButton';
import { FollowButton } from '../FollowButton';
import { UserAvatar } from '../UserAvatar';
import { UserProfileTabs } from '../UserProfileTabs';
import { UserProfileEditForm } from '../forms/UserProfileEditForm';
import { UserProfilePageSkeleton } from '../skeletons/UserProfilePageSkeleton';
import { Button, buttonVariants } from '../ui/button';

export const UserProfilePage = () => {
  const { username } = useParams();
  const { username: currentName } = useAuth();
  const isSelf = username === currentName;
  if (!username) {
    throw new Error('User not found');
  }
  const { data: user, isLoading } = useGetUserByUsernameQuery(username);
  if (isLoading) {
    return <UserProfilePageSkeleton />;
  }
  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <>
      <article className="flex md:flex-row flex-col mx-auto gap-4 items-center bg-secondary/50 p-10  rounded-md  ">
        <UserAvatar
          isOnline={user.isOnline}
          avatarUrl={user.avatarUrl}
          isLink={false}
          username={user.username}
          className="h-40 w-40 border shadow-lg shadow-primary/10"
        />

        <section
          className={cn(
            'flex flex-col justify-between text-center max-w-xs  mt-2 text-muted-foreground',
            {
              'mt-10': isSelf,
            },
          )}
        >
          <div className="flex flex-col gap-3">
            <h1 className="md:text-2xl text-xl font-semibold text-indigo-500">
              {user.username}
            </h1>
            <p className="">{user.location}</p>
          </div>

          <p className="md:text-xl text-base">{user.bio}</p>
          <div className="flex justify-between  gap-4">
            <p className="flex flex-col items-center">
              <span>Posts</span>
              <span className="text-primary"> {user._count.posts}</span>
            </p>
            <p className="flex flex-col items-center">
              <span>Comments</span>
              <span className="text-primary"> {user._count.comments}</span>
            </p>
            <p className="flex flex-col items-center">
              <span>Friends</span>
              <span className="text-primary">
                {' '}
                {compactNumberFormatter(user._count.following)}
              </span>
            </p>
            <p className="flex flex-col items-center">
              <span>Likes</span>
              <span className="text-primary">
                {' '}
                {compactNumberFormatter(user._count.likes)}
              </span>
            </p>

            <p className="flex flex-col items-center">
              <span>Photos</span>
              <span className="text-primary"> {user._count.photos}</span>
            </p>
          </div>
          {isSelf && (
            <Dialog>
              <DialogTrigger>
                <Button className="rounded-full gap-1 mt-6 ">
                  <PencilIcon className="size-4" />
                  Update profile
                </Button>
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
          {!isSelf && (
            <section className="flex items-center gap-4 mx-auto mt-6">
              <FollowButton
                label={true}
                username={user.username}
                userId={user.id}
                isFollowing={user.isFollowing}
              />

              <ConversationButton label receiverId={user.id} />
            </section>
          )}
        </section>
      </article>
      <UserProfileTabs />
    </>
  );
};
