import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import { ThemeProvider } from './components/providers/ThemeProvider.tsx';
import './index.css';
import { appRoutes } from './lib/constants/app-routes.tsx';
import { store } from './lib/redux/store.ts';

const router = createBrowserRouter(appRoutes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <section className=" h-screen">
        <Toaster richColors />
        <RouterProvider router={router} />
      </section>
    </ThemeProvider>
  </Provider>,
);
