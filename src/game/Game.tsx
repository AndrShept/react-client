import { useSocket } from '@/components/providers/SocketProvider';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';
import { setHeroModifier } from '@/lib/redux/heroSlice';
import { useGetMyHeroQuery } from '@/lib/services/game/heroApi';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Chat } from './_components/Chat';
import { GameNavbar } from './_components/GameNavbar';
import { HeroInventory } from './_components/HeroInventory';
import { Paperdoll } from './_components/Paperdoll';
import { SysMessage } from './_components/SysMessage';

export const Game = () => {
  const navigate = useNavigate();
  const { username } = useAuth();
  const { pathname } = useLocation();
  const { socket } = useSocket();
  const { data, isLoading, isError } = useGetMyHeroQuery();
  const hero = useAppSelector((state) => state.hero.hero);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (!hero) {
  //     navigate('/create-hero');
  //   }
  // }, [hero]);

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
  if (isError) {
    return <div>Error loading data</div>;
  }
  if (!hero) {
    navigate('/create-hero');
    return;
  }
  return (
    <section className="flex flex-col h-full font-roboto  ">
      <GameNavbar />

      {pathname === '/game' ? (
        <ResizablePanelGroup direction="vertical" className="   ">
          <ResizablePanel defaultSize={70}>
            <section className="flex md:p-5 p-3 gap-3">
              {/* //HERO BLOCK */}
              <Paperdoll hero={hero} />

              {/* //INVENTORY */}
              <div className=" flex-1">
                <HeroInventory />
              </div>
            </section>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} className="flex">
            <Chat />
            <SysMessage />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <Outlet />
      )}
    </section>
  );
};
