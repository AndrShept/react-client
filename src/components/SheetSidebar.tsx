import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { ConversationList } from './ConversationList';
import { Sidebar } from './Sidebar';

interface SheetSidebarProps {
  children: ReactNode;
}

export const SheetSidebar = ({ children }: SheetSidebarProps) => {
  const isMobile = useMediaQuery('(min-width: 768px)');
  const { pathname } = useLocation();

  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    if (isMobile) {
      setIsShow(false);
    }
  }, []);
  return (
    <Sheet open={isShow} onOpenChange={setIsShow}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="w-fit p-0  flex gap-0" side={'left'}>
        <Sidebar />

        {pathname.includes('conversations') && <ConversationList />}
      </SheetContent>
    </Sheet>
  );
};
