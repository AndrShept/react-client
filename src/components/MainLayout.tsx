import { useAppSelector } from '@/hooks/store';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Navbar } from './Header';
import { SidebarList } from './SidebarList';
import { UsersBar } from './UsersBar';
import { HomePage } from './pages/HomePage';

function App() {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);

  return (
    <section className="flex flex-col h-full w-full  ">
      <Navbar />
      <div className=" flex-1 flex">
        <aside className=" h-[calc(100vh-56px)] md:w-[200px] w-15 bg-secondary/50 sticky top-[56px] border-r">
          <SidebarList />
        </aside>
        <div className="flex-1 flex flex-col md:p-4 p-2 mx-auto mt-[56px]   max-w-[900px] ">
          {pathname === '/' ? <HomePage /> : <Outlet />}
        </div>
        <aside className="h-[calc(100vh-56px)] w-[260px] lg:flex hidden bg-secondary/50 sticky top-[56px] border-l p-2">
          <UsersBar />
        </aside>
      </div>
    </section>
  );
}

export default App;
