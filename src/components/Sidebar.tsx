import { cn } from '@/lib/utils';
import { useMediaQuery } from 'usehooks-ts';

import { SidebarList } from './SidebarList';

export const Sidebar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <aside
      className={cn(
        ' h-[calc(100vh-56px)] xl:w-[200px] w-15 bg-secondary/50 sticky top-[56px] border-r ',
        {
          'h-screen pt-[56px]': isMobile,
        },
      )}
    >
      <SidebarList />
    </aside>
  );
};
