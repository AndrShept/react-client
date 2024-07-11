import { useAppSelector } from '@/hooks/store';
import { useGetAllConversationQuery } from '@/lib/services/conversationApi';
import { cn } from '@/lib/utils';
import {
  BookmarkIcon,
  HomeIcon,
  MessageCircleIcon,
  NewspaperIcon,
  UserRoundSearchIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { NotReadCountBadge } from './NotReadCountBadge';
import { Button } from './ui/button';

const sidebarData = [
  {
    name: 'Home',
    to: '/',
    id: 1,
    icon: HomeIcon,
  },

  {
    name: 'Messages',
    to: '/conversations',
    id: 2,
    icon: MessageCircleIcon,
  },
  {
    name: 'Followers',
    to: '/followers',
    id: 3,
    icon: UsersRoundIcon,
  },
  {
    name: 'Following',
    to: '/Following',
    icon: UserRoundSearchIcon,
    id: 4,
  },
  {
    name: 'Favorite',
    to: '/favorite-posts',
    icon: BookmarkIcon,
    id: 5,
  },
];

export const SidebarList = () => {
  const { isLoading } = useGetAllConversationQuery();
  const sumNotReadMessageCount = useAppSelector(
    (state) => state.conversation.sumNotReadMessageCount,
  );
  const { pathname } = useLocation();
  return (
    <ul className="flex flex-col p-2 gap-1">
      {sidebarData.map((data) => (
        <li className="relative" key={data.id}>
          <Button
            variant={pathname === data.to ? 'secondary' : 'ghost'}
            asChild
            className={cn(
              'flex md:justify-start  gap-2 text-muted-foreground xl:h-14 h-12',
              {
                'text-primary': pathname === data.to,
                'bg-secondary text-primary':
                  pathname.includes('/conversations') && data.id === 10,
              },
            )}
          >
            <Link to={data.to}>
              <data.icon className="size-5" />
              <span className="xl:block hidden">{data.name}</span>
            </Link>
          </Button>
          {!!sumNotReadMessageCount &&
            data.name === 'Messages' &&
            !isLoading && (
              <NotReadCountBadge
                classname="absolute -right-[7px] -top-[7px] scale-[85%] ring-[2px] ring-background/60"
                notReadMessageCount={sumNotReadMessageCount}
              />
            )}
        </li>
      ))}
    </ul>
  );
};
