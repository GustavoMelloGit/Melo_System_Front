import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'
const CoffeePickupView = React.lazy(async () => import('../view/Pickup'))
const CoffeeEntryView = React.lazy(async () => import('../view/Entry'))

const coffeeRoutes: RouteObject[] = [
  {
    path: Routes.coffeePickups,
    element: <CoffeePickupView />,
  },
  {
    path: Routes.coffeeEntry,
    element: <CoffeeEntryView />,
  },
]

export default coffeeRoutes
