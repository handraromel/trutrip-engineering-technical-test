import React, { lazy } from 'react';

export interface Route {
  path: string;
  element: React.ComponentType;
}
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
