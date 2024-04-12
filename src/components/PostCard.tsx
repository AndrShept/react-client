import { BASE_URL } from '@/lib/constants';
import { Post } from '@/lib/types';
import { format } from 'date-fns';
import { EditIcon, TrashIcon } from 'lucide-react';

import { LikeIcon } from './LikeIcon';
import { PostMessageIcon } from './PostMessageIcon';
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
      <time className="text-muted-foreground text-sm">
        {format(new Date(post.createdAt), 'dd.MM.yyyy, HH:mm')}
      </time>
      <section className="flex gap-1">
        <LikeIcon
          postId={post.id}
          likedByUser={post.likedByUser}
          likeCount={post.likes.length}
        />
        <PostMessageIcon postId={post.id} commentCount={post.comments.length} />
      </section>
    </article>
  );
};
