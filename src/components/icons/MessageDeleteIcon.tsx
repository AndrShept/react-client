import { useSocket } from '@/hooks/useSocket';
import { useDeleteMessageMutation } from '@/lib/services/messageApi';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';

interface MessageDeleteIconProps {
  messageId: string;
}

export const MessageDeleteIcon = ({ messageId }: MessageDeleteIconProps) => {
  const { sendMessage } = useSocket();
  const [deleteMessage, { isLoading }] = useDeleteMessageMutation();
  const handleDelete = async () => {
    try {
      const deletedMessage = await deleteMessage(messageId).unwrap();
      sendMessage(deletedMessage);
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Button
      onClick={handleDelete}
      disabled={isLoading}
      variant={'ghost'}
      size={'icon'}
      className="size-[23px]"
    >
      <Trash2Icon className="size-[16px]" />
    </Button>
  );
};
