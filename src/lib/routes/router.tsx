import { createBrowserRouter } from 'react-router-dom'
import { Routes } from '.'
import { authRoutes } from '../../domain/auth/routes'
import NotFoundPage from '../../domain/error/view/404'
import HomePage from '../../domain/home'
import { ProtectedRoute } from '../../shared/components/Routers'

const router = createBrowserRouter([
  ...authRoutes,
  {
    path: Routes.home,
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
