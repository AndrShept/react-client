import { useAuth } from '@/hooks/useAuth';
import { Conversation } from '@/lib/types';
import { cn, dateFnsLessTime } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

import { NotReadCountBadge } from './NotReadCountBadge';
import { UserAvatar } from './UserAvatar';

interface ConversationListProps {
  conversation: Conversation;
  notReadMessageCount: number;
}

export const ConversationCard = ({
  conversation,
  notReadMessageCount,
}: ConversationListProps) => {
  const { pathname } = useLocation();
  const { userId } = useAuth();
  const messagesLastElement =
    conversation.messages[conversation.messages.length - 1];
  const conversationPartner =
    userId === conversation.receiverId
      ? conversation.senderUser
      : conversation.receiverUser;
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
            isLink={false}
            avatarUrl={conversationPartner.avatarUrl}
            username={conversationPartner.username}
            isOnline={conversationPartner.isOnline}
            isBadge={true}
          />
          <div className="space-y-[1px] flex flex-col">
            <p>{conversationPartner.username}</p>
            <time className="text-muted-foreground text-xs break-all line-clamp-1">
              {conversationPartner.isOnline
                ? 'online'
                : dateFnsLessTime(conversationPartner.updatedAt)}
            </time>
          </div>
          {!!notReadMessageCount && (
            <NotReadCountBadge notReadMessageCount={notReadMessageCount} />
          )}
        </div>
        <p className="text-wrap line-clamp-2 break-all text-muted-foreground mt-1">
          {!!conversation.messages.length && messagesLastElement.content}
        </p>
      </li>
    </Link>
  );
};
