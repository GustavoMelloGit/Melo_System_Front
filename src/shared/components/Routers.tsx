import { Flex } from '@chakra-ui/react'
import { type PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../../domain/auth/hooks/useAuth'
import { Routes } from '../../lib/routes'
import useLocalStorage from '../hooks/useLocalStorage'
import { SuspenseLoader } from './Suspense'

export const ProtectedRoute = ({ children }: PropsWithChildren): JSX.Element => {
  const { appInitialized } = useAuth()
  const { getValue } = useLocalStorage('@melo-system:token')
  const token = getValue()
  if (!appInitialized) {
    return (
      <Flex minH='100vh' minW='100vw'>
        <SuspenseLoader />
      </Flex>
    )
  }
  if (!token) {
    return <Navigate to={Routes.login} />
  }
  return <>{children}</>
}

export const UnprotectedRoute = ({ children }: PropsWithChildren): JSX.Element => {
  const { appInitialized } = useAuth()
  const { getValue } = useLocalStorage('@melo-system:token')
  const token = getValue()

  if (appInitialized && token) {
    return <Navigate to={Routes.home} />
  }
  return <>{children}</>
}
