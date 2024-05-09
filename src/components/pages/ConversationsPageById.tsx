import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';
import { useSocket } from '@/hooks/useSocket';
import { addConversationState } from '@/lib/redux/conversationSlice';
import {
  useGetConversationByIdQuery,
  useIsReadMessagesMutation,
  useLazyGetAllConversationQuery,
} from '@/lib/services/conversationApi';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { MessageCard } from '../MessageCard';
import { MessageInput } from '../MessageInput';
import { Spinner } from '../Spinner';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Message } from '@/lib/types';

export const ConversationsPageById = () => {
  const { userId } = useAuth();
  const { conversationId } = useParams();
  const conversationState = useAppSelector(
    (state) => state.conversation.conversation,
  );

  if (!conversationId) {
    throw new Error('conversationId not found');
  }
  const [isReadMessages] = useIsReadMessagesMutation();

  const { isLoading, isError } = useGetConversationByIdQuery(conversationId);
  const [refetchAllConversations] = useLazyGetAllConversationQuery();
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    ref.current?.lastElementChild?.scrollIntoView({ behavior: 'instant' });
  }, [conversationState?.messages]);
  useEffect(() => {
    isReadMessages(conversationId);
    refetchAllConversations();

  }, [conversationId]);

  useEffect(() => {
    const socketListener = (data: Message) => {
      dispatch(addConversationState(data));
    };

    socket?.on(conversationId, socketListener);

    return () => {
      socket?.off(conversationId, socketListener);
    };
  }, [conversationId, socket]);

  if (isLoading) {
    return <Spinner />;
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
        <Button onClick={() => isReadMessages(conversationId)}>asdsa</Button>
      </div>
    </section>
  );
};
