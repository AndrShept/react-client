import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';
import {
  decrementNotReadCount,
  incrementNotReadCount,
} from '@/lib/redux/conversationSlice';
import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { Navbar } from './Header';
import { PhotoModal } from './PhotoModal';
import { PostModal } from './PostModal';
import { Sidebar } from './Sidebar';
import { UsersBar } from './UsersBar';
import { HomePage } from './pages/HomePage';
import { useSocket } from './providers/SocketProvider';

function App() {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  const { userId } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const socketListener = (
      message: Message & { type: 'create' | 'delete' | 'update' },
    ) => {
      if (message.type === 'create') {
        dispatch(
          incrementNotReadCount({
            conversationId: message.conversationId,
          }),
        );
      }
      if (message.type === 'delete' && !message.isRead) {
        dispatch(
          decrementNotReadCount({
            conversationId: message.conversationId,
          }),
        );
      }
    };
    socket?.on(userId as string, socketListener);

    return () => {
      socket?.off(userId as string, socketListener);
    };
  }, [userId, socket]);
  return (
    <section className="flex flex-col h-full w-full  ">
      <Navbar />
      <div className=" flex-1 flex">
        {!isMobile && <Sidebar />}
        <div
          className={cn('flex-1 flex flex-col mt-[56px] mx-auto    ', {
            'max-w-[900px] md:p-4 p-2    ':
              !pathname.includes('/conversations') &&
              !pathname.includes('/game'),
          })}
        >
          {pathname === '/' && <HomePage />}
          {pathname !== '/' && <Outlet />}
        </div>
        {!pathname.includes('game') && (
          <aside className="h-[calc(100vh-56px)] w-[260px] lg:flex hidden bg-secondary/50 sticky top-[56px] border-l p-2">
            <UsersBar />
          </aside>
        )}
      </div>
      {state?.mode === 'post' && <PostModal />}
      {state?.mode === 'photo' && <PhotoModal />}
    </section>
  );
}

export default App;
