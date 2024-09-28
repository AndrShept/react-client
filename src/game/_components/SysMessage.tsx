import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppSelector } from '@/hooks/store';
import { cn, getTimeFns } from '@/lib/utils';
import { useEffect, useRef } from 'react';

import { getRarityText } from '../utils';

export const SysMessage = () => {
  const sysMessages = useAppSelector((state) => state.hero.sysMessages);
  const ref = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    ref.current?.lastElementChild?.scrollIntoView();
  }, [sysMessages]);
  return (
    <section className="flex-1 flex-col flex  border-l  ">
      <ScrollArea className=" h-full">
        <ul ref={ref} className="  pl-2 pt-1 ">
          {sysMessages.map((sysMessage) => (
            <li
              key={sysMessage.createdAt.toString()}
              className={cn('text-sm space-x-1 text-green-400', {
                'text-red-400': !sysMessage.success,
              })}
            >
              <time className="text-muted-foreground">
                {getTimeFns(sysMessage.createdAt)}
              </time>
              <span>{sysMessage.message}</span>
              <span
                className={cn(
                  '',
                  sysMessage.success && {
                    ...getRarityText(sysMessage.data?.gameItem),
                  },
                )}
              >
                {sysMessage.data?.gameItem?.name}
              </span>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </section>
  );
};
