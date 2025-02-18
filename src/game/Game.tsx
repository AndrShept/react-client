import { ErrorLoadingData } from '@/components/ErrorLoadingData';
import { useSocket } from '@/components/providers/SocketProvider';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useHealthManaRegen } from '@/hooks/game/useHealthManaRegen';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';
import { useLazyGetAllDungeonsSessionInStatusQuery } from '@/lib/services/game/dungeonApi';
import {
  useGetMyHeroQuery,
  useLazyGetMyHeroQuery,
  useUpdateHeroMutation,
} from '@/lib/services/game/heroApi';
import { Hero, SessionStatus } from '@/lib/types/game.types';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Chat } from './_components/Chat';
import { GameNavbar } from './_components/GameNavbar';
import { HeroInventory } from './_components/HeroInventory';
import { HeroModifiers } from './_components/HeroModifiers';
import { showInviteToPartyToast } from './_components/InviteToPartyToast';
import { Paperdoll } from './_components/Paperdoll';
import { SysMessage } from './_components/SysMessage';

export const Game = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { socket } = useSocket();
  const { isLoading, isError, error } = useGetMyHeroQuery();
  const [refetchData] = useLazyGetMyHeroQuery();
  const { health, mana } = useHealthManaRegen();
  const heroState = useAppSelector((state) => state.hero.hero);
  const heroId = useAppSelector((state) => state.hero.hero?.id);
  const [refetchDungeonSessionStatus, { isLoading: isLoadingDungeonStatus }] =
    useLazyGetAllDungeonsSessionInStatusQuery();
  useEffect(() => {
    if (!socket) return;
    const socketLister = (partyLeader: Hero, cb: any) => {
      showInviteToPartyToast(partyLeader, heroId, cb);

      // setTimeout(() => {
      //   cb({
      //     accepted: false,
      //     message: 'asdadsa',
      //   });
      // }, 10000);
    };

    socket.on(`invite-party-${heroId}`, socketLister);
    socket.on(`sys-msg-${heroId}`, async (data) => {
      console.log(data)
      if (data) {
        try {
          const res = await refetchDungeonSessionStatus(
            SessionStatus.INPROGRESS,
          ).unwrap();
          console.log(res);
        } catch (error) {
          console.error(error);
          toast.error('Something went wrong');
        }
      }
    });

    return () => {
      socket.off(`invite-party-${heroId}`, socketLister);
    };
  }, [heroId, socket]);

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
              <Paperdoll hero={heroState!} />

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
