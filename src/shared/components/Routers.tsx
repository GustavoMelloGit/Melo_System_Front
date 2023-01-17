import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../../domain/auth/hooks/useAuth'
import { Routes } from '../../lib/routes'

export const ProtectedRoute = ({ children }: PropsWithChildren): JSX.Element => {
  const { user } = useAuth()
  if (!user?.isAuthenticated) {
    return <Navigate to={Routes.login} />
  }
  return <>{children}</>
}

export const UnprotectedRoute = ({ children }: PropsWithChildren): JSX.Element => {
  const { user } = useAuth()
  if (user?.isAuthenticated) {
    return <Navigate to={Routes.home} />
  }
  return <>{children}</>
}
