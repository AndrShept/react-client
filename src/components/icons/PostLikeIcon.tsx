import { useLikePostMutation } from '@/lib/services/likeApi';
import {
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '@/lib/services/postApi';
import { cn } from '@/lib/utils';
import { HeartIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';

interface LikeIconProps {
  postId: string;
  likedByUser: boolean;
  likeCount: number;
}

export const PostLikeIcon = ({
  postId,
  likedByUser,
  likeCount,
}: LikeIconProps) => {
  const [likePost, { isLoading }] = useLikePostMutation();
  const [refetchPosts] = useLazyGetAllPostsQuery();
  const [refetchPostsById] = useLazyGetPostByIdQuery();

  const handleLike = async () => {
    try {
      await likePost(postId).unwrap();
      await refetchPosts().unwrap();
      await refetchPostsById(postId).unwrap();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <section className='flex items-center'>
      <Button
        disabled={isLoading}
        onClick={handleLike}
        className={cn('size-9', {})}
        variant={'ghost'}
        size={'icon'}
      >
        <HeartIcon
          className={cn('size-6', {
            'fill-red-500 stroke-none transition-all': likedByUser,
          })}
        />
      </Button>
      {!!likeCount && (
        <p className="text-sm text-muted-foreground ml-1">{likeCount}</p>
      )}
    </section>
  );
};
