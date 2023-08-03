import { lazy } from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'

const TransactionMetricsView = lazy(async () => import('../view/Transaction'))
const MetricsHubView = lazy(async () => import('../view/Hub'))

const metricsRoutes: RouteObject[] = [
  {
    path: Routes.transactionMetrics,
    element: <TransactionMetricsView />,
  },
  {
    path: Routes.metricsHub,
    element: <MetricsHubView />,
  },
]

export default metricsRoutes
