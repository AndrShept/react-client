import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { moveHero } from '@/lib/redux/dungeonSessionSlice';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from 'lucide-react';

interface Props {
  moveHero: (dx: number, dy: number) => void;
}

export const DungeonMovingButtons = () => {
  const dispatch = useAppDispatch();
  const heroId = useAppSelector((state) => state.hero.hero?.id);
  const { x, y } = useAppSelector((state) => state.dungeonSession.heroPos);
  if (!heroId) return;

  console.log(x,y)
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
