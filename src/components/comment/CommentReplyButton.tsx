import { Button } from '../ui/button';

interface CommentReplyButton {
  setIsReply: () => void;
}

export const CommentReplyButton = ({ setIsReply }: CommentReplyButton) => {
  return (
    <Button
      onClick={setIsReply}
      size={'sm'}
      className="ml-2  rounded-full px-[7px]  h-[29px] text-muted-foreground text-xs"
      variant={'ghost'}
    >
      Reply
    </Button>
  );
};
