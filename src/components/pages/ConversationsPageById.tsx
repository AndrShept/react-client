import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useSocket } from '@/hooks/useSocket';
import { addConversationState } from '@/lib/redux/conversationSlice';
import { useGetConversationByIdQuery } from '@/lib/services/conversationApi';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { MessageCard } from '../MessageCard';
import { MessageInput } from '../MessageInput';
import { ScrollArea } from '../ui/scroll-area';

export const ConversationsPageById = () => {
  const { conversationId } = useParams();
  const conversationState = useAppSelector(
    (state) => state.conversation.conversation,
  );

  if (!conversationId) {
    throw new Error('conversationId not found');
  }
  const { isLoading, isError } = useGetConversationByIdQuery(conversationId);

  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    ref.current?.lastElementChild?.scrollIntoView({ behavior: 'instant' });
  }, [conversationState?.messages]);

  useEffect(() => {
    const socketListener = (data: any) => {
      dispatch(addConversationState(data));
    };

    socket?.on(conversationId, socketListener);

    return () => {
      socket?.off(conversationId, socketListener);
    };
  }, [conversationId, socket]);

  if (isLoading) {
    return <p>LOADING</p>;
  }
  if (!conversationState) {
    return <p>Conversations not found</p>;
  }

  return (
    <section className="flex flex-col h-full justify-between ">
      {!conversationState.messages.length && !isLoading && (
        <p className="text-muted-foreground text-sm m-auto ">
          messages not found
        </p>
      )}
      {!isLoading && !isError && !!conversationState.messages.length && (
        <ScrollArea className="pr-1  ">
          <ul
            ref={ref}
            className="flex flex-col flex-1   justify-end gap-4 p-4  "
          >
            {conversationState.messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </ul>
        </ScrollArea>
      )}

      <div className="h-[150px] bg-secondary/40 md:p-4 p-3 border flex flex-col gap-2 ">
        <MessageInput conversationId={conversationId} />
      </div>
    </section>
  );
};
