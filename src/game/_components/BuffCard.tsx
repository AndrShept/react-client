import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useAppDispatch } from '@/hooks/store';
import { useAltClick } from '@/hooks/game/useAltClick';
import { removeBuff } from '@/lib/redux/heroSlice';
import { useRemoveBuffServerMutation } from '@/lib/services/game/heroApi';
import { Buff } from '@/lib/types/game.types';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  buff: Buff;
}

export const BuffCard = ({ buff }: Props) => {
  const initialDuration = buff.timeRemaining;
  const [durationState, setDurationState] = useState(initialDuration);
  const changedImageUrl = buff.imageUrl.split('.').shift();
  const noBgImage = `${changedImageUrl}-nobg.png`;
  const wholeMinutes = Math.floor(durationState / 60000);
  const dispatch = useAppDispatch();
  const [removeBuffServer] = useRemoveBuffServerMutation();
  useAltClick(() => {
    setTimeout(() => {
      dispatch(removeBuff({ buff }));
    }, 300);
    removeBuffServer({ buffId: buff.gameItemId! });
  });

  const modifier = useMemo(() => {
    return Object.entries(buff.modifier).map(([key, value]) => {
      if (key === 'id' || key === 'duration') {
        return { name: key, value: null };
      }
      return { name: key, value: value };
    });
  }, [buff]);
  useEffect(() => {
    const timer = setInterval(() => {
      setDurationState((prev) => prev - 60000);
    }, 60000);
    if (durationState <= 0) {
      console.log(buff)
      clearInterval(timer);
      setDurationState(0);
      removeBuffServer({ buffId: buff.gameItemId! });
      dispatch(removeBuff({ buff }));
    }

    return () => clearInterval(timer);
  }, [durationState]);
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger>
        <article className="flex flex-col relative hover:cursor-pointer hover:bg-secondary hover:rounded ">
          <img
            className="size-7 rounded border  "
            src={noBgImage}
            alt={'buff-image'}
          />
          <div className="absolute inset-x-0 flex -bottom-2">
            <p className=" text-[10px] mx-auto">{wholeMinutes}m</p>
          </div>
        </article>
      </HoverCardTrigger>
      <HoverCardContent className="mt-4 text-sm">
        {modifier.map((item) => (
          <li key={item.name}>
            {!!item.value && (
              <p>
                + {item.value} {item.name}
              </p>
            )}
          </li>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
};
