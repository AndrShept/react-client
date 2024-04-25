import { cn } from '@/lib/utils';
import React from 'react';

export const OnlineBadge = ({ isOnline }: { isOnline: boolean }) => {
  return (
    <div
      className={cn(
        'size-[10px] rounded-full  ring-2 ring-background absolute right-0 bottom-0',
        {
          'bg-green-600': isOnline,
          'bg-rose-600': !isOnline,
        },
      )}
    />
  );
};
