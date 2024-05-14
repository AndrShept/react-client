import { useAppSelector } from '@/hooks/store';
import { useGetAllConversationQuery } from '@/lib/services/conversationApi';

import { ConversationCard } from './ConversationCard';
import { Search } from './Search';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

export const ConversationList = () => {
  const { isLoading } = useGetAllConversationQuery();

  const conversations = useAppSelector(
    (state) => state.conversation.allConversations,
  );

  if (isLoading) {
    return <div>LAODING....</div>;
  }
  return (
    <div className="flex flex-col gap-3 xl:max-w-[300px] max-w-[250px] bg-secondary/40 ">
      <div className="flex flex-col gap-4 md:p-5 p-3  ">
        <p>Messages</p>
        <Search placeholder="search" />
      </div>
      <Separator />
      <ScrollArea className="pr-2">
        <ul className="flex flex-col gap-2  overflow-auto md:pl-5 md:pr-3 pl-3 pr-1">
          {!conversations.length && (
            <h1 className="text-muted-foreground m-auto mt-8 text-sm">
              Conversations not found
            </h1>
          )}
          {isLoading && <p>LOADING</p>}
          {!isLoading &&
            conversations.map((conversation) => (
              <ConversationCard
                notReadMessageCount={conversation.newMessagesCount}
                key={conversation.id}
                conversation={conversation}
              />
            ))}
        </ul>
      </ScrollArea>
    </div>
  );
};
