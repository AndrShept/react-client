import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AuthGuard } from './components/AuthGuard.tsx';
import { ConversationsSidebar } from './components/ConversationsSidebar.tsx';
import MainLayout from './components/MainLayout.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import { ConversationsPageById } from './components/pages/ConversationsPageById.tsx';
import ErrorPage from './components/pages/ErrorPage.tsx';
import { FollowersPage } from './components/pages/FollowersPage.tsx';
import { FollowingsPage } from './components/pages/FollowingsPage.tsx';
import { LoginPage } from './components/pages/LoginPage.tsx';
import { PostsPage } from './components/pages/PostsPage.tsx';
import { PostsPageById } from './components/pages/PostsPageById.tsx';
import { RegisterPage } from './components/pages/RegisterPage.tsx';
import { UserProfilePage } from './components/pages/UserProfilePage.tsx';
import './index.css';
import { store } from './lib/redux/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),

    // errorElement: <ErrorPage />,

    children: [
      {
        path: '/posts',
        element: <PostsPage />,
      },
      {
        path: '/posts/:postId',
        element: <PostsPageById />,
      },
      {
        path: '/conversations',
        element: <ConversationsSidebar />,
        children: [
          {
            path: '/conversations/:conversationId',
            element: <ConversationsPageById />,
          },
        ],
      },
      {
        path: '/followers',
        element: <FollowersPage />,
      },
      {
        path: '/following',
        element: <FollowingsPage />,
      },
      {
        path: '/users/:username',
        element: <UserProfilePage />,
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
 
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <section className=" h-screen">
          <Toaster richColors />

          <RouterProvider router={router} />
        </section>
      </ThemeProvider>
    </Provider>
 
);
