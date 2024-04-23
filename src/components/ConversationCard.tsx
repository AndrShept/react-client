import { Conversation } from '@/lib/types';
import { cn, dateFnsLessTime } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

import { UserAvatar } from './UserAvatar';

interface ConversationListProps {
  conversation: Conversation;
}

export const ConversationCard = ({ conversation }: ConversationListProps) => {
  const { pathname } = useLocation();
  console.log(conversation);
  return (
    <Link to={`/conversations/${conversation.id}`}>
      <li
        className={cn(
          'p-4 rounded-xl flex flex-col justify-center gap-2 text-sm border hover:bg-secondary/60 cursor-pointer transition ',
          {
            'bg-secondary hover:bg-secondary text-primary':
              pathname === `/conversations/${conversation.id}`,
          },
        )}
      >
        <div className="flex items-center gap-2">
          <UserAvatar
          className='size-9'
            link={false}
            avatarUrl={conversation.receiverUser.avatarUrl}
            username={conversation.receiverUser.username}
            isOnline={conversation.receiverUser.isOnline}
            badge={true}
          />
          <div className="space-y-[1px] flex flex-col">
            <p>{conversation.receiverUser.username}</p>
            <time className="text-muted-foreground text-xs">
              {dateFnsLessTime(conversation.createdAt)}
            </time>
          </div>
        </div>
        <p className="text-wrap line-clamp-2 break-all">
          {!!conversation.messages.length &&
            conversation.messages[conversation.messages.length - 1].content}
        </p>
      </li>
    </Link>
  );
};
