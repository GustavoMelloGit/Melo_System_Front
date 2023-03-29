import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'
const CoffeePickupView = React.lazy(async () => import('../view/Pickup'))
const CoffeeBookListView = React.lazy(async () => import('../view/Book/List'))
const CoffeeBookDetailsView = React.lazy(async () => import('../view/Book/Details'))
const CreateSheetView = React.lazy(async () => import('../view/Sheet/Create'))
const UpdateSheetView = React.lazy(async () => import('../view/Sheet/Update'))

const coffeeRoutes: RouteObject[] = [
  {
    path: Routes.coffeePickups,
    element: <CoffeePickupView />,
  },
  {
    path: Routes.books,
    element: <CoffeeBookListView />,
  },
  {
    path: Routes.bookPage(':number'),
    element: <CoffeeBookDetailsView />,
  },
  {
    path: Routes.createSheet(':bookNumber'),
    element: <CreateSheetView />,
  },
  {
    path: Routes.updateSheet(':bookNumber', ':sheetNumber'),
    element: <UpdateSheetView />,
  },
]

export default coffeeRoutes
