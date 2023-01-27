import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'
const ClientsListView = React.lazy(async () => import('../view/List'))
const CreateClientsView = React.lazy(async () => import('../view/Create'))
const UpdateClientsView = React.lazy(async () => import('../view/Update'))

const clientsRoutes: RouteObject[] = [
  {
    path: Routes.clients,
    element: <ClientsListView />,
  },
  {
    path: Routes.createClient,
    element: <CreateClientsView />,
  },
  {
    path: Routes.updateClient(':uuid'),
    element: <UpdateClientsView />,
  },
]

export default clientsRoutes
