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

export const DaggerGameIcon = ({
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
        src="/sprites/icons/shop/dagger.png"
        alt="dagger-image"
      />
      <span className={cn(' ',textClassname)}>{children}</span>
    </GameIconWrapper>
  );
};
