import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useGetMyHeroQuery } from '@/lib/services/game/heroApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ScrollArea } from '../ui/scroll-area';
import { GameNavbar } from './_components/GameNavbar';

export const Game = () => {
  const { data: hero, isLoading } = useGetMyHeroQuery();
  console.log(hero);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !hero) {
      navigate('/create-hero');
    }
  }, [hero, isLoading]);

  if (isLoading) {
    return 'loading...';
  }
  return (
    <section className="flex flex-col h-full ">
      <GameNavbar />

      <ResizablePanelGroup direction="vertical" className="   ">
        <ResizablePanel defaultSize={70}>
          <section className="h-full flex">
            {/* //HERO BLOCK */}
            <div className=" flex-1"></div>

            {/* //INVENTORY */}
            <div className=" flex-1"> </div>
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
