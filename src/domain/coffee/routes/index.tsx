import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'
const CoffeePickupView = React.lazy(async () => import('../view/Pickup'))
const CoffeeBookListView = React.lazy(async () => import('../view/Book/List'))
const CoffeeBookDetailsView = React.lazy(async () => import('../view/Book/Details'))

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
]

export default coffeeRoutes
