import { useSocket } from '@/components/providers/SocketProvider';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { moveHero } from '@/lib/redux/dungeonSessionSlice';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  dungeonSessionId: string;
}

export const DungeonMovingButtons = ({dungeonSessionId}: Props) => {
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const heroId = useAppSelector((state) => state.hero.hero?.id);
  const { x, y } = useAppSelector(
    (state) => state.dungeonSession.heroPos ?? { x: 0, y: 0 },
  );
  if (!heroId) return;

  useEffect(() => {
    const socketListener = (data: any) => {
      console.log(data);
    };
    socket?.emit(`move-hero-${heroId}`, { x, y, dungeonSessionId });
    socket?.on(`move-hero-${heroId}`, socketListener);
    console.log(x, y);
    return () => {
      socket?.off(`move-hero-${heroId}`, socketListener);
    };
  }, [dungeonSessionId, socket, heroId, x, y]);
  console.log(x, y);
  return (
    <section className="flex flex-col w-[120px]   ">
      <Button
        className="mx-auto"
        onClick={() => dispatch(moveHero({ dx: 0, dy: -1, heroId }))}
        variant={'outline'}
        size={'icon'}
      >
        <ChevronUpIcon />
      </Button>
      <div className="flex justify-between">
        <Button
          onClick={() => dispatch(moveHero({ dx: -1, dy: 0, heroId }))}
          variant={'outline'}
          size={'icon'}
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          onClick={() => dispatch(moveHero({ dx: 1, dy: 0, heroId }))}
          variant={'outline'}
          size={'icon'}
        >
          <ChevronRightIcon />
        </Button>
      </div>

      <Button
        className="mx-auto"
        onClick={() => dispatch(moveHero({ dx: 0, dy: 1, heroId }))}
        variant={'outline'}
        size={'icon'}
      >
        <ChevronDownIcon />
      </Button>
    </section>
  );
};
