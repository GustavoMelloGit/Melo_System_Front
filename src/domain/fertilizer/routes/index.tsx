import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'
const FertilizerListView = React.lazy(async () => import('../view/List'))
const FertilizerDeliveryView = React.lazy(async () => import('../view/Delivery/List'))

const fertilizerRoutes: RouteObject[] = [
  {
    path: Routes.fertilizers,
    element: <FertilizerListView />,
  },
  {
    path: Routes.fertilizersDelivery,
    element: <FertilizerDeliveryView />,
  },
]

export default fertilizerRoutes
