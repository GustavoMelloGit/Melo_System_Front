import React from 'react'
import { RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'
import CreateClientsView from '../view/Create'
const ClientsListView = React.lazy(async () => import('../view/List'))

const clientsRoutes: RouteObject[] = [
  {
    path: Routes.clients,
    element: <ClientsListView />,
  },
  {
    path: Routes.createClient,
    element: <CreateClientsView />,
  },
]

export default clientsRoutes
