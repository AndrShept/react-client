import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AuthGuard } from './components/AuthGuard.tsx';
import { ConversationsSidebar } from './components/ConversationsSidebar.tsx';
import MainLayout from './components/MainLayout.tsx';
import { UserProfilePhoto } from './components/UserProfilePhoto.tsx';
import { UserProfilePost } from './components/UserProfilePost.tsx';
import { LoginForm } from './components/forms/LoginForm.tsx';
import { ResetPasswordForm } from './components/forms/ResetPasswordForm.tsx';
import { ConversationsPageById } from './components/pages/ConversationsPageById.tsx';
import ErrorPage from './components/pages/ErrorPage.tsx';
import { FavoritePostsPage } from './components/pages/FavoritePosts.tsx';
import { FollowersPage } from './components/pages/FollowersPage.tsx';
import { FollowingsPage } from './components/pages/FollowingsPage.tsx';
import { LoginPage } from './components/pages/LoginPage.tsx';
import { NotFoundPage } from './components/pages/NotFoundPage.tsx';
import { PostsPage } from './components/pages/PostsPage.tsx';
import { PostsPageById } from './components/pages/PostsPageById.tsx';
import { RegisterPage } from './components/pages/RegisterPage.tsx';
import { UserProfilePage } from './components/pages/UserProfilePage.tsx';
import { SocketProvider } from './components/providers/SocketProvider.tsx';
import { ThemeProvider } from './components/providers/ThemeProvider.tsx';
import './index.css';
import { store } from './lib/redux/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard>
        <SocketProvider>
          <MainLayout />
        </SocketProvider>
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
        path: '/favorite-posts',
        element: <FavoritePostsPage />,
      },
      {
        path: '/users/:username',
        element: <UserProfilePage />,
        children: [
          {
            path: 'photos',
            element: <UserProfilePhoto />,
          },
          {
            path: 'posts',
            element: <UserProfilePost />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    children: [
      {
        path: 'reset-password',
        element: <ResetPasswordForm />,
      },
      {
        path: '',
        element: <LoginForm />,
      },
    ],
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
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
  </Provider>,
);
