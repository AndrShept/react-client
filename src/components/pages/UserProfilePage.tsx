import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useDelay } from '@/hooks/useDelay';
import { useGetUserByUsernameQuery } from '@/lib/services/userApi';
import { cn } from '@/lib/utils';
import { PencilIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { ConversationButton } from '../ConversationButton';
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
  if (isLoading) {
    return <UserProfilePageSkeleton />;
  }
  if (!user) {
    return <div>User not found</div>;
  }
  console.log(user);
  return (
    <div className="flex flex-col p-8">
      <div className="h-[100px] "></div>
      <article className="flex flex-col border border-indigo-400   rounded-3xl  gap-4  backdrop-blur-md md:p-12 p-6">
        <div className="flex justify-between items-center relative">
          <div
            className={cn(
              'absolute z-[-1] inset-0 flex  items-center justify-center -top-[135px]   ',
              {
                '-top-[95px]': isSelf,
              },
            )}
          >
            <UserAvatar
              isOnline={user.isOnline}
              avatarUrl={user.avatarUrl}
              link={false}
              username={user.username}
              className="h-40 w-40 border shadow-lg shadow-primary/10"
            />
          </div>
        </div>

        <section
          className={cn(
            'flex flex-col mx-auto text-center max-w-xs gap-10 mt-2 text-muted-foreground',
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
              <span className="text-primary"> {user._count.posts}</span>
              <span>Posts</span>
            </p>
            <p className="flex flex-col items-center">
              <span className="text-primary"> {user._count.comments}</span>
              <span>Comments</span>
            </p>
            <p className="flex flex-col items-center">
              <span className="text-primary"> {user._count.following}</span>

              <span>Friends</span>
            </p>
            <p className="flex flex-col items-center">
              <span className="text-primary"> {user._count.likes}</span>
              <span>Likes</span>
            </p>
          </div>
          {isSelf && (
            <Dialog>
              <DialogTrigger>
                <Button className="rounded-full gap-1 ">
                  <PencilIcon className='size-4' />
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
            <section className="flex items-center gap-4 mx-auto">
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
    </div>
  );
};
