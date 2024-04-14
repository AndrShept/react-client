import { useEditCommentMutation } from '@/lib/services/commentApi';
import { Edit3Icon } from 'lucide-react';
import React from 'react';

import { Button } from '../ui/button';

export const CommentEditIcon = () => {
  const [editComment, { isLoading }] = useEditCommentMutation();
  const handleEdit = async () => {
    editComment;
  };
  return (
    <Button
      onClick={handleEdit}
      variant={'ghost'}
      size={'icon'}
      className="size-[26px]"
    >
      <Edit3Icon className="size-[18px]" />
    </Button>
  );
};
