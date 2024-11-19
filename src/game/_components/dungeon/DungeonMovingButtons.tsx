import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react';
import React from 'react';

interface Props {
  moveHero: (dx: number, dy: number) => void;
}

export const DungeonMovingButtons = ({ moveHero }: Props) => {
  return (
    <section className="flex flex-col max-w-[120px] ">
      <Button
        className="mx-auto"
        onClick={() => moveHero(0, -1)}
        variant={'outline'}
        size={'icon'}
      >
        <ChevronUpIcon />
      </Button>
      <div className="flex justify-between">
        <Button
          onClick={() => moveHero(-1, 0)}
          variant={'outline'}
          size={'icon'}
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          onClick={() => moveHero(1, 0)}
          variant={'outline'}
          size={'icon'}
        >
          <ChevronRightIcon />
        </Button>
      </div>

      <Button
        className="mx-auto"
        onClick={() => moveHero(0, 1)}
        variant={'outline'}
        size={'icon'}
      >
        <ChevronRightIcon />
      </Button>
    </section>
  );
};
