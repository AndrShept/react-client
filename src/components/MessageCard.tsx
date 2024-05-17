import { useAppDispatch } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';
import { BASE_URL } from '@/lib/constants';
import { decrementNotReadCount } from '@/lib/redux/conversationSlice';
import { useIsReadOnceMessageMutation } from '@/lib/services/messageApi';
import { Message } from '@/lib/types';
import { cn, dateFnsLessTime } from '@/lib/utils';
import { CheckCheckIcon, CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { UserAvatar } from './UserAvatar';
import { EditMessageForm } from './forms/EditMessageForm';
import { CommentEditIcon } from './icons/CommentEditIcon';
import { MessageDeleteIcon } from './icons/MessageDeleteIcon';
import { useSocket } from './providers/SocketProvider';

interface MessageCardProps {
  message: Message;
}

export const MessageCard = ({ message }: MessageCardProps) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 1,
    triggerOnce: true,
  });
  const { userId } = useAuth();
  const { sendMessage } = useSocket();
  const dispatch = useAppDispatch();
  const [onReadMessage] = useIsReadOnceMessageMutation();
  const [isEdit, setIsEdit] = useState(false);
  const isSelf = userId !== message.authorId;
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isEditedMessage = message.createdAt !== message.updatedAt;

  const isReadOnceMessage = async () => {
    try {
      dispatch(
        decrementNotReadCount({ conversationId: message.conversationId }),
      );
      const updatedMessage = await onReadMessage(message.id).unwrap();
      sendMessage(updatedMessage);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (inView && !message.isRead && isSelf) {
      isReadOnceMessage();
    }
  }, [inView]);

  return (
    <article
      ref={ref}
      className={cn('flex  items-start gap-2 max-w-[80%] group ', {
        'ml-auto flex-row-reverse  ': !isSelf,
        'break-all': !message.content.includes(' '),
      })}
    >
      {isSelf && (
        <UserAvatar
          className="size-9"
          isOnline={message.author.isOnline}
          avatarUrl={message.author.avatarUrl}
          username={message.author.username}
        />
      )}

      <div className="flex flex-col">
        {!isEdit && (
          <div className="flex items-center ">
            <p>{isSelf && message.author.username}</p>
            <div className="flex ml-auto">
              <time
                className={cn(
                  'text-muted-foreground text-xs flex gap-x-1 mr-2   ',
                  {
                    'ml-2  ': isSelf,
                    'ml-auto  ': !isSelf,
                  },
                )}
              >
                {isEditedMessage && <p>(edited)</p>}
                {isEditedMessage
                  ? dateFnsLessTime(message.updatedAt)
                  : dateFnsLessTime(message.createdAt)}
              </time>
              {!isSelf && !message.isRead && (
                <CheckIcon className="size-4 ml-auto" />
              )}
              {!isSelf && message.isRead && (
                <CheckCheckIcon className="size-4 text-indigo-500 ml-auto" />
              )}
            </div>
          </div>
        )}
        {message.imageUrl && (
          <div className="mb-2 max-w-md">
            <Link
              target="_blank"
              className=""
              to={`${BASE_URL}${message.imageUrl}`}
            >
              <img
                loading="lazy"
                className="rounded-lg border"
                src={`${BASE_URL}${message.imageUrl}`}
                alt="imageUrl"
              />
            </Link>
          </div>
        )}
        {!isEdit && message.content && (
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
            onCancel={() => setIsEdit(false)}
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
