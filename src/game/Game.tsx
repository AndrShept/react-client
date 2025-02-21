import { ErrorLoadingData } from '@/components/ErrorLoadingData';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useHealthManaRegen } from '@/hooks/game/useHealthManaRegen';
import { useSocketListener } from '@/hooks/game/useSocketListener';
import { useAppSelector } from '@/hooks/store';
import { useGetAllDungeonsSessionInStatusQuery } from '@/lib/services/game/dungeonApi';
import {
  useGetMyHeroQuery,
  useLazyGetMyHeroQuery,
} from '@/lib/services/game/heroApi';
import { SessionStatus } from '@/lib/types/game.types';
import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Chat } from './_components/Chat';
import { GameNavbar } from './_components/GameNavbar';
import { HeroInventory } from './_components/HeroInventory';
import { HeroModifiers } from './_components/HeroModifiers';
import { Paperdoll } from './_components/Paperdoll';
import { SysMessage } from './_components/SysMessage';

export const Game = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoading, isError, error } = useGetMyHeroQuery();
  const [refetchData] = useLazyGetMyHeroQuery();
  const hero = useAppSelector((state) => state.hero.hero);
  useGetAllDungeonsSessionInStatusQuery(SessionStatus.INPROGRESS);
  useHealthManaRegen();
  useSocketListener();

  if (isLoading) {
    return 'loading...';
  }

  if (error && 'status' in error && error.status === 404) {
    navigate('/create-hero');
  }
  if (isError) {
    return <ErrorLoadingData refetchData={() => refetchData()} />;
  }
  return (
    <section className="flex flex-col h-full font-roboto  ">
      <Toaster />
      <GameNavbar />

      <ResizablePanelGroup direction="vertical" className="   ">
        <ResizablePanel defaultSize={70}>
          {pathname === '/game' ? (
            <section className="flex sm:flex-row flex-col md:p-5 p-3 gap-3">
              {/* //HERO BLOCK */}
              <Paperdoll hero={hero!} />

              <HeroModifiers />

              {/* //INVENTORY */}
              <div className=" flex-1">
                <HeroInventory />
              </div>
            </section>
          ) : (
            <div className="size-full flex ">
              <Outlet />
            </div>
          )}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30} className="flex ">
          <Chat />
          <SysMessage />
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
};
