import { Flex } from '@chakra-ui/react';
import { type PropsWithChildren } from 'react';
import useAuth from '../../domain/auth/hooks/useAuth';
import { SuspenseLoader } from './Suspense';

export const ProtectedRoute = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const { user, appInitialized } = useAuth();
  if (!appInitialized) {
    return (
      <Flex minH='100vh' minW='100vw'>
        <SuspenseLoader />
      </Flex>
        )
  }
  // if (!user?.isAuthenticated) {
  //   return <Navigate to={Routes.login} />;
  // }
  return <>{children}</>;
};

export const UnprotectedRoute = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const { user } = useAuth();
  // if (user?.isAuthenticated) {
  //   return <Navigate to={Routes.home} />;
  // }
  return <>{children}</>;
};
