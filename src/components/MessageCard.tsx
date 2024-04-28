import { useAuth } from '@/hooks/useAuth';
import { Message } from '@/lib/types';
import { cn, dateFnsLessTime } from '@/lib/utils';

import { UserAvatar } from './UserAvatar';

interface MessageCardProps {
  message: Message;
}

export const MessageCard = ({ message }: MessageCardProps) => {
  const { userId } = useAuth();
  const isSelf = userId !== message.authorId;

  return (
    <article
      className={cn('flex items-start gap-2 max-w-[80%] ', {
        'ml-auto flex-row-reverse  ': !isSelf,
        'break-all': !message.content.includes(' '),
      })}
    >
      <UserAvatar
      className='size-9'
        isOnline={message.author.isOnline}
        avatarUrl={message.author.avatarUrl}
        username={message.author.username}
      />

      <div className="flex flex-col">
        <div className="flex items-center">
          <p>{isSelf && message.author.username}</p>
          <time
            className={cn('text-muted-foreground text-xs  ', {
              'ml-2  ': isSelf,
              'ml-auto  ': !isSelf,
            })}
          >
            {dateFnsLessTime(message.createdAt)}
          </time>
        </div>

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
      </div>
    </article>
  );
};
