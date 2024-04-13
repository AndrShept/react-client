import { Comment } from '@/lib/types';
import { cn, dateFns } from '@/lib/utils';

import { UserAvatar } from './UserAvatar';

interface CommentsListProps {
  comment: Comment;
}

export const CommentsList = ({ comment }: CommentsListProps) => {
  return (
    <li className=" md:p-4 p-2 w-fit  bg-secondary/40 rounded-lg">
      <div className="flex items-center gap-2">
        <UserAvatar
          avatarImg={comment.user.avatarUrl}
          username={comment.user.username}
        />
        <div className="flex flex-col">
          <p className="text-sm">{comment.user.username}</p>
          <time className="text-xs text-muted-foreground">
            {dateFns(comment.createdAt)}
          </time>
        </div>
      </div>
      <p
        className={cn('mt-2 break-word  text-[15px] ', {
          'break-all': !comment.content.includes(' '),
        })}
      >
        {comment.content}
      </p>
    </li>
  );
};
