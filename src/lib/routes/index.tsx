import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import { authRoutes } from '../../domain/auth/routes'
import NotFoundPage from '../../domain/error/view/404'

export const Routes = {
  home: '/home',
  login: '/login',
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  ...authRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
