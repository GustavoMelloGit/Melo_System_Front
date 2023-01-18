import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import { Routes } from '.'
import { authRoutes } from '../../domain/auth/routes'
import NotFoundPage from '../../domain/error/view/404'
import HomePage from '../../domain/home/view'
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
    {
      path: Routes.home,
      element: <HomePage />,
    },
    {
      path: Routes.clients,
      element: <HomePage />,
    },
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
