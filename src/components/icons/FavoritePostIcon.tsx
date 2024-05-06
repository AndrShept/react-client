import { useAddFavoritePostMutation } from '@/lib/services/favoritePostApi';
import {
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '@/lib/services/postApi';
import { cn } from '@/lib/utils';
import { BookmarkIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';

interface FavoritePostIconProps {
  postId: string;
  isFavoritePost: boolean;
}

export const FavoritePostIcon = ({
  postId,
  isFavoritePost,
}: FavoritePostIconProps) => {
  const [addFavoritePost, { isLoading }] = useAddFavoritePostMutation();
  const [refetchPosts] = useLazyGetAllPostsQuery();
  const [refetchPostById] = useLazyGetPostByIdQuery();

  const onAddFavorite = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    try {
      await addFavoritePost(postId).unwrap();
      await refetchPostById(postId).unwrap();
      await refetchPosts().unwrap();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  return (
    <Button
      disabled={isLoading}
      onClick={onAddFavorite}
      variant={'ghost'}
      size={'icon'}
      className="rounded-full size-10"
    >
      <BookmarkIcon
        className={cn('size-5', {
          'fill-white': isFavoritePost,
        })}
      />
    </Button>
  );
};
