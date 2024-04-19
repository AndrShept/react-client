import { useAuth } from '@/hooks/useAuth';
import { BASE_URL } from '@/lib/constants';
import { Post } from '@/lib/types';
import { format } from 'date-fns';
import { EditIcon } from 'lucide-react';

import { UserAvatar } from './UserAvatar';
import { PostCommentsIcon } from './icons/PostCommentsIcon';
import { PostDeleteIcon } from './icons/PostDeleteIcon';
import { PostLikeIcon } from './icons/PostLikeIcon';
import { Button } from './ui/button';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { userId } = useAuth();
  console.log(post)
  const isAuthor = userId === post.authorId;
  console.log(post.author)
  return (
    <article className="flex flex-col gap-2 ">
      <section className="flex justify-between">
        <div className="flex items-center gap-2">
          <UserAvatar
            avatarUrl={'/uploads/images/1713526009314-Gotham.jpg'}
            username={post.author.username}
            

          />
          <div>
            <p>{post.author.username}</p>
            <p className="text-muted-foreground text-sm break-words line-clamp-1">
              {post.author.email}
            </p>
          </div>
        </div>

        {isAuthor && (
          <div className="flex gap-x-[1px]">
            <Button className="size-8" variant={'ghost'} size={'icon'}>
              <EditIcon className="size-4" />
            </Button>
            <PostDeleteIcon postId={post.id} />
          </div>
        )}
      </section>

      <p className="md:text-[15px] text-sm">{post.content}</p>

      {post.imageUrl && (
        <img
          className="aspect-video object-cover object-center rounded-2xl border"
          src={`${BASE_URL}${post.imageUrl}`}
          alt="post_image"
        />
      )}
      <time className="text-muted-foreground text-[13px]">
        {format(new Date(post.createdAt), 'dd.MM.yyyy, HH:mm')}
      </time>
      <section className="flex gap-1">
        <PostLikeIcon
          postId={post.id}
          likedByUser={post.likedByUser}
          likeCount={post.likes.length}
        />
        <PostCommentsIcon
          postId={post.id}
          commentCount={post.comments.length}
        />
      </section>
    </article>
  );
};
