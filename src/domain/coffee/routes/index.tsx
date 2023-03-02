import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'
const CoffeePickupView = React.lazy(async () => import('../view/Pickup'))

const coffeeRoutes: RouteObject[] = [
  {
    path: Routes.coffeePickups,
    element: <CoffeePickupView />,
  },
]

export default coffeeRoutes
