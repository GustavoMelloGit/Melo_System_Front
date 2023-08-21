import { lazy } from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'

const TransactionMetricsView = lazy(async () => import('../view/Transaction'))
const MetricsHubView = lazy(async () => import('../view/Hub'))
const BuyCoffeeMetricsView = lazy(async () => import('../view/BuyCoffee'))
const CoffeePriceMetricsView = lazy(async () => import('../view/CoffeePrice'))

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
]

export default metricsRoutes
