import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/store';
import { useHeroStats } from '@/hooks/useHeroStats';
import { StatsUnion, setSysMessages } from '@/lib/redux/heroSlice';
import {
  useLazyGetMyHeroQuery,
  useResetStatsMutation,
  useUpdateHeroMutation,
} from '@/lib/services/game/heroApi';
import { ErrorMessage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';

import { ConfirmPopover } from './ConfirmPopover';
import { GoldIcon } from './game-icons/GoldIcon';

interface Props {
  freeStatsPoints?: number;
  statsObj: Record<StatsUnion, number>;
}

export const StatsBlock = ({ freeStatsPoints, statsObj }: Props) => {
  const [resetStats, { isLoading }] = useResetStatsMutation();
  const [refetchHero] = useLazyGetMyHeroQuery();
  const [updateHero, { isLoading: isLoadingUpdateHero }] =
    useUpdateHeroMutation();
  const dispatch = useAppDispatch();
  const {
    freePointsState,
    hasUnsavedChanges,
    onDecrement,
    onIncrement,
    statsState,
  } = useHeroStats({
    freeStatsPoints,
    statsObj,
  });

  const onReset = async () => {
    try {
      const res = await resetStats().unwrap();
      await refetchHero().unwrap();

      if (res.success) {
        dispatch(setSysMessages({ ...res, createdAt: Date.now() }));
      }
    } catch (error) {
      const err = error as ErrorMessage;
      if (!err.data.success) {
        dispatch(setSysMessages({ ...err.data, createdAt: Date.now() }));
      } else {
        console.log(error);
        toast.error('Something went wrong');
      }
    }
  };
  const onApply = async () => {
    const stats = statsState.reduce(
      (acc, item) => {
        acc[item.name] = item.value;
        return acc;
      },
      {} as Record<StatsUnion, number>,
    );
    try {
      await updateHero({
        freeStatsPoints: freePointsState,
        modifier: {
          ...stats,
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
        {statsState?.map((stat) => (
          <li key={stat.id}>
            <span className="mr-1">{stat.name}:</span>

            <Button
              disabled={!hasUnsavedChanges}
              onClick={() => onDecrement(stat.name)}
              variant={'ghost'}
              size={'icon'}
              className={cn('size-4', {})}
            >
              -
            </Button>

            <span
              className={cn('', {
                'text-green-400': stat.value > statsObj[stat.name],
              })}
            >
              {stat.value}
            </span>

            <Button
              disabled={!freePointsState}
              onClick={() => onIncrement(stat.name)}
              variant={'ghost'}
              size={'icon'}
              className={cn('size-4')}
            >
              +
            </Button>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-1">
        <p className="text-yellow-300">
          {' '}
          free stats points:{' '}
          <span className="text-green-500 font-bold">{freePointsState}</span>
        </p>

        {hasUnsavedChanges && (
          <Button
            className=" text-green-500 w-fit ml-auto size-6"
            disabled={isLoading || isLoadingUpdateHero}
            variant={'secondary'}
            size={'icon'}
            onClick={onApply}
          >
            <CheckIcon className="size-4" />
          </Button>
        )}
      </div>

      <ConfirmPopover onConfirm={onReset}>
        <ConfirmPopover.Trigger>
          <Button
            className="mt-1 w-full"
            disabled={isLoading || isLoadingUpdateHero}
            variant={'secondary'}
            size={'sm'}
          >
            <GoldIcon classname="size-5 mr-1" /> reset
          </Button>
        </ConfirmPopover.Trigger>
        <ConfirmPopover.Content>
          <ConfirmPopover.Title>
            Are you sure you want to reset your hero stats?
          </ConfirmPopover.Title>
          <ConfirmPopover.Message className="inline-flex text-yellow-500">
            This will cost 100
            <GoldIcon classname="size-5 ml-1" />
          </ConfirmPopover.Message>
        </ConfirmPopover.Content>
      </ConfirmPopover>
    </div>
  );
};
