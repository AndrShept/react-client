import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

import { GameIconWrapper } from './GameIconWrapper';

interface Props {
  wrapperClassname?: string;
  iconClassname?: string;
}

export const ShopGameIcon = ({ iconClassname, wrapperClassname }: Props) => {
  return (
    <GameIconWrapper classname={wrapperClassname}>
      <img
        className={cn('size-8', iconClassname)}
        src="/sprites/icons/shop.png"
        alt="ShopGameIcon"
      />
    </GameIconWrapper>
  );
};
