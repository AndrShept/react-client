import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
} from '@/lib/services/postApi';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';

export const PostDeleteIcon = ({ postId }: { postId: string }) => {
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const [refetchAllPosts] = useLazyGetAllPostsQuery();

  const handleDelete = async () => {
    if (confirm()) {
      try {
        await deletePost(postId).unwrap();
        await refetchAllPosts().unwrap();
      } catch (error) {
        toast.success('Something went wrong');
      }
    }
  };
  return (
    <Button
      disabled={isLoading}
      onClick={handleDelete}
      className="size-8"
      variant={'ghost'}
      size={'icon'}
    >
      <TrashIcon className="size-4" />
    </Button>
  );
};
