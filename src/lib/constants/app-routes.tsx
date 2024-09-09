import { AuthGuard } from '@/components/AuthGuard';
import { ConversationsSidebar } from '@/components/ConversationsSidebar';
import { Game } from '@/components/Game/Game';
import MainLayout from '@/components/MainLayout';
import { UserProfilePhoto } from '@/components/UserProfilePhoto';
import { UserProfilePost } from '@/components/UserProfilePost';
import { LoginForm } from '@/components/forms/LoginForm';
import { NewPasswordForm } from '@/components/forms/NewPasswordForm';
import { ResetPasswordForm } from '@/components/forms/ResetPasswordForm';
import { ConversationsPageById } from '@/components/pages/ConversationsPageById';
import { FavoritePostsPage } from '@/components/pages/FavoritePosts';
import { LoginPage } from '@/components/pages/LoginPage';
import { NotFoundPage } from '@/components/pages/NotFoundPage';
import { PostsPage } from '@/components/pages/PostsPage';
import { PostsPageById } from '@/components/pages/PostsPageById';
import { RegisterPage } from '@/components/pages/RegisterPage';
import { SuccessResetPassPage } from '@/components/pages/SuccessResetPassPage';
import { UserProfilePage } from '@/components/pages/UserProfilePage';
import { SocketProvider } from '@/components/providers/SocketProvider';

export const appRoutes = [
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
        path: '/favorite-posts',
        element: <FavoritePostsPage />,
      },
      {
        path: '/game',
        element: <Game />,
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
        path: '',
        element: <LoginForm />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordForm />,
      },
      {
        path: 'new-password',
        element: <NewPasswordForm />,
      },
      {
        path: 'success-reset',
        element: <SuccessResetPassPage />,
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
];
