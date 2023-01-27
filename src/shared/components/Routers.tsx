import { type PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../domain/auth/hooks/useAuth';
import { Routes } from '../../lib/routes';
import Suspense from './Suspense';

export const ProtectedRoute = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const { user, appInitialized } = useAuth();
  if (!appInitialized) {
    return <Suspense />;
  }
  if (!user?.isAuthenticated) {
    return <Navigate to={Routes.login} />;
  }
  return <>{children}</>;
};

export const UnprotectedRoute = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const { user } = useAuth();
  if (user?.isAuthenticated) {
    return <Navigate to={Routes.home} />;
  }
  return <>{children}</>;
};
