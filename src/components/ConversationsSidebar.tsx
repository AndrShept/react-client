import { cn } from '@/lib/utils';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { ConversationList } from './ConversationList';

export const ConversationsSidebar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <aside className={cn(' h-[calc(100vh-56px)] flex ', {})}>
      {!isMobile && <ConversationList />}
      <div className="flex-1 ">
        <Outlet />
      </div>
    </aside>
  );
};
