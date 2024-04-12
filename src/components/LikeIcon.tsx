import { useLikePostMutation } from '@/lib/services/likePostApi';
import { useLazyGetAllPostsQuery } from '@/lib/services/postApi';
import { cn } from '@/lib/utils';
import { HeartIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from './ui/button';

interface LikeIconProps {
  postId: string;
  likedByUser: boolean;
  likeCount: number;
}

export const LikeIcon = ({ postId, likedByUser, likeCount }: LikeIconProps) => {
  const [likePost, { isLoading }] = useLikePostMutation();
  const [refetchPosts] = useLazyGetAllPostsQuery();

  const handleLike = async () => {
    try {
      await likePost(postId).unwrap();
      await refetchPosts().unwrap();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Button
      disabled={isLoading}
      onClick={handleLike}
      className={cn('size-10', {})}
      variant={'ghost'}
      size={'icon'}
    >
      <HeartIcon
        className={cn('size-6', {
          'fill-red-500 stroke-none transition-all': likedByUser,
        })}
      />
      {!!likeCount && (
        <p className="text-sm text-muted-foreground ml-1">{likeCount}</p>
      )}
    </Button>
  );
};
