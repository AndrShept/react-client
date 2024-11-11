import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setSysMessages } from '@/lib/redux/heroSlice';
import {
  useCreateDungSessionMutation,
  useUpdateDungeonSessionStatusMutation,
} from '@/lib/services/game/dungeonApi';
import { useLazyGetMyHeroQuery } from '@/lib/services/game/heroApi';
import { Dungeon, Status } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';

import { ConfirmPopover } from '../ConfirmPopover';
import { TimeIcon } from '../game-icons/TimeIcon';

interface Props {
  dungeon: Dungeon;
}

export const DungeonCard = ({ dungeon }: Props) => {
  const [isMore, setIsMore] = useState(false);
  const [onCreateDungSession, { isLoading  }] = useCreateDungSessionMutation();
  const [updateDungeonSessionStatus] = useUpdateDungeonSessionStatusMutation();
  const [refetchHero, { isLoading: isLoadingHero ,isFetching }] = useLazyGetMyHeroQuery();
  const dungeonSession = useAppSelector((state) =>
    state.hero.hero?.dungeonSessions?.find(
      (findDung) => findDung.dungeonId === dungeon.id,
    ),
  );
  const dispatch = useAppDispatch();
  const isDungInprogress = dungeonSession?.dungeonId === dungeon.id;

  const onEnterDung = async () => {
    try {
      await onCreateDungSession({ dungeonId: dungeon.id }).unwrap();
      await refetchHero().unwrap();
    } catch (error: any) {
      console.log(error);
      if (error.status === 409) {
        dispatch(
          setSysMessages({
            success: false,
            createdAt: Date.now(),
            message: error.data,
          }),
        );
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  const onConfirm = async () => {
    if (!dungeonSession) return;
    try {
      await updateDungeonSessionStatus({
        status: Status.FAILED,
        dungeonSessionId: dungeonSession.id,
      });
      await refetchHero().unwrap();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <article className="flex flex-col border  opacity-85 group h-full  hover:opacity-100 transition max-w-[330px] ">
      <div className="overflow-hidden  ">
        <img
          src={dungeon.imageUrl}
          alt="dungeon-image"
          className="group-hover:scale-105 duration-200 "
        />
      </div>

      <section className="p-3 flex flex-col gap-3 flex-1">
        <h3 className="text-xl mb-1 text-purple-500">{dungeon.name}</h3>
        <div className="flex-1">
          <p
            className={cn('text-muted-foreground text-[13px]', {
              'line-clamp-5': !isMore,
              'line-clamp-none': isMore,
            })}
          >
            {dungeon.description}
          </p>
          <Button
            disabled={isLoading}
            onClick={() => setIsMore((prev) => !prev)}
            className="p-0 text-blue-400"
            variant={'link'}
            size={'sm'}
          >
            {!isMore ? 'more...' : 'hide...'}
          </Button>
        </div>

        <div className="flex items-center gap-2 ">
          <div className="flex items-center">
            <TimeIcon />

            <p className="text-sm text-green-500">{dungeon.duration}m</p>
          </div>

          {!isDungInprogress && (
            <Button
              disabled={isLoading || isDungInprogress || isLoadingHero || isFetching }
              onClick={onEnterDung}
              variant={'secondary'}
              className="ml-auto"
            >
              Enter
            </Button>
          )}

          {isDungInprogress && (
            <div className="ml-auto flex gap-2">
              <ConfirmPopover onConfirm={onConfirm}>
                <ConfirmPopover.Trigger>
                  <Button
                  disabled={isLoading  || isLoadingHero || isFetching}
                  className="ml-auto" variant={'destructive'}>
                    Leave
                  </Button>
                </ConfirmPopover.Trigger>
                <ConfirmPopover.Content side="top">
                  <ConfirmPopover.Title>
                    Are you sure you want to leave dungeon?
                  </ConfirmPopover.Title>
                  <ConfirmPopover.Message className="text-purple-500">
                    {dungeonSession.dungeon.name}
                  </ConfirmPopover.Message>
                </ConfirmPopover.Content>
              </ConfirmPopover>

              <Button 
                  disabled={isLoading  || isLoadingHero || isFetching}
              className="ml-auto text-green-500" variant={'secondary'}>
                GO!
              </Button>
            </div>
          )}
        </div>
      </section>
    </article>
  );
};
