import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  classname?: string;
  type? : 'default' | 'icon'
}

export const GameIconWrapper = ({
  children,
  classname,
  type='icon'
}: Props) => {
  return (
    <Button className={cn('', classname)} variant={'outline'} size={type}>
      {children}
      
    </Button>
  );
};
