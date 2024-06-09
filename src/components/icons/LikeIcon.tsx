import { useLazyGetCommentsQuery } from '@/lib/services/commentApi';
import { useAddLikeMutation } from '@/lib/services/likeApi';
import {
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '@/lib/services/postApi';
import { LikeType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { HeartIcon, ThumbsUpIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';

interface LikeIconProps {
  id: string;
  likedByUser: boolean;
  likeCount: number;
  type: LikeType;
  postId?: string;
  classname?: string;
}

export const LikeIcon = ({
  id,
  likedByUser,
  likeCount,
  type,
  postId,
  classname,
}: LikeIconProps) => {
  const [addLike, { isLoading }] = useAddLikeMutation();
  const [refetchPosts] = useLazyGetAllPostsQuery();
  const [refetchPostsById] = useLazyGetPostByIdQuery();
  const [refetchComments] = useLazyGetCommentsQuery();

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    try {
      await addLike({ id, type }).unwrap();
      if (type === 'post') {
        await refetchPosts().unwrap();
        await refetchPostsById(id).unwrap();
      }
      if (type === 'comment' && postId) {
        await refetchComments(postId).unwrap();
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
        )}
        variant={likedByUser ? 'indigo' : 'ghost'}
        size={'icon'}
      >
        <ThumbsUpIcon
          className={cn('size-5 text-700', {
            ' text-primary transition-all': likedByUser,
          })}
        />
      </Button>
      {!!likeCount && (
        <p
          className={cn('text-xs  ml-2', {
            ' text-indigo-500': likedByUser,
            '  ml-[1px]': type === 'comment',
          })}
        >
          {likeCount}
        </p>
      )}
    </section>
  );
};
