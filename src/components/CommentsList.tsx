import { useAuth } from '@/hooks/useAuth';
import { Comment } from '@/lib/types';
import { cn, dateFns } from '@/lib/utils';

import { UserAvatar } from './UserAvatar';
import { CommentDeleteIcon } from './icons/CommentDeleteIcon';
import { CommentEditIcon } from './icons/CommentEditIcon';
import { CommentLikeIcon } from './icons/CommentLikeIcon';
import { Button } from './ui/button';

interface CommentsListProps {
  comment: Comment;
}

export const CommentsList = ({ comment }: CommentsListProps) => {
  console.log(comment);
  const { userId } = useAuth();
  const isOwner = comment.post.authorId === comment.userId;
  const isAuthor = userId === comment.userId;
  const isCommentLikeExist = comment.likes.some(
    (like) => like.userId === userId,
  );
  return (
    <li className=" md:pt-4 pt-3   w-fit  bg-secondary/40 rounded-xl">
      <section className="flex items-center gap-2 md:px-4 px-3">
        <UserAvatar
          avatarImg={comment.user.avatarUrl}
          username={comment.user.username}
        />
        <div className="flex flex-col">
          <p
            className={cn('text-sm', {
              'text-yellow-500 font-semibold': isOwner,
            })}
          >
            {comment.user.username}
          </p>
          <time className="text-xs text-muted-foreground">
            {dateFns(comment.createdAt)}
          </time>
        </div>
      </section>
      <p
        className={cn('mt-2 break-word  p-1  text-[15px] md:px-4 px-3 ', {
          'break-all': !comment.content.includes(' '),
        })}
      >
        {comment.content}
      </p>
      <section className="flex justify-between items-center mt-4 border-t md:px-4 px-3 py-1">
        <div className="flex items-center">
          <CommentLikeIcon
            likeCount={comment.likes.length}
            isCommentLikeExist={isCommentLikeExist}
            commentId={comment.id}
            postId={comment.postId}
          />
          <Button
            size={'sm'}
            className="ml-1  px-2 rounded-full text-muted-foreground text-xs"
            variant={'ghost'}
          >
            Reply
          </Button>
        </div>

        {isAuthor && (
          <div className="flex items-center text-muted-foreground gap-x-[2px] ">
            <CommentEditIcon />
            <CommentDeleteIcon postId={comment.postId} commentId={comment.id} />
          </div>
        )}
      </section>
    </li>
  );
};
