import { useGetConversationByIdQuery } from '@/lib/services/conversationApi';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { MessageCard } from '../MessageCard';
import { MessageInput } from '../MessageInput';
import { ScrollArea } from '../ui/scroll-area';

export const ConversationsPageById = () => {
  const { conversationId } = useParams();
  if (!conversationId) {
    throw new Error('conversationId not found');
  }
  const ref = useRef<HTMLUListElement | null>(null);
  const {
    data: conversation,
    isLoading,
    isError,
  } = useGetConversationByIdQuery(conversationId);
  console.log(conversation);
  useEffect(() => {
    ref.current?.lastElementChild?.scrollIntoView({ behavior: 'instant' });
  }, [conversation?.messages]);

  return (
    <section className="flex flex-col h-full justify-between ">
      <ScrollArea className="pr-1">
        {!conversation?.messages.length && !isLoading && (
          <p className="text-muted-foreground text-sm mt-6 text-center">
            messages not found
          </p>
        )}
        <ul ref={ref} className="flex flex-col justify-end gap-4 p-4  ">
          {isLoading && <p>LOADING</p>}

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
