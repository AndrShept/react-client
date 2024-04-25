import { useAuth } from '@/hooks/useAuth';
import { Conversation } from '@/lib/types';
import { cn, dateFnsLessTime } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

import { UserAvatar } from './UserAvatar';

interface ConversationListProps {
  conversation: Conversation;
}

export const ConversationCard = ({ conversation }: ConversationListProps) => {
  const { pathname } = useLocation();
  const { userId } = useAuth();
  const isConversationPartner =
    userId === conversation.receiverId 
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
            className="size-9"
            link={false}
            avatarUrl={
              !isConversationPartner
                ? conversation.receiverUser.avatarUrl
                : conversation.senderUser.avatarUrl
            }
            username={
              !isConversationPartner
                ? conversation.receiverUser.username
                : conversation.senderUser.username
            }
            isOnline={
              !isConversationPartner
                ? conversation.receiverUser.isOnline
                : conversation.senderUser.isOnline
            }
            badge={true}
          />
          <div className="space-y-[1px] flex flex-col">
            <p>
              {!isConversationPartner
                ? conversation.receiverUser.username
                : conversation.senderUser.username}
            </p>
            <time className="text-muted-foreground text-xs">
              {dateFnsLessTime(conversation.createdAt)}
            </time>
          </div>
        </div>
        <p className="text-wrap line-clamp-2 break-all text-muted-foreground mt-1">
          {!!conversation.messages.length &&
            conversation.messages[conversation.messages.length - 1].content}
        </p>
      </li>
    </Link>
  );
};
