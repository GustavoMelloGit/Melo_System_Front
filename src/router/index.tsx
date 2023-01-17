import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { authRoutes } from '../domain/auth/routes'
import { ProtectedRoute } from '../lib/components/Routers'
import { Routes } from './routes'

const router = createBrowserRouter([
  {
    path: Routes.home,
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  ...authRoutes,
])

export default router
