import { useAuth } from '@/hooks/useAuth';
import { useLazyGetConversationByIdQuery } from '@/lib/services/conversationApi';
import { useAddMessageMutation } from '@/lib/services/messageApi';
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
  const [content, setContent] = useState('');

  const onCreate = async () => {
    if (!conversationId) {
      console.log('SEND MESSAGE ERROR CONVERSATION ID NOT FOUND');
      toast.error('Something went wrong conversationId');
    }
    try {
      if (content.trimStart()) {
        await createMessage({
          conversationId,
          content,
          authorId: userId!,
        }).unwrap();
        await refetchConversation(conversationId);
        setContent('');
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
          className=" resize-none"
        />
      </form>
      <Button
        disabled={isLoading || !content.trimStart()}
        onClick={onCreate}
        variant={'indigo'}
        size={'sm'}
        className="w-fit ml-auto"
      >
        Send
      </Button>
    </>
  );
};
