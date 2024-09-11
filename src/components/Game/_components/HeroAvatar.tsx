import { cn } from '@/lib/utils';
import React from 'react';

interface HeroAvatarProps {
  src: string;
  isSelected: boolean;
  classname?: string;
  onClick?: () => void;
}

export const HeroAvatar = ({
  src,
  isSelected = false,
  classname,
  onClick
}: HeroAvatarProps) => {
  return (
    <article onClick={onClick} className="relative size-12  ">
      <img
        className={cn(
          'size-full object-cover border rounded-full transition-all  hover:border-primary hover:opacity-100 cursor-pointer   opacity-50  ',
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
