import { useGetConversationByIdQuery } from '@/lib/services/conversationApi';
import { useParams } from 'react-router-dom';

import { MessageCard } from '../MessageCard';
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
              <MessageCard message={message} />
            ))}
        </ul>
      </ScrollArea>

      <div className="h-[150px] bg-secondary/40 md:p-4 p-3 border flex flex-col gap-2 ">
        <Textarea className=" resize-none" />
        <Button variant={'indigo'} size={'sm'} className="w-fit ml-auto">
          Send
        </Button>
      </div>
    </section>
  );
};
