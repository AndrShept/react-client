import { useAuth } from '@/hooks/useAuth';
import { Post } from '@/lib/types';
import { compactNumberFormatter, dateFnsLessTime } from '@/lib/utils';
import { EditIcon, EyeIcon } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import { UserAvatar } from './UserAvatar';
import { UsersLikeList } from './UsersLikeList';
import { FavoritePostIcon } from './icons/FavoritePostIcon';
import { LikeIcon } from './icons/LikeIcon';
import { PostCommentsIcon } from './icons/PostCommentsIcon';
import { PostDeleteIcon } from './icons/PostDeleteIcon';
import { Button } from './ui/button';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { userId } = useAuth();
  const ref = useRef<null | HTMLVideoElement>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.9,
  });
  const isAuthor = userId === post.authorId;
  const navigate = useNavigate();
  const setRefs = useCallback(
    (node: HTMLVideoElement) => {
      ref.current = node;

      inViewRef(node);
    },
    [inViewRef],
  );
  useEffect(() => {
    if (inView) {
      ref.current?.play();
    }
    if (!inView) {
      ref.current?.pause();
    }
  }, [inView]);
  return (
    <article
      onClick={() => navigate(`?id=${post.id}`, { state: { mode: 'post' } })}
      className="flex flex-col max-w-[600px] md:min-w-[400px] min-w-[300px] cursor-pointer  text-start gap-2 bg-secondary/30   rounded-md border hover:border-primary transition "
    >
      <section className="flex justify-between px-6 pt-5 pb-1 ">
        <div className="flex items-center gap-2 ">
          <UserAvatar
            isOnline={post.author.isOnline}
            avatarUrl={post.author.avatarUrl}
            username={post.author.username}
            isHover={true}
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
          draggable={false}
          className="aspect-video object-cover object-center border-t   "
          src={post.imageUrl}
          alt="post_image"
        />
      )}
      {post.videoUrl && (
        <video
          ref={setRefs}
          src={post.videoUrl}
          muted
          controls
          className="aspect-square size-full"
        />
      )}
      {!!post.likes.length && (
        <ul className=" px-6 py-2  flex border-b -space-x-3 items-center relative      min-h-[50px]  ">
          {post.likes.map((like) => <UsersLikeList like={like} />).slice(-4)}
        </ul>
      )}

      <section className="flex items-center px-6 pb-3 justify-between ">
        <div className="flex gap-2 ">
          <LikeIcon
            type="post"
            id={post.id}
            likedByUser={post.likedByUser}
            likeCount={post.likes.length}
          />
          <PostCommentsIcon
            postId={post.id}
            commentCount={post._count.comments}
          />
        </div>
        <div className="flex gap-1 items-center">
          <div className="flex items-center gap-x-[5px]">
            <EyeIcon className="size-5" />

            <span className="text-xs text-muted-foreground">
              {compactNumberFormatter(post._count.view)}
            </span>
          </div>
          <FavoritePostIcon
            postId={post.id}
            isFavoritePost={post.isFavoritePost}
          />
        </div>
      </section>
    </article>
  );
};
