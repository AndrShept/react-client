import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

import { GameIconWrapper } from './GameIconWrapper';

interface Props {
  wrapperClassname?: string;
  iconClassname?: string;
  children: ReactNode;
}

export const BackpackGameIcon = ({
  iconClassname,
  wrapperClassname,
  children,
}: Props) => {
  return (
    <GameIconWrapper classname={wrapperClassname}>
      <img
        className={cn('size-8', iconClassname)}
        src="/sprites/icons/backpack.png"
        alt="ShopGameIcon"
      />
      {children}
    </GameIconWrapper>
  );
};
