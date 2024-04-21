import { useAuth } from '@/hooks/useAuth';
import { Comment } from '@/lib/types';
import { cn, dateFns, dateFnsLessTime } from '@/lib/utils';
import { useState } from 'react';

import { UserAvatar } from './UserAvatar';
import { EditForm } from './forms/EditForm';
import { CommentDeleteIcon } from './icons/CommentDeleteIcon';
import { CommentEditIcon } from './icons/CommentEditIcon';
import { CommentLikeIcon } from './icons/CommentLikeIcon';
import { Button } from './ui/button';

interface CommentsListProps {
  comment: Comment;
}

export const CommentsList = ({ comment }: CommentsListProps) => {
  const { userId } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const isOwner = comment.post.authorId === comment.userId;
  const isAuthor = userId === comment.userId;
  const isCommentLikeExist = comment.likes.some(
    (like) => like.userId === userId,
  );
  return (
    <li className=" md:pt-4 pt-3   w-fit  bg-secondary/40 rounded-xl">
      <section className="flex items-center gap-2 md:px-4 px-3">
        <UserAvatar
          avatarUrl={comment.user.avatarUrl}
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
            {dateFnsLessTime(comment.createdAt)}
          </time>
        </div>
      </section>
      {!isEdit && (
        <p
          className={cn('mt-2 break-word  p-1  text-[15px] md:px-4 px-3 ', {
            'break-all': !comment.content.includes(' '),
          })}
        >
          {comment.content}
        </p>
      )}
      {isEdit && (
        <div className="md:px-3 px-2  ">
          <EditForm
            content={comment.content}
            commentId={comment.id}
            postId={comment.postId}
            setIsEdit={setIsEdit}
          />
        </div>
      )}
      <section className="flex justify-between items-center mt-4 border-t md:px-3 px-2 ">
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
            <CommentEditIcon setIsEdit={setIsEdit} />
            <CommentDeleteIcon postId={comment.postId} commentId={comment.id} />
          </div>
        )}
      </section>
    </li>
  );
};
