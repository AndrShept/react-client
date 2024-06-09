import { useAuth } from '@/hooks/useAuth';
import { Comment } from '@/lib/types';
import { cn, dateFnsLessTime } from '@/lib/utils';
import { useState } from 'react';

import { UserAvatar } from '../UserAvatar';
import { EditForm } from '../forms/EditForm';
import { ReplyForm } from '../forms/ReplyForm';
import { LikeIcon } from '../icons/LikeIcon';
import { CommentDeleteIcon } from './CommentDeleteIcon';
import { CommentEditIcon } from './CommentEditIcon';
import { CommentReplyButton } from './CommentReplyButton';

interface CommentsListProps {
  comment: Comment;
  avatarClassname?: string;
  cardSize?: 'fit' | 'full';
  textSize?: 'base' | 'sm' | 'xs';
  classname?: string;
}

export const CommentsCard = ({
  comment,
  avatarClassname,
  cardSize = 'fit',
  textSize = 'sm',
  classname,
}: CommentsListProps) => {
  const { userId } = useAuth();
  console.log(comment);
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [commentContent, setCommentContent] = useState({
    content: comment.content,
    username: comment.author.username,
  });
  const isOwner = comment.post?.authorId === comment.authorId;
  const isAuthor = userId === comment.authorId;
  const isCommentLikeExist = comment.likes.some(
    (like) => like.userId === userId,
  );
  return (
    <section>
      <article
        className={cn(
          ' md:pt-4 pt-3     bg-secondary/60 rounded-xl flex flex-col',
          {
            ' w-fit': cardSize === 'fit',
            ' w-full': cardSize === 'full',
          },
          classname,
        )}
      >
        <section className="flex items-center gap-2 md:px-4 px-3 ">
          <UserAvatar
            className={avatarClassname}
            isOnline={comment.author.isOnline}
            avatarUrl={comment.author.avatarUrl}
            username={comment.author.username}
          />
          <div className="flex flex-col">
            <p
              className={cn('text-sm', {
                'text-yellow-500 font-semibold': isOwner,
              })}
            >
              {comment.author.username}
            </p>
            <time className="text-xs text-muted-foreground">
              {dateFnsLessTime(comment.createdAt)}
            </time>
          </div>
        </section>
        {!isEdit && (
          <p
            className={cn('mt-2 break-word p-1  text-[15px] md:px-4 px-3 ', {
              'break-all': !comment.content.includes(' '),
              'text-base': textSize === 'base',
              'text-sm': textSize === 'sm',
              'text-xs': textSize === 'xs',
            })}
          >
            {comment.content}
          </p>
        )}
        {isEdit && (
          <div className="md:px-3 px-2  ">
            <EditForm
              content={`${commentContent.username} ${comment.content}`}
              commentId={comment.id}
              id={comment.postId ?? comment.parentId ?? ''}
              setIsEdit={setIsEdit}
            />
          </div>
        )}
        <section className="flex justify-between items-center mt-4 border-t md:px-3 px-2 ">
          <div className="flex items-center">
            <LikeIcon
              id={comment.id}
              likeCount={comment.likes.length}
              likedByUser={isCommentLikeExist}
              type="comment"
              postId={comment.postId ?? comment.parentId}
              classname="scale-75 focus:scale-80"
            />
            {!isReply && (
              <CommentReplyButton
                setIsReply={() => {
                  setIsReply(true);
                  setTimeout(
                    () => window.scrollBy({ behavior: 'smooth', top: 200 }),
                    100,
                  );
                }}
              />
            )}
          </div>

          {isAuthor && (
            <div className="flex items-center text-muted-foreground gap-x-[2px] ">
              <CommentEditIcon setIsEdit={setIsEdit} />
              <CommentDeleteIcon
                id={comment.postId ?? comment.parentId ?? ''}
                commentId={comment.id}
              />
            </div>
          )}
        </section>
      </article>
      {isReply && (
        <ReplyForm
          commentId={comment.id}
          id={comment.postId ?? comment.parentId ?? ''}
          authorUsername={comment.author.username}
          commentContent={commentContent}
          setIsReply={() => setIsReply(false)}
        />
      )}

      {!!comment.replys?.length && (
        <ul className="flex pl-6  ">
          <div className="w-5 border-b h-10 border-l rounded-bl-xl "></div>
          <div className="mt-4 flex flex-col gap-2 ">
            {comment.replys.map((reply) => (
              <CommentsCard
                classname="border bg-transparent"
                key={reply.id}
                comment={reply}
              />
            ))}
          </div>
        </ul>
      )}
    </section>
  );
};
