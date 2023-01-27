import React from 'react'
import { type RouteObject } from 'react-router-dom'
import { Routes } from '../../../lib/routes'
import { UnprotectedRoute } from '../../../shared/components/Routers'
const SignInView = React.lazy(async () => import('../view/SignIn/View'))

export const authRoutes: RouteObject[] = [
  {
    path: Routes.login,
    element: (
      <UnprotectedRoute>
        <SignInView />
      </UnprotectedRoute>
    ),
  },
]
