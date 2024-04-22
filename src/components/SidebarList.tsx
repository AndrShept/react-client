import { cn } from '@/lib/utils';
import {
  HomeIcon,
  MessageCircleIcon,
  NewspaperIcon,
  UserRoundSearchIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from './ui/button';

const sidebarData = [
  {
    name: 'Home',
    to: '/',
    id: 6,
    icon: HomeIcon,
  },
  {
    name: 'Posts',
    to: '/posts',
    id: 1,
    icon: NewspaperIcon,
  },
  {
    name: 'Messages',
    to: '/conversations',
    id: 10,
    icon: MessageCircleIcon,
  },
  {
    name: 'Followers',
    to: '/followers',
    id: 2,
    icon: UsersRoundIcon,
  },
  {
    name: 'Following',
    to: '/Following',
    icon: UserRoundSearchIcon,
    id: 3,
  },
];

export const SidebarList = () => {
  
  const { pathname } = useLocation();
  return (
    <ul className="flex flex-col p-2 gap-1">
      {sidebarData.map((data) => (
        <li key={data.id}>
          <Button
            variant={pathname === data.to ? 'secondary' : 'ghost'}
            asChild
            className={cn(
              'flex md:justify-start  gap-2 text-muted-foreground md:h-14 h-12',
              {
                'text-primary': pathname === data.to,

              },
            )}
          >
            <Link to={data.to}>
              <data.icon className="size-5" />
              <span className="md:block hidden">{data.name}</span>
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
};
