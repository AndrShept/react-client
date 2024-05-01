import { useAuth } from '@/hooks/useAuth';
import { MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ProfileAvatar } from './ProfileAvatar';
import { SheetSidebar } from './SheetSidebar';
import { Button } from './ui/button';

export const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="h-14 w-full fixed z-50 flex justify-between top-0 bg-secondary/50 border-b  p-2 backdrop-blur-md ">
      <div className="flex items-center">
        <SheetSidebar>
          <Button className="flex md:hidden" variant={'ghost'} size={'icon'}>
            <MenuIcon />
          </Button>
        </SheetSidebar>

        <Button className="font-semibold" asChild variant={'ghost'}>
          <Link to={'/'}>SOCIAL MEDIA</Link>
        </Button>
      </div>

      {isAuthenticated && <ProfileAvatar />}
    </header>
  );
};
