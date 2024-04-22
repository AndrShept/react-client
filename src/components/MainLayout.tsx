import { useAppSelector } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';
import { cn, socket } from '@/lib/utils';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Navbar } from './Header';
import { SidebarList } from './SidebarList';
import { UsersBar } from './UsersBar';
import { ConversationsPage } from './pages/ConversationsPage';
import { HomePage } from './pages/HomePage';

function App() {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const { userId } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // socket.on('connection', () => {

    // });
    setTimeout(() => {
      socket.emit('userId', userId);
    }, 200);
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [userId]);

  return (
    <section className="flex flex-col h-full w-full  ">
      <Navbar />
      <div className=" flex-1 flex">
        <aside className=" h-[calc(100vh-56px)] md:w-[200px] w-15 bg-secondary/50 sticky top-[56px] border-r">
          <SidebarList />
        </aside>
        <div
          className={cn(
            'flex-1 flex flex-col mt-[56px]    ',
            {
              'max-w-[900px] md:p-4 p-2 mx-auto  ': !pathname.includes('/conversations'),
            },
          )}
        >
          {pathname === '/' && <HomePage />}
          {pathname !== '/' && <Outlet />}
        </div>
        <aside className="h-[calc(100vh-56px)] w-[260px] lg:flex hidden bg-secondary/50 sticky top-[56px] border-l p-2">
          <UsersBar />
        </aside>
      </div>
    </section>
  );
}

export default App;
