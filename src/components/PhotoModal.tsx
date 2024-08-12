import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { BASE_URL } from '@/lib/constants';
import { useGetCommentsQuery } from '@/lib/services/commentApi';
import { useGetPhotoByIdQuery } from '@/lib/services/photoApi';
import { useGetPostByIdQuery } from '@/lib/services/postApi';
import { ImageOffIcon, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { UserAvatar } from './UserAvatar';
import { CommentsCard } from './comment/CommentsCard';
import { CommentsForm } from './forms/CommentsForm';
import { FavoritePostIcon } from './icons/FavoritePostIcon';
import { LikeIcon } from './icons/LikeIcon';
import { PostCommentsSkeleton } from './skeletons/PostCommentsSkeleton';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

export const PhotoModal = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') as string;
  const { mode }: { mode: 'photo' } = state;

  const { data: comments, isLoading } = useGetCommentsQuery(id);
  const { data: photo, isLoading: isLoadingPhoto } = useGetPhotoByIdQuery(id);
console.log(photo)

  return (
    <Dialog
      open={mode === 'photo'}
      onOpenChange={() => navigate(pathname, { state: null })}
    >
      {/* <DialogTrigger>{children}</DialogTrigger> */}
      <DialogContent className="h-[95%] max-w-[95%] flex  ">
        <section className="size-full  relative sm:block hidden ">
          {photo?.url && !isLoadingPhoto && (
            <div className="size-full ">
              <img
                className="object-contain size-full"
                src={`${BASE_URL}${photo?.url ?? ''}`}
              />
            </div>
          )}
          {isLoadingPhoto && (
            <div className="  flex flex-col gap-2 text-muted-foreground items-center h-full justify-center">
              <ImageOffIcon className="size-10" />
              <p>LOADING...</p>
            </div>
          )}

          {!photo?.url && (
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
              className="size-8 "
              avatarUrl={photo?.user?.avatarUrl}
              isOnline={photo?.user?.isOnline!}
              username={photo?.user?.username}
            />
            <p className="text-muted-foreground text-sm line-clamp-3">
              {photo?.name}
            </p>
          </div>
          <Separator />
          {!comments?.length && !isLoading ? (
            <div className="flex-1 flex">
              <p className="text-muted-foreground text-sm m-auto   ">
                Comment not found
              </p>
            </div>
          ) : (
            <ScrollArea className="pr-3 flex-1 ">
              <ul className="flex flex-col   gap-4 ">
                {isLoading && <PostCommentsSkeleton />}
                {!isLoading &&
                  comments?.map((comment) => (
                    <CommentsCard
                      key={comment.id}
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
              id= {photo?.id ?? ''}
                type="photo"
                icon='heart'
                color='red'
                photoId={photo?.id}
                likeCount={photo?.likes.length ?? 0}
                likedByUser={photo?.likedByUser ?? false}
              />
              <Button className="rounded-full" variant={'ghost'} size={'icon'}>
                <MessageCircle />
              </Button>
            </div>
            {/* <FavoritePostIcon
              postId={post?.id ?? ''}
              isFavoritePost={post?.isFavoritePost ?? false}
            /> */}
          </div>
          <div>
            <CommentsForm photoId={photo?.id} />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};
