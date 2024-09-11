import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import React, { useMemo, useState } from 'react';

import { HeroAvatarList } from './HeroAvatarList';

export const CreateHeroPage = () => {
  return (
    <div className=" h-full flex flex-col md:p-10 p-4">
      <HeroAvatarList />
    </div>
  );
};
