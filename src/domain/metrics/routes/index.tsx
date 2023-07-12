import { lazy } from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'

const TransactionMetricsView = lazy(async () => import('../view/Transaction'))

const metricsRoutes: RouteObject[] = [
  {
    path: Routes.transactionMetrics,
    element: <TransactionMetricsView />,
  },
]

export default metricsRoutes
