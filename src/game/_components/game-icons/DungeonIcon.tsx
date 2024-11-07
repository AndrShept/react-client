import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface DungeonIconProps {
  buttonClassName?: string;
  iconClassName?: string;
}

export const DungeonIcon = ({
  buttonClassName,
  iconClassName,
}: DungeonIconProps) => {
  return (
    <Button className={cn(buttonClassName)} variant={'outline'} size={'icon'}>
      <img
        className={cn('size-8', iconClassName)}
        src="/sprites/icons/dungeons.png"
        alt="ability-image"
      />
    </Button>
  );
};
