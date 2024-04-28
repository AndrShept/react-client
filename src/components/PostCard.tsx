import { useAuth } from '@/hooks/useAuth';
import { BASE_URL } from '@/lib/constants';
import { Post } from '@/lib/types';
import { dateFnsLessTime } from '@/lib/utils';
import { EditIcon } from 'lucide-react';

import { UserAvatar } from './UserAvatar';
import { UsersLikeList } from './UsersLikeList';
import { PostCommentsIcon } from './icons/PostCommentsIcon';
import { PostDeleteIcon } from './icons/PostDeleteIcon';
import { PostLikeIcon } from './icons/PostLikeIcon';
import { Button } from './ui/button';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  console.log(post);
  const { userId } = useAuth();
  const isAuthor = userId === post.authorId;
  return (
    <article className="flex flex-col gap-2 bg-secondary/50 backdrop-blur-md  rounded-3xl ">
      <section className="flex justify-between px-6 pt-5 pb-1 ">
        <div className="flex items-center gap-2 ">
          <UserAvatar
            isOnline={post.author.isOnline}
            avatarUrl={post.author.avatarUrl}
            username={post.author.username}
          />
          <div>
            <p>{post.author.username}</p>
            <p className="text-muted-foreground text-sm break-words line-clamp-1">
              <time className="text-muted-foreground text-[13px]">
                {dateFnsLessTime(post.createdAt)}
              </time>
            </p>
          </div>
        </div>

        {isAuthor && (
          <div className="flex gap-x-[1px] ">
            <Button className="size-8" variant={'ghost'} size={'icon'}>
              <EditIcon className="size-4" />
            </Button>
            <PostDeleteIcon postId={post.id} />
          </div>
        )}
      </section>

      <p className="md:text-[15px] text-sm px-6  ">{post.content}</p>

      {post.imageUrl && (
        <img
          className="aspect-video object-cover object-center border-t   "
          src={`${BASE_URL}${post.imageUrl}`}
          alt="post_image"
        />
      )}
      {!!post.likes && (
        <ul className=" px-6 py-2  flex border-b -space-x-3 items-center relative      min-h-[50px]  ">
          {post.likes.map((like) => <UsersLikeList like={like} />).slice(-4)}
        </ul>
      )}

      <section className="flex gap-2 px-6 pb-3 ">
        <PostLikeIcon
          postId={post.id}
          likedByUser={post.likedByUser}
          likeCount={post.likes.length}
        />
        <PostCommentsIcon
          postId={post.id}
          commentCount={post._count.comments}
        />
      </section>
    </article>
  );
};
