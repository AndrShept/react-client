import { Buff, Hero } from '@/lib/types/game.types';
import React from 'react';

import { BuffCard } from './BuffCard';
import { FillBar } from './FillBar';
import { HeroAvatar } from './HeroAvatar';

interface Props {
  avatarUrl: string;
  health: number | undefined;
  maxHealth: number | undefined;
  mana: number | undefined;
  maxMana: number | undefined;
  name: string;
  level: number;
  buffs: Buff[];
}

export const HeroStatus = ({
  avatarUrl,
  health,
  mana,
  maxHealth,
  maxMana,
  name,
  level,
  buffs,
}: Props) => {
  return (
    <div className="flex items-center gap-2 ">
      <div>
        <HeroAvatar src={avatarUrl} />
      </div>
      <div className="gap-0.5 flex flex-col w-full">
        <div>
          <span className="mr-1">{name}</span>
          <span className="text-muted-foreground">lvl:{level}</span>
        </div>

        <FillBar value={health ?? 0} color="green" maxValue={maxHealth ?? 0} />
        <FillBar value={mana ?? 0} color="blue" maxValue={maxMana ?? 0} />

        <ul className='flex gap-1 flex-wrap'>
          {buffs.map((buff) => (
            <li  key={buff.id}>
              <BuffCard buff={buff} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
