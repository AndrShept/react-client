import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export const Chat = () => {
  return (
    <section className="flex-1 flex-col   pb-1 ">
      <ScrollArea className="h-full">
        <span className="font-semibold mx-auto">CHAT</span>
      </ScrollArea>
    </section>
  );
};
