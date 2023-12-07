import * as Sentry from '@sentry/react'
import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  Navigate,
  useLocation,
  useNavigationType,
  type RouteObject,
} from 'react-router-dom'
import { Routes } from '.'
import { authRoutes } from '../../domain/auth/routes'
import clientsRoutes from '../../domain/client/routes'
import coffeeRoutes from '../../domain/coffee/routes'
import NotFoundPage from '../../domain/error/view/404'
import fertilizerRoutes from '../../domain/fertilizer/routes'
import metricsRoutes from '../../domain/metrics/routes'
import systemRoutes from '../../domain/system/routes'
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
    ...systemRoutes,
    ...metricsRoutes,
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

Sentry.init({
  dsn: 'https://4b8f43bac6d248c487eb0ca4396014a5@o1073411.ingest.sentry.io/6072936',
  integrations: [
    new Sentry.BrowserTracing({
      // See docs for support of different versions of variation of react router
      // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
    new Sentry.Replay(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter)

const router = sentryCreateBrowserRouter(appRoutes)

export default router
