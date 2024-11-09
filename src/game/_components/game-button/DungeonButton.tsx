import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { gameUrls } from '../GameNavbar';

interface Props {
  buttonClassName?: string;
  iconClassName?: string;
}

export const DungeonButton = ({ buttonClassName, iconClassName }: Props) => {
  const { pathname } = useLocation();

  return (
    <Button
      className={cn(buttonClassName)}
      variant={pathname.includes(gameUrls.dungeons) ? 'secondary' : 'outline'}
      size={'icon'}
    >
      <img
        className={cn('size-8', iconClassName)}
        src="/sprites/icons/dungeons.png"
        alt="dungeons-image"
      />
    </Button>
  );
};
