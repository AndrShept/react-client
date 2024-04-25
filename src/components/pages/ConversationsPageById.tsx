import { useGetConversationByIdQuery } from '@/lib/services/conversationApi';
import { useParams } from 'react-router-dom';

import { MessageCard } from '../MessageCard';
import { MessageInput } from '../MessageInput';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';

export const ConversationsPageById = () => {
  const { conversationId } = useParams();
  if (!conversationId) {
    throw new Error('conversationId not found');
  }
  const {
    data: conversation,
    isLoading,
    isError,
  } = useGetConversationByIdQuery(conversationId);
  console.log(conversation);
  return (
    <section className="flex flex-col h-full justify-between ">
      <ScrollArea className="pr-1">
        <ul className="flex flex-col items-center ">
          {isLoading && <p>LOADING</p>}
          {!conversation?.messages.length && !isLoading && (
            <p className="text-muted-foreground text-sm mt-6">
              messages not found
            </p>
          )}
          {!isLoading &&
            !isError &&
            conversation?.messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
        </ul>
      </ScrollArea>

      <div className="h-[150px] bg-secondary/40 md:p-4 p-3 border flex flex-col gap-2 ">
        <MessageInput conversationId={conversationId} />
      </div>
    </section>
  );
};
