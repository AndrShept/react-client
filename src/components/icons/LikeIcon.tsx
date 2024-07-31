import { useLazyGetCommentsQuery } from '@/lib/services/commentApi';
import { useAddLikeMutation } from '@/lib/services/likeApi';
import { useLazyGetPhotosByUsernameQuery } from '@/lib/services/photoApi';
import {
  useLazyGetAllPostsQuery,
  useLazyGetFavoritePostsQuery,
  useLazyGetPostByIdQuery,
} from '@/lib/services/postApi';
import { LikeType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { HeartIcon, ThumbsUpIcon, icons } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import { useAppSelector } from '@/hooks/store';

interface LikeIconProps {
  id: string;
  likedByUser: boolean;
  likeCount: number;
  username?: string;
  icon?: 'hand' | 'heart';
  color?: 'default' | 'red';
  type: LikeType;
  postId?: string;
  photoId?: string;
  classname?: string;
}

export const LikeIcon = ({
  id,
  likedByUser,
  likeCount,
  type,
  postId,
  photoId,
  classname,
  username,
  icon = 'hand',
  color = 'default',
}: LikeIconProps) => {
  const [addLike, { isLoading }] = useAddLikeMutation();
  const [refetchPosts] = useLazyGetAllPostsQuery();
  const [refetchPostsById] = useLazyGetPostByIdQuery();
  const [refetchComments] = useLazyGetCommentsQuery();
  const [refetchFavoritePosts] = useLazyGetFavoritePostsQuery();
  const [refetchPhotosByUsername] = useLazyGetPhotosByUsernameQuery();
  const page = useAppSelector(state=> state.photo.page)

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    try {
      await addLike({ id, type }).unwrap();
      if (type === 'post') {
        await refetchPosts().unwrap();
        await refetchPostsById(id).unwrap();
        await refetchFavoritePosts().unwrap();
      }
      if (type === 'comment' && postId) {
        await refetchComments(postId).unwrap();
      }
      if (type === 'photo' && username) {
        await refetchPhotosByUsername({username,page}).unwrap();
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <section className="flex items-center">
      <Button
        disabled={isLoading}
        onClick={handleLike}
        className={cn(
          'size-9 rounded-full focus:scale-110 transition-all ',
          classname,
          {
            'bg-gradient-to-t from-red-800 via-red-500 to-red-400 hover:from-red-800/60 hover:via-red-500/60 hover:to-red-400/60  ': color === 'red' && likedByUser,
            ' hover:bg-red-500/70': color === 'red' && !likedByUser,
          },
        )}
        variant={likedByUser ? 'indigo' : 'ghost'}
        size={'icon'}
      >
        {icon === 'hand' ? (
          <ThumbsUpIcon
            className={cn('size-5 text-700', {
              ' text-primary transition-all': likedByUser,
            })}
          />
        ) : (
          <HeartIcon
            className={cn('size-5 text-700', {
              ' text-primary transition-all': likedByUser,
            })}
          />
        )}
      </Button>
      {!!likeCount && (
        <p
          className={cn('text-xs  ml-2', {
            ' text-indigo-500': likedByUser && color === 'default',
            '  ml-[1px]': type === 'comment',
          })}
        >
          {likeCount}
        </p>
      )}
    </section>
  );
};
