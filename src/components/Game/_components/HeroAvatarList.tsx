import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import React, { useMemo, useState } from 'react';

import { HeroAvatar } from './HeroAvatar';

interface HeroAvatarList {
  avatar: string;
  setAvatar: (str: string) => void;
}

export const HeroAvatarList = ({ avatar, setAvatar }: HeroAvatarList) => {
  const avatars = useMemo(() => {
    return [...Array(30)].map((_, idx) => ({
      name: Date.now(),
      src: `sprites/avatar/Icon${idx + 1}.png`,
    }));
  }, []);
  return (
    <ScrollArea className="h-[40vh] max-w-[300px] ">
      <ul className="flex  flex-wrap gap-2 ">
        {avatars.map((item) => (
          <HeroAvatar
            key={item.src}
            onClick={() => setAvatar(item.src)}
            src={item.src}
            isSelected={avatar === item.src}
            classname="hover:border-primary hover:opacity-80 cursor-pointer   opacity-50"
          />
        ))}
      </ul>
    </ScrollArea>
  );
};
