import MainLayout from '@/layouts/Main';
import { LoadingScreen, NotFound } from '@/pages';
import { routes, Route as RouteType } from '@/routes';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        {routes.map((route: RouteType) => {
          const Page = route.element;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <MainLayout>
                  <Page />
                </MainLayout>
              }
            />
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
