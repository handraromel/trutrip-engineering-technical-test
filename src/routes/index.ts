import { Route } from '@/types';
import { lazy } from 'react';

const HomePage = lazy(() => import('@/pages/Main/Home'));
const NotFound = lazy(() => import('@/pages/Main/NotFound'));
const UserView = lazy(() => import('@/pages/User'));

export const routes: Route[] = [
  {
    path: '/home',
    element: HomePage,
  },
  {
    path: '/users',
    element: UserView,
  },
];

export { HomePage, NotFound };
