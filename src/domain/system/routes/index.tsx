import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'

const ConfigPage = React.lazy(async () => import('../view/Configurations'))
const UsersPage = React.lazy(async () => import('../view/Users'))

const systemRoutes: RouteObject[] = [
  {
    path: Routes.config,
    element: <ConfigPage />,
  },
  {
    path: Routes.users,
    element: <UsersPage />,
  },
]

export default systemRoutes
