import { cn } from '@/lib/utils';
import React from 'react';

interface HeroAvatarProps {
  src: string | undefined;
  isSelected?: boolean;
  classname?: string;
  onClick?: () => void;
}

export const HeroAvatar = ({
  src,
  isSelected = false,
  classname,
  onClick,
}: HeroAvatarProps) => {
  return (
    <article onClick={onClick} className="relative size-12  ">
      <img
      draggable={false}
        className={cn(
          'size-full object-cover border rounded-full    ',
          classname,
          {
            'border-primary opacity-100': isSelected,
          },
        )}
        src={src}
        alt="avatar-image"
      />
    </article>
  );
};
