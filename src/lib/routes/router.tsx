import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { Routes } from '.'
import { authRoutes } from '../../domain/auth/routes'
import NotFoundPage from '../../domain/error/view/404'
import homeRoutes from '../../domain/home/routes'
import HomePage from '../../domain/home/view'
import { ProtectedRoute } from '../../shared/components/Routers'

export const protectedRoutes: RouteObject[] = [
  ...homeRoutes,
  {
    path: Routes.clients,
    element: <HomePage />,
  },
].map((route) => ({ ...route, element: <ProtectedRoute>{route.element}</ProtectedRoute> }))

export const publicRoutes: RouteObject[] = [...authRoutes]

export const appRoutes: RouteObject[] = [
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

const router = createBrowserRouter(appRoutes)

export default router
