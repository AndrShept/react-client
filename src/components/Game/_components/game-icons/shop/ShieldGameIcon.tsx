import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

import { GameIconWrapper } from '../GameIconWrapper';

interface Props {
  wrapperClassname?: string;
  iconClassname?: string;
  textClassname?: string;
  type?: 'default' | 'icon';
  children?: ReactNode;
}

export const ShieldGameIcon = ({
  iconClassname,
  wrapperClassname,
  type,
  textClassname,
  children,
}: Props) => {
  return (
    <GameIconWrapper type={type} classname={wrapperClassname}>
      <img
        className={cn('size-8', iconClassname)}
        src="/sprites/icons/shop/shield.png"
        alt="sword-image"
      />
      <span className={cn(' ', textClassname)}>{children}</span>
    </GameIconWrapper>
  );
};
