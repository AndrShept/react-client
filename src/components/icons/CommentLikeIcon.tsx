import { useLikeCommentMutation } from '@/lib/services/likeApi';
import { useLazyGetPostByIdQuery } from '@/lib/services/postApi';
import { cn } from '@/lib/utils';
import { ThumbsUpIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '../ui/button';

interface CommentLikeIconProps {
  commentId: string;
  postId: string;
  isCommentLikeExist: boolean;
  likeCount: number;
}
export const CommentLikeIcon = ({
  commentId,
  postId,
  isCommentLikeExist,
  likeCount,
}: CommentLikeIconProps) => {
  const [addCommentLike, { isLoading }] = useLikeCommentMutation();
  const [refetchPostById] = useLazyGetPostByIdQuery();

  const handleCommentLike = async () => {
    try {
      await addCommentLike(commentId).unwrap();
      await refetchPostById(postId);
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <section className="flex  items-center">
      <Button
        disabled={isLoading}
        onClick={handleCommentLike}
        variant={'ghost'}
        size={'icon'}
        className="size-[26px]"
      >
        <ThumbsUpIcon
          className={cn('size-[18px] text-indigo-500', {
            'fill-indigo-500 stroke-none': isCommentLikeExist,
          })}
        />
      </Button>
      {!!likeCount && (
        <p className="text-muted-foreground text-xs ml-[2px]">{likeCount}</p>
      )}
    </section>
  );
};
