import { Button } from '../ui/button';

interface CommentReplyButton {
  setIsReply: () => void;
}

export const CommentReplyButton = ({ setIsReply }: CommentReplyButton) => {
  return (
    <Button
      onClick={setIsReply}
      size={'sm'}
      className="ml-1  px-2 rounded-full text-muted-foreground text-xs"
      variant={'ghost'}
    >
      Reply
    </Button>
  );
};
