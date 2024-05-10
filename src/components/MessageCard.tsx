import { useAuth } from '@/hooks/useAuth';
import { Message } from '@/lib/types';
import { cn, dateFnsLessTime } from '@/lib/utils';
import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { UserAvatar } from './UserAvatar';
import { EditMessageForm } from './forms/EditMessageForm';
import { CommentEditIcon } from './icons/CommentEditIcon';
import { MessageDeleteIcon } from './icons/MessageDeleteIcon';

interface MessageCardProps {
  message: Message;
}

export const MessageCard = ({ message }: MessageCardProps) => {
  const { userId } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const isSelf = userId !== message.authorId;
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isEditedMessage = message.createdAt !== message.updatedAt;

  return (
    <article
      className={cn('flex  items-start gap-2 max-w-[80%] group ', {
        'ml-auto flex-row-reverse  ': !isSelf,
        'break-all': !message.content.includes(' '),
      })}
    >
      <UserAvatar
        className="size-9"
        isOnline={message.author.isOnline}
        avatarUrl={message.author.avatarUrl}
        username={message.author.username}
      />

      <div className="flex flex-col">
        <div className="flex items-center">
          <p>{isSelf && message.author.username}</p>
          <time
            className={cn('text-muted-foreground text-xs flex gap-x-1  ', {
              'ml-2  ': isSelf,
              'ml-auto  ': !isSelf,
            })}
          >
            {isEditedMessage && <p>(edited)</p>}
            {isEditedMessage
              ? dateFnsLessTime(message.updatedAt)
              : dateFnsLessTime(message.createdAt)}
          </time>
        </div>

        {!isEdit && (
          <p
            className={cn(
              'bg-secondary/70 p-3 text-wrap   text-sm   ',
              {
                ' bg-indigo-700 rounded-l-2xl rounded-br-2xl ': !isSelf,
              },
              {
                'rounded-r-2xl rounded-bl-2xl   ': isSelf,
              },
            )}
          >
            {message.content}
          </p>
        )}
        {isEdit && (
          <EditMessageForm
            conversationId={message.conversationId}
            content={message.content}
            messageId={message.id}
            setIsEdit={setIsEdit}
          />
        )}

        {!isEdit && !isSelf && (
          <div
            className={cn(
              'space-x-1 mt-1 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100',
              {
                'opacity-100': isMobile,
              },
            )}
          >
            <CommentEditIcon setIsEdit={setIsEdit} />
            <MessageDeleteIcon messageId={message.id} />
          </div>
        )}
      </div>
    </article>
  );
};
