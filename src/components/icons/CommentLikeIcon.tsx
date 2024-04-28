import { useLazyGetCommentsQuery } from '@/lib/services/commentApi';
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
  const [refetchComments] = useLazyGetCommentsQuery();

  const handleCommentLike = async () => {
    try {
      await addCommentLike(commentId).unwrap();
      await refetchComments(postId);
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <section className="flex  items-center">
      <Button
        disabled={isLoading}
        onClick={handleCommentLike}
        variant={isCommentLikeExist ? 'indigo' : 'ghost'}
        size={'icon'}
        className={cn(
          'size-[26px] rounded-full focus:scale-110 transition-all',
          {},
        )}
      >
        <ThumbsUpIcon
          className={cn('size-[18px] ', {
            '': isCommentLikeExist,
          })}
        />
      </Button>
      {!!likeCount && (
        <p className="text-muted-foreground text-xs ml-[2px]">{likeCount}</p>
      )}
    </section>
  );
};
