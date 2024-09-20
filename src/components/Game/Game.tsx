import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useAppDispatch } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';
import { setHeroModifier } from '@/lib/redux/heroSlice';
import { useGetMyHeroQuery } from '@/lib/services/game/heroApi';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useSocket } from '../providers/SocketProvider';
import { ScrollArea } from '../ui/scroll-area';
import { GameItemCard } from './_components/GameItemCard';
import { GameNavbar } from './_components/GameNavbar';
import { Paperdoll } from './_components/Paperdoll';

export const Game = () => {
  const navigate = useNavigate();
  const { username } = useAuth();
  const { pathname } = useLocation();
  const { socket } = useSocket();
  const { data: hero, isLoading } = useGetMyHeroQuery();
  const dispatch = useAppDispatch();

  console.log(hero);

  useEffect(() => {
    if (!isLoading && !hero) {
      navigate('/create-hero');
    }
  }, [hero, isLoading]);

  useEffect(() => {
    const socketListener = (data: Record<string, number>) => {
      console.log(data);
      dispatch(setHeroModifier(data));
    };
    socket?.on(username!, socketListener);
    return () => {
      socket?.off(username, socketListener);
    };
  }, [socket, username, hero]);
  if (isLoading) {
    return 'loading...';
  }
  return (
    <section className="flex flex-col h-full ">
      <GameNavbar />

      {pathname === '/game' ? (
        <ResizablePanelGroup direction="vertical" className="   ">
          <ResizablePanel defaultSize={70}>
            <section className="h-full flex md:p-5 p-3 gap-3">
              {/* //HERO BLOCK */}
              <Paperdoll />

              {/* //INVENTORY */}
              <div className=" flex-1">
                <ul className="flex flex-wrap gap-1">
                  {[...Array(hero?.inventorySlots)].map((_, idx) => (
                    <div key={idx} className="size-12 border ">
                      {hero?.inventorys[idx] && (
                        <GameItemCard
                          isSelected={false}
                          item={hero?.inventorys[idx].gameItem!}
                          inventoryItemId={hero?.inventorys[idx].id}
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
      ) : (
        <section className="size-full">
          <Outlet />
        </section>
      )}
    </section>
  );
};
