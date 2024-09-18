import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useAuth } from '@/hooks/useAuth';
import { useGetStats } from '@/hooks/useGetStats';
import { useGetMyHeroQuery } from '@/lib/services/game/heroApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSocket } from '../providers/SocketProvider';
import { ScrollArea } from '../ui/scroll-area';
import { FillBar } from './_components/FillBar';
import { GameItemCard } from './_components/GameItemCard';
import { GameNavbar } from './_components/GameNavbar';
import { HeroAvatar } from './_components/HeroAvatar';

export const Game = () => {
  const { data: hero, isLoading } = useGetMyHeroQuery();
  const { username } = useAuth();
  const { socket } = useSocket();

  console.log(hero);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !hero) {
      navigate('/create-hero');
    }
  }, [hero, isLoading]);

  useEffect(() => {
    const socketListener = (data: string) => {
      console.log(data);
    };
    socket?.on(username!, socketListener);
    return () => {
      socket?.off(username, socketListener);
    };
  }, [socket,username]);
  if (isLoading) {
    return 'loading...';
  }
  return (
    <section className="flex flex-col h-full ">
      <GameNavbar />

      <ResizablePanelGroup direction="vertical" className="   ">
        <ResizablePanel defaultSize={70}>
          <section className="h-full flex md:p-5 p-3 gap-3">
            {/* //HERO BLOCK */}
            <div className=" flex-1 flex flex-col">
              <div className="flex items-center gap-2 ">
                <div>
                  <HeroAvatar src={hero?.avatarUrl} />
                </div>
                <div className="gap-0.5 flex flex-col w-full">
                  <p>{hero?.name}</p>
                  <FillBar
                    value={hero?.modifier.health ?? 0}
                    color="green"
                    maxValue={hero?.modifier.maxHealth ?? 0}
                  />
                  <FillBar
                    value={hero?.modifier.mana ?? 0}
                    color="blue"
                    maxValue={hero?.modifier.maxMana ?? 0}
                  />
                </div>
              </div>
            </div>

            {/* //INVENTORY */}
            <div className=" flex-1">
              <ul className="flex flex-wrap gap-1">
                {[...Array(hero?.inventorySlots)].map((_, idx) => (
                  <div key={idx} className="size-12 border ">
                    {hero?.inventorys[idx] && (
                      <GameItemCard
                        isSelected={false}
                        item={hero?.inventorys[idx].gameItem!}
                      />
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </section>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30}>
          <ScrollArea className="h-full ">
            <section className="flex flex-col h-full   p-6 ">
              <span className="font-semibold mx-auto">CHAT</span>
            </section>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
};
