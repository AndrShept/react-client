import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { BASE_URL } from '@/lib/constants';
import { useGetCommentsQuery } from '@/lib/services/commentApi';
import { Post } from '@/lib/types';
import { ImageOffIcon, MessageCircle } from 'lucide-react';
import { ReactNode, useRef } from 'react';

import { CommentsCard } from './CommentsCard';
import { UserAvatar } from './UserAvatar';
import { PostCommentsForm } from './forms/PostCommentsForm';
import { PostLikeIcon } from './icons/PostLikeIcon';
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
            <img
              className="object-cover  "
              src={`${BASE_URL}${post.imageUrl}`}
            />
          )}

          {!post.imageUrl && (
            <div className="  flex flex-col gap-2 text-muted-foreground items-center h-full justify-center">
              <ImageOffIcon className="size-10" />
              <p>this post does not have a picture</p>
            </div>
          )}
        </section>
        <section
          className={'w-[450px] h-full flex flex-col gap-4   p-2 rounded-xl'}
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
          <ScrollArea className="pr-3">
            <ul className="flex flex-col h-screen gap-4">
              {!comments?.length && (
                <p className="text-muted-foreground text-sm text-center ">
                  comment not found
                </p>
              )}
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
          <Separator />
          <div className="flex gap-1">
            <PostLikeIcon
              postId={post.id}
              likeCount={post.likes.length}
              likedByUser={post.likedByUser}
            />
            <Button
             
              className="rounded-full"
              variant={'ghost'}
              size={'icon'}
            >
              <MessageCircle />
            </Button>
          </div>
          <div>
            <PostCommentsForm  postId={post.id} />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};
