import { Message } from '@/lib/types';

interface MessageCardProps {
  message: Message;
}

export const MessageCard = ({ message }: MessageCardProps) => {
  console.log(message);
  console.log(message.conversation);

  return <div>{message.content}</div>;
};
