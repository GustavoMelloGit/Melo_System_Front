import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'

const ConfigPage = React.lazy(async () => import('../view/ConfigPage'))

const systemRoutes: RouteObject[] = [
  {
    path: Routes.config,
    element: <ConfigPage />,
  },
]

export default systemRoutes
