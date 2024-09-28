import { Hero } from '@/lib/types/game.types';
import React from 'react';

import { FillBar } from './FillBar';
import { HeroAvatar } from './HeroAvatar';

interface Props {
  avatarUrl: string;
  health: number | undefined;
  maxHealth: number | undefined;
  mana: number | undefined;
  maxMana: number | undefined;
  name: string;
}

export const HeroStatus = ({
  avatarUrl,
  health,
  mana,
  maxHealth,
  maxMana,
  name,
}: Props) => {
  return (
    <div className="flex items-center gap-2 ">
      <div>
        <HeroAvatar src={avatarUrl} />
      </div>
      <div className="gap-0.5 flex flex-col w-full">
        <p>{name}</p>
        <FillBar value={health ?? 0} color="green" maxValue={maxHealth ?? 0} />
        <FillBar value={mana ?? 0} color="blue" maxValue={maxMana ?? 0} />
      </div>
    </div>
  );
};
