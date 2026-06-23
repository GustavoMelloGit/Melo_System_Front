import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'

const CoffeeProofView = React.lazy(async () => import('../view'))

const coffeeProofRoutes: RouteObject[] = [
  {
    path: Routes.coffeeProof,
    element: <CoffeeProofView />,
  },
]

export default coffeeProofRoutes
