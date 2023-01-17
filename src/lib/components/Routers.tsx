import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../../domain/auth/hooks/useAuth'
import { Routes } from '../routes'
import PageLayout from './layout'

export const RouteWithLayout = ({ children }: PropsWithChildren): JSX.Element => {
  return <PageLayout>{children}</PageLayout>
}

export const ProtectedRoute = ({ children }: PropsWithChildren): JSX.Element => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to={Routes.login} />
  }
  return <RouteWithLayout>{children}</RouteWithLayout>
}

export const UnprotectedRoute = ({ children }: PropsWithChildren): JSX.Element => {
  const { user } = useAuth()
  if (user) {
    return <Navigate to={Routes.home} />
  }
  return <RouteWithLayout>{children}</RouteWithLayout>
}
