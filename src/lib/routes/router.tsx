import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import { Routes } from '.'
import { authRoutes } from '../../domain/auth/routes'
import clientsRoutes from '../../domain/client/routes'
import NotFoundPage from '../../domain/error/view/404'
import homeRoutes from '../../domain/home/routes'
import PageLayout from '../../shared/components/layout'
import { ProtectedRoute } from '../../shared/components/Routers'

export const protectedRoutes: RouteObject = {
  path: '/',
  element: (
    <ProtectedRoute>
      <PageLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      element: <Navigate to={Routes.home} />,
      index: true,
    },
    ...homeRoutes,
    ...clientsRoutes,
  ],
}

export const publicRoutes: RouteObject[] = [...authRoutes]

export const appRoutes: RouteObject[] = [
  ...publicRoutes,
  protectedRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

const router = createBrowserRouter(appRoutes)

export default router
