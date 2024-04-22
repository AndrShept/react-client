import {
  useDeleteConversationMutation,
  useGetAllConversationQuery,
} from '@/lib/services/conversationApi';
import { cn, dateFnsLessTime } from '@/lib/utils';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { Search } from '../Search';
import { UserAvatar } from '../UserAvatar';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

export const ConversationsPage = () => {
  const { data: conversations, isLoading } = useGetAllConversationQuery();
  const [deleteConversations] = useDeleteConversationMutation();
  const { pathname } = useLocation();
  console.log(conversations);

  if (isLoading) {
    return <div>LAODING....</div>;
  }

  if (!conversations?.length)
    return (
      <div>
        conversations not found
        <Button onClick={() => deleteConversations()}>delete</Button>
      </div>
    );

  return (
    <section className="flex h-[calc(100vh-56px)]">
      <div className="flex flex-col gap-3 max-w-[300px] bg-secondary/40 ">
        <div className="flex flex-col gap-4 md:p-5 p-3  ">
          <p>Messages</p>
          <Search placeholder="search" />
        </div>
        <Separator />
        <ScrollArea className="pr-2">
          <ul className="flex flex-col gap-2  overflow-auto md:pl-5 md:pr-3 pl-3 pr-1">
            {conversations.map((conversation) => (
              <Link to={`/conversations/${conversation.id}`}>
                <li
                  className={cn(
                    'p-4 rounded-xl border hover:bg-secondary/60 cursor-pointer transition',
                    {
                      'bg-secondary/80 hover:bg-secondary/80':
                        pathname === `/conversations/${conversation.id}`,
                    },
                  )}
                >
                  <UserAvatar
                    avatarUrl={conversation.receiverUser.avatarUrl}
                    username={conversation.receiverUser.username}
                    isOnline={conversation.receiverUser.isOnline}
                    badge={true}
                  />
                  <time className="text-muted-foreground text-xs">
                    {dateFnsLessTime(conversation.createdAt)}
                  </time>
                </li>
              </Link>
            ))}
            {/* <Button onClick={() => deleteConversations()}>delete</Button> */}
          </ul>
        </ScrollArea>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </section>
  );
};
