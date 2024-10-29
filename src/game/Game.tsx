import { useSocket } from '@/components/providers/SocketProvider';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';
import { useGetMyHeroQuery } from '@/lib/services/game/heroApi';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Chat } from './_components/Chat';
import { GameNavbar } from './_components/GameNavbar';
import { HeroInventory } from './_components/HeroInventory';
import { HeroModifiers } from './_components/HeroModifiers';
import { Paperdoll } from './_components/Paperdoll';
import { SysMessage } from './_components/SysMessage';
import { useHealthManaRegen } from '@/hooks/useHealthManaRegen';

export const Game = () => {
  const navigate = useNavigate();
  const { username } = useAuth();
  const { pathname } = useLocation();
  const { socket } = useSocket();
  const { data: hero, isLoading, isError } = useGetMyHeroQuery();
  const heroState = useAppSelector((state) => state.hero.hero);
  const {health,mana} = useHealthManaRegen()

  if (isLoading) {
    return 'loading...';
  }
  if (isError) {
    return <div>Error loading data</div>;
  }
  if (!heroState) {
    navigate('/create-hero');
    return;
  }
  return (
    <section className="flex flex-col h-full font-roboto  ">
      <GameNavbar />

      <ResizablePanelGroup direction="vertical" className="   ">
        <ResizablePanel defaultSize={70}>
          {pathname === '/game' ? (
            <section className="flex sm:flex-row flex-col md:p-5 p-3 gap-3">
              {/* //HERO BLOCK */}
              <Paperdoll hero={heroState} />

              <HeroModifiers />

              {/* //INVENTORY */}
              <div className=" flex-1">
                <HeroInventory />
              </div>
            </section>
          ) : (
            <Outlet />
          )}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30} className="flex">
          <Chat />
          <SysMessage />
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
};
