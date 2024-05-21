import {
  useDeleteCommentMutation,
  useLazyGetCommentsQuery,
} from '@/lib/services/commentApi';
import {
  useDeleteReplyMutation,
  useLazyGetReplysQuery,
} from '@/lib/services/replyApi';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';

interface CommentDeleteIconProps {
  commentId: string;
  postId?: string | undefined;
}

export const CommentDeleteIcon = ({
  commentId,
  postId,
}: CommentDeleteIconProps) => {
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [refetchComments] = useLazyGetCommentsQuery();
  const [deleteReply, { isLoading: isLoadingDeleteReply }] =
    useDeleteReplyMutation();
  const [refetchReply] = useLazyGetReplysQuery();
  const handleDelete = async () => {
    try {
      if (postId && commentId) {
        await deleteComment(commentId).unwrap();
        await refetchComments(postId).unwrap();
      }
      if (commentId && !postId) {
        const res = await deleteReply(commentId).unwrap();
        await refetchReply(res.commentId).unwrap();
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Button
      onClick={handleDelete}
      disabled={isLoading || isLoadingDeleteReply}
      variant={'ghost'}
      size={'icon'}
      className="size-[26px]"
    >
      <Trash2Icon className="size-[18px]" />
    </Button>
  );
};
