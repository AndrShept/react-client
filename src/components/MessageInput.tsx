import { useSocket } from '@/components/providers/SocketProvider';
import { useAuth } from '@/hooks/useAuth';
import { useS3FileUpload } from '@/hooks/useS3UploadFile';
import { useAddMessageMutation } from '@/lib/services/messageApi';
import { convertToMb } from '@/lib/utils';
import { Navigation2Icon, PaperclipIcon, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { AddFileInput } from './AddFileInput';
import { EmojiButton } from './EmojiButton';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface MessageInputProps {
  conversationId: string;
}

export const MessageInput = ({ conversationId }: MessageInputProps) => {
  const { userId } = useAuth();
  const [createMessage, { isLoading }] = useAddMessageMutation();
  const [content, setContent] = useState('');
  const { sendMessage } = useSocket();
  const { errorMessage, fileState, handleUpload, setFileState } =
    useS3FileUpload();
  const imageUrl = fileState?.url;

  const onCreate = async () => {
    if (!conversationId) {
      console.log('SEND MESSAGE ERROR CONVERSATION ID NOT FOUND');
      toast.error('Something went wrong conversationId');
    }
    const messageData = {
      conversationId,
      content,
      authorId: userId!,
    };
    const formData = new FormData();
    if (fileState?.file) {
      formData.append('file', fileState?.file);
    }
    formData.append('messageData', JSON.stringify(messageData));
    try {
      if (content.trimStart() || imageUrl) {
        const res = await createMessage(formData).unwrap();
        setContent('');
        sendMessage(res);
        onClear();
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  const onClear = () => {
    setFileState(null);
  };
  return (
    <>
      {fileState && imageUrl && (
        <div className="flex border items-center p-2 rounded-md text-sm gap-2  break-all">
          <PaperclipIcon className="shrink-0 size-5" />
          <p className="text-rose-500 whitespace-nowrap">
            {convertToMb(fileState.size)}
          </p>
          <p className="line-clamp-1 text-muted-foreground">
            {fileState.name}{' '}
          </p>
          <Button
            onClick={onClear}
            className="ml-auto size-7"
            variant={'ghost'}
            size={'icon'}
          >
            <X className="size-5" />
          </Button>
        </div>
      )}

      {errorMessage && <p className="text-rose-500 text-sm">{errorMessage}</p>}
      <div className="flex ">
        <AddFileInput isLoading={isLoading} handleUpload={handleUpload} />
        <form className="flex relative items-center w-full">
          <Input
            placeholder="Message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className=" resize-none bg-secondary/50 rounded-r-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pr-10 "
          />

          <EmojiButton
            sideOffset={60}
            isLoading={isLoading}
            onChange={(emoji: string) => setContent(`${content}${emoji}`)}
          />

          <Button
            disabled={isLoading || (!content.trimStart() && !imageUrl)}
            onClick={onCreate}
            variant={'indigo'}
            size={'sm'}
            className=" rounded-l-none"
          >
            <Navigation2Icon className="size-5 rotate-90" />
          </Button>
        </form>
      </div>
    </>
  );
};
