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


import { GameItemCard } from './_components/GameItemCard';
import { GameNavbar } from './_components/GameNavbar';
import { HeroInventory } from './_components/HeroInventory';
import { Paperdoll } from './_components/Paperdoll';
import { useSocket } from '@/components/providers/SocketProvider';
import { ScrollArea } from '@/components/ui/scroll-area';

export const Game = () => {
  const navigate = useNavigate();
  const { username } = useAuth();
  const { pathname } = useLocation();
  const { socket } = useSocket();
  const { data: hero, isLoading, isError } = useGetMyHeroQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && !hero) {
      navigate('/create-hero');
    }
  }, [hero, isLoading]);

  useEffect(() => {
    console.log(hero);
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
  if (isError) {
    return <div>Error loading data</div>;
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
                <HeroInventory />
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
        <Outlet />
      )}
    </section>
  );
};
