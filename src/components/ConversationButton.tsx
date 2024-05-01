import { useAddConversationMutation } from '@/lib/services/conversationApi';
import { cn } from '@/lib/utils';
import { MessageCircleMoreIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from './ui/button';

interface ConversationButtonProps {
  receiverId: string;
  label?: boolean;
}

export const ConversationButton = ({
  receiverId,
  label = false,
}: ConversationButtonProps) => {
  const [createConversation, { isLoading }] = useAddConversationMutation();
  const navigate = useNavigate();
  const onCreate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
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
      variant={'outline'}
      size={label ? 'sm' : 'icon'}
      className={cn('rounded-full  gap-1', {
        'size-9': !label,
      })}
    >
      {label && <p>Message</p>}
      <MessageCircleMoreIcon className="size-[17px]" />
    </Button>
  );
};
