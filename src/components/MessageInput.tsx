import { useAuth } from '@/hooks/useAuth';
import { useSocket } from '@/hooks/useSocket';
import {
  useLazyGetAllConversationQuery,
  useLazyGetConversationByIdQuery,
} from '@/lib/services/conversationApi';
import { useAddMessageMutation } from '@/lib/services/messageApi';
import { SendHorizontalIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface MessageInputProps {
  conversationId: string;
}

export const MessageInput = ({ conversationId }: MessageInputProps) => {
  const { userId } = useAuth();
  const [createMessage, { isLoading }] = useAddMessageMutation();
  const [refetchConversation] = useLazyGetConversationByIdQuery();
  const [refetchAllConversations] = useLazyGetAllConversationQuery();
  const [content, setContent] = useState('');
  const {  sendMessage } = useSocket();

  const onCreate = async () => {
    if (!conversationId) {
      console.log('SEND MESSAGE ERROR CONVERSATION ID NOT FOUND');
      toast.error('Something went wrong conversationId');
    }
    try {
      if (content.trimStart()) {
       const res =  await createMessage({
          conversationId,
          content,
          authorId: userId!,
        }).unwrap();
        // await refetchConversation(conversationId).unwrap();
        await refetchAllConversations().unwrap();
        setContent('');
        sendMessage(res);
        toast.success(`Send new message `);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  return (
    <>
      <form>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className=" resize-none bg-secondary/20"
        />
      </form>
      <Button
        disabled={isLoading || !content.trimStart()}
        onClick={onCreate}
        variant={'indigo'}
        size={'sm'}
        className="w-fit ml-auto mt-2 gap-1"
      >
        Send
        <SendHorizontalIcon className="size-5" />
      </Button>
    </>
  );
};
