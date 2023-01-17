import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import SigninView from '../domain/auth/view/SignIn/View'
import PageLayout from '../lib/components/layout'

const RouteWithLayout = (element: JSX.Element): JSX.Element => {
  return <PageLayout>{element}</PageLayout>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: RouteWithLayout(<App />),
  },
  {
    path: '/signin',
    element: RouteWithLayout(<SigninView />),
  },
])

export default router
