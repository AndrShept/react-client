import { Button } from '@/components/ui/button';
import {
  useCreateDungSessionMutation,
  useGetDungeonsSessionByIdQuery,
} from '@/lib/services/game/dungeonApi';
import { Dungeon } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { TimeIcon } from '../game-icons/TimeIcon';

interface Props {
  dungeon: Dungeon;
}

export const DungeonCard = ({ dungeon }: Props) => {
  const [isMore, setIsMore] = useState(false);
  const [onCreateDungSession, { isLoading }] = useCreateDungSessionMutation();
  const { data: dungSession } = useGetDungeonsSessionByIdQuery(dungeon.id);
  const onEnterDung = async () => {
    try {
      await onCreateDungSession({ dungeonId: dungeon.id });
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  return (
    <article className="flex flex-col border cursor-pointer opacity-85  hover:opacity-100 transition max-w-[330px] ">
      <img src={dungeon.imageUrl} alt="dungeon-image" className="" />
      <section className="p-3 flex flex-col gap-3">
        <h3 className="text-xl mb-1 text-purple-500">{dungeon.name}</h3>
        <div>
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

        <div className="flex  ">
          <div className="flex items-center">
            <TimeIcon />
            <p className="text-sm">{dungeon.duration}m</p>
          </div>

          <Button
            disabled={isLoading}
            onClick={onEnterDung}
            variant={'secondary'}
            className="ml-auto"
          >
            Enter
          </Button>
        </div>
      </section>
    </article>
  );
};
