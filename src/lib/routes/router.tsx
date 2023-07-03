import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import { Routes } from '.'
import { authRoutes } from '../../domain/auth/routes'
import clientsRoutes from '../../domain/client/routes'
import coffeeRoutes from '../../domain/coffee/routes'
import NotFoundPage from '../../domain/error/view/404'
import fertilizerRoutes from '../../domain/fertilizer/routes'
import PageLayout from '../../shared/components/layout'
import { ProtectedRoute } from '../../shared/components/Routers'

export const protectedRoutes: RouteObject = {
  path: '/',
  element: (
    <ProtectedRoute>
      <PageLayout />
    </ProtectedRoute>
  ),
  errorElement: <Navigate to={Routes.notFound} />,
  children: [
    {
      element: <Navigate to={Routes.clients} />,
      index: true,
    },
    ...clientsRoutes,
    ...coffeeRoutes,
    ...fertilizerRoutes,
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
