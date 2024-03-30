import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './components/App.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import ErrorPage from './components/pages/ErrorPage.tsx';
import { FollowersPage } from './components/pages/FollowersPage.tsx';
import { FollowingsPage } from './components/pages/FollowingsPage.tsx';
import { LoginPage } from './components/pages/LoginPage.tsx';
import { PostsPage } from './components/pages/PostsPage.tsx';
import { RegisterPage } from './components/pages/RegisterPage.tsx';
import './index.css';
import { store } from './lib/redux/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/posts',
        element: <PostsPage />,
      },
      {
        path: '/followers',
        element: <FollowersPage />,
      },
      {
        path: '/following',
        element: <FollowingsPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <section className=" h-screen">
          <RouterProvider router={router} />
        </section>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
