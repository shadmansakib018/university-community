import type { RouteObject } from 'react-router'
import { AuthCallbackPage } from '@/features/auth/pages/AuthCallbackPage'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage'
import { SignUpPage } from '@/features/auth/pages/SignUpPage'
import { DashboardPage } from '@/features/groups/pages/DashboardPage'
import { GroupPage } from '@/features/groups/pages/GroupPage'
import { PostPage } from '@/features/posts/pages/PostPage'
import { SettingsPage } from '@/features/profile/pages/SettingsPage'
import { DiscoverPage } from '@/features/universities/pages/DiscoverPage'
import { LandingPage } from '@/pages/LandingPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { AppLayout } from './layouts/AppLayout'
import { PublicLayout } from './layouts/PublicLayout'

/**
 * Route table (see docs/ARCHITECTURE.md §5).
 * TODO(M2): wrap the AppLayout branch in <RequireAuth> and the auth pages in <PublicOnlyRoute>.
 */
export const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'auth/callback', element: <AuthCallbackPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'discover', element: <DiscoverPage /> },
      { path: 'groups/:groupId', element: <GroupPage /> },
      { path: 'groups/:groupId/posts/:postId', element: <PostPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]
