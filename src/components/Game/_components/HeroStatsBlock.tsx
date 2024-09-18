import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

import { IStats } from './CreateHeroPage';

interface HeroStatsBlockProps {
  stats: IStats[];
  statPoints: { value: number; baseValue: number };
  setStats: React.Dispatch<React.SetStateAction<IStats[] >>;
  setStatPoints: React.Dispatch<
    React.SetStateAction<{ value: number; baseValue: number }>
  >;
}

export const HeroStatsBlock = ({
  setStatPoints,
  setStats,
  stats,
  statPoints,
}: HeroStatsBlockProps) => {
  const incrementStat = (stat: {
    name: string;
    value: number ;
    baseValue: number;
  }) => {
    setStats((items: IStats[]) =>
      items.map((item) => {
        if (item.name === stat.name && statPoints.value > 0) {
          setStatPoints((prev) => ({ ...prev, value: prev.value - 1 }));
          return {
            ...item,
            value: item.value + 1,
          };
        }
        return item;
      }),
    );
  };

  const decrementStat = (stat: IStats) => {
    if (stat.baseValue >= stat.value) return;
    setStats((items) =>
      items.map((item) => {
        if (item.name === stat.name) {
          setStatPoints((prev) => ({ ...prev, value: prev.value + 1 }));
          return {
            ...item,
            value: item.value - 1,
          };
        }
        return item;
      }),
    );
  };
  return (
    <div className="text-muted-foreground border p-4 rounded-lg  flex flex-col  ">
      <h5 className="text-xl text-primary mb-2 ">Stats:</h5>
      <h5 className=" text-muted-foreground  ">LEVEL 1</h5>
      <ul className="flex  flex-col">
        {stats.map((stat) => (
          <div key={stat.name} className="flex gap-2 ">
            <p className={`  ${stat.color}`}>{stat.name}</p>

            <div className="flex gap-2 ml-auto">
              <p
                className={cn('text-primary', {
                  'text-emerald-500 ': stat.baseValue < stat.value,
                })}
              >
                {stat.value}
              </p>
              <div className="flex">
                <Button
                  className={cn('size-5 text-[17px]', {
                    ' opacity-0 cursor-default': stat.baseValue >= stat.value,
                  })}
                  variant={'ghost'}
                  size={'icon'}
                  onClick={() => decrementStat(stat)}
                >
                  -
                </Button>

                <Button
                  className={cn('size-5 text-[17px]', {
                    ' opacity-0 cursor-default': statPoints.value <= 0,
                  })}
                  variant={'ghost'}
                  size={'icon'}
                  onClick={() => incrementStat(stat)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between text-amber-500 mt-2">
          <p>Stat Points</p>
          <p> {statPoints.value}</p>
        </div>
      </ul>
    </div>
  );
};
