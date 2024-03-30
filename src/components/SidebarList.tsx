import { cn } from '@/lib/utils';
import {
  NewspaperIcon,
  UserRoundSearchIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from './ui/button';

const sidebarData = [
  {
    name: 'Posts',
    to: '/posts',
    id: 1,
    icon: <NewspaperIcon className="size-5" />,
  },
  {
    name: 'Followers',
    to: '/followers',
    id: 2,
    icon: <UsersRoundIcon className="size-5" />,
  },
  {
    name: 'Following',
    to: '/Following',
    icon: <UserRoundSearchIcon className="size-5" />,
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
              { 'text-primary': pathname === data.to },
            )}
          >
            <Link to={data.to}>
              {data.icon}
              <span className="md:block hidden">{data.name}</span>
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
};
