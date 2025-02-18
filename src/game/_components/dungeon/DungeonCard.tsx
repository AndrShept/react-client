import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { clearDungSession } from '@/lib/redux/dungeonSessionSlice';
import { setSysMessages } from '@/lib/redux/heroSlice';
import {
  useCreateDungSessionMutation,
  useGetAllDungeonsSessionInStatusQuery,
  useUpdateDungeonSessionStatusMutation,
} from '@/lib/services/game/dungeonApi';
import { Dungeon, SessionStatus, SysMessageType } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { ConfirmPopover } from '../ConfirmPopover';
import { TimeIcon } from '../game-icons/TimeIcon';
import { InvitePartyButton } from './InvitePartyButton';

interface Props {
  dungeon: Dungeon;
}

export const DungeonCard = ({ dungeon }: Props) => {
  const [isMore, setIsMore] = useState(false);
  const navigate = useNavigate();
  const [onCreateDungSession, { isLoading }] = useCreateDungSessionMutation();
  const [updateDungeonSessionStatus, { isLoading: isLoadingUpdateStatus }] =
    useUpdateDungeonSessionStatusMutation();
  const { isLoading: isLoadingDungInProgress } =
    useGetAllDungeonsSessionInStatusQuery(SessionStatus.INPROGRESS);

  const dungeonSession = useAppSelector((state) =>
    state.dungeonSession.dungeonSessionsForStatus?.find(
      (session) => session.dungeonId === dungeon.id,
    ),
  );

  const isDungInprogress = dungeonSession?.dungeonId === dungeon.id;

  const dispatch = useAppDispatch();

  const onEnterDung = async () => {
    try {
      const res = await onCreateDungSession({ dungeonId: dungeon.id }).unwrap();
      navigate(`/game/dungeons/${res.id}`);
    } catch (error: any) {
      console.log(error);
      if (error.status === 409) {
        dispatch(
          setSysMessages({
            success: false,
            createdAt: Date.now(),
            message: error.data,
            type: SysMessageType.ERROR,
          }),
        );
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  const onLeave = async () => {
    if (!dungeonSession) return;
    try {
      await updateDungeonSessionStatus({
        status: SessionStatus.FAILED,
        dungeonSessionId: dungeonSession.id,
      }).unwrap();
      dispatch(clearDungSession());
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  if (isLoadingDungInProgress) return null;
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
            disabled={isLoading || isLoadingUpdateStatus}
            onClick={() => setIsMore((prev) => !prev)}
            className="p-0 text-blue-400"
            variant={'link'}
            size={'sm'}
          >
            {!isMore ? 'more...' : 'hide...'}
          </Button>
        </div>

        <div className="flex items-center gap-2 flex-wrap ">
          <div className="flex items-center">
            <TimeIcon />
          </div>

          {!isDungInprogress && (
            <Button
              disabled={isLoading || isDungInprogress || isLoadingUpdateStatus}
              onClick={onEnterDung}
              variant={'secondary'}
              size={'sm'}
              className="ml-auto"
            >
              Enter
            </Button>
          )}

          {isDungInprogress && (
            <div className="ml-auto flex gap-2 ">
              <ConfirmPopover onConfirm={onLeave}>
                <ConfirmPopover.Trigger>
                  <Button
                    disabled={isLoading || isLoadingUpdateStatus}
                    className="ml-auto"
                    variant={'destructive'}
                  >
                    Leave
                  </Button>
                </ConfirmPopover.Trigger>
                <ConfirmPopover.Content side="top">
                  <ConfirmPopover.Title>
                    Are you sure you want to leave dungeon?
                  </ConfirmPopover.Title>
                  <ConfirmPopover.Message className="text-purple-500">
                    {dungeonSession.dungeon?.name}
                  </ConfirmPopover.Message>
                </ConfirmPopover.Content>
              </ConfirmPopover>

              <Button
                disabled={isLoading || isLoadingUpdateStatus}
                className="ml-auto text-green-500"
                variant={'secondary'}
                onClick={() => navigate(`/game/dungeons/${dungeonSession.id}`)}
              >
                Enter
              </Button>
              <InvitePartyButton />
            </div>
          )}
        </div>
      </section>
    </article>
  );
};
