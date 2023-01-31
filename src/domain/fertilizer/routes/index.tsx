import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'
const FertilizerListView = React.lazy(async () => import('../view/List'))

const fertilizersRoutes: RouteObject[] = [
  {
    path: Routes.fertilizers,
    element: <FertilizerListView />,
  },
]

export default fertilizersRoutes
