import { BASE_URL } from '@/lib/constants';
import { Post } from '@/lib/types';
import {
  Edit,
  EditIcon,
  HeartIcon,
  MessageCircleMoreIcon,
  TrashIcon,
} from 'lucide-react';
import React from 'react';

import { UserAvatar } from './UserAvatar';
import { Button } from './ui/button';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="flex flex-col gap-2 ">
      <section className="flex justify-between">
        <div className="flex items-center gap-2">
          <UserAvatar
            avatarImg={post.author.avatarUrl}
            username={post.author.username}
          />
          <div>
            <p>{post.author.username}</p>
            <p className="text-muted-foreground text-sm break-words line-clamp-1">
              {post.author.email}
            </p>
          </div>
        </div>
        <div>
          <div className="flex gap-1">
            <Button className="size-8" variant={'ghost'} size={'icon'}>
              <EditIcon className="size-4" />
            </Button>
            <Button className="size-8" variant={'ghost'} size={'icon'}>
              <TrashIcon className="size-4" />
            </Button>
          </div>
        </div>
      </section>
      <section>
        <p className="md:text-[15px] text-sm">{post.content}</p>
      </section>
      <img
        className="aspect-video object-cover object-center rounded-2xl border"
        src={`${BASE_URL}${post.imageUrl}`}
        alt="post_image"
      />
      <section className="flex ">
        <Button className="size-9" variant={'ghost'} size={'icon'}>
          <HeartIcon className="size-6" />
        </Button>
        <Button className="size-9" variant={'ghost'} size={'icon'}>
          <MessageCircleMoreIcon className="size-6" />
        </Button>
      </section>
    </article>
  );
};
