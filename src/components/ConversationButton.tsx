import { useAddConversationMutation } from '@/lib/services/conversationApi';
import { MessageCircleMoreIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from './ui/button';

interface ConversationButtonProps {
  receiverId: string;
}

export const ConversationButton = ({ receiverId }: ConversationButtonProps) => {
  const [createConversation, { isLoading }] = useAddConversationMutation();
  const navigate = useNavigate();
  const onCreate = async () => {
    try {
      const res = await createConversation({ receiverId }).unwrap();
      navigate(`/conversations/${res.id}`);
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
