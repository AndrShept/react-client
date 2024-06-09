import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { BASE_URL } from '@/lib/constants';
import { useGetCommentsQuery } from '@/lib/services/commentApi';
import { Post } from '@/lib/types';
import { ImageOffIcon, MessageCircle } from 'lucide-react';
import { ReactNode, useRef } from 'react';

import { UserAvatar } from './UserAvatar';
import { CommentsCard } from './comment/CommentsCard';
import { PostCommentsForm } from './forms/PostCommentsForm';
import { FavoritePostIcon } from './icons/FavoritePostIcon';
import { LikeIcon } from './icons/LikeIcon';
import { PostCommentsSkeleton } from './skeletons/PostCommentsSkeleton';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface PostModalProps {
  children: ReactNode;
  post: Post;
}

export const PostModal = ({ children, post }: PostModalProps) => {
  const { data: comments, isLoading } = useGetCommentsQuery(post.id);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="h-[95%] max-w-[95%] flex ">
        <section className="size-full  relative sm:block hidden ">
          {post.imageUrl && (
            <div className="size-full ">
              <img
                className="object-contain size-full"
                src={`${BASE_URL}${post.imageUrl}`}
              />
            </div>
          )}

          {!post.imageUrl && (
            <div className="  flex flex-col gap-2 text-muted-foreground items-center h-full justify-center">
              <ImageOffIcon className="size-10" />
              <p>this post does not have a picture</p>
            </div>
          )}
        </section>
        <section
          className={
            'w-[450px] h-full flex flex-col gap-4   p-2 rounded-xl mx-auto'
          }
        >
          <div className="flex gap-2">
            <UserAvatar
              className="size-8"
              avatarUrl={post.author.avatarUrl}
              isOnline={post.author.isOnline}
              username={post.author.username}
            />
            <p className="text-muted-foreground text-sm line-clamp-3">
              {post.content}
            </p>
          </div>
          <Separator />
          {!comments?.length && (
            <div className="flex-1 flex">
              <p className="text-muted-foreground text-sm m-auto   ">
                Comment not found
              </p>
            </div>
          )}
          {!!comments?.length && (
            <ScrollArea className="pr-3 flex-1 ">
              <ul className="flex flex-col   gap-4 ">
                {isLoading && <PostCommentsSkeleton />}
                {!isLoading &&
                  comments?.map((comment) => (
                    <CommentsCard
                      cardSize="full"
                      textSize="sm"
                      avatarClassname="size-9"
                      comment={comment}
                    />
                  ))}
              </ul>
            </ScrollArea>
          )}
          <Separator />
          <div className="flex justify-between">
            <div className="flex gap-1">
              <LikeIcon
                type="post"
                id={post.id}
                likeCount={post.likes.length}
                likedByUser={post.likedByUser}
              />
              <Button className="rounded-full" variant={'ghost'} size={'icon'}>
                <MessageCircle />
              </Button>
            </div>
            <FavoritePostIcon
              postId={post.id}
              isFavoritePost={post.isFavoritePost}
            />
          </div>
          <div>
            <PostCommentsForm postId={post.id} />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};
