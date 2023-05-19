import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'
const ClientsListView = React.lazy(async () => import('../view/Clients/List'))
const CreateClientsView = React.lazy(async () => import('../view/Client/Create'))
const UpdateClientsView = React.lazy(async () => import('../view/Clients/Update'))
const ClientDetailsView = React.lazy(async () => import('../view/Client/Details'))

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
  {
    path: Routes.clientPage(':uuid'),
    element: <ClientDetailsView />,
  },
]

export default clientsRoutes
