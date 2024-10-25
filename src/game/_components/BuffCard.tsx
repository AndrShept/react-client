import { useAppDispatch } from '@/hooks/store';
import { removeBuff } from '@/lib/redux/heroSlice';
import { Buff } from '@/lib/types/game.types';
import { useEffect, useState } from 'react';

interface Props {
  buff: Buff;
}

export const BuffCard = ({ buff }: Props) => {
  const [durationState, setDurationState] = useState(
    buff.duration - new Date(buff.createdAt).getMilliseconds(),
  );
  const changedImageUrl = buff.imageUrl.split('.').shift();
  const noBgImage = `${changedImageUrl}-nobg.png`;
  const wholeMinutes = Math.floor(durationState / 60000);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (durationState > 0) {
      console.log(durationState);
      timer = setInterval(() => {
        setDurationState((prev) => prev - 60000);
      }, 1000);
    } else {
      setDurationState(0);
      dispatch(removeBuff({ buff}));
      console.log('END');
    }

    return () => clearInterval(timer);
  }, [buff.duration, buff.createdAt, durationState]);
  return (
    <article className="flex flex-col relative">
      <img
        className="size-7 rounded border  "
        src={noBgImage}
        alt={'buff-image'}
      />
      <div className="absolute inset-x-0 flex -bottom-2">
        <p className=" text-[10px] mx-auto">{wholeMinutes}m</p>
      </div>
    </article>
  );
};
