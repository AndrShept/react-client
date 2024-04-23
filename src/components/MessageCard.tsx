import { Message } from '@/lib/types';

interface MessageCardProps {
  message: Message;
}

export const MessageCard = ({ message }: MessageCardProps) => {
  console.log(message);

  return <div>MessageCard</div>;
};
