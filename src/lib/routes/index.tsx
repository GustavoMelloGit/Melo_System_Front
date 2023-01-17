import { createBrowserRouter } from 'react-router-dom'
import { authRoutes } from '../../domain/auth/routes'
import NotFoundPage from '../../domain/error/view/404'
import PageLayout from '../components/layout'
import Root from './Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: (
      <PageLayout>
        <NotFoundPage />
      </PageLayout>
    ),
  },
  ...authRoutes,
])

export default router
