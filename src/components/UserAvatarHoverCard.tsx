import { User } from '@/lib/types';
import React from 'react';

import { ConversationButton } from './ConversationButton';
import { FollowButton } from './FollowButton';
import { PhotoCard } from './PhotoCard';
import { UserAvatar } from './UserAvatar';

interface Props {
  user: User & {
    _count: {
      likes: number;
      followers: number;
      photos: number;
      posts: number;
    };
  };
}

export const UserAvatarHoverCard = ({ user }: Props) => {
  return (
    <>
      <section className="flex gap-3">
        <UserAvatar
          className="size-20"
          avatarUrl={user.avatarUrl}
          isOnline={user.isOnline}
          username={user.username}
          isLink={false}
        />
        <div className="text-sm flex flex-col w-full">
          <div className="text-primary flex ">
            {user.username}
            <div className="ml-auto">
              {user.isOnline ? (
                <div className="px-[6px] py-[3px] text-[11px] rounded-full border-green-500 border bg-green-600/30">
                  online
                </div>
              ) : (
                <div className="px-[6px] py-[3px] text-[11px] rounded-full border-red-500 border bg-red-600/30">
                  offline
                </div>
              )}
            </div>
          </div>
          <p>{user.email}</p>
          <p>{user.location}</p>
          <p className="break-words line-clamp-2 text-zinc-600">{user.bio}</p>
        </div>
      </section>

      <section>
        <ul className="flex gap-2">
          {user.photos?.map((photo) => (
            <PhotoCard username={user.username} photo={photo} />
          ))}
        </ul>
      </section>

      <section className="mt-auto pt-3 text-sm flex justify-between border-t items-center gap-5">
        <div className="flex gap-1">
          <p>
            likes
            <span className="text-primary ml-1">{user._count.likes}</span>
          </p>
          <p>
            followers
            <span className="text-primary ml-1">{user._count.followers}</span>
          </p>
          <p>
            photos
            <span className="text-primary ml-1">{user._count.photos}</span>
          </p>
          <p>
            posts
            <span className="text-primary ml-1">{user._count.posts}</span>
          </p>
        </div>

        <div className="flex gap-1 items-center">
          <FollowButton
            isFollowing={user.isFollowing}
            username={user.username}
            userId={user.id}
          />
          <ConversationButton receiverId={user.id} />
        </div>
      </section>
    </>
  );
};
