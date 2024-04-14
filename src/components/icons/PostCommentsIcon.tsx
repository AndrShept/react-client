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
    <section className='flex items-center'>
      <Button
        onClick={() => navigate(`/posts/${postId}`)}
        className="size-9"
        variant={pathname !== `/posts/${postId}` ? 'ghost' : 'secondary'}
        size={'icon'}
      >
        <MessageCircleMoreIcon className="size-6" />
      </Button>
      {!!commentCount && (
        <p className="text-sm text-muted-foreground ml-1">{commentCount}</p>
      )}
    </section>
  );
};
