import { Outlet } from 'react-router-dom';

import { SidebarList } from './SidebarList';

function App() {
  return (
    <section className="flex flex-col h-full w-full ">
      <header className="h-14 w-full sticky top-0 bg-secondary/50 border-b "></header>
      <div className=" flex-1 flex">
        <aside className="inset-0 md:w-[200px] w-15 bg-secondary/50 sticky top-0 border-r">
          <SidebarList />
        </aside>
        <div className="flex-1 md:p-4 p-2 ">
          <Outlet />
        </div>
        <aside className="inset-0 w-[200px] md:flex hidden bg-secondary/50 sticky top-0 border-l"></aside>
      </div>
    </section>
  );
}

export default App;
