import { useAppSelector } from '@/hooks/store';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { Navbar } from './Header';
import { Sidebar } from './Sidebar';
import { UsersBar } from './UsersBar';
import { HomePage } from './pages/HomePage';

function App() {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);
  return (
    <section className="flex flex-col h-full w-full  ">
      <Navbar />
      <div className=" flex-1 flex">
        {!isMobile && <Sidebar />}
        <div
          className={cn('flex-1 flex flex-col mt-[56px]    ', {
            'max-w-[900px] md:p-4 p-2 mx-auto  ':
              !pathname.includes('/conversations'),
          })}
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
