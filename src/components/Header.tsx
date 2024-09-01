import { useAuth } from '@/hooks/useAuth';
import { MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { ProfileAvatar } from './ProfileAvatar';
import { SheetSidebar } from './SheetSidebar';
import { UsersBarIcon } from './UsersBarIcon';
import { NotificationIcon } from './icons/NotificationIcon';
import { Button } from './ui/button';

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const isMobile = useMediaQuery('(min-width: 768px)');

  return (
    <header className="h-14 w-full fixed z-50 flex justify-between top-0 bg-secondary/50 border-b  p-2 backdrop-blur-md ">
      <div className="flex items-center">
        <SheetSidebar>
          <Button className="flex md:hidden" variant={'ghost'} size={'icon'}>
            <MenuIcon />
          </Button>
        </SheetSidebar>

        <Button
          className="font-semibold"
          asChild
          variant={'ghost'}
          size={!isMobile ? 'icon' : 'default'}
        >
          <Link to={'/'}>
            <img className="size-7" src="/logo11.png" alt="logo" />

            <span className="md:inline-block hidden ml-2">SOCIAL MEDIA</span>
          </Link>
        </Button>
      </div>

      <div className="flex items-center ">
        <UsersBarIcon />
        <NotificationIcon />
        {isAuthenticated && <ProfileAvatar />}
      </div>
    </header>
  );
};
