import { useAddConversationMutation } from '@/lib/services/conversationApi';
import { MessageCircleMoreIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { Button } from './ui/button';

interface ConversationButtonProps {
  receiverId: string;
}

export const ConversationButton = ({ receiverId }: ConversationButtonProps) => {
  const [createConversation, { isLoading }] = useAddConversationMutation();
  console.log(receiverId);
  const onCreate = async () => {
    try {
      const res = await createConversation({ receiverId }).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Button
      onClick={onCreate}
      disabled={isLoading}
      variant={'secondary'}
      size={'sm'}
      className="rounded-full"
    >
      <MessageCircleMoreIcon />
    </Button>
  );
};
