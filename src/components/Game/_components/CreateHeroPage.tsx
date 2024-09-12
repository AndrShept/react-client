import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { color } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Background } from './Background';
import { HeroAvatarList } from './HeroAvatarList';
import { HeroStatsBlock } from './HeroStatsBlock';

export interface IStats {
  name: string;
  value: number;
  baseValue: number;
  color: string;
}

export const CreateHeroPage = () => {
  const [nickname, setNickname] = useState('');
  const [stats, setStats] = useState([
    {
      name: 'Strength',
      value: 10,
      baseValue: 10,
      color: 'text-red-500',
    },
    {
      name: 'Dexterity',
      value: 10,
      baseValue: 10,
      color: 'text-green-500',
    },
    {
      name: 'Intelligence',
      value: 10,
      baseValue: 10,
      color: `text-sky-500`,
    },
    {
      name: 'Constitution',
      value: 10,
      baseValue: 10,
      color: 'text-stone-500',
    },
    {
      name: 'Luck',
      value: 5,
      baseValue: 5,
      color: 'text-purple-500',
    },
  ]);

  const [statPoint, setStatPoint] = useState({
    value: 10,
    baseValue: 10,
  });

  return (
    <Background imageUrl="/sprites/shrine6.png">
      <Button asChild variant={'outline'} className="">
        <Link to={'/create-item'}>GOGOG</Link>
      </Button>
      <div className="  flex bg-black/70 border  backdrop-blur-md rounded-lg     md:flex-row flex-col  md:p-10 p-4 max-w-5xl m-auto text-[15px] ">

        <div className="mx-auto">
          <HeroAvatarList />
        </div>

        <div className="flex flex-col gap-4 mx-auto">
          <label htmlFor="input">
            nickname
            <Input
              className="mt-0.5"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              id="input"
            />
          </label>
          <HeroStatsBlock
            setStatPoint={setStatPoint}
            setStats={setStats}
            statPoint={statPoint}
            stats={stats}
          />
        </div>
        <div className="border p-4 rounded-lg">
          <h5 className="text-xl text-primary mb-2 ">
            Chose your start inventory:
          </h5>
          <p>Weapon</p>

          <p>Armor</p>
        </div>
      </div>
    </Background>
  );
};
