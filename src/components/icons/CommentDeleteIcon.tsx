import { useDeleteCommentMutation } from '@/lib/services/commentApi';
import {
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
} from '@/lib/services/postApi';
import { Trash2Icon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '../ui/button';

interface CommentDeleteIconProps {
  commentId: string;
  postId: string;
}

export const CommentDeleteIcon = ({
  commentId,
  postId,
}: CommentDeleteIconProps) => {
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [refetchPostById] = useLazyGetPostByIdQuery();
  const handleDelete = async () => {
    try {
      await deleteComment(commentId).unwrap();
      await refetchPostById(postId).unwrap();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Button
      onClick={handleDelete}
      disabled={isLoading}
      variant={'ghost'}
      size={'icon'}
      className="size-[26px]"
    >
      <Trash2Icon className="size-[18px]" />
    </Button>
  );
};
