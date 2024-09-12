import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

import { IStats } from './CreateHeroPage';

interface HeroStatsBlockProps {
  stats: IStats[];
  statPoint: { value: number; baseValue: number };
  setStats: React.Dispatch<React.SetStateAction<IStats[]>>;
  setStatPoint: React.Dispatch<
    React.SetStateAction<{ value: number; baseValue: number }>
  >;
}

export const HeroStatsBlock = ({
  setStatPoint,
  setStats,
  stats,
  statPoint,
}: HeroStatsBlockProps) => {
  const incrementStat = (stat: {
    name: string;
    value: number;
    baseValue: number;
  }) => {
    setStats((items: IStats[]) =>
      items.map((item) => {
        if (item.name === stat.name && statPoint.value > 0) {
          setStatPoint((prev) => ({ ...prev, value: prev.value - 1 }));
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
          setStatPoint((prev) => ({ ...prev, value: prev.value + 1 }));
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
    <div className="text-muted-foreground border p-4 rounded-lg  flex flex-col flex-1 ">
      <h5 className="text-xl text-primary mb-2 ">Stats:</h5>
      <h5 className=" text-muted-foreground  ">LEVEL 1</h5>
      <ul className="flex  flex-col">
        {stats.map((stat) => (
          <div key={stat.name} className="flex ">
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
                    ' opacity-0 cursor-default': statPoint.value <= 0,
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
          <p> {statPoint.value}</p>
        </div>
      </ul>
    </div>
  );
};
