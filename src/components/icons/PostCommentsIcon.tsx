import { MessageCircleMoreIcon } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../ui/button';

interface PostMessageIconProps {
  postId: string;
  commentCount: number;
}

export const PostCommentsIcon = ({
  postId,
  commentCount,
}: PostMessageIconProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <section className="flex items-center">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/posts/${postId}`);
        }}
        className="size-10 rounded-full"
        variant={pathname !== `/posts/${postId}` ? 'ghost' : 'secondary'}
        size={'icon'}
      >
        <MessageCircleMoreIcon className="size-5" />
      </Button>
      {!!commentCount && (
        <p className="text-sm text-muted-foreground ml-2">{commentCount}</p>
      )}
    </section>
  );
};
