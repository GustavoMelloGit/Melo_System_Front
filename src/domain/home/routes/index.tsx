import React from 'react'
import { RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'

const HomeView = React.lazy(async () => import('../view/Dashboard'))

const homeRoutes: RouteObject[] = [
  {
    path: Routes.home,
    element: <HomeView />,
  },
]

export default homeRoutes
