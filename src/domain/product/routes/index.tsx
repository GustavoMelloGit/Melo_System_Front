import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'
const SellProductView = React.lazy(async () => import('../view/Sell'))

const productRoutes: RouteObject[] = [
  {
    path: Routes.sellProduct,
    element: <SellProductView />,
  },
]

export default productRoutes
