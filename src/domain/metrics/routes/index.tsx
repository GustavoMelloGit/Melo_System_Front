import { lazy } from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'

const TransactionMetricsView = lazy(async () => import('../view/Transaction'))
const MetricsHubView = lazy(async () => import('../view/Hub'))
const BuyCoffeeMetricsView = lazy(async () => import('../view/BuyCoffee'))
const CoffeePriceMetricsView = lazy(async () => import('../view/CoffeePrice'))
const CredoresEDevedoresMetricsView = lazy(async () => import('../view/CredoresDevedores'))
const CredoresDevedoresBebidaMetricsView = lazy(
  async () => import('../view/CredoresDevedoresBebida'),
)
const CredoresDevedoresCafeMetricsView = lazy(async () => import('../view/CredoresDevedoresCafe'))

const metricsRoutes: RouteObject[] = [
  {
    path: Routes.transactionMetrics,
    element: <TransactionMetricsView />,
  },
  {
    path: Routes.metricsHub,
    element: <MetricsHubView />,
  },
  {
    path: Routes.buyCoffeeMetrics,
    element: <BuyCoffeeMetricsView />,
  },
  {
    path: Routes.coffeePrice,
    element: <CoffeePriceMetricsView />,
  },
  {
    path: Routes.credoresDevedoresMetrics,
    element: <CredoresEDevedoresMetricsView />,
  },
  {
    path: Routes.credoresDevedoresBebidaMetrics,
    element: <CredoresDevedoresBebidaMetricsView />,
  },
  {
    path: Routes.credoresDevedoresCafeMetrics,
    element: <CredoresDevedoresCafeMetricsView />,
  },
]

export default metricsRoutes
