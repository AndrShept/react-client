import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

import { ProfileAvatar } from './ProfileAvatar';
import { Button } from './ui/button';

export const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="h-14 w-full fixed z-50 flex justify-between top-0 bg-secondary/50 border-b  p-2 backdrop-blur-md ">
      <Button className="font-semibold" asChild variant={'ghost'}>
        <Link to={'/'}>SOCIAL MEDIA</Link>
      </Button>

      {isAuthenticated && <ProfileAvatar />}
    </header>
  );
};
