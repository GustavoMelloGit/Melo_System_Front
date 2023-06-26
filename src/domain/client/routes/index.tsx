import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'
const ClientsListView = React.lazy(async () => import('../view/Clients/List'))
const CreateClientsView = React.lazy(async () => import('../view/Clients/Create'))
const UpdateClientsView = React.lazy(async () => import('../view/Clients/Update'))
const ClientDetailsView = React.lazy(async () => import('../view/Client/Details'))
const TransferCurrencyView = React.lazy(async () => import('../view/Client/Transfer'))

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
  {
    path: Routes.transfer,
    element: <TransferCurrencyView />,
  },
]

export default clientsRoutes
