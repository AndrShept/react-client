import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/store';
import {
  StatsUnion,
  decrementStat,
  incrementStat,
  setSysMessages,
} from '@/lib/redux/heroSlice';
import {
  useLazyGetMyHeroQuery,
  useResetStatsMutation,
  useUpdateHeroMutation,
} from '@/lib/services/game/heroApi';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { GoldIcon } from './game-icons/GoldIcon';

interface Props {
  freeStatsPoints?: number;
  strength: number | undefined;
  dexterity: number | undefined;
  intelligence: number | undefined;
  constitution: number | undefined;
  luck: number | undefined;
}

export const StatsBlock = ({
  freeStatsPoints,
  strength,
  dexterity,
  intelligence,
  constitution,
  luck,
}: Props) => {
  const statsArr: {
    name: StatsUnion;
    value: number | undefined;
    id: number;
  }[] = [
    {
      name: 'strength',
      value: strength,
      id: 1,
    },
    {
      name: 'dexterity',
      value: dexterity,
      id: 2,
    },
    {
      name: 'intelligence',
      value: intelligence,
      id: 3,
    },
    {
      name: 'constitution',
      value: constitution,
      id: 4,
    },
    {
      name: 'luck',
      value: luck,
      id: 5,
    },
  ];
  const [isReset, setIsReset] = useState(false);
  const [resetStats, { isLoading }] = useResetStatsMutation();
  const [refetchHero] = useLazyGetMyHeroQuery();
  const [updateHero, { isLoading: isLoadingUpdateHero }] =
    useUpdateHeroMutation();
  const dispatch = useAppDispatch();

  const onReset = async () => {
    try {
      const res = await resetStats().unwrap();
      await refetchHero().unwrap();

      if (res.message) {
        dispatch(setSysMessages({ ...res, createdAt: Date.now() }));
        setIsReset(true);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  const onDecrement = (stat: StatsUnion) => {
    dispatch(decrementStat(stat));
  };
  const onIncrement = (stat: StatsUnion) => {
    dispatch(incrementStat(stat));
  };
  const onApply = async () => {
    try {
      await updateHero({
        freeStatsPoints,
        modifier: {
          strength,
          dexterity,
          constitution,
          intelligence,
          luck,
        },
      });
      await refetchHero().unwrap();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  return (
    <div className="flex flex-col">
      <ul>
        {statsArr.map((stat) => (
          <li key={stat.id}>
            <span className="mr-1">{stat.name}:</span>

            <Button
              onClick={() => onDecrement(stat.name)}
              variant={'ghost'}
              size={'icon'}
              className="size-4"
            >
              -
            </Button>

            <span
              className={cn('', {
                'text-green-400':
                  (stat.value! > 5 && stat.name === 'luck') || stat.value! > 10,
              })}
            >
              {stat.value}
            </span>

            {!!freeStatsPoints && (
              <Button
                onClick={() => onIncrement(stat.name)}
                variant={'ghost'}
                size={'icon'}
                className={cn('size-4')}
              >
                +
              </Button>
            )}
          </li>
        ))}
      </ul>

      <p className="text-yellow-300">
        {' '}
        free stats points:{' '}
        <span className="text-green-500 font-bold">{freeStatsPoints}</span>
      </p>
      {isReset   && (
        <Button
          className="mt-1 text-green-500 w-fit ml-auto"
          disabled={isLoading || isLoadingUpdateHero}
          variant={'secondary'}
          size={'sm'}
          onClick={onApply}
        >
          <CheckIcon />
        </Button>
      )}
      <Button
        className="mt-1"
        disabled={isLoading || isLoadingUpdateHero}
        variant={'secondary'}
        size={'sm'}
        onClick={onReset}
      >
        <GoldIcon classname="size-5 mr-1" /> reset
      </Button>
    </div>
  );
};
