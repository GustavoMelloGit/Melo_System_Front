import React from 'react'
import { RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'
const ClientsListView = React.lazy(async () => import('../view/List'))

const clientsRoutes: RouteObject[] = [
  {
    path: Routes.clients,
    element: <ClientsListView />,
  },
]

export default clientsRoutes
